import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import TeamPage from './pages/TeamPage';
import EventDetails from './pages/EventDetails';
import ProNitePage from './pages/ProNitePage';
import ProNiteScan from './pages/ProNiteScan';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/pronite" element={<ProNitePage />} />
        <Route path="/pronite/scan/:passId" element={<ProNiteScan />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
