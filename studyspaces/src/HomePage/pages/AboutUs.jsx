import React from 'react';
import Lottie from 'lottie-react';
import '../styles/Landing.css';
import animationBackground from '../assets/Animation.json';
import animationMascot from '../assets/MascotAnimation.json';
import Logo from '../assets/logo.png';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthentication } from '../../UserAuthentication/userauthentication';



const AboutUs = () => {
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
    <div className="LandingPage">
      <div className="backgroundLottie">
        <Lottie 
          animationData={animationBackground} 
          loop 
          autoplay 
        />
      </div>   
      
      <div className="LandingPageMascot">
        <Lottie 
          animationData={animationMascot} 
          loop 
          autoplay 
          style={{ width: '600px', height: '600px' }}
        />
      </div>

      <div className="LandingHeader">
        <img src={Logo} alt="StudySpaces Logo" className="logo" />
        <div className="CompanyName">
            <h1 style={{ textDecoration: 'none', color: '#F37E9A', paddingBottom:'20px', textShadow:'none'}}>StudySpace</h1>
          </div>
        <div className="HeaderButtons">
          <button className="HeaderButton outline" onClick={ () => navigate('/faq')}>FAQ</button>
          <button className="HeaderButton filled" onClick={handleOpenStudySpace}>Open StudySpace</button>
        </div>

      </div>
    
    <h1>Your Ultimate Study Space </h1>
    <h2>Stay focused, get organized, and connect with other students - all in one asethetic customizable workspace. </h2>
    
    <div className="InfoSectionsContainer">  
      <div className="KeyFeaturesLanding">
        <h3>Key Features</h3>
        <ul className="FeaturesList">
          <li><span>🧠</span> Pomodoro Timers</li>
          <li><span>📅</span> Calendar Integration</li>
          <li><span>🎨</span> Aesthetic Backgrounds</li>
          <li><span>💬</span> Direct Messaging</li>
          <li><span>🧑‍🎓</span> Class & Interest-Based Servers</li>
        </ul>
      </div>

      <div className="ContactBox">
        <h3 style={{color:'black'}}>Contact Us</h3>
        <p>Have questions, feedback, or ideas? We’d love to hear from you.</p>

        <form className="ContactForm" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>

    </div>
  );
}

export default AboutUs;