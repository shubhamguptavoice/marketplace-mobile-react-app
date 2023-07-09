import {Router} from '../../common/exportsApp'
const passport = require("passport");
import { loginSuccess_Get} from '../../controller/auth/loginSuccess.Ctrl'
//const {requireAuth} = require("../../../middleware/auth");
Router.route('/login/success')
.get(loginSuccess_Get)

module.exports=Router



