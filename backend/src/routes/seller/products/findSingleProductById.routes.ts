import {Router} from '../../../common/exportsApp'
import { findSingleProductById_Get } from '../../../controller/products/findSingleProductById.Ctrl';
const passport = require("passport");

Router.route('/find-single-product-by-Id')
.get(findSingleProductById_Get)
module.exports=Router