require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/avatar26');

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@recbanda.ac.in';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    const existingAdmin = await Admin.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('Admin user already exists.');
    } else {
      await Admin.create({
        email: adminEmail,
        password: adminPassword,
      });
      console.log('Admin user created successfully.');
    }

    process.exit();
  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1);
  }
};

seedAdmin();
