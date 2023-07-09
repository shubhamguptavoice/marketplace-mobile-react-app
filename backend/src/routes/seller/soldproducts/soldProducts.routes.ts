import {Router} from '../../../common/exportsApp'
const passport = require("passport");
import { uploadProducts_Get, uploadProducts_Post} from '../../../controller/products/uploadProducts.Ctrl'
import { soldProducts_Get } from '../../../controller/seller/soldProducts/soldProducts.Ctrl';
Router.route('/sold-products/:seller_id')
.get(soldProducts_Get)

module.exports=Router