import React from "react";
import { db, collection, query, onSnapshot, orderBy } from "../../DirectMessaging/lib/firebase";
import { useState, useEffect } from "react";
import { useServerStore } from "../../DirectMessaging/lib/serverStore";

const ServerRoom = () => {
    const { selectedServer } = useServerStore(); 
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!selectedServer) return;

        const messagesRef = collection(db, "servers", selectedServer, "messages");
        const q = query(messagesRef, orderBy("timestamp", "asc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
    return () => { unsubscribe();}
    }, [selectedServer]);

        
    if (!selectedServer) return <p className="noSelectedServer">Select a server to view posts</p>

    return (
        <div className="ServerChatRoomContainer">
            <h2>{selectedServer.name}</h2>
            <ul>
            {messages.map(msg => (
                <li key={msg.id}>
                    <strong>{msg.username}: </strong>{msg.text}
                    <br />
                    <small>{new Date(msg.timestamp?.seconds * 1000).toLocaleString()}</small>
                </li>
            ))}
        </ul>
        </div>
    );
}

export default ServerRoom;
