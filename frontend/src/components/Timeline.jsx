import React, { useEffect, useRef } from 'react';
import './Timeline.css';

const schedule = [
  { day: 'Day 1', date: 'April 7',
    events: [
      { time: '09:00 AM', title: 'Inauguration & Opening', location: 'Main Auditorium', icon: 'circle' },
      { time: '10:00 AM', title: 'Cubic Puzzle', location: 'SAC', icon: 'square' },
      { time: '11:00 AM', title: 'Stick Build', location: 'TBD', icon: 'triangle' },
      { time: '11:30 AM', title: 'Poster Design', location: 'Computer Center', icon: 'circle' },
      { time: '12:00 PM', title: 'Prompt Engineering', location: 'Computer Center', icon: 'square' },
      { time: '02:00 PM', title: 'Circuit Craze', location: 'Computer Center', icon: 'triangle' },
      { time: '03:30 PM', title: 'Robo Race', location: 'Outside SAC', icon: 'circle' },
      { time: '04:30 PM', title: 'Treasure Hunt', location: 'Campus Wide', icon: 'square' },
    ]
  },
  { day: 'Day 2', date: 'April 8',
    events: [
      { time: '09:30 AM', title: 'Ideathon', location: 'TBD', icon: 'triangle' },
      { time: '11:00 AM', title: 'Tower of Hanoi', location: 'TBD', icon: 'circle' },
      { time: '11:45 AM', title: 'CodeCraft', location: 'Computer Center', icon: 'square' },
      { time: '02:00 PM', title: 'Rocket Launcher', location: 'Grounds', icon: 'triangle' },
      { time: '03:30 PM', title: 'Egg Drop Challenge', location: 'Tech Block', icon: 'square' },
      { time: '06:00 PM', title: 'Closing Ceremony', location: 'Tech Block', icon: 'circle' },
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