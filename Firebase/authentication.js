import { auth } from "./FirebaseConfiguration.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

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

//Function to login a user 
const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User logged in:", user);
  } catch (error) {
    console.log("Error loggin in:", error);
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

export { auth, registerUser, loginUser, logoutUser }; //Export the functions to be used in other files