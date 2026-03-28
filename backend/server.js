require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Routes
const authRoutes = require('./routes/auth');
const registrationRoutes = require('./routes/registrations');
const exportRoutes = require('./routes/export');
const proniteRoutes = require('./routes/pronite');

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet());
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'https://avatar-2026-website-1.onrender.com', 
    'https://avatar-2026.netlify.app'
  ],
  credentials: true,
  exposedHeaders: ['Content-Disposition']
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body Parser
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/avatar26')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Connection Error: ', err));

// Health Check Route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'AVATAR 2026 Backend API is running smoothly!',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/pronite', proniteRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
