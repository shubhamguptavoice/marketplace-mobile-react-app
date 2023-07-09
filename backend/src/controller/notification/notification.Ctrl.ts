import webpush from 'web-push';
require('dotenv').config();
/*
request body:
{
    "seller_id":"123",
    "title": "Notification Title",
    "body": "Notification Body",
    "subscription":{
    "endpoint": "https://fcm.googleapis.com/fcm/send/abcdefghijkl",
    "keys": {
        "p256dh": "BINARY_KEY_ENCODED_IN_BASE64",
        "auth": "BINARY_KEY_ENCODED_IN_BASE64"
    }
    }
}
*/

export const notification_Post=async(req:any,res:any)=>{
    
    const options = {
        vapidDetails: {
          subject: 'mailto:myemail@example.com',
          publicKey: "BBvNwVAElLgs6PUcTcPoHFne_ztWOBRuCzjxq4zCF3SfOl0okVRc6Nhni-Br0Sx-81-F470c6k9iQ6x2EzR5NwE",
          privateKey: "kDF4CNx4sZmuY44A5Z5eOhLkQm_XhNCJbuDkSWWMMEU",
        },
      };
      console.log("process.env.PUBLIC_VAPID_KEY",process.env.PUBLIC_VAPID_KEY)
      webpush.setVapidDetails(
        "mailto:myemail@example.com",
         "BBvNwVAElLgs6PUcTcPoHFne_ztWOBRuCzjxq4zCF3SfOl0okVRc6Nhni-Br0Sx-81-F470c6k9iQ6x2EzR5NwE",
           "kDF4CNx4sZmuY44A5Z5eOhLkQm_XhNCJbuDkSWWMMEU",
         
    );
    try {
        const res2 = await webpush.sendNotification (
          req.body,
          JSON.stringify ({
            title: 'Hello from server',
            description: 'this message is coming from the server',
            image: 'https://cdn2.vectorstock.com/i/thumb-large/94/66/emoji-smile-icon-symbol-smiley-face-vector-26119466.jpg',
            actions: [{ action: "Detail", title: "View", icon: "https://via.placeholder.com/128/ff0000" }]
          }),
          options
        );
        res.sendStatus(200)
      } catch (error) {
        console.log (error);
        res.sendStatus (500);
      }
  
    
}