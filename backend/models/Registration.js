const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  rollNumber: { type: String },
  branch: { type: String, required: true },
  year: { type: String, required: true },
  event: { type: String, required: true },
  teamName: { type: String },
  teamMembers: [memberSchema],
  status: { type: String, enum: ['pending', 'approved'], default: 'pending' },
  timestamp: { type: Date, default: Date.now },
});

// Ensure a user cannot register for the same event twice
registrationSchema.index({ email: 1, event: 1 }, { unique: true });

module.exports = mongoose.model('Registration', registrationSchema);
