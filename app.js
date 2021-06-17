const Express = require("Express")
const app = Express()
const path = require("path")
const mongoose = require("mongoose")
const url = require("./url.js")
const bodyParser = require('body-parser')
const Session = require('express-session')
const mongoDBsession = require('connect-mongodb-session')(Session)
const csrf = require("csurf")
const Grid = require("gridfs-stream")
const GridFsStorage = require("multer-gridfs-storage")
const multer = require("multer")
const crypto = require("crypto")

const mainRoutes = require("./routes/main.js")
const userModel = require("./models/users.js")

const sessionStorage = new mongoDBsession(
    {
        uri : url.url,
        collection : 'sessions'
    })

app.use(Session({
    secret : url.sessionsSecret,
    resave : false,
    saveUninitialized : false,
    store : sessionStorage
}))

app.set("view engine","pug");
app.set('views','./views');
app.use('',(req,res,next)=>{
    if(!req.session.user){
        return next();
    }
    userModel.findById(req.session.user._id)
    .then(user=>{
        req.user = user;
        res.locals.user = user;
        next();
    })
    .catch(err=>console.error(err))
}
)
app.use(Express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded())
app.use((req,res,next)=>{
	res.locals.isLoggedIn = req.session.isLoggedin
	next()
})

const mongoURI = url.imageUrl
const conn = mongoose.createConnection(mongoURI)

let gfs

conn.once('open',()=>{
	gfs = Grid(conn.db,mongoose.mongo)
	gfs.collection("profilePic")
})


const storage = new GridFsStorage({
	url: mongoURI,
	file:(req,file)=>{
		return new Promise((resolve,reject)=>{
			crypto.randomBytes(16,(err,buf)=>{
				if(err){
					return reject(err)
				}
				const filename = buf.toString('hex') + path.extname(file.originalname)
				const fileInfo = {
					filename:filename,
					bucketName:'profilePic'
				}
				req.profilePic = filename
				resolve(fileInfo)
			})
		})
	}
})

const filter  = (req,file,cb)=>{
	if(file.mimetype==="image/png"||file.mimetype==="image/jpeg"||file.mimetype==="image/jpeg"){
		cb(null,true)
	}else{
		cb(null,false)
	}
}

app.use(multer({storage:storage,fileFilter:filter}).single('profilePic'))

app.use((req,res,next)=>{
	if(req.session.isLoggedin){
	res.locals.profilePic = "profile-images/"+req.session.user.profilePic
	next()	
	}
	else{
		next()
	}
})

app.get('/profile-images/:filename',(req,res)=>{
	if(req.session.isLoggedin){
	gfs.files.findOne({filename:req.params.filename},(err,file)=>{
		if(!file){
			return res.status(404).json({
				err:"No file exists"
			})
		}
		gfs.createReadStream(file.filename).pipe(res);
	})
	}
})

app.use(csrf())
app.use((req,res,next)=>{
    res.locals.csrfToken = req.csrfToken()
    next()
})

app.use('/',mainRoutes)

mongoose.connect(url.url,{ useNewUrlParser: true })
.then(result=>{
	app.listen(80)
})
.catch(err=>console.log(err))
