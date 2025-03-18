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

      await updateDoc(senderChatsRef, {
        chats: arrayUnion({
          chatId,
          receiverId,
          lastMessage: "",
          isSeen: false,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(receiverChatsRef, {
        chats: arrayUnion({
          chatId,
          receiverId: currentUser.id,
          lastMessage: "",
          isSeen: false,
          updatedAt: Date.now(),
      }), });
      set({ chatId, user:{id: receiverId} });

    } catch (error) {
      console.error("Error starting chat:", error);
    }
  },
  changeChat: async (chatId, userId) => {
    console.log("Changing chat ID:", chatId);

    const currentUser = useUserStore.getState().currentUser;

    if (!user|| !currentUser) {return;}

    try{
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if(userSnap.exists()){
        const userData = userSnap.data();
        console.log("User data loaded in chat:", userData);
        
        set({
          chatId,
          user: userData,
          isCurrentUserBlocked: userData.blocked.includes(currentUser.id),
          isReceiverBlocked: currentUser.blocked.includes(userData.id),
        });
      }
    } catch (error) {
      console.error("Error fetchinf user data for chat: ", error);
    }
    
    // CHECK IF CURRENT USER IS BLOCKED
    if (user.blocked.includes(currentUser.id)) {
      return set({
        chatId,
        user: null,
        isCurrentUserBlocked: true,
        isReceiverBlocked: false,
      });
    }

    // CHECK IF RECEIVER IS BLOCKED
    else if (currentUser.blocked.includes(user.id)) {
      console.log("Receiver is blocked.");
      return set({
        chatId,
        user: user,
        isCurrentUserBlocked: false,
        isReceiverBlocked: true,
      });
    } else {

      return set({
        chatId,
        user,
        isCurrentUserBlocked: false,
        isReceiverBlocked: false,
      });
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