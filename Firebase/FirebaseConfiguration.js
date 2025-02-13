// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnpMA3DvtiztJKAvmcok81D956VexgzUY",
  authDomain: "soen341-classproject.firebaseapp.com",
  projectId: "soen341-classproject",
  storageBucket: "soen341-classproject.appspot.com",
  messagingSenderId: "843482660549",
  appId: "1:843482660549:web:9baaec54f0434379b5baac",
  measurementId: "G-80WWZT3YBK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app }; //Export the app to be used in other files