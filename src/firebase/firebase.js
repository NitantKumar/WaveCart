// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import the Auth module

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3gD7magUqOrX0sc-3Q8BcjQCMhwBeuqI",
  authDomain: "wavecart-ca555.firebaseapp.com",
  projectId: "wavecart-ca555",
  storageBucket: "wavecart-ca555.firebasestorage.app",
  messagingSenderId: "478210202213",
  appId: "1:478210202213:web:344223b43b5bea11fb848c",
  measurementId: "G-1KQRPVLZRE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize Auth instance

export { app, analytics, auth }; // Export auth for use in your app
