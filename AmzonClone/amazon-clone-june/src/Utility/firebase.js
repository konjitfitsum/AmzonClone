// Import the functions you need from the SDKs you need
import firebase from"firebase/compat/app"
import {getAuth} from 'firebase/auth'
import "firebase/compat/firestore"
import "firebase/compat/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD62yULiL8nxJn28Y_ioCtF1kOJzMpzv1c",
  authDomain: "clone-c6360.firebaseapp.com",
  projectId: "clone-c6360",
  storageBucket: "clone-c6360.firebasestorage.app",
  messagingSenderId: "815048097188",
  appId: "1:815048097188:web:24528546711fd492261531"
};

// Initialize Firebase
const app =firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore()