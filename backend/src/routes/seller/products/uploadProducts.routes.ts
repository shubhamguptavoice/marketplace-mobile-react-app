import {Router} from '../../../common/exportsApp'
const passport = require("passport");
import { uploadProducts_Get, uploadProducts_Post} from '../../../controller/products/uploadProducts.Ctrl'
//const {requireAuth} = require("../../../middleware/auth");
Router.route('/upload-products')
.get(uploadProducts_Get).post(uploadProducts_Post)

module.exports=Router