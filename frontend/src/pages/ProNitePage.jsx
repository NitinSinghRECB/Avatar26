import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import { API_URL } from '../config';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ProNitePage.css';

const ProNitePage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', branch: '', year: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passData, setPassData] = useState(null);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const passRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await axios.post(`${API_URL}/api/pronite/register`, formData);
      setPassData(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (passData) {
      const scanUrl = `${window.location.origin}/pronite/scan/${passData.passId}`;
      QRCode.toDataURL(scanUrl, {
        width: 200,
        margin: 1,
        color: { dark: '#000000', light: '#ffffff' }
      }).then(url => setQrDataUrl(url));
    }
  }, [passData]);

  const downloadPass = async () => {
    if (!passRef.current) return;
    try {
      const canvas = await html2canvas(passRef.current, { 
        backgroundColor: '#0a0a0f',
        scale: 2,
        useCORS: true
      });
      const link = document.createElement('a');
      link.download = `AVATAR26_ProNite_Pass_${passData.passId}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (err) {
      alert('Failed to download pass. Please take a screenshot instead.');
    }
  };

  return (
    <div className="pronite-page">
      <Navbar />

      <div className="pronite-content">
        {/* Hero Block */}
        <div className="pronite-hero">
          <Link to="/" className="back-link font-orbitron">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
            BACK TO LOBBY
          </Link>

          <div className="pn-badge font-orbitron">EXCLUSIVE ACCESS</div>
          <h1 className="pn-title font-squid">
            PRO<span style={{ color: 'var(--teal)' }}>NITE</span>
          </h1>
          <p className="pn-subtitle font-orbitron">DJ NIGHT — AVATAR'26</p>

          <div className="pn-info-grid">
            <div className="pn-info-card">
              <div className="pn-info-icon">🎧</div>
              <h3 className="font-squid">DJ NIGHT</h3>
              <p className="font-orbitron">Experience the ultimate music fest with electrifying beats, bass drops, and a night you'll never forget.</p>
            </div>
            <div className="pn-info-card">
              <div className="pn-info-icon">📅</div>
              <h3 className="font-squid">SCHEDULE</h3>
              <p className="font-orbitron">8th April 2026<br />8:00 PM – Late Night<br />Main Stage Arena</p>
            </div>
            <div className="pn-info-card">
              <div className="pn-info-icon">🎟️</div>
              <h3 className="font-squid">HOW TO GET PASS</h3>
              <p className="font-orbitron">You can only get a ProNite Pass if you have registered for at least one AVATAR'26 event. Register for an event first, then come back here!</p>
            </div>
            <div className="pn-info-card">
              <div className="pn-info-icon">⚡</div>
              <h3 className="font-squid">WHAT'S INCLUDED</h3>
              <p className="font-orbitron">Free entry to DJ Night, exclusive dance floor access, and a chance to win special prizes during the night.</p>
            </div>
          </div>

          <div className="pn-warning font-orbitron">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--pink)" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            IMPORTANT: One pass per participant. Your pass contains a unique QR code that will be scanned at the gate by event coordinators.
          </div>
        </div>

        {/* Registration or Pass Display */}
        {!passData ? (
          <div className="pn-form-section">
            <h2 className="font-squid" style={{ color: 'var(--pink)', fontSize: '28px', textAlign: 'center', marginBottom: '10px' }}>
              GET YOUR PASS
            </h2>
            <p className="font-orbitron" style={{ textAlign: 'center', color: 'var(--cream)', opacity: 0.6, fontSize: '12px', marginBottom: '40px', letterSpacing: '2px' }}>
              ENTER THE SAME EMAIL YOU USED FOR EVENT REGISTRATION
            </p>

            {error && <div className="pn-error">{error}</div>}

            <form onSubmit={handleSubmit} className="pn-form">
              <div className="pn-input-row">
                <div className="pn-input-group">
                  <label className="font-orbitron">FULL NAME</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter your name" />
                </div>
                <div className="pn-input-group">
                  <label className="font-orbitron">EMAIL</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Same email as event registration" />
                </div>
              </div>
              <div className="pn-input-row">
                <div className="pn-input-group">
                  <label className="font-orbitron">PHONE</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Your phone number" />
                </div>
                <div className="pn-input-group">
                  <label className="font-orbitron">BRANCH</label>
                  <select name="branch" value={formData.branch} onChange={handleChange} required>
                    <option value="">Select Branch</option>
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="EE">EE</option>
                    <option value="ME">ME</option>
                    <option value="CE">CE</option>
                    <option value="IT">IT</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="pn-input-row" style={{ justifyContent: 'center' }}>
                <div className="pn-input-group" style={{ maxWidth: '300px' }}>
                  <label className="font-orbitron">YEAR</label>
                  <select name="year" value={formData.year} onChange={handleChange} required>
                    <option value="">Select Year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="pn-submit font-squid" disabled={loading}>
                {loading ? 'GENERATING PASS...' : 'GENERATE MY PASS ▸'}
              </button>
            </form>
          </div>
        ) : (
          <div className="pn-pass-section">
            <h2 className="font-squid" style={{ color: 'var(--teal)', fontSize: '28px', textAlign: 'center', marginBottom: '30px' }}>
              🎉 YOUR PASS IS READY!
            </h2>

            {/* The downloadable pass card */}
            <div className="pn-pass-card" ref={passRef}>
              <div className="pass-header">
                <div className="pass-logo font-squid">AVATAR<span>'26</span></div>
                <div className="pass-type font-orbitron">PRONITE PASS</div>
              </div>
              <div className="pass-divider">
                <div className="pass-notch pass-notch-left"></div>
                <div className="pass-dashed"></div>
                <div className="pass-notch pass-notch-right"></div>
              </div>
              <div className="pass-body">
                <div className="pass-details">
                  <div className="pass-field">
                    <span className="pass-label font-orbitron">NAME</span>
                    <span className="pass-value font-squid">{passData.name}</span>
                  </div>
                  <div className="pass-field">
                    <span className="pass-label font-orbitron">EMAIL</span>
                    <span className="pass-value font-orbitron" style={{ fontSize: '11px' }}>{passData.email}</span>
                  </div>
                  <div className="pass-field">
                    <span className="pass-label font-orbitron">EVENT</span>
                    <span className="pass-value font-squid" style={{ color: 'var(--teal)' }}>{passData.registeredEvent}</span>
                  </div>
                  <div className="pass-field">
                    <span className="pass-label font-orbitron">PASS ID</span>
                    <span className="pass-value font-orbitron" style={{ fontSize: '10px', letterSpacing: '2px' }}>{passData.passId}</span>
                  </div>
                  <div className="pass-field">
                    <span className="pass-label font-orbitron">DATE</span>
                    <span className="pass-value font-squid">8 APRIL 2026</span>
                  </div>
                  <div className="pass-field">
                    <span className="pass-label font-orbitron">TIME</span>
                    <span className="pass-value font-squid">8:00 PM</span>
                  </div>
                </div>
                <div className="pass-qr-section">
                  {qrDataUrl && <img src={qrDataUrl} alt="QR Code" className="pass-qr" />}
                  <p className="font-orbitron" style={{ fontSize: '8px', color: '#888', textAlign: 'center', marginTop: '8px' }}>SCAN AT GATE</p>
                </div>
              </div>
              <div className="pass-footer font-orbitron">
                DJ NIGHT — REC BANDA — AVATAR'26
              </div>
            </div>

            <button onClick={downloadPass} className="pn-download font-squid">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              DOWNLOAD PASS
            </button>
            <p className="font-orbitron" style={{ textAlign: 'center', fontSize: '11px', color: 'var(--cream)', opacity: 0.4, marginTop: '15px' }}>
              Show this pass at the DJ Night entrance
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProNitePage;
