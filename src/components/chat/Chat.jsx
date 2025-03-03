import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { db, auth, collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from "../../lib/firebase";

const Chat = ({ chatUserId }) => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);
    const endRef = useRef(null);
    const currentUser = auth.currentUser; // Get logged-in user

    // 🔥 Fetch Messages in Real-Time
    useEffect(() => {
        if (!currentUser || !chatUserId) return;

        const messagesRef = collection(db, "userchats", currentUser.uid, "messages");
        const q = query(messagesRef, orderBy("timestamp", "asc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return () => unsubscribe();
    }, [currentUser, chatUserId]);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // ✅ Handle Sending Messages
    const sendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() || !currentUser) return;

        try {
            await addDoc(collection(db, "userchats", currentUser.uid, "messages"), {
                senderId: currentUser.uid,
                receiverId: chatUserId,
                text: text.trim(),
                timestamp: serverTimestamp()
            });

            setText(""); // Clear input field
        } catch (error) {
            console.error("Error sending message: ", error);
        }
    };

    const handleEmoji = (e) => {
        setText((prev) => prev + e.emoji);
        setOpen(false);
    };

    return (
        <div className="chat">
            <div className="top">
                <div className="user">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <span>Chatting with User</span>
                        <p>Let's start a conversation</p>
                    </div>
                </div>
                <div className="icons">
                    <img src="./phone.png" alt="" />
                    <img src="./video.png" alt="" />
                    <img src="./info.png" alt="" />
                </div>
            </div>

            <div className="center">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message ${msg.senderId === currentUser.uid ? "own" : ""}`}>
                        {msg.senderId !== currentUser.uid && <img src="./avatar.png" alt="" />}
                        <div className="texts">
                            <p>{msg.text}</p>
                            <span>{new Date(msg.timestamp?.seconds * 1000).toLocaleTimeString()}</span>
                        </div>
                    </div>
                ))}
                <div ref={endRef}></div>
            </div>

            <div className="bottom">
                <div className="icons">
                    <img src="./img.png" alt="" />
                    <img src="./camera.png" alt="" />
                    <img src="./mic.png" alt="" />
                </div>
                <input 
                    type="text" 
                    placeholder="Type a message..." 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <div className="emoji">
                    <img src="./emoji.png" alt="" onClick={() => setOpen((prev) => !prev)} />
                    {open && <EmojiPicker onEmojiClick={handleEmoji} />}
                </div>
                <button className="sendButton" onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
