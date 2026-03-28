import React from 'react';
import './Crew.css';

const Crew = () => {
  const teamMembers = [
    { name: 'Mr. Abhijeet Singh', role: 'Faculty Coordinator', img: '/admin-avatar.png', color: 'pink' },
    { name: 'Dr. Pushpendra Singh', role: 'Convener', img: '/admin-avatar.png', color: 'teal' },
    { name: 'Dr. Siddhartha Kumar Arjaria', role: 'Student Coordinator', img: '/admin-avatar.png', color: 'pink' },
  ];

  return (
    <section id="crew" className="crew-section">
      <div className="crew-header">
        <h2 className="section-title font-squid" style={{textAlign: 'center', marginBottom: '20px'}}>
          OUR <span style={{color: 'var(--teal)'}}>COORDINATORS</span>
        </h2>
        <p className="crew-subtitle font-orbitron">THE ARCHITECTS OF THE GAME</p>
      </div>

      <div className="crew-grid">
        {teamMembers.map((member, i) => (
          <div className={`crew-card ${member.color}`} key={i}>
            <div className="crew-img">
              <img src={member.img} alt={member.name} />
              <div className="crew-shape">
                {member.color === 'pink' ? 
                  <svg width="40" height="40"><circle cx="20" cy="20" r="16" fill="none" stroke="#FF0066" strokeWidth="3"/></svg>
                  :
                  <svg width="40" height="40"><polygon points="20,4 36,34 4,34" fill="none" stroke="#00C9B1" strokeWidth="3"/></svg>
                }
              </div>
            </div>
            <h3 className="crew-name font-squid">{member.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Crew;
