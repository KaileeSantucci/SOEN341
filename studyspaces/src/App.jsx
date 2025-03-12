import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; 
import Sidebar from './components/Sidebar'; // Import Sidebar
import MyAccount from './pages/MyAccount';
import HomePage from './pages/HomePage';
import DirectMessaging from './pages/DirectMessaging';
import Activity from './pages/Activity';
import GroupMessaging from './pages/GroupMessaging';
import AddFriends from './pages/AddFriends';
import CustomizeBackground from './pages/CustomizeBackground';
import ToDoList from './pages/ToDoList';
import FAQ from './pages/FAQ';  
import AboutUs from './pages/AboutUs'; 
import Logo from './assets/logo.png';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Sidebar component */}
        <Sidebar />

        <div className="header">
        <Link to="/" className="logo-link" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src={Logo} alt="StudySpaces Logo" className="logo" />
          </Link>

          <Link to="/" className="title-link" style={{ textDecoration: 'none', color: '#f5f0f2' }}>
            <h1>StudySpace</h1>
          </Link>

          <div className="header-buttons">
            <Link to="/faq" className="header-button">FAQ</Link>
            <Link to="/about-us" className="header-button">About Us</Link>
          </div>

        </div>


        {/* Main content area */}
        <div className="main-content">
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/account" element={<MyAccount />} />
            <Route path="/direct-messaging" element={<DirectMessaging />} />
            <Route path="/activity-notifications" element={<Activity />} />
            <Route path="/group-messaging" element={<GroupMessaging />} />
            <Route path="/add-friends" element={<AddFriends />} />
            <Route path="/customize-background" element={<CustomizeBackground />} />
            <Route path="/to-do-list" element={<ToDoList />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/about-us" element={<AboutUs />} />
          </Routes>

          {/* Custom content goes here*/}
        </div>
      </div>
    </Router>
  );
}

export default App;
