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
        <li className={getActiveClass('/account')}>
          <Link to="/account">
            <FaUser className="sidebar-icon" /> <span>My Account</span>
          </Link>
        </li>
        <li className={getActiveClass('/')}>
          <Link to="/">
            <FaHome className="sidebar-icon" /> <span>Home Page</span>
          </Link>
        </li>
        <li className={getActiveClass('/direct-messaging')}>
        <Link to="/direct-messaging">
        <FaEnvelope className="sidebar-icon" /> <span>Direct Messaging</span>
          </Link>
        </li>
        <li className={getActiveClass('/activity-notifications')}>
          <Link to="/activity-notifications">
            <FaBell className="sidebar-icon" /> <span>Activity/Notifications</span>
          </Link>
        </li>
        <li className={getActiveClass('/group-messaging')}>
          <Link to="/group-messaging">
            <FaUsers className="sidebar-icon" /> <span>Group Messaging</span>
          </Link>
        </li>
        <li className={getActiveClass('/add-friends')}>
          <Link to="/add-friends">
            <FaPlus className="sidebar-icon" /> <span>Add Friends</span>
          </Link>
        </li>
        <li className={getActiveClass('/customize-background')}>
          <Link to="/customize-background">
            <FaCheckCircle className="sidebar-icon" /> <span>Customize Background</span>
          </Link>
        </li>
        <li className={getActiveClass('/to-do-list')}>
          <Link to="/to-do-list">
            <FaClipboardList className="sidebar-icon" /> <span>To-Do List</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
