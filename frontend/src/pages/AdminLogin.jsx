import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('admin-bg');
    return () => document.body.classList.remove('admin-bg');
  }, []);

  const handleLogin = async (e) => {
    e.formAction = "";
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('adminToken', data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-overlay-bg">
         <div className="scanline"></div>
      </div>
      
      <div className="login-box">
        <div className="login-header">
          <div className="square-icon">
            <svg width="40" height="40"><rect x="5" y="5" width="30" height="30" fill="none" stroke="#FF0066" strokeWidth="4"/></svg>
          </div>
          <h1 className="font-squid">SYSTEM <span style={{color: 'var(--teal)'}}>ACCESS</span></h1>
          <p className="font-orbitron">AUTHORIZED PERSONNEL ONLY</p>
        </div>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label className="font-orbitron">IDENTIFICATION // EMAIL</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter admin email" 
              required 
            />
          </div>
          
          <div className="input-group">
            <label className="font-orbitron">PASSCODE // PASSWORD</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter admin password" 
              required 
            />
          </div>

          <button type="submit" className="login-btn font-squid" disabled={loading}>
            {loading ? 'AUTHENTICATING...' : 'INITIALIZE UPLINK ▸'}
          </button>
        </form>
        
        <div className="login-footer">
          <a href="/">← Return to Public Arena</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
