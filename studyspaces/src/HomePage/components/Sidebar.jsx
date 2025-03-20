import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import { FaUser, FaHome, FaEnvelope, FaBell, FaUsers, FaPlus, FaCheckCircle, FaClipboardList } from 'react-icons/fa';
import '../styles/Sidebar.css'; // Import sidebar-specific styles

const Sidebar = () => {
  const location = useLocation(); // Get the current location (URL path)

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
      </ul>
    </div>
  );
};

export default Sidebar;
