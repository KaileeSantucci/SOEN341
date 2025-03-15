import React from "react";

const ChatSidebar = ({ chats, setSelectedChat }) => {
    return (
        <div className="w-1/4 bg-white shadow-lg p-4">
            <h2 className="text-xl font-bold mb-4">Chats</h2>
            <ul>
                {chats.map((chat) => (
                    <li
                        key={chat.id}
                        className="p-3 border-b cursor-pointer hover:bg-gray-200"
                        onClick={() => setSelectedChat(chat)}
                    >
                        {chat.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatSidebar;
