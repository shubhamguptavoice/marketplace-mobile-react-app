import {Router} from '../../../common/exportsApp'
//const passport = require("passport");
import { gmail_Register_Post} from '../../../controller/auth/gmail/gmail_Register'
//const {requireAuth} = require("../../../middleware/auth");
Router.route('/gmail/register')
.post(gmail_Register_Post)

module.exports=Router

