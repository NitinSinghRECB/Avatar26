import React, { useEffect, useState } from 'react';
import './IntroAnimation.css';

const IntroAnimation = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 850);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSkip();
    }, 5000); // Intro auto-skip after 5s

    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="intro-overlay" className={isExiting ? 'exit' : ''}>
      <div className="intro-grid"></div>
      <svg className="intro-bg-shape ibs1" width="200" height="200"><circle cx="100" cy="100" r="95" fill="none" stroke="#FF0066" strokeWidth="3"/></svg>
      <svg className="intro-bg-shape ibs2" width="180" height="210"><polygon points="90,5 175,205 5,205" fill="none" stroke="#00C9B1" strokeWidth="3"/></svg>
      <svg className="intro-bg-shape ibs3" width="120" height="120"><rect x="5" y="5" width="110" height="110" fill="none" stroke="#FF0066" strokeWidth="2.5"/></svg>
      <svg className="intro-bg-shape ibs4" width="90" height="90"><circle cx="45" cy="45" r="40" fill="none" stroke="#00C9B1" strokeWidth="2"/></svg>
      <div className="intro-ring ir1"></div>
      <div className="intro-ring ir2"></div>
      <div className="intro-ring ir3"></div>
      <div className="intro-ring ir4"></div>
      <div className="intro-glow"></div>
      <div className="intro-logo-wrap">
        <div className="intro-shapes-row">
          <div className="intro-si"><svg width="30" height="30"><circle cx="15" cy="15" r="12" fill="none" stroke="#FF0066" strokeWidth="2.5"/></svg></div>
          <div className="intro-si"><svg width="30" height="34"><polygon points="15,2 28,32 2,32" fill="none" stroke="#00C9B1" strokeWidth="2.5"/></svg></div>
          <div className="intro-si"><svg width="30" height="30"><rect x="3" y="3" width="24" height="24" fill="none" stroke="#FF0066" strokeWidth="2.5"/></svg></div>
        </div>
        <div className="intro-title">
          ΛVΛTΛR<span>'26</span>
          <div className="intro-glitch1">ΛVΛTΛR'26</div>
          <div className="intro-glitch2">ΛVΛTΛR'26</div>
        </div>
        <div className="intro-tagline">A Visual Abstract in Technology Advancement to Reverberate</div>
      </div>
      <div className="intro-loader">
        <div className="intro-loader-track"><div className="intro-loader-fill"></div></div>
        <div className="intro-loader-text">Entering the Arena...</div>
      </div>
      <button className="intro-skip" onClick={handleSkip}>SKIP ▸</button>
    </div>
  );
};

export default IntroAnimation;
