// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGPKAlTxXLrAr3DI3FoFeoj2sdHoY64HY",
  authDomain: "e-commerce-project-react.firebaseapp.com",
  projectId: "e-commerce-project-react",
  storageBucket: "gs://e-commerce-project-react.appspot.com",
  messagingSenderId: "157841314826",
  appId: "1:157841314826:web:12a95874926e635317bbf3",
  measurementId: "G-4JW7PRGJ5B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const db = getFirestore(app)
export const Auth = getAuth(app)
