import { firebaseConfig } from './config.js';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();  // ✅ Initialize Firebase Authentication
const firestore = firebase.firestore(); // ✅ Initialize Firestore (optional)

document.addEventListener("DOMContentLoaded", () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
    
      const auth = firebase.auth();
    
  const loginForm = document.querySelector('.login.form');
  const loginBtn = document.querySelector('.loginbtn');

  if (loginForm && loginBtn) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.querySelector('#inUsr').value.trim();
      const password = document.querySelector('#inPass').value;

      loginBtn.disabled = true;
      loginBtn.textContent = "Logging in...";

      auth.signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User signed in successfully.');
          window.location.href = "home.html"; // Redirect to home page
        })
        .catch((error) => {
          alert("Error signing in: " + error.message);
          loginBtn.disabled = false;
          loginBtn.textContent = "Sign In";
        });
    });
  } else {
    console.error("❌ Login form or button not found. Check your HTML.");
  }
});
