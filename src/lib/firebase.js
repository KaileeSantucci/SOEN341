import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, collection, addDoc, serverTimestamp, query, orderBy, onSnapshot} from "firebase/firestore";



const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "soen341-classproject.firebaseapp.com",
  databaseURL: "https://soen341-classproject-default-rtdb.firebaseio.com",
  projectId: "soen341-classproject",
  storageBucket: "soen341-classproject.firebasestorage.app",
  messagingSenderId: "843482660549",
  appId: "1:843482660549:web:c40edd4f47e16737b5baac",
  measurementId: "G-K2E8TF59GL"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore();
export {doc, getDoc, addDoc, collection, serverTimestamp, query, orderBy, onSnapshot};