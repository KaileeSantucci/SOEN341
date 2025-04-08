import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; 
import logo from "../../../HomePage/assets/logo.png";


const Header = () => {
  return (
    <div className="header">
      <Link to="/home" className="logo-title-link">
        <img src={logo} alt="StudySpace Logo" className="logo" />
        <h1>StudySpace</h1>
      </Link>

      <div className="header-buttons">
        <Link to="/faq" className="header-button">FAQ</Link>
        <Link to="/about" className="header-button">About Us</Link>
        <Link to="/login" className="header-button logout-btn">Sign Out</Link>
      </div>
    </div>
  );
};

export default Header;
