

// Import the functions you need from the Firebase Authentication SDK
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBiLiDM7LQK34jgIvFJ42pZ5tfKVPAM1Hk",
    authDomain: "league-app-1599a.firebaseapp.com",
    projectId: "league-app-1599a",
    storageBucket: "league-app-1599a.appspot.com",
    messagingSenderId: "1017702069588",
    appId: "1:1017702069588:web:c7827cbdcff418cae9c4c1",
    measurementId: "G-G6F3F09774"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the authentication instance
const auth = getAuth(app);

export { auth, app };
