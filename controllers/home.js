exports.home = (req,res)=>{
	params={
		title: "Climatorum"
	}
	res.render('home',params)
}