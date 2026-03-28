import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Events.css';

const eventsList = [
  { id: 'codecraft', title: 'CODECRAFT', type: 'Coding + Puzzles', desc: 'Logic and Programming challenges.', icon: 'circle', color: 'pink', teamSize: 'Solo', time: 'Day 2 - 11:45 AM' },
  { id: 'ideathon', title: 'IDEATHON', type: 'Idea + Solution', desc: 'Innovation, Research, and Pitching.', icon: 'triangle', color: 'teal', teamSize: 'Max 4', time: 'Day 2 - 09:30 AM' },
  { id: 'circuit-sim', title: 'CIRCUIT CRAZE (SIMULATION)', type: 'Electronics + Design', desc: 'Circuit Design and Schematic Thinking.', icon: 'square', color: 'pink', teamSize: 'Max 2', time: 'Day 1 - 02:00 PM' },
  { id: 'circuit-hard', title: 'CIRCUIT CRAZE (HARDWARE)', type: 'Electronics + Hands-On', desc: 'Breadboard Building, Wiring, Practical Skills.', icon: 'circle', color: 'teal', teamSize: 'Max 4', time: 'Day 1 - 02:00 PM' },
  { id: 'treasure', title: 'TREASURE HUNT', type: 'Logic + Team Adventure', desc: 'Teamwork and Clue-solving.', icon: 'triangle', color: 'pink', teamSize: 'Max 4', time: 'Day 1 - 04:30 PM' },
  { id: 'eggdrop', title: 'EGG DROP CHALLENGE', type: 'Engineering + Creativity', desc: 'Physics and Impact Absorption.', icon: 'square', color: 'teal', teamSize: 'Max 4', time: 'Day 2 - 03:30 PM' },
  { id: 'cubic', title: 'CUBIC PUZZLE', type: 'Logic + Pattern', desc: 'Memory and Reasoning.', icon: 'circle', color: 'pink', teamSize: 'Solo', time: 'Day 1 - 10:00 AM' },
  { id: 'stickbuild', title: 'STICKBUILD (CHOPSTICK BRIDGE)', type: 'Structural Challenge', desc: 'Design and Load-bearing Structures.', icon: 'triangle', color: 'teal', teamSize: 'Max 4', time: 'Day 1 - 11:00 AM' },
  { id: 'poster', title: 'POSTER DESIGN', type: 'Creative Tech', desc: 'Visual Communication and Design Skills.', icon: 'square', color: 'pink', teamSize: 'Solo', time: 'Day 1 - 11:30 AM' },
  { id: 'robogames', title: 'ROBOGAMES', type: 'Robotics Competition', desc: 'Robotics Control, Speed, Strategy, Engineering Skills.', icon: 'circle', color: 'teal', teamSize: 'Max 4', time: 'Day 1 - 03:30 PM' },
  { id: 'rocket', title: 'ROCKET LAUNCHER', type: 'Aerospace + Engineering', desc: 'Physics, Propulsion, Launch Mechanics.', icon: 'triangle', color: 'pink', teamSize: 'Max 4', time: 'Day 2 - 02:00 PM' },
  { id: 'prompt', title: 'PROMPT ENGINEERING', type: 'AI + Creativity', desc: 'AI Interaction, Logical Thinking, Creativity.', icon: 'square', color: 'teal', teamSize: 'Duo', time: 'Day 1 - 12:00 PM' },
  { id: 'hanoi', title: 'TOWER OF HANOI', type: 'Fun Activity', desc: 'Logical puzzle and fun brain challenge.', icon: 'circle', color: 'pink', teamSize: 'Solo', time: 'Day 2 - 11:00 AM' },
  { id: 'aerofury', title: 'AEROFURY', type: 'Drone Racing', desc: 'High-speed drone racing and obstacle navigation.', icon: 'triangle', color: 'teal', teamSize: 'Max 4', time: 'Day 2 - 04:00 PM' },
];

const EventIcon = ({ type, color }) => {
  const strokeColor = color === 'pink' ? '#FF0066' : '#00C9B1';
  if (type === 'circle') return <svg width="40" height="40"><circle cx="20" cy="20" r="16" fill="none" stroke={strokeColor} strokeWidth="3"/></svg>;
  if (type === 'triangle') return <svg width="40" height="40"><polygon points="20,4 36,34 4,34" fill="none" stroke={strokeColor} strokeWidth="3"/></svg>;
  return <svg width="40" height="40"><rect x="4" y="4" width="32" height="32" fill="none" stroke={strokeColor} strokeWidth="3"/></svg>;
};

const Events = ({ onRegisterClick }) => {
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  const categories = ['All', 'Technical', 'E-Sports', 'Cultural'];

  const filteredEvents = eventsList; // Since original HTML had a static list without proper category filtering, we'll just show all for now or implement client side filtering if categories were defined.

  return (
    <section id="events" className="events-section">
      <div className="events-header">
        <h2 className="section-title font-squid" style={{textAlign: 'center', marginBottom: '20px'}}>
          SELECT YOUR <span style={{color: 'var(--teal)'}}>GAME</span>
        </h2>
        <p className="events-subtitle font-orbitron">CHOOSE WISELY. SURVIVE. WIN.</p>
        
        {/*
        <div className="event-filters">
          {categories.map(c => (
            <button key={c} className={`filter-btn font-squid ${filter === c ? 'active' : ''}`} onClick={() => setFilter(c)}>
              {c}
            </button>
          ))}
        </div>
        */}
      </div>

      <div className="events-grid">
        {filteredEvents.map(event => (
          <div className={`event-card ${event.color}`} key={event.id}>
            <div className="event-card-inner">
              <div className="event-icon">
                <EventIcon type={event.icon} color={event.color} />
              </div>
              <div className="event-type font-orbitron">{event.type}</div>
              <h3 className="event-name font-squid">{event.title}</h3>
              <p className="event-desc">{event.desc}</p>
              
              <div className="event-meta" style={{ display: 'flex', flexDirection: 'column', gap: '8px', opacity: 0.8, fontSize: '13px' }}>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    {event.teamSize}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    {event.time}
                  </span>
                </div>
              </div>
              
              <button className="event-action font-squid" onClick={() => navigate(`/event/${event.id}`)}>
                VIEW DETAILS <span>▸</span>
              </button>
            </div>
            
            <div className="card-glitch"></div>
          </div>
        ))}
      </div>
      
      <div className="events-footer">
        <button className="btn-secondary font-squid" onClick={() => onRegisterClick('General')}>
          REGISTER FOR GENERAL PASS
        </button>
      </div>
    </section>
  );
};

export default Events;
