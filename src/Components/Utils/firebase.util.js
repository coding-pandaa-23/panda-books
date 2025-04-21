// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDd_pTE4E6nOGr5HiPAVQncO4xpu8OEY_g",
  authDomain: "panda-books-25.firebaseapp.com",
  projectId: "panda-books-25",
  storageBucket: "panda-books-25.firebasestorage.app",
  messagingSenderId: "961054704068",
  appId: "1:961054704068:web:e4b0ef2c9543f13dfb6491"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const authI = getAuth(app);
const dbI = getFirestore(app);
const storageI = getStorage(app)

export {app, authI, dbI, storageI}