// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";  // Import the authentication module

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfVF2F25yoYnVvlGKcf8rR6Mk1NPXiHPk",
  authDomain: "oval-cyclist-446113-a8.firebaseapp.com",
  projectId: "oval-cyclist-446113-a8",
  storageBucket: "oval-cyclist-446113-a8.firebasestorage.app",
  messagingSenderId: "210602711091",
  appId: "1:210602711091:web:92e2fc1ff118a1714beb46",
  measurementId: "G-S49VPM485L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics (optional)
const analytics = getAnalytics(app);

// Initialize Firebase Authentication
const auth = getAuth(app); // Set up the auth instance

export { auth, analytics };  // Export auth for use in other parts of your app
