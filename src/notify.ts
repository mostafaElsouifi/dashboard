// // src/notify.ts
// import { realtimeDB } from './includes/firebase'
// interface NotificationData {
//   title: string
//   body: string
// }
// export function listenForNewData() {
//   const dataRef = realtimeDB.ref('data')

//   dataRef.on('child_added', (snapshot) => {
//     const newData = snapshot.val()
//     sendNotification(newData)
//   })
// }

// function sendNotification(data: NotificationData) {
//   navigator.serviceWorker.ready.then((registration) => {
//     registration.showNotification('New Data Alert!', {
//       body: `New data: ${JSON.stringify(data)}`,
//       icon: 'icon-192x192.png',
//       badge: 'icon-192x192.png',
//     })
//   })
// }

// export async function requestNotificationPermission() {
//   const permission = await Notification.requestPermission()
//   if (permission === 'granted') {
//     console.log('Notification permission granted.')
//   } else {
//     console.log('Notification permission denied.')
//   }
// }
