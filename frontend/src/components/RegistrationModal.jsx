import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import './RegistrationModal.css';

const RegistrationModal = ({ isOpen, onClose, preSelectedEvent }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    rollNumber: '',
    branch: '',
    year: '1st',
    event: 'General',
    teamName: '',
  });
  
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (preSelectedEvent) {
      setFormData(prev => ({ ...prev, event: preSelectedEvent }));
    }
  }, [preSelectedEvent]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addTeamMember = () => {
    let maxAdditionalMembers = 3; // Default Max 4 Total (1 leader + 3 members)

    if (formData.event === 'CIRCUIT CRAZE (SIMULATION)' || formData.event === 'PROMPT ENGINEERING') {
      maxAdditionalMembers = 1; // Max 2 Total
    } else if (['CODECRAFT', 'CUBIC PUZZLE', 'POSTER DESIGN', 'TOWER OF HANOI'].includes(formData.event)) {
      maxAdditionalMembers = 0; // Max 1 Total
    }

    if (teamMembers.length < maxAdditionalMembers) {
      setTeamMembers([...teamMembers, { name: '', email: '' }]);
    } else {
      const totalAllowed = maxAdditionalMembers + 1;
      setError(`Maximum ${totalAllowed} participant${totalAllowed > 1 ? 's' : ''} allowed for ${formData.event}.`);
    }
  };

  const removeTeamMember = (index) => {
    const updated = [...teamMembers];
    updated.splice(index, 1);
    setTeamMembers(updated);
  };

  const handleMemberChange = (index, field, value) => {
    const updated = [...teamMembers];
    updated[index][field] = value;
    setTeamMembers(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Basic Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.branch) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    // Team members validation
    if (teamMembers.length > 0) {
      if (!formData.teamName) {
        setError('Please provide a team name since you have team members.');
        setLoading(false); return;
      }
      for (const member of teamMembers) {
        if (!member.name || !member.email) {
          setError('All team members must have a name and an email address.');
          setLoading(false); return;
        }
      }
    }

    try {
      const response = await axios.post(`${API_URL}/api/registrations`, {
        ...formData,
        teamMembers
      });
      
      
      setSuccess('Registration successful! Prepare for the games.');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setSuccess('');
    setError('');
    setFormData({ name: '', email: '', phone: '', rollNumber: '', branch: '', year: '1st', event: 'General', teamName: '' });
    setTeamMembers([]);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={handleClose}>&times;</button>
        
        <div className="modal-header">
          <h2 className="font-squid">PLAYER <span style={{color: 'var(--pink)'}}>REGISTRATION</span></h2>
          <p className="font-orbitron" style={{color: 'var(--teal)', fontSize: '11px', letterSpacing: '2px'}}>ENTER YOUR DETAILS TO JOIN THE ARENA</p>
        </div>

        {error && <div className="modal-alert error">{error}</div>}
        
        {success ? (
          <div className="success-popup" style={{textAlign: 'center', padding: '50px 20px'}}>
             <div style={{fontSize: '70px', color: 'var(--teal)', marginBottom: '20px', textShadow: '0 0 20px rgba(0,201,177,0.4)'}}>✓</div>
             <h2 className="font-squid" style={{color: 'var(--teal)', fontSize: '28px', marginBottom: '15px', letterSpacing: '2px'}}>REGISTRATION SUCCESSFUL</h2>
             <p className="font-orbitron" style={{color: 'var(--cream)', fontSize: '14px', lineHeight: '1.6'}}>{success}</p>
             <a href="/pronite" className="btn-primary font-squid" style={{marginTop:'30px', width: '100%', display: 'block', textDecoration: 'none', textAlign: 'center', background: 'linear-gradient(135deg, rgba(255,0,102,0.2), rgba(0,201,177,0.2))', border: '2px solid var(--pink)', padding: '16px', fontSize: '16px', letterSpacing: '3px', color: 'var(--white)', borderRadius: '4px', boxShadow: '0 0 20px rgba(255,0,102,0.15)'}}>
               🎟️ GET PRONITE PASS
             </a>
             <button type="button" className="btn-primary font-squid" style={{marginTop:'12px', width: '100%', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'var(--cream)', padding: '14px', fontSize: '14px'}} onClick={handleClose}>RETURN TO ARENA</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="reg-form">
          <div className="form-group grid-2">
            <div>
              <label>Full Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <label>Email Address *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group grid-3">
            <div>
              <label>Phone Number *</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <div>
              <label>Roll Number (Opt)</label>
              <input type="text" name="rollNumber" value={formData.rollNumber} onChange={handleChange} />
            </div>
            <div>
              <label>Year *</label>
              <select name="year" value={formData.year} onChange={handleChange}>
                <option value="1st">1st Year</option>
                <option value="2nd">2nd Year</option>
                <option value="3rd">3rd Year</option>
                <option value="4th">4th Year</option>
                <option value="Alumni">Alumni</option>
              </select>
            </div>
          </div>

          <div className="form-group grid-2">
            <div>
              <label>Branch/Course *</label>
              <input type="text" name="branch" value={formData.branch} onChange={handleChange} required placeholder="e.g. CSE, IT, EE, ME" />
            </div>
            <div>
              <label>Selected Event</label>
              <div style={{
                background: 'rgba(0,201,177,0.05)', 
                border: '1px solid rgba(0,201,177,0.3)', 
                padding: '12px 15px', 
                color: 'var(--teal)', 
                borderRadius: '4px', 
                fontSize: '14px', 
                fontWeight: 'bold',
                fontFamily: 'inherit',
                letterSpacing: '1px'
              }}>
                {formData.event}
              </div>
            </div>
          </div>

          {(!['General', 'CODECRAFT', 'CUBIC PUZZLE', 'POSTER DESIGN', 'TOWER OF HANOI'].includes(formData.event)) && (
             <div className="team-section">
                <div className="team-header">
                  <label style={{marginBottom:0}}>Team Members (Optional)</label>
                  <button type="button" className="btn-add-member" onClick={addTeamMember}>+ ADD PLAYER</button>
                </div>
                
                {teamMembers.length > 0 && (
                  <div className="form-group" style={{marginTop:'15px'}}>
                    <label>Team Name *</label>
                    <input type="text" name="teamName" value={formData.teamName} onChange={handleChange} />
                  </div>
                )}

                {teamMembers.map((member, index) => (
                  <div className="member-row" key={index}>
                    <div className="member-num font-squid">{index + 2}</div>
                    <input type="text" placeholder="Member Name" value={member.name} onChange={(e) => handleMemberChange(index, 'name', e.target.value)} />
                    <input type="email" placeholder="Member Email Address" value={member.email} onChange={(e) => handleMemberChange(index, 'email', e.target.value)} />
                    <button type="button" className="btn-remove-member" onClick={() => removeTeamMember(index)}>&times;</button>
                  </div>
                ))}
             </div>
          )}

          <div className="modal-footer">
            <button type="submit" className="btn-primary font-squid" style={{width: '100%'}} disabled={loading}>
              {loading ? 'PROCESSING...' : 'CONFIRM REGISTRATION'}
            </button>
          </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrationModal;
