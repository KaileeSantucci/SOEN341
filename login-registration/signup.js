import { firebaseConfig } from './config.js';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();  // ✅ Initialize Firebase Authentication
const firestore = firebase.firestore(); // ✅ Initialize Firestore (optional)

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.querySelector('.registration.form');
  const signupBtn = document.querySelector('.signupbtn');

  if (signupForm && signupBtn) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const firstName = document.querySelector('#firstName').value.trim();
      const lastName = document.querySelector('#lastName').value.trim();
      const username = document.querySelector('#username').value.trim();
      const email = document.querySelector('#email').value.trim();
      const password = document.querySelector('#password').value;

      signupBtn.disabled = true;
      signupBtn.textContent = "Signing up...";

      try{
        const userCredential = auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

         firestore.collection('users').doc(user.uid).set({
          firstName: firstName,
          lastName: lastName,
          username: userName,
          email: email,
          createdAt: new Date(),
          admin: false,
          id: user.uid,
          blocked: [],
        }); 

        alert("Account created! You can now log in!");
        window.location.href='index.html'; // Redirect to login page
      } catch (error) {
        alert("Error signing up: " + error.message);
      }finally{
        signupBtn.disabled = false;
        signupBtn.textContent = "Sign Up";
      }
    });
  } else {
    console.error("❌ Signup form or button not found. Check your HTML.");
  }
});
