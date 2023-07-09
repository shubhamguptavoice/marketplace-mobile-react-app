import {Router} from '../../../common/exportsApp'
const passport = require("passport");
const CLIENT_URL = "https://localhost:3000";
//import { allusers_Get,user_delete} from '../../../controller/admin/allusers.Ctrl'
//const {requireAuth} = require("../../../middleware/auth");
Router.route('/facebook/callback')
.get(passport.authenticate("facebook",{
    //successRedirect:'/extrainfocheck',
    failureRedirect: "https://localhost:3000/login",
  }),(req:any,res:any,info:any)=>{
    //console.log('000',res.req.user.id)
   // console.log('000ll',res.req.user)
   
    res.redirect(`/api/extrainfocheck/${res.req.user.id}`)
  })

module.exports=Router

