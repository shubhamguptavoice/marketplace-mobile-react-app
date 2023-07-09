import {Router} from '../../../common/exportsApp'
const passport = require("passport");
import { extraInfoToRegiserGoole_Get,extraInfoToRegiserGoogle_Post} from '../../../controller/auth/google/extraInfoToRegiserGoogle.Ctrl'
//const {requireAuth} = require("../../../middleware/auth");
Router.route('/google/extrainfocheck/:id')
.get(extraInfoToRegiserGoole_Get).post(extraInfoToRegiserGoogle_Post)

module.exports=Router