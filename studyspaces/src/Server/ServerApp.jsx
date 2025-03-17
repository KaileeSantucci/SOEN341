import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../DirectMessaging/lib/firebase";
import { useUserStore } from "../DirectMessaging/lib/userStore";
import { useChatStore } from "../DirectMessaging/lib/chatStore";
import { useServerStore } from "../DirectMessaging/lib/serverStore";
import ServerRoom from "./pages/serverRoom";
import ServerList from "./pages/serverList";

const ServerApp = () => {
    const {setCurrentUser} = useUserStore();
    const { selectedServer } = useServerStore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user ? { id: user.uid, email: user.email } : null);
        });
        return () => unsubscribe();
    }, []);
    
    return (
        <div className="server-layout">
            <h1>Servers stuff</h1>
        <ServerList />
        <ServerRoom selectedServer={selectedServer} />
        </div>
    ); 
}

export default ServerApp;