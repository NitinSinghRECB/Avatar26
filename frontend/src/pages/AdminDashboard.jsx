import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterEvent, setFilterEvent] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0 });

  const navigate = useNavigate();

  const fetchRegistrations = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) { navigate('/admin'); return; }

      const { data } = await axios.get('http://localhost:5000/api/registrations', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRegistrations(data);
      calculateStats(data);
    } catch (err) {
      if (err.response?.status === 401) navigate('/admin');
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.body.classList.add('admin-bg');
    fetchRegistrations();
    return () => document.body.classList.remove('admin-bg');
  }, [navigate]);

  const calculateStats = (data) => {
    setStats({
      total: data.length,
      pending: data.filter(r => r.status === 'pending').length,
      approved: data.filter(r => r.status === 'approved').length,
    });
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.patch(`http://localhost:5000/api/registrations/${id}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchRegistrations();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleExport = (type) => {
    const token = localStorage.getItem('adminToken');
    const query = filterEvent !== 'All' ? `?event=${filterEvent}` : '';
    const url = `http://localhost:5000/api/export/${type}${query}`;
    
    axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'blob'
    }).then(response => {
      const href = URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('download', `registrations_${filterEvent}_${type}.${type === 'excel' ? 'xlsx' : 'pdf'}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    }).catch(() => alert('Export failed'));
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const filteredData = registrations.filter(r => {
    const eventMatch = filterEvent === 'All' || r.event === filterEvent;
    const searchMatch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (r.teamName && r.teamName.toLowerCase().includes(searchTerm.toLowerCase()));
    return eventMatch && searchMatch;
  });

  const uniqueEvents = ['All', ...new Set(registrations.map(r => r.event))];

  if (loading) return <div className="admin-loading">Loading System Data...</div>;

  return (
    <div className="admin-dashboard">
       <div className="dashboard-grid"></div>
       
       <header className="dash-header">
         <div className="dash-brand">
           <svg width="24" height="24"><polygon points="12,2 22,20 2,20" fill="none" stroke="#FF0066" strokeWidth="3"/></svg>
           <h1 className="font-squid">AVATAR <span style={{color:'var(--teal)'}}>COMMAND</span></h1>
         </div>
         <div className="dash-actions">
           <div className="admin-badge font-orbitron">SYS_ADMIN</div>
           <button onClick={handleLogout} className="logout-btn font-squid">TERMINATE UPLINK</button>
         </div>
       </header>

       <div className="dash-content">
          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-title font-orbitron">TOTAL PLAYERS</div>
              <div className="stat-value font-squid" style={{color:'var(--teal)'}}>{stats.total}</div>
            </div>
            <div className="stat-card">
              <div className="stat-title font-orbitron">APPROVED</div>
              <div className="stat-value font-squid" style={{color:'#00C9B1'}}>{stats.approved}</div>
            </div>
            <div className="stat-card">
              <div className="stat-title font-orbitron">PENDING</div>
              <div className="stat-value font-squid" style={{color:'var(--pink)'}}>{stats.pending}</div>
            </div>
          </div>

          <div className="controls-row">
            <div className="filter-group">
              <input 
                type="text" 
                placeholder="Search by name, email, team..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <select value={filterEvent} onChange={e => setFilterEvent(e.target.value)} className="event-filter">
                {uniqueEvents.map(e => <option key={e} value={e}>{e === 'All' ? 'ALL EVENTS' : e}</option>)}
              </select>
            </div>
            <div className="export-group">
              <button onClick={() => handleExport('excel')} className="export-btn font-squid excel-btn">
                [ EXPORT EXCEL ]
              </button>
              <button onClick={() => handleExport('pdf')} className="export-btn font-squid pdf-btn">
                [ EXPORT PDF ]
              </button>
            </div>
          </div>

          <div className="table-container">
            {error && <div className="error-banner">{error}</div>}
            
            <table className="reg-table">
              <thead>
                <tr className="font-orbitron">
                  <th>#</th>
                  <th>TIMESTAMP</th>
                  <th>PLAYER DETAILS</th>
                  <th>EVENT</th>
                  <th>TEAM</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr><td colSpan="7" style={{textAlign:'center', padding:'30px'}}>NO RECORDS FOUND</td></tr>
                ) : (
                  filteredData.map((reg, index) => (
                    <tr key={reg._id} className={reg.status}>
                      <td>{index + 1}</td>
                      <td className="time-col">{new Date(reg.timestamp).toLocaleString('en-IN', {day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit'})}</td>
                      <td>
                        <div className="player-name">{reg.name}</div>
                        <div className="player-meta">{reg.email} | {reg.phone}</div>
                        <div className="player-meta">{reg.branch} - {reg.year} {reg.rollNumber && `| Roll: ${reg.rollNumber}`}</div>
                      </td>
                      <td className="event-col font-squid text-teal">{reg.event}</td>
                      <td>
                        {reg.teamName ? (
                          <>
                            <div className="team-name">{reg.teamName}</div>
                            {reg.teamMembers?.length > 0 && <div className="team-size">+{reg.teamMembers.length} Members</div>}
                          </>
                        ) : 'Solo'}
                      </td>
                      <td>
                        <span className={`status-badge ${reg.status}`}>
                          {reg.status.toUpperCase()}
                        </span>
                      </td>
                      <td>
                        <select 
                          value={reg.status} 
                          onChange={(e) => handleStatusChange(reg._id, e.target.value)}
                          className={`action-select ${reg.status}`}
                        >
                          <option value="pending">PENDING</option>
                          <option value="approved">APPROVED</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
       </div>
    </div>
  );
};

export default AdminDashboard;
