import {Router} from '../../../common/exportsApp'
import { createPaymentIntent_Post } from '../../../controller';

const passport = require("passport");
import { uploadProducts_Get, uploadProducts_Post} from '../../../controller/products/uploadProducts.Ctrl'
import { soldProducts_Get } from '../../../controller/seller/soldProducts/soldProducts.Ctrl';
Router.route('/create-payment-intent')
.post(createPaymentIntent_Post)

module.exports=Router