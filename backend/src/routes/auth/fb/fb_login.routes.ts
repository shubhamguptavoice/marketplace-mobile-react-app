import {Router} from '../../../common/exportsApp'
const passport = require("passport");
//import { allusers_Get,user_delete} from '../../../controller/admin/allusers.Ctrl'
//const {requireAuth} = require("../../../middleware/auth");
Router.route('/facebook')
.get(passport.authenticate("facebook"))

module.exports=Router