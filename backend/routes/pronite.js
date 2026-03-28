const express = require('express');
const crypto = require('crypto');
const Registration = require('../models/Registration');
const ProNitePass = require('../models/ProNitePass');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @desc    Register for ProNite (only if user has event registration)
// @route   POST /api/pronite/register
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, branch, year } = req.body;

    // Check if email has registered for any event
    const eventRegistration = await Registration.findOne({ email });
    if (!eventRegistration) {
      return res.status(400).json({ 
        message: 'You must register for at least one event before getting a ProNite Pass. Register for an event first!' 
      });
    }

    // Check if already has a ProNite pass
    const existingPass = await ProNitePass.findOne({ email });
    if (existingPass) {
      return res.status(400).json({ 
        message: 'You already have a ProNite Pass!',
        pass: existingPass
      });
    }

    // Generate unique pass ID
    const passId = 'AVATAR26-PN-' + crypto.randomBytes(6).toString('hex').toUpperCase();

    const pass = await ProNitePass.create({
      name,
      email,
      phone,
      branch,
      year,
      passId,
      registeredEvent: eventRegistration.event
    });

    res.status(201).json(pass);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during ProNite registration', error: error.message });
  }
});

// @desc    Verify a ProNite pass (admin only)
// @route   GET /api/pronite/verify/:passId
// @access  Private (Admin)
router.get('/verify/:passId', protect, async (req, res) => {
  try {
    const pass = await ProNitePass.findOne({ passId: req.params.passId });
    
    if (!pass) {
      return res.status(404).json({ valid: false, message: 'Invalid Pass - Not Found' });
    }

    if (pass.isUsed) {
      return res.status(400).json({ valid: false, message: 'This pass has already been used!', pass });
    }

    // Mark as used
    pass.isUsed = true;
    await pass.save();

    res.json({ valid: true, message: 'Pass verified successfully!', pass });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Scan QR (public - just shows message)
// @route   GET /api/pronite/scan/:passId
// @access  Public  
router.get('/scan/:passId', async (req, res) => {
  res.json({ message: 'This QR can only be scanned by the admin. Please show this to the event coordinator at the gate.' });
});

// @desc    Get all ProNite passes
// @route   GET /api/pronite/all
// @access  Private (Admin)
router.get('/all', protect, async (req, res) => {
  try {
    const passes = await ProNitePass.find({}).sort({ timestamp: -1 });
    res.json(passes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
