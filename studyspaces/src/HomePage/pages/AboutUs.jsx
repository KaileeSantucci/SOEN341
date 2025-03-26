import React from 'react';
import Lottie from 'lottie-react';
import '../styles/Landing.css';
import animationBackground from '../assets/Animation.json';
import animationMascot from '../assets/MascotAnimation.json';

const AboutUs = () => {


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
          style={{ width: '500px', height: '500px' }}
        />
      </div>

      <div className="LandingHeader">
        

      </div>
      
    <h1>love yourself</h1>
        
    </div>
  );
}

export default AboutUs;