// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyDXVgKmzOAaxQnko-XtIBU7dJozF63iKHY",
    authDomain: "shlomi-hali.firebaseapp.com",
    projectId: "shlomi-hali",
    storageBucket: "shlomi-hali.firebasestorage.app",
    messagingSenderId: "1060409662991",
    appId: "1:1060409662991:web:8deec1818ea0afcf9a0d7a",
    measurementId: "G-44XECK6QK5",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: "https://shlomi-hali-haircut.web.app/assets/business_icon-CFVLxagW.jpg"
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });