import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Countdown.css';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: '00', hours: '00', minutes: '00', seconds: '00'
  });

  useEffect(() => {
    // Target date: April 7, 2026 09:00 AM
    const targetDate = new Date("April 7, 2026 09:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: d.toString().padStart(2, '0'),
        hours: h.toString().padStart(2, '0'),
        minutes: m.toString().padStart(2, '0'),
        seconds: s.toString().padStart(2, '0')
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="countdown-section">
      <div className="countdown-container">
        <h2 className="countdown-title font-squid">TIME REMAINING</h2>
        <div className="countdown-timer">
          <div className="cd-box"><span className="font-squid">{timeLeft.days}</span><p>DAYS</p></div>
          <div className="cd-sep">:</div>
          <div className="cd-box"><span className="font-squid">{timeLeft.hours}</span><p>HOURS</p></div>
          <div className="cd-sep">:</div>
          <div className="cd-box"><span className="font-squid">{timeLeft.minutes}</span><p>MINUTES</p></div>
          <div className="cd-sep">:</div>
          <div className="cd-box"><span className="font-squid">{timeLeft.seconds}</span><p>SECONDS</p></div>
        </div>

        <Link to="/pronite" className="pronite-btn font-squid" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginTop: '50px', padding: '18px 50px', background: 'linear-gradient(135deg, rgba(255,0,102,0.15), rgba(0,201,177,0.15))', border: '2px solid var(--pink)', color: 'var(--white)', fontSize: '20px', letterSpacing: '4px', textDecoration: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.4s ease', boxShadow: '0 0 25px rgba(255,0,102,0.2), inset 0 0 25px rgba(255,0,102,0.05)', position: 'relative', overflow: 'hidden' }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 40px rgba(255,0,102,0.4), inset 0 0 30px rgba(255,0,102,0.1)'; e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.borderColor = '#ff3388'; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 25px rgba(255,0,102,0.2), inset 0 0 25px rgba(255,0,102,0.05)'; e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = 'var(--pink)'; }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--pink)" strokeWidth="2"><path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 0 0-2 2v3a2 2 0 1 1 0 4v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3a2 2 0 1 1 0-4V7a2 2 0 0 0-2-2H5z"/></svg>
          PRONITE PASS
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </Link>
      </div>
    </section>
  );
};

export default Countdown;
