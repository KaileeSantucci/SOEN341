import { useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
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

  const {currentUser, isLoading, fetchUserInfo} = useUserStore();
  const {chatId} = useChatStore();

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
      <Routes>
        <Route path="/direct-messaging/*"
        element={
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
        }>
        </Route>
      </Routes>    
  );
};

export default DirectMessagingApp;