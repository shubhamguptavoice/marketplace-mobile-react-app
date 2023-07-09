import {Router} from '../../../common/exportsApp'
const passport = require("passport");
//import { allusers_Get,user_delete} from '../../../controller/admin/allusers.Ctrl'
//const {requireAuth} = require("../../../middleware/auth");
Router.route('/google')
.get(passport.authenticate("google",{ scope: ["profile"] }))

module.exports=Router