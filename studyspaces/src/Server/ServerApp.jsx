import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../DirectMessaging/lib/firebase";
import { useUserStore } from "../DirectMessaging/lib/userStore";
import { useServerStore } from "../DirectMessaging/lib/serverStore";
import ServerRoom from "./pages/serverRoom";
import ServerList from "./pages/serverList";
import { set } from "date-fns";

const ServerApp = () => {
    const { setCurrentUser, fetchUserInfo } = useUserStore();
    const { selectedServer, setSelectedServer } = useServerStore();
    
    console.log("🟢 ServerApp - Current Selected Server:", selectedServer);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("✅ User authentication state changed:", user);

            if (user) {
                setCurrentUser({ id: user.uid, email: user.email });
                fetchUserInfo(user.uid); // Ensure this is called!
            } else {
                setCurrentUser(null);
            }
        });

        return () => unsubscribe();
    }, []);
    
    return (
        <div className="server-layout">
        <ServerList onSelectServer={setSelectedServer}/>
        <ServerRoom selectedServer={selectedServer} />
        </div>
    ); 
}

export default ServerApp;