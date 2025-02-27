// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEkJrdsq2JQSmYS4RruhAeBAHnvI255Q4",
  authDomain: "chrome-extension-30398.firebaseapp.com",
  projectId: "chrome-extension-30398",
  storageBucket: "chrome-extension-30398.firebasestorage.app",
  messagingSenderId: "339835576021",
  appId: "1:339835576021:web:e68f67d9449d5bd9934c5c",
  measurementId: "G-8YZYRSHB11",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
