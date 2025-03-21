import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../DirectMessaging/lib/firebase';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import { FaUser, FaHome, FaEnvelope, FaBell, FaUsers, FaPlus, FaCheckCircle, FaClipboardList, FaServer} from 'react-icons/fa';
import '../styles/Sidebar.css'; // Import sidebar-specific styles
import { useAuthentication } from '../../UserAuthentication/userauthentication'; // Import the authentication hook

const Sidebar = () => {
  const location = useLocation(); // Get the current location (URL path)
  const { user, userData, isLoading } = useAuthentication(); // ✅ Use authentication hook

  console.log("🧠 Firebase Auth User:", user);
  console.log("🧠 Firestore User Data:", userData);

  // Function to dynamically set the active page based on the current pathname
  const getActiveClass = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className="sidebar">
      <ul>
        <li className={getActiveClass('/home/account')}>
          <Link to="/home/account">
            <FaUser className="sidebar-icon" /> <span>My Account</span>
          </Link>
        </li>
        <li className={getActiveClass('/home')}>
          <Link to="/home">
            <FaHome className="sidebar-icon" /> <span>Home Page</span>
          </Link>
        </li>
        <li className={getActiveClass('/home/direct-messaging')}>
        <Link to="/home/direct-messaging">
        <FaEnvelope className="sidebar-icon" /> <span>Direct Messaging</span>
          </Link>
        </li>
        <li className={getActiveClass('/home/activity-notifications')}>
          <Link to="/home/activity-notifications">
            <FaBell className="sidebar-icon" /> <span>Activity/Notifications</span>
          </Link>
        </li>
        <li className={getActiveClass('/home/server')}>
          <Link to="/home/server">
            <FaUsers className="sidebar-icon" /> <span>Servers</span>
          </Link>
        </li>
        <li className={getActiveClass('/home/add-friends')}>
          <Link to="/home/add-friends">
            <FaPlus className="sidebar-icon" /> <span>Add Friends</span>
          </Link>
        </li>
        <li className={getActiveClass('/home/customize-background')}>
          <Link to="/home/customize-background">
            <FaCheckCircle className="sidebar-icon" /> <span>Customize Background</span>
          </Link>
        </li>
        <li className={getActiveClass('/home/to-do-list')}>
          <Link to="/home/to-do-list">
            <FaClipboardList className="sidebar-icon" /> <span>To-Do List</span>
          </Link>
        </li>

        {/* 🔐 Admin-Only Option */}
        {!isLoading && userData?.admin && (
          <li className={getActiveClass('/home/manage-server')}>
            <Link to="/home/create-server">
              <FaServer className="sidebar-icon" /> <span>Manage Servers</span>
            </Link>
          </li>
        )}

      </ul>
    </div>
  );
};

export default Sidebar;
