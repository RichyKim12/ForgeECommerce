// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";
/* Auth Imports */
import {
  getAuth,
  setPersistence,  
  browserLocalPersistence,
} from "firebase/auth";
// firestore
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDsTAQJ8Mv0WlT0vp32BYAfLGyMqwX1ayo",
  authDomain: "e-commerce-app-forge.firebaseapp.com",
  projectId: "e-commerce-app-forge",
  storageBucket: "e-commerce-app-forge.appspot.com",
  messagingSenderId: "365456662044",
  appId: "1:365456662044:web:29dfb3d33bbd33ee88c9d9",
  measurementId: "G-NXB6K1Q4GJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth
export const auth = getAuth(app);
// set persistence to local
setPersistence(auth, browserLocalPersistence);

// db
export const db = getFirestore(app);
const analytics = getAnalytics(app);
export default db;



