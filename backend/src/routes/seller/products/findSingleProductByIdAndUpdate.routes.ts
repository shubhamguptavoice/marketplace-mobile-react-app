import {Router} from '../../../common/exportsApp'
import { findSingleProductById_Get } from '../../../controller/products/findSingleProductById.Ctrl';
import { findSingleProductByIdAndUpdate_Put } from '../../../controller/products/findSingleProductByIdAndUpdate.Ctrl';
const passport = require("passport");

Router.route('/updated-single-product')
.put(findSingleProductByIdAndUpdate_Put)
module.exports=Router