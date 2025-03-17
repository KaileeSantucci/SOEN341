import React from "react";
import { useChatStore } from "../DirectMessaging/lib/chatStore";
import { useState } from "react";


const ServerChat = ({selectedServer}) => {
    const [messageText, setMessageText] = useState("");
    const {currentUser} = useChatStore();

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!currentUser || !selectedServer){
            alert("You must be logged in and have selected a server to send a message");
            return;
        }

        const messageRef = collection(db, "servers", selectedServer.id, "messages");
        await addDoc(messageRef, {
            text: messageText,
            userId: currentUser.id,
            username: currentUser.username,
            timestamp: serverTimestamp(),
        });
        console.log("Message sent successfully!");
        setMessageText("");
    };

    return (
        <form onSubmit={sendSubmit}>
            <input
                type="text"
                value={messageTest}
                onChange={(e) => setMessageTest(e.target.value)}
                placeholder="Type a message..."
            />
            <button type="submit">Send</button>
        </form>
    )
};

export default ServerChat;