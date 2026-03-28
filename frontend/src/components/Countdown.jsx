import React, { useEffect, useState } from 'react';
import './Countdown.css';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: '00', hours: '00', minutes: '00', seconds: '00'
  });

  useEffect(() => {
    // Target date: April 12, 2026
    const targetDate = new Date("April 12, 2026 00:00:00").getTime();

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
      </div>
    </section>
  );
};

export default Countdown;
