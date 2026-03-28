import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <>
      <section id="location" className="location-section">
        <h2 className="section-title font-squid" style={{textAlign:'center', marginBottom: '40px'}}>
          THE <span style={{color: 'var(--teal)'}}>ARENA</span>
        </h2>
        <div className="map-container">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14343.834161821033!2d80.3421523!3d25.3392471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398d75dc9b009e5b%3A0xe9fba6a053cbf539!2sRajkiya%20Engineering%20College%20Banda!5e0!3m2!1sen!2sin!4v1703649583162!5m2!1sen!2sin" 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map"
          ></iframe>
          <div className="map-overlay"></div>
        </div>
      </section>

      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <h2 className="font-squid" style={{fontSize: '32px', marginBottom: '10px'}}>AVATAR'26</h2>
            <p className="font-orbitron" style={{fontSize: '11px', letterSpacing: '2px', color: 'var(--teal)', marginBottom: '20px'}}>
              RAJKIYA ENGINEERING COLLEGE, BANDA
            </p>
            <p style={{color: 'var(--cream)', opacity: '0.6', fontSize: '14px', lineHeight: '1.6'}}>
              Join us for the most thrilling tech-cultural fest. Survive the challenges. Claim the glory.
            </p>
          </div>
          
          <div className="footer-links">
            <h4 className="font-squid">QUICK LINKS</h4>
            <a href="#about">About Fest</a>
            <a href="#events">Rulebook</a>
            <a href="#timeline">Schedule</a>
            <a href="#faq">FAQs</a>
          </div>
          
          <div className="footer-contact">
            <h4 className="font-squid">CONTACT US</h4>
            <p>avatar-support@recbanda.ac.in</p>
            <p>+91 98765 43210 (Support)</p>
            <div className="social-links">
              <a href="#"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
              <a href="#"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 4.01c-1 .49-1.98.68-3 .99-1.12-1.25-2.74-2-4.5-2-3.31 0-6 2.69-6 6 0 .46.05.91.14 1.35C5.22 10.12 3 6.94 3 6.94s-2.06 5.8 4 9.17c-1.36.93-3.1 1.5-4.95 1.5-.42 0-.83-.02-1.24-.07C2.9 19.38 5.4 20 8 20c8.4 0 12.66-7.14 12.66-12.87 0-.2-.01-.4-.03-.59 1.1-.79 1.98-1.78 2.67-2.91-1.01.44-2.1.74-3.23.88 1.16-.7 2.05-1.79 2.47-3.11z"></path></svg></a>
              <a href="#"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 Rajkiya Engineering College, Banda. All rights reserved.</p>
          <p className="font-orbitron" style={{fontSize: '10px', letterSpacing: '4px', opacity: '0.5', marginTop: '10px'}}>DESIGNED FOR SURVIVAL</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
