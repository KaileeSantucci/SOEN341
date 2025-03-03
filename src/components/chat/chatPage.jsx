import Chat from "../components/chat/Chat"; // Adjust the path based on your project structure
import { useState, useEffect } from "react";
import { auth } from "../../lib/firebase";

const ChatPage = () => {
  const [chatUserId, setChatUserId] = useState(null);

  useEffect(() => {
    // Simulate selecting a user from a list (Replace this with actual logic)
    setChatUserId("USER_ID_OF_THE_OTHER_PERSON"); // Replace this with a real recipient's user ID
  }, []);

  if (!chatUserId) {
    return <p>Loading chat...</p>;
  }

  return (
    <div>
      <h2>Chat with User</h2>
      <Chat chatUserId={chatUserId} />
    </div>
  );
};

export default ChatPage;
