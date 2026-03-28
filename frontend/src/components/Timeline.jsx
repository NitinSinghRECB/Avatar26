import React, { useEffect, useRef } from 'react';
import './Timeline.css';

const schedule = [
  { day: 'Day 1', date: 'April 12',
    events: [
      { time: '09:00 AM', title: 'Opening Ceremony', location: 'Main Auditorium', icon: 'circle' },
      { time: '11:00 AM', title: 'Code Run - Round 1', location: 'Lab 1 & 2', icon: 'square' },
      { time: '02:00 PM', title: 'Robo Wars - Heats', location: 'Ground', icon: 'triangle' },
      { time: '05:00 PM', title: 'Cultural Eve', location: 'Main Stage', icon: 'circle' },
    ]
  },
  { day: 'Day 2', date: 'April 13',
    events: [
      { time: '10:00 AM', title: 'Hackathon Begins', location: 'Innovation Hub', icon: 'square' },
      { time: '12:00 PM', title: 'BGMI Semi-Finals', location: 'E-Sports Arena', icon: 'triangle' },
      { time: '06:00 PM', title: 'EDM Night', location: 'Main Stage', icon: 'circle' },
    ]
  },
  { day: 'Day 3', date: 'April 14',
    events: [
      { time: '10:00 AM', title: 'Hackathon Judging', location: 'Innovation Hub', icon: 'circle' },
      { time: '02:00 PM', title: 'Robo Wars Finals', location: 'Ground', icon: 'square' },
      { time: '05:00 PM', title: 'Valedictory & Prize Dist.', location: 'Main Auditorium', icon: 'triangle' },
    ]
  }
];

const TimelineIcon = ({ type }) => {
  if (type === 'circle') return <svg width="24" height="24"><circle cx="12" cy="12" r="10" fill="none" stroke="#FF0066" strokeWidth="2"/></svg>;
  if (type === 'triangle') return <svg width="24" height="24"><polygon points="12,2 22,20 2,20" fill="none" stroke="#00C9B1" strokeWidth="2"/></svg>;
  return <svg width="24" height="24"><rect x="3" y="3" width="18" height="18" fill="none" stroke="#FF0066" strokeWidth="2"/></svg>;
};

const Timeline = () => {
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

    const items = containerRef.current.querySelectorAll('.tl-item');
    items.forEach(el => observer.observe(el));

    return () => items.forEach(el => observer.unobserve(el));
  }, []);

  return (
    <section id="timeline" className="timeline-section" ref={containerRef}>
      <h2 className="section-title font-squid" style={{textAlign: 'center', marginBottom: '60px'}}>
        SCHEDULE <span style={{color: 'var(--pink)'}}>OF</span> WAR
      </h2>
      
      <div className="timeline-container">
        {schedule.map((dayData, index) => (
          <div className="tl-day" key={index}>
            <div className="tl-day-header font-squid">
              {dayData.day} <span>// {dayData.date}</span>
            </div>
            
            <div className="tl-events">
              {dayData.events.map((evt, i) => (
                <div className="tl-item fade-up" key={i}>
                  <div className="tl-time font-orbitron">{evt.time}</div>
                  <div className="tl-marker">
                    <TimelineIcon type={evt.icon} />
                    <div className="tl-line"></div>
                  </div>
                  <div className="tl-content">
                    <h4 className="font-squid">{evt.title}</h4>
                    <p>{evt.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
