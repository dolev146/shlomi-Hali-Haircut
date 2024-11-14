// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXVgKmzOAaxQnko-XtIBU7dJozF63iKHY",
  authDomain: "shlomi-hali.firebaseapp.com",
  projectId: "shlomi-hali",
  storageBucket: "shlomi-hali.firebasestorage.app",
  messagingSenderId: "1060409662991",
  appId: "1:1060409662991:web:8deec1818ea0afcf9a0d7a",
  measurementId: "G-44XECK6QK5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);