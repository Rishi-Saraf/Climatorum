const userModel = require("../models/users.js")
const bcrypt = require("bcrypt")

exports.getSignup = (req,res)=>{
    params={
        title:"Signup"
    }
    res.render('forms/signup.pug',params)
}

exports.postSignup = (req,res)=>{
	const name = req.body.name
	const email = req.body.email
	const password = req.body.password
	const filename = req.profilePic
	userModel.findOne({email:email})
	.then(user=>{
		if(user){
			res.redirect('/signup')
			return
		}
		bcrypt.hash(password,12)
		.then(hashedPassword=>{
			const newUser = new userModel({
				username:name,
				email:email,
				password:hashedPassword,
				carbonCoin:0,
				profilePic:filename?filename:''
			})
			return newUser.save() 
		})
		.then(result=>{
			res.redirect('/')
		})
		.catch(err=>console.log(err))
	})
	.catch(err=>console.log(err))
}

exports.getLogin = (req,res)=>{
	params={
		title:"Login"
	}
	res.render('forms/login.pug',params)
}

exports.postLogin = (req,res)=>{
	const email = req.body.email
	const password = req.body.password
	userModel.findOne({email:email})
	.then(foundUser=>{
		if(!foundUser){
			res.redirect('/login')
			return
		}
		bcrypt.compare(password,foundUser.password)
		.then(isTrue=>{
			if(!isTrue){
				res.redirect('/login')
				return
			}
			else{
				req.session.isLoggedin = true
				req.session.user = foundUser
				return req.session.save(err=>{
					res.redirect('/')
				})
				console.log(req.session.isLoggedin)
			}
		})
		.catch(err=>console.log(err))
	})
	.catch(err=>console.log(err))
}