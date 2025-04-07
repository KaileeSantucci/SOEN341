import React from 'react';
import Lottie from 'lottie-react';
import animationMascot from '../assets/MascotAnimation.json';
import '../styles/Landing.css';
import { useEffect } from 'react';
import LandingLayout from '../../UserAuthentication/LandingLayout'


const AboutUs = () => {

  useEffect(()=> {
    document.body.style.overflow = 'hidden';
  })

  const clear = () => {
    const form = document.querySelector('.ContactForm');
    form.reset();
    alert('Message sent! We will get back to you soon.');
  }

  return (
    <div className="LandingPage">
      <div className="LandingPageMascot">
        <Lottie
          animationData={animationMascot}
          loop
          autoplay
          style={{ width: '70vh', height: '70vh' }}
        />
      </div>
    
    <div className="LandingHeaderText">
      <h1>Your Ultimate Study Space </h1>
      <h2>Stay focused, get organized, and connect with other students - all in one asethetic customizable workspace. </h2>
    </div>

    <div className="ContentAligner" style={{marginLeft:'0px'}}>
      <div className='InfoSectionsContainer'>
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
          <button type="submit" onClick={clear}>Send Message</button>
        </form>
      </div>
      </div>
    </div>

    <button className="SurpriseButton" onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}>
            Suprise!
        </button>

    </div>
  );
}

export default AboutUs;