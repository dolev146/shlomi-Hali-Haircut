import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDXVgKmzOAaxQnko-XtIBU7dJozF63iKHY",
  authDomain: "shlomi-hali.firebaseapp.com",
  projectId: "shlomi-hali",
  storageBucket: "shlomi-hali.firebasestorage.app",
  messagingSenderId: "1060409662991",
  appId: "1:1060409662991:web:8deec1818ea0afcf9a0d7a",
  measurementId: "G-44XECK6QK5",
  databaseURL: "https://shlomi-hali-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Export services
export const analytics = getAnalytics(app);
export const database = getDatabase(app);
export const appointmentsRef = ref(database, "appointments/");
