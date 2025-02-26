//import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnpMA3DvtiztJKAVmcok8lD956VexgzUY",
  authDomain: "soen341-classproject.firebaseapp.com",
  databaseURL: "https://soen341-classproject-default-rtdb.firebaseio.com",
  projectId: "soen341-classproject",
  storageBucket: "soen341-classproject.firebasestorage.app",
  messagingSenderId: "843482660549",
  appId: "1:843482660549:web:c40edd4f47e16737b5baac",
  measurementId: "G-K2E8TF59GL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

console.log("🔥 Firebase Initialized Successfully");

export { auth, db };