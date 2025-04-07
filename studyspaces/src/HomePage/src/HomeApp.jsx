import { Route, Routes, Link, useNavigate} from 'react-router-dom'; 
import { useLocation } from 'react-router-dom';

//imports required for hompage functionality
import Sidebar from '../components/Sidebar'; // Import Sidebar
import MyAccountApp from '../../accountsettings/src/MyAccountApp';
import HomePage from '../pages/HomePage';
import Activity from '../pages/Activity';
import AddFriends from '../pages/AddFriends';
import CustomizeBackground from '../pages/CustomizeBackground';
import ToDoList from '../pages/ToDoList';
import FAQ from '../pages/FAQ';  
import AboutUs from '../pages/AboutUs'; 
import Logo from '../assets/logo.png';
import './HomeApp.css';


import DirectMessagingApp from '../../DirectMessaging/src/DirectMessagingApp';
import ServerApp from '../../Server/ServerApp';
import { useAuthentication } from '../../UserAuthentication/userauthentication';
import CreateServer from '../../Server/pages/ManageServers';
import { useEffect } from 'react';


function HomeApp() {
  return (
      <MainLayout />
  );
  console.log("HomeApp.jsx");
}

function MainLayout(){
  const location = useLocation(); //Get current path or location 
  const navigate = useNavigate();
  const { logout }=useAuthentication();

  useEffect(() => {
    const savedImage = localStorage.getItem("customBackground");
    const appContainer = document.querySelector(".app-container");
  
    if (savedImage && appContainer) {
      appContainer.style.backgroundImage = `url(${savedImage})`;
      appContainer.style.backgroundSize = "cover";
      appContainer.style.backgroundPosition = "center";
      appContainer.style.backgroundRepeat = "no-repeat";
      appContainer.style.backgroundAttachment = "fixed"; // optional: keeps it from scrolling
    }
  }, []);
  
  const isDirectMessaging = location.pathname === "/home/direct-messaging"  //check's if the current path is direct messaging
  const isLandingPage = location.pathname === "/about-us"
  const hideSidebarAndHeader = isDirectMessaging || isLandingPage; //if the current path is direct messaging, hide the sidebar and header
  
  const handleLogout = async () => {
    try{
      await logout();
      navigate("/login");
    }catch(error){
      console.error("Logout failed: "+error.message);
    }
  };
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
            <button onClick={handleLogout} className="header-button logout-btn">Sign Out</button>
            <Link to="/home/faq" className="header-button">FAQ</Link>
            <Link to="/about-us" className="header-button">About Us</Link>
          </div>
        </div>
      )}

      {/* Main content area */}
      <div className={hideSidebarAndHeader ? "no-sidebar-main-content" : "main-content"}>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/account" element={<MyAccountApp />} />
          <Route path="/activity-notifications" element={<Activity />} />
          <Route path="/add-friends" element={<AddFriends />} />
          <Route path="/customize-background" element={<CustomizeBackground />} />
          <Route path="/to-do-list" element={<ToDoList />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about-us" element={<AboutUs />} />     
          <Route path="/direct-messaging/*" element={<DirectMessagingApp />} />
          <Route path="/server/*" element={<ServerApp />} />
          <Route path="/manage-server/" element={<CreateServer />} />
        </Routes>
      </div>
    </div>
  );

}
export default HomeApp;
