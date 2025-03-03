import { firebaseConfig } from './config.js';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();  // ✅ Initialize Firebase Authentication
const firestore = firebase.firestore(); // ✅ Initialize Firestore 

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.querySelector('.registration.form');
  const signupBtn = document.querySelector('.signupbtn');

  if (signupForm && signupBtn) {
    signupForm.addEventListener('submit', async(e) => {
      e.preventDefault();

      const firstName = document.querySelector('#firstName').value.trim();
      const lastName = document.querySelector('#lastName').value.trim();
      const userName = document.querySelector('#userName').value.trim();
      const email = document.querySelector('#email').value.trim();
      const password = document.querySelector('#password').value;

      signupBtn.disabled = true;
      signupBtn.textContent = "Signing up...";

      try {
        // ✅ Create user in Firebase Auth
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        console.log("✅ User created:", user.uid);

        // ✅ Store User Profile in Firestore
        await firestore.collection('users').doc(user.uid).set({
          firstname: firstName,
          lastname: lastName,
          username: userName,
          email: email,
          createdAt: new Date(),
        });

        console.log("✅ User profile saved in Firestore");

        // ✅ Create `userchats` Collection for the New User
        await firestore.collection('userchats').doc(user.uid).set({
          chats: {} // Empty object for now
        });

        console.log("✅ `userchats` created for:", user.uid);

        // ✅ Redirect to login
        alert("Signup successful! You can now log in.");
        window.location.href = "index.html"; 

      } catch (error) {
        alert("Error signing up: " + error.message);
        console.error("❌ Signup Error:", error);
      } finally {
        signupBtn.disabled = false;
        signupBtn.textContent = "Register Now!";
      }
    });
  } else {
    console.error("❌ Signup form or button not found. Check your HTML.");
  }
});
