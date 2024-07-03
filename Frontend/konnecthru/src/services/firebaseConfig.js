// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5mhJKdsIUYxYZezQZKmIxzAAofJo9NUU",
  authDomain: "konnecthru.firebaseapp.com",
  projectId: "konnecthru",
  storageBucket: "konnecthru.appspot.com",
  messagingSenderId: "911664109526",
  appId: "1:911664109526:web:913dd9cdf550d01d0f3677",
  measurementId: "G-SGBY3LMETC"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);



export { auth, db };