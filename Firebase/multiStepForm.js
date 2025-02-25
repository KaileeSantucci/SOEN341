import { auth, db } from "./FirebaseConfiguration.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// STEP 1: Save Data & Move to Next Page (from registration.html)
const step1Form = document.getElementById("registerFormStep1");
if (step1Form) {
    step1Form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Store user details in sessionStorage
        sessionStorage.setItem("firstName", document.getElementById("firstName").value);
        sessionStorage.setItem("lastName", document.getElementById("lastName").value);
        sessionStorage.setItem("email", document.getElementById("email").value);
        sessionStorage.setItem("phone", document.getElementById("phone").value);

        // Redirect to next form step
        window.location.href = "registration2.html";
    });
}

// STEP 2: Load Data & Submit to Firebase (on registration2.html)
const step2Form = document.getElementById("registerFormStep2");
if (step2Form) {
    // Pre-fill fields with stored data from Step 1
    document.getElementById("userName").value = sessionStorage.getItem("userName") || "";
    
    step2Form.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Retrieve stored Step 1 data
        const firstName = sessionStorage.getItem("firstName");
        const lastName = sessionStorage.getItem("lastName");
        const email = sessionStorage.getItem("email");
        const phone = sessionStorage.getItem("phone");
        const userName = document.getElementById("userName").value;
        const password = document.getElementById("password").value;
        const confirmedPassword = document.getElementById("confirmed-password").value;

        if (password !== confirmedPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            // Create user in Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update Firebase Auth profile
            await updateProfile(user, { displayName: userName });

            // Store full user profile in Firestore
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
            sessionStorage.clear(); // Clear temporary storage
            window.location.href = "login.html"; // Redirect to login page

        } catch (error) {
            console.error("Error registering user:", error.message);
            alert("Error: " + error.message);
        }
    });

    // Pre-fill the form if user came back
    document.getElementById("userName").value = sessionStorage.getItem("userName") || "";
}
