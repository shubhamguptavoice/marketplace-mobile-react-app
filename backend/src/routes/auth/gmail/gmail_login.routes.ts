import {Router} from '../../../common/exportsApp'
const passport = require("passport");
import { gmail_login_Post} from '../../../controller/auth/gmail/gmail_login'
//const {requireAuth} = require("../../../middleware/auth");
Router.route('/gmail/login1')
.post(gmail_login_Post)

module.exports=Router