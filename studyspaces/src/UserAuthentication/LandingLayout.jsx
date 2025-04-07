import React from 'react';
import { Outlet } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationBackground from '../HomePage/assets/Animation.json';
import animationMascot from '../HomePage/assets/MascotAnimation.json';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthentication } from './userauthentication';
import '../HomePage/styles/Landing.css'
import Logo from '../HomePage/assets/logo.png';

const LandingLayout = () => {
    const navigate = useNavigate(); 
    const { currentUser } = useAuthentication();
  
    const handleOpenStudySpace = () => {
      if (currentUser) {
        navigate('/home');
      } else {
        navigate('/login');
      }
    };
  
    useEffect(()=> {
      document.body.style.overflow = 'hidden';
    })
  

  return (
    <div className="LandingLayoutContainer">
        <div className="backgroundLottie">
            <Lottie 
            animationData={animationBackground} 
            loop 
            autoplay 
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              width: "150%",
              display: "flex",
              objectFit: "cover",
              zIndex: "-1",
            }}
            />
        </div>   

        <div className="LandingHeader">
            <img src={Logo} alt="StudySpaces Logo" className="logo" />

            <div className="CompanyName">
                <h1 style={{ textDecoration: 'none', color: '#F37E9A', paddingBottom:'0px', textShadow:'none', fontSize:'70px'}}>StudySpace</h1>
            </div>

            <div className="HeaderButtons">
                <button className="HeaderButton outline" onClick={ () => navigate('/faqother')}>FAQ</button>
                <button className="HeaderButton outline" onClick={() => navigate('/about-us')}>About Us</button>
                <button className="HeaderButton filled" onClick={handleOpenStudySpace}>Open StudySpace</button>
            </div>
        </div>
        
        <Outlet />

    </div>
  );
};

export default LandingLayout;
