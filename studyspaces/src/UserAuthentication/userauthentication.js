import { useEffect, useState } from 'react';
import { auth, db } from '../DirectMessaging/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { useChatStore } from '../DirectMessaging/lib/chatStore';

export const useAuthentication = () => {
    const [user, setUser ] = useState(null)
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true); 
    const { resetChat } = useChatStore();
    
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
  
          if (currentUser) {
            setUser(currentUser);
            const docRef = doc(db, "users", currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUserData(docSnap.data());
            } else {
                setUserData(null);
            }
          } else {
            setUser(null);
            setUserData(null);
            resetChat(); //Reset chat store on logout
          }
          setLoading(false); // Set loading to false after user is set
      });
  
      return () => unsubscribe(); // Cleanup function
  }, []);  
    
      const logout = async () => {
        await signOut(auth);
        setUser(null);
        setUserData(null);
        resetChat(); //Reset chat store on logout
      }; 
    return { user, userData, loading, logout };    
};


