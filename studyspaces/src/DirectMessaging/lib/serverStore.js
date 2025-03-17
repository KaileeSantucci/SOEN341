import { create } from "zustand";
import { db, collection, getDocs } from "./firebase";

export const useServerStore = create((set) => ({
    servers:[], //holds all servers
    selectedServer: null, //holds the CURRENTLY selected server
    setSelectedServer: (server)=> set({selectedServer: server}), //sets the selected server

    fetchServers: async () => {
        try {
            const serverRef = collection(db, "servers");
            const serverSnap = await getDocs(serverRef);

            const serverData = serverSnap.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            console.log("Fetched servers:", serverData); // ✅ Debugging
            set({servers: serverData});
        } catch (error) {
            console.error("Error fetching servers", error);
        }
    }
}));
