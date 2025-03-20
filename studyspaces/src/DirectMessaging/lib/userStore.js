import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "./firebase";

export const useUserStore = create((set) => ({
    currentUser: null,
    isLoading: true,

    fetchUserInfo: async (uid) => {
        if (!uid) {
            console.error("❌ fetchUserInfo called with invalid UID:", uid);
            return set({ currentUser: null, isLoading: false });
        }

        try {
            console.log(`🔎 Fetching user info for: ${uid}`);
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const userData = { id: uid, ...docSnap.data() };
                console.log("✅ User found in Firestore:", userData);
                set({ currentUser: userData, isLoading: false });
            } else {
                console.error("❌ No user found in Firestore!");
                set({ currentUser: null, isLoading: false });
            }
        } catch (err) {
            console.error("❌ Error fetching user:", err);
            set({ currentUser: null, isLoading: false });
        }
    },

    setCurrentUser: (user) => {
        console.log("🟢 Zustand setCurrentUser Called:", user);
        set({ currentUser: user });
    },
}));
