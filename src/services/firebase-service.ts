import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDXVgKmzOAaxQnko-XtIBU7dJozF63iKHY",
  authDomain: "shlomi-hali.firebaseapp.com",
  projectId: "shlomi-hali",
  storageBucket: "shlomi-hali.firebasestorage.app",
  messagingSenderId: "1060409662991",
  appId: "1:1060409662991:web:8deec1818ea0afcf9a0d7a",
  measurementId: "G-44XECK6QK5",
  databaseURL:
    "https://shlomi-hali-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Export services
export const analytics = getAnalytics(app);
export const database = getDatabase(app);
// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = getMessaging(app);

export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  console.log(permission);
  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey:
        "BKpMtRNwhdv7-OKKev2wVbbyBCE0jztjUbtPP7QNIK9DKElaSurpDB1YxVWXxPk6lN02gmNv1vEEVZBUzSMl2yg",
    });
    console.log(token);
  }
  return permission;
};
export const appointmentsRef = ref(database, "appointments/");

