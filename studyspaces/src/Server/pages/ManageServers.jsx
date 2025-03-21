import React, { useEffect, useState } from "react";
import { useAuthentication } from "../../UserAuthentication/userauthentication";
import { useNavigate } from "react-router-dom";
import { db } from "../../DirectMessaging/lib/firebase";
import { collection, doc, getDocs, setDoc, deleteDoc } from "firebase/firestore";
import '../styles/CreateServer.css';
import ServerList from "./serverList";

const ManageServers = () => {
    const { userData } = useAuthentication();
    const [servers, setServers] = useState([]);
    const [selectedServer, setSelectedServer] = useState("");
    const [serverName, setServerName] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    console.log("🛠 Admin Check:", userData);

    useEffect(() => {
      const fetchServers = async () => {
        try{const querySnapshot = await getDocs(collection(db, "servers"));
          const serversList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        setServers(serversList);
      }catch (error){
        console.error("❌ Error fetching servers:", error);
      }
    };
    fetchServers();
    }, []);

    const handleDeleteServer = async () => {
      if (!selectedServer) {
        alert("Please select a server to delete.");
        return;
      }
  
      if (!userData?.admin) {
        alert("❌ You do not have permission to delete servers.");
        return;
      }
  
      try {
        setLoading(true);
        await deleteDoc(doc(db, "servers", selectedServer));
        alert("✅ Server deleted successfully!");
        
        // Remove deleted server from the list
        setServers(servers.filter(server => server.id !== selectedServer));
        setSelectedServer(""); // Reset dropdown
    } catch (error) {
        console.error("❌ Error deleting server:", error);
        alert("❌ An error occurred. Please try again.");
    }finally {
        setLoading(false);
    }
  };

    const handleCreateServer = async (e) => {
        e.preventDefault();
        if(!userData?.admin){
            alert("You must be an admin to create a server");
            return;
        }
        if(!serverName.trim){
            alert("Server name cannot be empty");
            return;
        }
        try{
            setLoading(true);
            const serverRef = doc(collection(db, "servers")); //Auto-generate a unique ID
            await setDoc(serverRef, {
                id: serverRef.id,
                name: serverName.trim(),
            });
        
        console.log("Server created successfully!");
        alert("Server created successfully!");
        setServerName("");
        navigate("/home/manage-server");
        }catch (error){
            console.error("Error creating server:", error);
            alert("An error occurred. Please try again.");
        }finally{
            setLoading(false);
        }
    };
    return (
      <div className="create-server-container">
        <h2>Create a New Server</h2>
        <p>Admins can create new servers for users to chat in.</p>
    
        {userData?.admin ? (
          <>
            {/* ✅ Server Creation Form */}
            <form onSubmit={handleCreateServer} className="create-server-form">
              <label htmlFor="serverName">Server Name:</label>
              <input
                type="text"
                id="serverName"
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
                placeholder="Enter server name"
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Server"}
              </button>
            </form>
    
            {/* ✅ Manage Servers Section (Now Properly Outside the Form) */}
            <div className="manage-server-container">
              <h2>🛠 Manage Servers</h2>
    
              <label>Select a server to delete:</label>
              <select value={selectedServer} onChange={(e) => setSelectedServer(e.target.value)}>
                <option value="">-- Select a server --</option>
                {servers.map((server) => (
                  <option key={server.id} value={server.id}>
                    {server.name}
                  </option>
                ))}
              </select>
    
              <button onClick={handleDeleteServer} disabled={!selectedServer || loading}>
                {loading ? "Deleting..." : "🗑 Delete Server"}
              </button>
            </div>
          </>
        ) : (
          <p>❌ You do not have admin access.</p>
        )}
      </div>
    );
    
};

export default ManageServers;