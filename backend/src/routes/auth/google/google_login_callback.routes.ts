import {Router} from '../../../common/exportsApp'
const passport = require("passport");
const CLIENT_URL = "https://localhost:3000";
//import { allusers_Get,user_delete} from '../../../controller/admin/allusers.Ctrl'
//const {requireAuth} = require("../../../middleware/auth");
Router.route('/google/callback')
.get(passport.authenticate("google",{
    //successRedirect:'/extrainfocheck',
    failureRedirect: "https://localhost:3000/login",
  }),(req:any,res:any,info:any)=>{
   
   
    res.redirect(`/api/google/extrainfocheck/${res.req.user.id}`)
  })

module.exports=Router

