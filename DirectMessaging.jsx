import React, { useState } from "react";
import ChatSidebar from "./ChatSidebar";
import Chat from "./chat/Chat";  
import "./chat/chat.css"; 

const DirectMessaging = () => {
    const [selectedChat, setSelectedChat] = useState(null);

    const chats = [
        { id: "chat1", name: "John Doe" },
        { id: "chat2", name: "Jane Smith" },
        { id: "chat3", name: "Team Group Chat" },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            <ChatSidebar chats={chats} setSelectedChat={setSelectedChat} />
            {selectedChat ? (
                <Chat chatId={selectedChat.id} />
            ) : (
                <div className="w-3/4 flex items-center justify-center">
                    <p className="text-gray-500">Select a chat to start messaging</p>
                </div>
            )}
        </div>
    );
};

export default DirectMessaging;
