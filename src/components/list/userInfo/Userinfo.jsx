import { useEffect, useState } from "react";
import "./userInfo.css"
import { auth, db, doc, getDoc } from "../../../lib/firebase"; // ✅ Import Firebase

const UserInfo = () => {
    const [username, setUsername] = useState("Loading...");
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("✅ User is authenticated:", user.uid);
                setUserId(user.uid);
            } else {
                console.warn("❌ No authenticated user found!");
                setUsername("Guest");
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (userId) {
            console.log("🔍 Fetching username for user ID:", userId);
            const userRef = doc(db, "users", userId); // ✅ Correct Firestore query

            getDoc(userRef)
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        console.log("✅ Firestore User Data:", docSnap.data());  // ✅ Log Firestore document
                        setUsername(docSnap.data().username || "User");
                    } else {
                        console.warn("⚠️ Firestore document does not exist!");
                        setUsername("User");
                    }
                })
                .catch((error) => {
                    console.error("❌ Firestore Error:", error);
                    setUsername("User");
                });
        }
    }, [userId]);

    return (
        <div className = 'userInfo'>
            <div className="user">
                <img src="./avatar.png" alt=""/>
                <h2>{username}</h2>
            </div>
            <div className="icons">
                <img src="./more.png" alt=""/>
                <img src="./video.png" alt=""/>
                <img src="./edit.png" alt=""/>
            </div>
        </div>
    )
}

export default UserInfo