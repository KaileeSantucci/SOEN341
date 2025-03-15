import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; 
import { useLocation } from 'react-router-dom';

//imports required for hompage functionality
import Sidebar from './HomePage/components/Sidebar'; // Import Sidebar
import MyAccount from './HomePage/pages/MyAccount';
import HomePage from './HomePage/pages/HomePage';
import Activity from './HomePage/pages/Activity';
import GroupMessaging from './HomePage/pages/GroupMessaging';
import AddFriends from './HomePage/pages/AddFriends';
import CustomizeBackground from './HomePage/pages/CustomizeBackground';
import ToDoList from './HomePage/pages/ToDoList';
import FAQ from './HomePage/pages/FAQ';  
import AboutUs from './HomePage/pages/AboutUs'; 
import Logo from './HomePage/assets/logo.png';
import './App.css';

import DirectMessagingApp from './DirectMessaging/src/DirectMessagingApp';

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

function MainLayout(){
  const location = useLocation(); //Get current path or location 
  const isDirectMessaging = location.pathname === "/direct-messaging"  //check's if the current path is direct messaging
  const hideSidebarAndHeader = isDirectMessaging; //if the current path is direct messaging, hide the sidebar and header

  return (
    <div className="app-container">
      {/* Sidebar component */}
      {!hideSidebarAndHeader && <Sidebar />}
      {!hideSidebarAndHeader && (
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
      )}

      {/* Main content area */}
      <div className={hideSidebarAndHeader ? "no-sidebar-main-content" : "main-content"}>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/account" element={<MyAccount />} />
          <Route path="/activity-notifications" element={<Activity />} />
          <Route path="/group-messaging" element={<GroupMessaging />} />
          <Route path="/add-friends" element={<AddFriends />} />
          <Route path="/customize-background" element={<CustomizeBackground />} />
          <Route path="/to-do-list" element={<ToDoList />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about-us" element={<AboutUs />} />     
          <Route path="/direct-messaging/*" element={<DirectMessagingApp />} />
        </Routes>
      </div>
    </div>
  );

}

export default App;
