import {Router} from '../../../common/exportsApp'
import { ratingSingleProducts_Get } from '../../../controller/buyers/ratings/ratingOfSingleProduct.Ctrl';
Router.route('/rating-single-product/:id')
.get(ratingSingleProducts_Get)

module.exports=Router