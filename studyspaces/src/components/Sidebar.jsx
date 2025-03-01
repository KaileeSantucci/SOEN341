import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaHome, FaEnvelope, FaBell, FaUsers, FaPlus, FaCheckCircle, FaClipboardList } from 'react-icons/fa';
import '../styles/Sidebar.css'; // Import sidebar-specific styles

const Sidebar = () => {
  const [activePage, setActivePage] = useState('home');

  const handlePageClick = (page) => {
    setActivePage(page); // Update active page when clicked
  };

  return (
    <div className="sidebar">
      <ul>
        <li 
          className={activePage === 'myAccount' ? 'active' : ''} 
          onClick={() => handlePageClick('myAccount')}>
          <Link to="/account">
            <FaUser className="sidebar-icon" /> My Account
          </Link>
        </li>
        <li 
          className={activePage === 'home' ? 'active' : ''} 
          onClick={() => handlePageClick('home')}>
          <Link to="/home">
            <FaHome className="sidebar-icon" /> Home Page
          </Link>
        </li>
        <li 
          className={activePage === 'directMessaging' ? 'active' : ''} 
          onClick={() => handlePageClick('directMessaging')}>
          <Link to="/direct-messaging">
            <FaEnvelope className="sidebar-icon" /> Direct Messaging
          </Link>
        </li>
        <li 
          className={activePage === 'notifications' ? 'active' : ''} 
          onClick={() => handlePageClick('notifications')}>
          <Link to="/notifications">
            <FaBell className="sidebar-icon" /> Activity/Notifications
          </Link>
        </li>
        <li 
          className={activePage === 'groupMessaging' ? 'active' : ''} 
          onClick={() => handlePageClick('groupMessaging')}>
          <Link to="/group-messaging">
            <FaUsers className="sidebar-icon" /> Group Messaging
          </Link>
        </li>
        <li 
          className={activePage === 'addFriends' ? 'active' : ''} 
          onClick={() => handlePageClick('addFriends')}>
          <Link to="/add-friends">
            <FaPlus className="sidebar-icon" /> Add Friends
          </Link>
        </li>
        <li 
          className={activePage === 'customizeBackground' ? 'active' : ''} 
          onClick={() => handlePageClick('customizeBackground')}>
          <Link to="/customize-background">
            <FaCheckCircle className="sidebar-icon" /> Customize Background
          </Link>
        </li>
        <li 
          className={activePage === 'toDoList' ? 'active' : ''} 
          onClick={() => handlePageClick('toDoList')}>
          <Link to="/to-do-list">
            <FaClipboardList className="sidebar-icon" /> To-Do List
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
