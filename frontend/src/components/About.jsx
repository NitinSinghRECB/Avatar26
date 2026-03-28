import React, { useEffect, useRef } from 'react';
import './About.css';

const About = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = containerRef.current.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));

    return () => elements.forEach(el => observer.unobserve(el));
  }, []);

  return (
    <section id="about" className="about-section" ref={containerRef}>
      <div className="about-container">
        
        <div className="about-content reveal fade-right">
          <h2 className="section-title font-squid">
            THE <span style={{color: 'var(--teal)'}}>GAMES</span> BEGIN
          </h2>
          <div className="about-text">
            <p>
              Welcome to <strong>AVATAR'26</strong>, the ultimate technical and cultural symposium of Rajkiya Engineering College, Banda. Step into a world where technology meets survival, where innovation is the only way out.
            </p>
            <p>
              This year, we bring you an experience inspired by the ultimate test of wit and endurance. Prepare yourself for a series of challenges that will push your limits, test your skills, and reward the daring.
            </p>
            <p>
              Are you ready to play? The rules are simple, but the stakes are high.
            </p>
          </div>
          
          <div className="about-stats">
            <div className="stat-item">
              <h3 className="font-squid">15+</h3>
              <p>EVENTS</p>
            </div>
            <div className="stat-item">
              <h3 className="font-squid" style={{color: 'var(--teal)'}}>50K+</h3>
              <p>PRIZE POOL</p>
            </div>
            <div className="stat-item">
              <h3 className="font-squid">3</h3>
              <p>DAYS</p>
            </div>
          </div>
        </div>

        <div className="about-visual reveal fade-left">
          <div className="card-stack">
            <div className="bg-card c-pink"></div>
            <div className="bg-card c-teal"></div>
            <div className="main-card">
              <div className="symbols">
                <svg width="60" height="60"><circle cx="30" cy="30" r="25" fill="none" stroke="#FF0066" strokeWidth="4"/></svg>
                <svg width="60" height="60"><polygon points="30,5 55,55 5,55" fill="none" stroke="#00C9B1" strokeWidth="4"/></svg>
                <svg width="60" height="60"><rect x="5" y="5" width="50" height="50" fill="none" stroke="#FF0066" strokeWidth="4"/></svg>
              </div>
              <h4 className="font-squid">SURVIVAL OF THE FITTEST</h4>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
