//import required for direct messaging feature 
import {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; 
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './DirectMessaging/lib/firebase';
import { useUserStore } from './DirectMessaging/lib/userStore';
import { useChatStore } from './DirectMessaging/lib/chatStore';
import chat from './DirectMessaging/components/chat/Chat';
import Detail from "./DirectMessaging/components/detail/Detail";
import List from "./DirectMessaging/components/list/List";
import Login from "./DirectMessaging/components/login/login";
import Notification from "./DirectMessaging/components/notification/notification";

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

function App() {

  const {currentUser, isLoading, fetchUserInfo} = useUserStore();
  const {chatId} = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  },[fetchUserInfo])

  console.log(currentUser);

  if (isLoading) return <div className="loading">Loading...</div>;

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
            <Route path="/activity-notifications" element={<Activity />} />
            <Route path="/group-messaging" element={<GroupMessaging />} />
            <Route path="/add-friends" element={<AddFriends />} />
            <Route path="/customize-background" element={<CustomizeBackground />} />
            <Route path="/to-do-list" element={<ToDoList />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/about-us" element={<AboutUs />} />     

            { /* Add a new route for the DirectMessaging feature and include custom styling*/}  
            <Route path="/DirectMessaging" element={
            <div className='container'>
            {currentUser ? (
                <>
                <List/>
                {chatId && <Chat/>}
                {chatId && <Detail/>}
                </>
              ) : (
                <Login/>
              )}
              <Notification/>
            
            </div>
            }/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
