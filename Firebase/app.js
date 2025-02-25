import { auth, db } from "./FirebaseConfiguration.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { loginUser } from "./authentication.js";

// Get elements from HTML
const registerForm = document.getElementById("registrationForm");
const registerBtn = document.getElementById("registerBtn");
//double check this section--> not sure if i should use POST or id 
const loginForm = document.getElementById("loginForm")

//Handeling form submission
registerForm.addEventListener("submit", async (event) => {
    event.preventDefault(); //prevents default form submission

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;
    const confirmedPassword = document.getElementById("confirmed-password").value;

    // Check if passwords match
    if (password !== confirmedPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        // Create user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update user profile in Firebase Auth
        await updateProfile(user, { displayName: userName });

        // Store user details in Firestore
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            displayName: userName,
            createdAt: new Date(),
        });

        alert("Registration successful!");
        registerForm.reset(); // Clear form fields

    } catch (error) {
        console.error("Error registering user:", error.message);
        alert("Error: " + error.message);
    }
});
//end of event listener for NEW user registration 

//Login Form even listener 
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); //prevents default form submission

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        await loginUser(email, password);
        alert("Login successful!");
    } catch (error) {
        console.error("Login error:", error.message);
        alert("Error: " + error.message);
    }
});