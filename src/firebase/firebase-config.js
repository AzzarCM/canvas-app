import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCAqISLFsdLgCIKVbbp9emrmn1uK7QKh98",
    authDomain: "canvasapp-12c44.firebaseapp.com",
    projectId: "canvasapp-12c44",
    storageBucket: "canvasapp-12c44.appspot.com",
    messagingSenderId: "807307236355",
    appId: "1:807307236355:web:53986b47e8301dc111aa36",
    measurementId: "G-ENQLN56K2H"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
      db,
      facebookAuthProvider,
      googleAuthProvider,
      firebase
  }