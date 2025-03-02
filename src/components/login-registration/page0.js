import { firebaseConfig } from '../../lib/firebase';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.querySelector('.registration.form');
    const loginForm = document.querySelector('.login.form');
  
    const signupBtn = document.querySelector('.registration-btn');
    const loginBtn = document.querySelector('.loginbtn');
  
    if (signupBtn) {
      signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Signup button clicked');
      });
    } else {
      console.error("Signup button not found!");
    }
  
    if (loginBtn) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Login button clicked');
      });
    } else {
      console.error("Login button not found!");
    }
  });

const auth = firebase.auth();
const firestore = firebase.firestore();

// Get form elements
const signupForm = document.querySelector('.registration.form');
const loginForm = document.querySelector('.login.form');

const signupBtn = document.querySelector('.signupbtn');//
const loginBtn = document.querySelector('.loginbtn');

// **Handle Form Switching (Login, Signup)**
document.querySelectorAll('a').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const id = anchor.id;
    if (id === 'loginLabel') {
      showForm(loginForm);
    } else if (id === 'signupLabel') {
      showForm(signupForm);
    }
  });
});

function showForm(form) {
  [signupForm, loginForm].forEach(f => f.style.display = 'none');
  form.style.display = 'block';
}

// **Signup Functionality (No Input Validation, No Email Verification)**
signupForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent page reload

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
      window.location.href = "index.html"; // Redirect to login page
    })
    .catch((error) => {
      alert("Error signing up: " + error.message);
    })
    .finally(() => {
      signupBtn.disabled = false;
      signupBtn.textContent = "Register Now!";
    });
});

// **Login Functionality**
loginForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent page reload

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

// **Ensure Buttons Remain Clickable**
setTimeout(() => {
  document.querySelectorAll('input.button').forEach(btn => {
    btn.disabled = false;
  });
}, 100);
