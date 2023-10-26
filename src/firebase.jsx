// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDf2WJhJwehepk8ZEx8-gQOfw9OGOzyMUU",
  authDomain: "abaco-f8d2f.firebaseapp.com",
  projectId: "abaco-f8d2f",
  storageBucket: "abaco-f8d2f.appspot.com",
  messagingSenderId: "274521811079",
  appId: "1:274521811079:web:5bceff49ec3d97c9c47022",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider()
