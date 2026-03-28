const express = require('express');
const Registration = require('../models/Registration');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @desc    Create a registration
// @route   POST /api/registrations
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, rollNumber, branch, year, event, teamName, teamMembers } = req.body;

    // Check if email already registered for this event
    const existingRegistration = await Registration.findOne({ email, event });
    if (existingRegistration) {
      return res.status(400).json({ message: 'You have already registered for this event' });
    }

    // If it's a team event and members are provided, validate them
    if (teamMembers && teamMembers.length > 0) {
      for (const member of teamMembers) {
        if (!member.email || !member.name) {
          return res.status(400).json({ message: 'All team members must have a name and email' });
        }
        // Check if member already registered for this event
        const memberExists = await Registration.findOne({ email: member.email, event });
        if (memberExists) {
          return res.status(400).json({ message: `Team member ${member.email} is already registered for this event` });
        }
      }
    }

    const registration = await Registration.create({
      name,
      email,
      phone,
      rollNumber,
      branch,
      year,
      event,
      teamName,
      teamMembers,
    });

    res.status(201).json(registration);
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
       res.status(400).json({ message: 'Email already registered for this event.' });
    } else {
       res.status(500).json({ message: 'Server error during registration', error: error.message });
    }
  }
});

// @desc    Get all registrations
// @route   GET /api/registrations
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const registrations = await Registration.find({}).sort({ timestamp: -1 });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update registration status
// @route   PATCH /api/registrations/:id/status
// @access  Private
router.patch('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const registration = await Registration.findById(req.params.id);

    if (registration) {
      registration.status = status;
      const updatedRegistration = await registration.save();
      res.json(updatedRegistration);
    } else {
      res.status(404).json({ message: 'Registration not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
