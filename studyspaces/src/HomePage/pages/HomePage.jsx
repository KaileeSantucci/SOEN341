import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import '../styles/Calendar.css'; // Calendar CSS
import '../styles/Timer.css'; // Timer CSS

const PomodoroTimer = () => {
  const [workTime, setWorkTime] = useState(25 * 60); // Default work time 25 minutes
  const [breakTime, setBreakTime] = useState(5 * 60); // Default break time 5 minutes
  const [timeLeft, setTimeLeft] = useState(workTime); // Timer's current time
  const [isWorking, setIsWorking] = useState(true); // true = work session, false = break
  const [isActive, setIsActive] = useState(false); // To start/pause timer

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 0) {
            if (isWorking) {
              alert('Work session ended, take a break!');
              setIsWorking(false);
              return breakTime; // Set time for break to the user-selected break time
            } else {
              alert('Break session ended, back to work!');
              setIsWorking(true);
              return workTime; // Set time for work to the user-selected work time
            }
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, isWorking, workTime, breakTime]);

  const startPauseTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(isWorking ? workTime : breakTime); // Reset to either work or break time
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSessionChange = (e) => {
    const selectedSession = e.target.value;
    if (selectedSession === 'work') {
      setIsWorking(true);
      setTimeLeft(workTime);
    } else {
      setIsWorking(false);
      setTimeLeft(breakTime);
    }
  };

  return (
    <div className="pomodoro-container">
      <h3>Pomodoro Timer</h3>

      {/* User input to select work/break session */}
      <div className="session-selector">
        <label>
          <input
            type="radio"
            name="session"
            value="work"
            checked={isWorking}
            onChange={handleSessionChange}
          />
          Work Time
        </label>
        <label>
          <input
            type="radio"
            name="session"
            value="break"
            checked={!isWorking}
            onChange={handleSessionChange}
          />
          Break Time
        </label>
      </div>

      {/* Timer display */}
      <div className="timer">
        <h4>{isWorking ? 'Work' : 'Break'} Time</h4>
        <div className="time">{formatTime(timeLeft)}</div>
        <button onClick={startPauseTimer}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div>

      {/* Inputs to adjust work and break times */}
      <div className="time-select">
        <label>
          Work Time:
          <input
            type="number"
            value={workTime / 60}
            onChange={(e) => setWorkTime(e.target.value * 60)} // Convert minutes to seconds
            min="1"
            max="120"
          />
          minutes
        </label>
        <label>
          Break Time:
          <input
            type="number"
            value={breakTime / 60}
            onChange={(e) => setBreakTime(e.target.value * 60)} // Convert minutes to seconds
            min="1"
            max="30"
          />
          minutes
        </label>
      </div>

      {/* <div className="timer">
        <h4>{isWorking ? 'Work' : 'Break'} Time</h4>
        <div className="time">{formatTime(timeLeft)}</div>
        <button onClick={startPauseTimer}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div> */}
    </div>
  );
};

const HomePage = () => {
  const [date, setDate] = useState(new Date());

  const onDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="home-page-container">
      <h2>Welcome to the Home Page!</h2>
      <p>This is the main page where users can view the overview of the app.</p>

      {/* Calendar */}
      <div className="calendar-container">
        <h3>Your Calendar</h3>
        <div className="calendar-wrapper">
          <Calendar onChange={onDateChange} value={date} className="react-calendar" />
        </div>
        <p>Selected Date: {date.toDateString()}</p>
      </div>

      {/* Pomodoro Timer */}
      <div className="pomodoro-wrapper">
        <PomodoroTimer />
      </div>
    </div>
  );
};

export default HomePage;
