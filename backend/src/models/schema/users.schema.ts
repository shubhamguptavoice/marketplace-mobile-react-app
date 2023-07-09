require('../../../config/db.config')
var mongoose=require('mongoose')
var {Schema}=mongoose

var userStructure=new Schema({
    fb_id:String,
    google_id:String,
    apple_id:String,
    fname:String,
    lname:String,
    profileName:String,
    email:String,
    password:String,
    profilephoto:String,
    DOB:String,
    photo:String,
    phonno:String,
    userlanguage:String,
    role:{
        type: Number,
        default: 0,//customer 1 admin 2 super admin
    }
},{
    timestamps: true
  })

module.exports=mongoose.model('newUserRegister',userStructure)




