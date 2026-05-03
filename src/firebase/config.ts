
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// nuevo
import { getAuth } from 'firebase/auth';
// fin nuevo

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgY2cx2hWbppWtREttxLJ_V-vk5onGe9Q",
  authDomain: "astro-auth-f9fda.firebaseapp.com",
  projectId: "astro-auth-f9fda",
  storageBucket: "astro-auth-f9fda.firebasestorage.app",
  messagingSenderId: "43611874611",
  appId: "1:43611874611:web:4fd0ea5d6e985f69ae4a46",
  measurementId: "G-F04K6QEJ4B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



// esto se coloca
const auth = getAuth(app);
auth.languageCode = 'es';

export const firebase = {
  app,
  auth,
};