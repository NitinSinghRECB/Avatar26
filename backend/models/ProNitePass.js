const mongoose = require('mongoose');

const ProNitePassSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  branch: { type: String, required: true },
  year: { type: String, required: true },
  passId: { type: String, required: true, unique: true },
  registeredEvent: { type: String, required: true },
  isUsed: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ProNitePass', ProNitePassSchema);
