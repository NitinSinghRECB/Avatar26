import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ onRegisterClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav>
        <a href="#hero" className="nav-logo">
          <div className="logo-group" style={{display: 'flex', gap: '8px', alignItems: 'center', marginRight: '15px'}}>
            <img src="/rec-logo.png" alt="REC Logo" style={{height: '35px', width: 'auto'}} />
            <img src="/iic-logo.png" alt="IIC Logo" style={{height: '35px', width: 'auto', background: 'white', padding: '2px', borderRadius: '4px'}} />
            <img src="/green-logo.png" alt="Green Logo" style={{height: '35px', width: 'auto', background: 'white', padding: '2px', borderRadius: '4px'}} />
          </div>
          <span className="font-squid">AVATAR'26</span>
        </a>
        
        <ul className="nav-links nav-reg-desktop">
          <li><a href="#about">About</a></li>
          <li><a href="#events">Events</a></li>
          <li><a href="#timeline">Schedule</a></li>
          <li><a href="#crew">Team</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li>
            <button onClick={() => onRegisterClick()} className="nav-register-btn font-squid">
              Register Now
            </button>
          </li>
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div className="nav-hamburger" onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      <div className="nav-mobile-menu" style={{ display: isMobileMenuOpen ? 'flex' : 'none' }}>
        <a href="#about" onClick={toggleMobileMenu}>About</a>
        <a href="#events" onClick={toggleMobileMenu}>Events</a>
        <a href="#timeline" onClick={toggleMobileMenu}>Schedule</a>
        <a href="#crew" onClick={toggleMobileMenu}>Team</a>
        <a href="#location" onClick={toggleMobileMenu}>Location</a>
        <a href="#faq" onClick={toggleMobileMenu}>FAQ</a>
        <button className="mobile-reg-btn font-squid" onClick={() => { toggleMobileMenu(); onRegisterClick(); }}>
          Register Now
        </button>
        <a href="/admin" className="mobile-admin-btn font-squid" onClick={toggleMobileMenu}>
          Admin Panel
        </a>
      </div>
    </>
  );
};

export default Navbar;
