import { firebaseConfig } from '../../lib/firebase';

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
      const userName = document.querySelector('#userName').value.trim();
      const email = document.querySelector('#email').value.trim();
      const password = document.querySelector('#password').value;

      signupBtn.disabled = true;
      signupBtn.textContent = "Signing up...";

      auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          return firestore.collection('users').doc(user.uid).set({
            firstname: firstName,
            lastname: lastName,
            username: userName,
            email: email,
            createdAt: new Date() 
          });
        })
        .then(() => {
          alert("Signup successful! You can now log in.");
          window.location.href = "index.html"; // Redirect to login
        })
        .catch((error) => {
          alert("Error signing up: " + error.message);
        })
        .finally(() => {
            signupBtn.disabled = false;
            signupBtn.textContent = "Register Now!";
          });
    });
  } else {
    console.error("❌ Signup form or button not found. Check your HTML.");
  }
});
