import { create } from "zustand";
import { db } from "./firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useUserStore } from "./userStore";


export const useChatStore = create((set) => ({
  chatId: null,
  user: null,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,

  startChat: async (receiverId) => {
    const {currentUser} = useUserStore.getState();
    console.log("Starting chat with receiverId:", receiverId);
    if(!currentUser || !currentUser.id){
      console.error("User not logged in.");
      return;
    }

    const chatId = [currentUser.id, receiverId].sort().join("_");
    const chatref = doc(db, "chats", chatId);
    const senderChatsRef = doc(db, "userchats", currentUser.id);
    const receiverChatsRef = doc(db, "userchats", receiverId);
    
    try{
      const chatSnap = await getDoc(chatref);
      if(!chatSnap.exists()){
        await setDoc(chatref, {
          createdAt: Date.now(),
          messages: [],
        });
      }
      
      // ✅ Check if sender's `userchats` exists, if not create it
      const senderSnap = await getDoc(senderChatsRef);
      if (!senderSnap.exists()) {
        await setDoc(senderChatsRef, { chats: [] });
      }

      // ✅ Check if receiver's `userchats` exists, if not create it
      const receiverSnap = await getDoc(receiverChatsRef);
      if (!receiverSnap.exists()) {
        await setDoc(receiverChatsRef, { chats: [] });
      }

      const senderChatsData = senderSnap.exists() ? senderSnap.data().chats : [];
      if (!senderChatsData.some(chat => chat.chatId === chatId)) {
        await updateDoc(senderChatsRef, {
          chats: arrayUnion({
            chatId,
            receiverId,
            lastMessage: "",
            isSeen: false,
            updatedAt: Date.now(),
          }),
        });
      }

      const receiverChatsData = receiverSnap.exists() ? receiverSnap.data().chats : [];
      if (!receiverChatsData.some(chat => chat.chatId === chatId)) {
        await updateDoc(receiverChatsRef, {
          chats: arrayUnion({
            chatId,
            receiverId: currentUser.id,
            lastMessage: "",
            isSeen: false,
            updatedAt: Date.now(),
          }),
        });
      }

      set({ chatId, user:{id: receiverId} });

    } catch (error) {
      console.error("Error starting chat:", error);
    }
  },

  changeChat: async (chatId, user) => {
    console.log("Changing chat ID:", chatId);
  
    if (!user || !user.id) {
      console.error("❌ User object is undefined or missing an ID:", user);
      return;
    }
  
    const currentUser = useUserStore.getState().currentUser;
    if (!currentUser || !currentUser.id) {
      console.error("No user found.");
      return;
    }
  
    try {
      const userRef = doc(db, "users", user.id);
      const userSnap = await getDoc(userRef);
  
      if (!userSnap.exists()) {
        console.error("User document not found in Firestore.");
        return;
      }
  
      const userData = userSnap.data();
      const userBlocked = userData?.blocked || [];
      const currentUserBlocked = currentUser?.blocked || [];
  
      // CHECK IF CURRENT USER IS BLOCKED
      if (userBlocked.includes(currentUser.id)) {
        console.log("current user is blocked.");
        return set({
          chatId,
          user: null,
          isCurrentUserBlocked: true,
          isReceiverBlocked: false,
        });
      } 
  
      // CHECK IF RECEIVER IS BLOCKED
      if (currentUserBlocked.includes(userData.id)) {
        console.log("Receiver is blocked.");
        return set({
          chatId,
          user: userData,
          isCurrentUserBlocked: false,
          isReceiverBlocked: true,
        });
      }
  
      set({
        chatId,
        user: userData,
        isCurrentUserBlocked: false,
        isReceiverBlocked: false,
      });
  
    } catch (error) {
      console.error("❌ Error fetching user data for chat:", error);
    }
  },  

  changeBlock: () => {
    set((state) => ({ ...state, isReceiverBlocked: !state.isReceiverBlocked }));
  },

  resetChat: () => {
    console.log("Resetting chat...");
    set({
      chatId: null,
      user: null,
      isCurrentUserBlocked: false,
      isReceiverBlocked: false,
    });
  },
}));

console.log("Chat Store Loaded.");