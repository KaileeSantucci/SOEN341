import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "FireBaseConfiguration.js";

/**
 * Saves a new user's profile to Firestore
 */
export const saveUserProfile = async (user, additionalData) => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);

  try {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: additionalData.displayName || user.displayName,
      phone: additionalData.phone || "",
      createdAt: new Date(),
      photoURL: additionalData.photoURL || user.photoURL || "",
    });
    console.log("User profile saved to Firestore");
  } catch (error) {
    console.error("Error saving user profile:", error.message);
    throw error;
  }
};

/**
 * Retrieves a user's profile from Firestore
 */
export const getUserProfile = async (uid) => {
  if (!uid) return null;

  const userRef = doc(db, "users", uid);

  try {
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      console.log("No user found!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    throw error;
  }
};

/**
 * Updates a user's profile in Firestore
 */
export const updateUserProfile = async (uid, updateData) => {
  if (!uid) return;

  const userRef = doc(db, "users", uid);

  try {
    await updateDoc(userRef, updateData);
    console.log("User profile updated in Firestore");
  } catch (error) {
    console.error("Error updating profile:", error.message);
    throw error;
  }
};
