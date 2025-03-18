import "./addUser.css";
import { db } from "../../../../lib/firebase";
import { arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where,} from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../../lib/userStore";
import { toast } from "react-toastify";
import { useChatStore } from "../../../../lib/chatStore";
import { auth } from "../../../../lib/firebase";
const AddUser = ({ setAddMode }) => {
    const [input, setInput] = useState("");
    const [searchedUser, setSearchedUser] = useState(null);
    const currentUser = useUserStore((state) => state.currentUser);
    const { startChat } = useChatStore();

    const handleSearch = async () => {
        if (!input) {
            toast.error("Please enter a username or ID.");
            return;
        }

        const userRef = doc(db, "users", input);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            setSearchedUser(userSnap.data());
        } else {
            toast.error("User not found.");
            setSearchedUser(null);
        }
    };

    const handleAdd = async () => {
        if (!searchedUser) {
            toast.error("No user selected.");
            return;
        }

        const receiverId = searchedUser.id;
        if (receiverId === currentUser.id) {
            toast.error("You cannot start a chat with yourself.");
            return;
        }

        try {
            const userChatsRef = doc(db, "userchats", currentUser.id);
            const userChatsSnap = await getDoc(userChatsRef);

            if (userChatsSnap.exists()) {
                const existingChats = userChatsSnap.data().chats || [];
                const chatExists = existingChats.some(chat => chat.receiverId === receiverId);

                if (chatExists) {
                    toast.error("You already have a direct messaging thread with this user.");
                    return;
                }
            }

            // ✅ Create new chat
            await startChat(receiverId);
            toast.success("User added successfully!");
            setAddMode(false); // ✅ Close modal after adding user
        } catch (error) {
            console.error("Error adding user:", error);
            toast.error("Failed to add user.");
        }
    };

    return (
        <div className="addUser">
            <input
                type="text"
                placeholder="Enter user ID or username"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            {searchedUser && (
                <div>
                    <p>{searchedUser.username}</p>
                    <button onClick={handleAdd}>Add User</button>
                </div>
            )}
        </div>
    );
};

export default AddUser;