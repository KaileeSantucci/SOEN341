import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./studyroomsStyle.css"; // Import the separate CSS file
import {FaClock} from "react-icons/fa"; // Import the clock icon

const Studyrooms = () => {
  const [showClock, setShowClock] = useState(true);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const interval = setInterval(() => {
        setTime(new Date());
    },1000);
    return () => clearInterval(interval);
    }, []);
  
  return (
    <div className="studyrooms-page">

        <div className="studyrooms-topper">
            <h1>Study Room</h1>
            <div className="topRight">
                <div className="backHomeBtn">
                    <Link to="/">
                        <button id="loginBtn">Back to Home</button>
                    </Link>
                </div>
                <div className="spaceBtn">

                </div>

                <div className="clockBtn">
                <button
                    style={{
                        width: "60px",
                        height: "60px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                    }}
                    onClick={() => setShowClock(!showClock)}
                    >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="white"
                    >
                        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm1-10.414V7h-2v5.586l3.707 3.707 1.414-1.414L13 11.586z" />
                    </svg>
                </button>
                </div>
                <div className="musicBtn">
                    
                </div>
            </div>
        </div>
        
        <div className="studyrooms-container">
            {showClock && 
            <div className="clock-display">
                {time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}
            </div>}

        </div>


    </div>
  );
};

export default Studyrooms;
