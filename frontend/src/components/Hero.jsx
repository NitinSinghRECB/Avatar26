import React from 'react';
import './Hero.css';

const Hero = ({ onRegisterClick }) => {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-particles" id="particles-js"></div>
      
      <div className="hero-shapes">
        <svg className="hs hs-circle" width="120" height="120"><circle cx="60" cy="60" r="50" fill="none" stroke="#FF0066" strokeWidth="4"/></svg>
        <svg className="hs hs-triangle" width="140" height="130"><polygon points="70,10 130,120 10,120" fill="none" stroke="#00C9B1" strokeWidth="4"/></svg>
        <svg className="hs hs-square" width="100" height="100"><rect x="10" y="10" width="80" height="80" fill="none" stroke="#FF0066" strokeWidth="4"/></svg>
      </div>

      <div className="hero-content">
        <div className="hero-badge animate-fade-up" style={{animationDelay:'0.3s'}}>
          <div className="badge-dot pulse-dot"></div>
          Registration Open
        </div>
        
        <h1 className="hero-title font-squid animate-fade-up" style={{animationDelay:'0.5s'}}>
          AVATAR<span className="av-letter">'</span>26
        </h1>
        
        <p className="hero-subtitle font-orbitron animate-fade-up" style={{animationDelay:'0.7s'}}>
          RETURN OF THE LEGACY
        </p>

        <p className="hero-desc font-special animate-fade-up" style={{animationDelay:'0.9s'}}>
          A Visual Abstract in Technology Advancement to Reverberate<br/>
          Rajkiya Engineering College, Banda
        </p>
        
        <div className="hero-actions animate-fade-up" style={{animationDelay:'1.1s'}}>
          <a href="#events" className="btn-secondary font-squid" style={{textDecoration:'none'}}>
            VIEW CHALLENGES
          </a>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="mouse"></div>
        <span>SCROLL</span>
      </div>
    </section>
  );
};

export default Hero;
