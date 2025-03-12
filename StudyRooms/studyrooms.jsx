import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./studyroomsStyle.css"; // Import the separate CSS file

const Studyrooms = () => {
  return (
    <div className="studyrooms-container">
      <h1>StudyRooms Page</h1>
      <p>This is the StudyRooms page.</p>
      
      {/* Back to Home Button */}
      <Link to="/">
        <button className="back-home-button">Back to Home</button>
      </Link>
    </div>
  );
};

export default Studyrooms;
