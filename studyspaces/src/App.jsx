import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import Router
import Sidebar from './components/Sidebar'; // Import Sidebar
import Logo from './assets/logo.png';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Sidebar component */}
        <Sidebar />

        <div className="header">
        <Link to="/" className="logo-link">
            <img src={Logo} alt="StudySpaces Logo" className="logo" />
          </Link>

          <Link to="/" className="title-link">
            <h1>StudySpace</h1>
            </Link>
        </div>


        {/* Main content area */}
        <div className="main-content">
       

          {/* Custom content goes here, no counter anymore */}
        </div>
      </div>
    </Router>
  );
}

export default App;
