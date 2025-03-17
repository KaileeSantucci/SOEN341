import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useUserStore } from "../lib/userStore";
import { useChatStore } from "../lib/chatStore";
import { useNavigate } from "react-router-dom";
import Chat from "../components/chat/Chat";
import Detail from "../components/detail/Detail";
import List from "../components/list/List";
import Login from "../components/login/login";
import Notification from "../components/notification/notification";
import "./DirectMessagingIndex.css"

const DirectMessagingApp = () => {
  console.log("DirectMessagingApp is rendering...");
  console.log("Current Path: ", window.location.pathname);
  
  const navigate = useNavigate();

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
  if (!currentUser) return <Navigate to="/login" replace />; // Redirect if no user


  return (
  <div className='container'>
    {console.log("Rendering DirectMessagingApp...")}
    {console.log("Current chatId:", chatId)}
    {/* ✅ Back to Home Button */}
    <button onClick={() => navigate("/home")} className="back-home-btn">
      ⬅ Back to Home
    </button>

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
