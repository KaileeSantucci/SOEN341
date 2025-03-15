import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useUserStore } from "../lib/userStore";
import { useChatStore } from "../lib/chatStore";
import Chat from "../components/chat/Chat";
import Detail from "../components/detail/Detail";
import List from "../components/list/List";
import Login from "../components/login/login";
import Notification from "../components/notification/notification";

const DirectMessagingApp = () => {
  console.log("DirectMessagingApp is rendering...");
  console.log("Current Path: ", window.location.pathname);
  
  const {currentUser, isLoading, fetchUserInfo} = useUserStore();
  const {chatId} = useChatStore();
  console.log("Current User:", currentUser);
  console.log("Is Loading:", isLoading);
  console.log("Chat ID:", chatId);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  },[fetchUserInfo])

  console.log(currentUser);

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
  <div className='container'>
    {currentUser ? (
        <>
        <List/>
        {chatId && <Chat/>}
        {chatId && <Detail/>}
        </>
      ) : (
        <Login/>
      )}
      <Notification/>
  </div>
  );
};

export default DirectMessagingApp;
