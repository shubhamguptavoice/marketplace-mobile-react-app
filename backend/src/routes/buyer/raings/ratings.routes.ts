import {Router} from '../../../common/exportsApp'
import { ratingProducts_Get, ratingProducts_Post } from '../../../controller/buyers/ratings/raings.Ctrl';
Router.route('/rating-products')
.get(ratingProducts_Get).post(ratingProducts_Post)

module.exports=Router