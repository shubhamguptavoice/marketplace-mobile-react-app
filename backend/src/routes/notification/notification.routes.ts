
import { Router } from '../../common/exportsApp';
import { notification_Post } from '../../controller/notification/notification.Ctrl';
Router.route('/notif').post(notification_Post)

module.exports=Router