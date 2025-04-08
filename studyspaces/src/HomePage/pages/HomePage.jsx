import React, { useState, useEffect } from 'react';
import { useAuthentication } from '../../UserAuthentication/userauthentication'; // ✅ Use authentication hook
import '../styles/ToDo.css'
import Calendar from 'react-calendar';
import '../styles/Calendar.css'; // Calendar CSS
import '../styles/Timer.css'; // Timer CSS

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  // Load saved tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks); // Set the saved tasks to state
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks)); // Store tasks in localStorage
    }
  }, [tasks]);

  // Handle task input change
  const handleChange = (e) => setTask(e.target.value);

  // Add task to the list
  const addTask = () => {
    if (task.trim()) {
      const newTask = { text: task, completed: false };
      setTasks([...tasks, newTask]);
      setTask(""); // Clear the input field after adding task
    }
  };

  // Toggle task completion
  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  // Remove task from the list
  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="todo-container">
      <h3>Your To-Do List</h3>
      <div className="todo-input">
        <textarea
          type="text"
          value={task}
          onChange={handleChange}
          placeholder="Enter a task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul className="todo-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? "completed" : ""}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(index)}
            />
            {task.text}
            <button onClick={() => removeTask(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};



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
    </div>
  );
};

const HomePage = () => {
  const { user, userData, isLoading } = useAuthentication(); // ✅ Use authentication hook
  const [date, setDate] = useState(new Date());

  const onDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="home-page-container">
      <h2>Welcome to your Home Page {userData?.username} !</h2>
      {/* <p>This is the main page where users can view the overview of the app.</p> */}

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

      {/* To-Do List */}
      <div className="todo-wrapper">
        <ToDoList />
      </div>


    </div>
  );
};

export default HomePage;
