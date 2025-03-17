import React from "react";
import { useState, useEffect } from "react";
import { db, collection, addDoc, getDocs, setDoc } from "../../DirectMessaging/lib/firebase";
import { useServerStore } from "../../DirectMessaging/lib/serverStore";
import "../styles/ServerLayout.css";

const ServerList = ({onSelectServer}) => {
    {/* Displays all public forums available on the server, only user admin can create a server*/}
    const { servers, fetchServers, setSelectedServer } = useServerStore();
    
    useEffect(() => {
        fetchServers();
    }, []);

    if (!servers) return <p>Loading Servers...</p>;

    return (
    <div className="serverlist">
        <h2>Server List</h2>
        {servers.length === 0 ? (
            <div> {/* ✅ Wrap elements in a div */}
                <p>No servers found.</p> 
            </div>
        ) : (
            servers.map((server) => (
                <button key={server.id} className="server-item" onClick={() => onSelectServer(server)}>
                    {server.name}
                </button>
            ))
        )}
    </div>
    );
};

export default ServerList;
