import {Router} from '../../common/exportsApp'
const passport = require("passport");
import { extraInfoToRegiser_Get,extraInfoToRegiser_Post} from '../../controller/auth/extraInfoToRegiser.Ctrl'
//const {requireAuth} = require("../../../middleware/auth");
Router.route('/extrainfocheck/:id')
.get(extraInfoToRegiser_Get).post(extraInfoToRegiser_Post)

module.exports=Router