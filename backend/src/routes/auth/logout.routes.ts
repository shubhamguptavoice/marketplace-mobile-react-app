import {Router} from '../../common/exportsApp'
const passport = require("passport");
import { logout_Get} from '../../controller/auth/logout.Ctrl'
//const {requireAuth} = require("../../../middleware/auth");
Router.route('/logout')
.get(logout_Get)

module.exports=Router


