import { auth } from "./FirebaseConfiguration.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

//Creating a new user
const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User logged in:", user);
  } catch (error) {
    console.log("Error registering user:",error);
  }
};

// Function to login a user 
export const loginUser = async (email, password) => {
  try {
    if (!auth) {
      throw new Error("Firebase Auth is not initialized.");
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User logged in:", user);

    return user; // Return user object
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw error; // Re-throw for `app.js` to catch it
  }
};

  
//Function to logout a user
const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.log("Error logging out:", error);
  }
};

export { auth, registerUser, logoutUser }; //Export the functions to be used in other files