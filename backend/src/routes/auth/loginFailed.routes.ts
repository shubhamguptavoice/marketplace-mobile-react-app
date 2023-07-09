import {Router} from '../../common/exportsApp'
//const passport = require("passport");
import { loginFailed_Get} from '../../controller/auth/loginFailed.Ctrl'
//const {requireAuth} = require("../../../middleware/auth");
Router.route('/login/failed')
.get(loginFailed_Get)

module.exports=Router
