const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
	username:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true
	},
	profilePic:{
		type:String,
		required:false
	},
	climateClub:{
		type: Schema.Types.ObjectId,
		required:false
	},
	carbonCoin:{
		type:Number,
		required:true
	},
	posts:{
		type:[
			{
			postId: {type:Schema.Types.ObjectId,required:false}
			}
		],
		required:false
	}
})

module.exports = mongoose.model("User",userSchema)