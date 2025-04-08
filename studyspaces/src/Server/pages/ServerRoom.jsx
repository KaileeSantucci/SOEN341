import React, { useState, useEffect } from "react";
import { db, collection, query, onSnapshot, orderBy, getDocs, addDoc, serverTimestamp } from "../../DirectMessaging/lib/firebase";
import { useUserStore } from "../../DirectMessaging/lib/userStore";

const ServerRoom = ({ selectedServer }) => {
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState("");
    const currentUser = useUserStore((state) => state.currentUser);
    console.log("👤 Fetched currentUser in ServerRoom:", currentUser);
    
    // 🔥 Manual Fetch if Real-Time Listener Fails
    const fetchMessagesOnce = async () => {
        if (!selectedServer || !selectedServer.id) {
            console.log("❌ No selected server, skipping manual Firestore fetch.");
            return;
        }

        console.log("📡 Fetching messages manually from Firestore...");
        const messagesRef = collection(db, "servers", selectedServer.id, "messages");
        const q = query(messagesRef, orderBy("timestamp", "asc"));

        try {
            const snapshot = await getDocs(q);
            if (snapshot.empty) {
                console.log("❌ No messages found in Firestore.");
                setMessages([]);
            } else {
                const fetchedMessages = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                console.log("🔥 One-Time Fetch Messages:", fetchedMessages);
                setMessages(fetchedMessages);
            }
        } catch (error) {
            console.error("❌ Firestore One-Time Fetch Error:", error);
        }
    };

    // 🔥 Real-Time Firestore Listener
    
    useEffect(() => {
        console.log("🟡 Checking selectedServer inside useEffect:", selectedServer);
    
        if (!selectedServer || !selectedServer.id) {
            console.log("❌ No selected server, skipping Firestore listener.");
            return;
        }
    
        console.log("✅ Server Selected (Inside useEffect):", selectedServer);
        
        const messagesRef = collection(db, "servers", selectedServer.id, "messages");
        const q = query(messagesRef, orderBy("timestamp", "asc"));
    
        console.log("🚀 Setting up Firestore real-time listener...");
        const unsubscribe = onSnapshot(q, (snapshot) => {
            if (snapshot.empty) {
                console.log("❌ No messages found in Firestore.");
                setMessages([]);
                fetchMessagesOnce(); // 🔥 Try Manual Fetch if Real-Time Fails
            } else {
                const fetchedMessages = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
    
                console.log("🔥 Messages Fetched from Firestore (Real-time):", fetchedMessages);
                setMessages(fetchedMessages);
            }
        }, (error) => {
            console.error("❌ Firestore Real-time Listener Error:", error);
            fetchMessagesOnce(); // 🔥 Try Manual Fetch if Real-Time Fails
        });
    
        return () => {
            console.log("🚀 Unsubscribing from Firestore Listener");
            unsubscribe();
        };
    }, [selectedServer]);
    
    // 📨 Send Message
    const sendMessage = async (e) => {
        e.preventDefault();
    
        console.log("🟢 Sending Message...");
        console.log("👤 Current User:", currentUser);
        console.log("📡 Selected Server:", selectedServer);
    
        if (!currentUser || !selectedServer) {
            alert("You must be logged in and have selected a server to send a message");
            console.error("❌ Missing required data:", { currentUser, selectedServer });
            return;
        }
    
        const messageRef = collection(db, "servers", selectedServer.id, "messages");
        await addDoc(messageRef, {
            text: messageText,
            userId: currentUser.id,
            username: currentUser.username || currentUser.email,
            timestamp: serverTimestamp(),
        });
    
        console.log("✅ Message Sent!");
        setMessageText(""); // Clears input after sending
    };
    

    // 🟡 If No Server is Selected
    if (!selectedServer) return <p className="noSelectedServer">Select a server to view posts</p>;

    return (
        <div className="ServerChatRoomContainer">
            <div className="ChatRoomHeader">
                <h2 style={{ color: "black" }}>{selectedServer.name}</h2>
            </div>
            {/* Show if messages are loading */}
            {messages.length === 0 && (
                <p style={{ color: "red" }}>❌ No messages found.</p>
            )}

            {/* Display Messages */}
            <ul className="messages-list">
                {messages.map(msg => (
                    <li key={msg.id} className="message-item">
                        <div className="message-username">{msg.username || "Unknown User"}:</div>
                        <div className="message-bubble">{msg.text}</div> 
                        <div className="message-timestamp">{msg.timestamp ? new Date(msg.timestamp.seconds * 1000).toLocaleString() : "❌ No Timestamp"}</div>
                    </li>
                ))}
            </ul>

            {/* Message Input */}
            <form id="ChatRoomFooter" onSubmit={sendMessage} className="message-input-form">
                <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type a message..."
                />
                <button type="submit" className="send-button">Send</button>
            </form>
        </div>
    );
};

export default ServerRoom;
