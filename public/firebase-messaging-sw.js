// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config

const firebaseConfig = {
  apiKey: "AIzaSyAy5q9MGes19yfEwP7_OHVpEkHgcGmj6-s",
  authDomain: "kdadeltariq-25e2f.firebaseapp.com",
  projectId: "kdadeltariq-25e2f",
  storageBucket: "kdadeltariq-25e2f.appspot.com",
  messagingSenderId: "1070281269059",
  appId: "1:1070281269059:web:e1e3946a72534a057359f6",
  measurementId: "G-68KP3K49L7",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log("Received background message", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);

  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage(payload);
    });
  });
});
// =================================== new ==========================
