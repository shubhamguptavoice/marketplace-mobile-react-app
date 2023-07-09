
self.addEventListener ('push', async function (event) {
     const message = await event.data.json()
     console.log("message",message)
     let {title, description, image} = message;
const options = {
  body: title,
  tag: description,
  image:image
};
self.registration.showNotification("titlezzzz", options)

    console.log ("{message}");
  });
  self.addEventListener('notificationclick', function(event) {
    console.log('[Service Worker] Notification click received.');
  
    event.notification.close();
  
    event.waitUntil(
      clients.openWindow('https://developers.google.com/web')
    );
  });