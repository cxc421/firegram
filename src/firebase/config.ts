import * as firebase from "firebase/app";
import "firebase/storage"; // To store images
import "firebase/firestore"; // Databse

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClvddViKQSpAHGVTbrbvx-2TtnTvROuYM",
  authDomain: "firegram-da485.firebaseapp.com",
  databaseURL: "https://firegram-da485.firebaseio.com",
  projectId: "firegram-da485",
  storageBucket: "firegram-da485.appspot.com",
  messagingSenderId: "146616664967",
  appId: "1:146616664967:web:0a3d7b96225431ffa10922",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFireStore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFireStore, timestamp };
