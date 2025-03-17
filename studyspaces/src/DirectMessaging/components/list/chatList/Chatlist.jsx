import { useEffect, useState } from "react";
import "./chatList.css";
import AddUser from "./addUser/addUser";
import { useUserStore } from "../../../lib/userStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/chatStore";
import CreateGroup from "./createGroup/createGroup";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [addModeGroup, setAddModeGroup] = useState(false);
  const [input, setInput] = useState("");

  const { currentUser } = useUserStore();
  const { chatId, changeChat } = useChatStore();

  useEffect(() => {
    if (!currentUser || !currentUser.id){
      console.warn("currentUser is null or undefined, skipping snpashot.");
      return;
    }

    if (!chatId) {
      console.warn("Chat ID is not available");
      return <p>No active chat selected.</p>;
    }
    
    console.log("Fetching chats for user:", currentUser.id);

    const userChatsRef = doc(db, "userchats", currentUser.id);

    const unSub = onSnapshot( userChatsRef, async (res) => {
        if(!res.exists()){
          console.warn("No userchats document found for user: ", currentUser.id);
          await setDoc(userChatsRef, { chats: [] }); // Create userchats document if not found
          setChats([]);
          return;
        }

        const items = res.data().chats || [];
        console.log("Chats found for user:", items);

        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          if (!userDocSnap.exists()){
            return null //Skip if user does not exist in firestore database
          }

          const user = userDocSnap.data();
          console.log("User found for chat:", user);

          return { ...item, user };
        });

        const chatData = await Promise.all(promises);
        console.log("Final chat list after processing:", chatData);

        setChats(chatData.filter(chat => chat !== null).sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0)));
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser?.id]);

  const handleSelect = async (chat) => {
    console.log("Selected Chat:", chat);  // Log selected chat object
    console.log("Selected Chat ID:", chat.chatId);  // Log chat ID
    console.log("Selected User:", chat.user);  // Log selected user

     try {
        await updateDoc(doc(db, "userchats", currentUser.id), {
            chats: chats.map((item) =>
                item.chatId === chat.chatId ? { ...item, isSeen: true } : item
            ),
        });

        useChatStore.getState().changeChat(chat.chatId, chat.user);
        console.log("Chat updated in Zustand store");
    } catch (err) {
        console.error("Error updating chat:", err);
    }
  };

  const filteredChats = chats.filter((c) =>
    c.user.username.toLowerCase().includes(input.toLowerCase())
  );

  return (
    
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="../../../../public/DirectMessaging/search.png" alt="" />
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <img
          src={addMode ? "../../../../public/DirectMessaging/minus.png" : "../../../../public/DirectMessaging/plus.png"}
          alt=""
          className="add"
          onClick={() => setAddMode((prev) => !prev)}
        />
        <img
          src={addModeGroup ? "../../../../public/DirectMessaging/minus.png" : "../../../../public/DirectMessaging/plus.png"}
          alt=""
          className="add"
          onClick={() => setAddModeGroup((prev) => !prev)}
        />
      </div>
      {addModeGroup && <CreateGroup />}
      {filteredChats.map((chat) => (
        <div
          className="item"
          key={chat.chatId}
          onClick={() => handleSelect(chat)}
          style={{
            backgroundColor: chat?.isSeen ? "transparent" : "#5183fe",
          }}
        >
          <img
            src={
              chat.user.blocked.includes(currentUser.id)
                ? "../../../../public/DirectMessaging/avatar.png"
                : chat.user.avatar || "../../../../public/DirectMessaging/avatar.png"
            }
            alt=""
          />
          <div className="texts">
            <span>
              {chat.user.blocked.includes(currentUser.id)
                ? "User"
                : chat.user.username}
            </span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}

      {addMode && <AddUser />}
    </div>
  );
  console.log("ChatList is being rendered!");
};

export default ChatList;
