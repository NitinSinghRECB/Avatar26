const express = require('express');
const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');
const Registration = require('../models/Registration');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @desc    Export registrations as Excel
// @route   GET /api/export/excel
// @access  Private
router.get('/excel', protect, async (req, res) => {
  try {
    const { event } = req.query;
    const query = event ? { event } : {};
    const registrations = await Registration.find(query).sort({ timestamp: -1 });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Registrations');

    worksheet.columns = [
      { header: 'Date', key: 'timestamp', width: 20 },
      { header: 'Name', key: 'name', width: 25 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Phone', key: 'phone', width: 15 },
      { header: 'Roll Number', key: 'rollNumber', width: 15 },
      { header: 'Branch', key: 'branch', width: 15 },
      { header: 'Year', key: 'year', width: 10 },
      { header: 'Event', key: 'event', width: 20 },
      { header: 'Team Name', key: 'teamName', width: 20 },
      { header: 'Status', key: 'status', width: 15 },
    ];

    registrations.forEach(reg => {
      worksheet.addRow({
        timestamp: reg.timestamp.toLocaleString('en-IN'),
        name: reg.name,
        email: reg.email,
        phone: reg.phone,
        rollNumber: reg.rollNumber || 'N/A',
        branch: reg.branch,
        year: reg.year,
        event: reg.event,
        teamName: reg.teamName || 'Solo',
        status: reg.status,
      });
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=' + `registrations_${event || 'all'}.xlsx`
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during export' });
  }
});

// @desc    Export registrations as PDF
// @route   GET /api/export/pdf
// @access  Private
router.get('/pdf', protect, async (req, res) => {
  try {
    const { event } = req.query;
    const query = event ? { event } : {};
    const registrations = await Registration.find(query).sort({ timestamp: -1 });

    const doc = new PDFDocument({ margin: 30, size: 'A4' });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=' + `registrations_${event || 'all'}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(20).text(`AVATAR'26 Registrations - ${event || 'All Events'}`, { align: 'center' });
    doc.moveDown();

    registrations.forEach((reg, i) => {
      doc.fontSize(12).text(`${i + 1}. ${reg.name} - ${reg.event}`, { underline: true });
      doc.fontSize(10).text(`Email: ${reg.email} | Phone: ${reg.phone}`);
      doc.text(`Branch: ${reg.branch} | Year: ${reg.year} | Roll No: ${reg.rollNumber || 'N/A'}`);
      if (reg.teamName) {
        doc.text(`Team: ${reg.teamName}`);
        if (reg.teamMembers && reg.teamMembers.length > 0) {
           doc.text(`Members: ${reg.teamMembers.map(m => m.name).join(', ')}`);
        }
      }
      doc.text(`Status: ${reg.status.toUpperCase()} | Date: ${reg.timestamp.toLocaleString('en-IN')}`);
      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during export' });
  }
});

module.exports = router;
