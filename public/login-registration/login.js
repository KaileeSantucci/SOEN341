import { firebaseConfig } from './config.js';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();  // ✅ Initialize Firebase Authentication

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector('.login.form');
  const loginBtn = document.querySelector('.loginbtn');

  if (loginForm && loginBtn) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.querySelector('#inUsr').value.trim();
      const password = document.querySelector('#inPass').value;

      loginBtn.disabled = true;
      loginBtn.textContent = "Logging in...";

      try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        if (user) {
          console.log('✅ User signed in successfully.');

          // ✅ Fetch the authentication token
          const token = await user.getIdToken();

          // ✅ Store it in localStorage BEFORE redirection
          localStorage.setItem("authToken", token);
          localStorage.setItem("userEmail", user.email);

          console.log("🔐 Token stored in localStorage:", token);

          // ✅ Add a short delay before redirecting to ensure storage is completed
          setTimeout(() => {
            window.location.href = "http://localhost:5173"; // Redirect to Vite app
          }, 500); // Delay of 500ms
        }

      } catch (error) {
        alert("Error signing in: " + error.message);
        loginBtn.disabled = false;
        loginBtn.textContent = "Sign In";
      }
    });
  } else {
    console.error("❌ Login form or button not found. Check your HTML.");
  }
});

