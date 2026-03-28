import React from 'react';
import { useParams } from 'react-router-dom';
import './ProNiteScan.css';

const ProNiteScan = () => {
  const { passId } = useParams();

  return (
    <div className="scan-page">
      {/* Background shapes */}
      <div className="scan-shapes">
        <svg className="scan-shape shape-circle" width="150" height="150"><circle cx="75" cy="75" r="65" fill="none" stroke="rgba(255,0,102,0.15)" strokeWidth="3"/></svg>
        <svg className="scan-shape shape-triangle" width="160" height="150"><polygon points="80,10 150,140 10,140" fill="none" stroke="rgba(0,201,177,0.12)" strokeWidth="3"/></svg>
        <svg className="scan-shape shape-square" width="120" height="120"><rect x="10" y="10" width="100" height="100" fill="none" stroke="rgba(255,0,102,0.1)" strokeWidth="3"/></svg>
      </div>

      <div className="scan-card">
        {/* Shield Icon */}
        <div className="scan-icon-wrap">
          <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="url(#shieldGrad)" strokeWidth="1.5">
            <defs>
              <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF0066" />
                <stop offset="100%" stopColor="#00C9B1" />
              </linearGradient>
            </defs>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            <path d="M9 12l2 2 4-4" stroke="#FF0066" strokeWidth="2"></path>
          </svg>
        </div>

        {/* AVATAR'26 Logo */}
        <h1 className="scan-logo font-squid">
          AVATAR<span className="scan-logo-accent">'</span>26
        </h1>

        {/* Main Message */}
        <div className="scan-msg-box">
          <h2 className="scan-msg font-squid">
            ONLY SCANNED BY <span style={{ color: 'var(--teal)' }}>ADMIN</span>
          </h2>
        </div>

        <p className="scan-desc font-orbitron">
          This QR code is exclusively for verification by the event coordinator at the DJ Night entrance gate.
        </p>

        {/* Pass ID Display */}
        <div className="scan-pass-id">
          <span className="scan-pass-label font-orbitron">PASS ID</span>
          <span className="scan-pass-value font-orbitron">{passId}</span>
        </div>

        <div className="scan-divider"></div>

        <p className="scan-instruction font-orbitron">
          Please show this screen to the event coordinator for verification.
        </p>

        {/* Decorative bottom shapes */}
        <div className="scan-bottom-shapes">
          <svg width="30" height="30"><circle cx="15" cy="15" r="12" fill="none" stroke="var(--pink)" strokeWidth="2"/></svg>
          <svg width="30" height="30"><polygon points="15,3 27,27 3,27" fill="none" stroke="var(--teal)" strokeWidth="2"/></svg>
          <svg width="30" height="30"><rect x="4" y="4" width="22" height="22" fill="none" stroke="var(--pink)" strokeWidth="2"/></svg>
        </div>
      </div>
    </div>
  );
};

export default ProNiteScan;
