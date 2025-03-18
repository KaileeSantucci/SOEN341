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

  const currentUser = useUserStore((state) => state.currentUser);
  const { chatId, changeChat } = useChatStore();

  if(!currentUser) return <p>Error: No user found.</p>;

  useEffect(() => {
    if (!currentUser || !currentUser.id){
      console.warn("currentUser is null or undefined, skipping snpashot.");
      return;
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

        const chatArray = res.data().chats || []; // ✅ Ensure `chats` exists
        console.log("Chats found for user:", chatArray);
{/*changes */}
        const chatData = await Promise.all(
          chatArray.map(async (chatItem) => {
            if (!chatItem.receiverId) return null; // ✅ Check for `receiverId`

            try {
                const userDocRef = doc(db, "users", chatItem.receiverId);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    return { ...chatItem, user: userDocSnap.data() };
                } else {
                    console.warn("User document not found for receiverId:", chatItem.receiverId);
                    return null;
                }
            } catch (error) {
                console.error("Error fetching user document:", error);
                return null;
            }
          })
        );
        
        setChats(chatData.filter(chat => chat !== null).sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0)));
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser?.id]);

  const handleSelect = async (chat) => {
    console.log("Selected Chat:", chat);  // Log selected chat object
    if (chat.chatId){
      changeChat(chat.chatId, chat.user.id)
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
      {chats.length === 0 ? (
                <p>No chats found. Add a user to start messaging!</p>
            ) : (
                chats.map((chat) => (
                    <div key={chat.chatId} className="item" onClick={() => handleSelect(chat)}>
                        <img src={chat.user?.avatar || "../../../../public/DirectMessaging/avatar.png"} alt="" />
                        <div className="texts">
                            <span>{chat.user?.username || "Unknown User"}</span>
                            <p>{chat.lastMessage || "No messages yet"}</p>
                        </div>
                    </div>
                ))
            )}
      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
