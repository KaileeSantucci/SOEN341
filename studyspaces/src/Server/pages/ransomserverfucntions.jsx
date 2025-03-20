const createWelcomeServer = async () => {
    const serverRef = doc(db, "servers", "welcome");
    await setDoc(doc(db, "servers", "welcome"), { name: "Welcome Server" });
    console.log("Welcome server created");
};

const sendMessages = async (messageText) => {
    const {currentUser} = useUserStore();
    if (!currentUser){
        alert("You must be logged in to send a message");
        return;
    }
    const messageRef = collection(db, "servers", "welcome", "messages");
    await addDoc(messageRef, {
        text: messageText,
        userId: currentUser.id,
        username: currentUser.username,
        timestamp: serverTimestamp(),
    });
console.log("Message sent successfully!");
}

const handleSelect = async (server) => {}

const createServer = async () => {
    if (newServerName === ""){
        alert("Server name cannot be empty");
        return;
    }

    await addDoc(collection(db, "servers"), {
        name: newServerName,
        createdAt: new Date(),
        users: [currentUser.id],
    });

    setNewServerName("");
}