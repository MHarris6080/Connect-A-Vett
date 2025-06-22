const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const auth = require('../middleware/authMiddleware'); // token checker

// @route   POST /api/appointments
// @desc    Create a new appointment
// @access  Private (requires token)
router.post('/', auth, async (req, res) => {
  try {
    const { pet, date, time } = req.body;

    // Validate required fields
    if (!pet || !date || !time) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create appointment tied to logged-in user
    const newAppointment = new Appointment({
      pet,
      date,
      time,
      userId: req.user.id // from token
    });

    await newAppointment.save();

    res.status(201).json({ message: 'Appointment created successfully', appointment: newAppointment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   GET /api/appointments
// @desc    Get appointments: admin sees all, others see their own
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { userId: req.user.id };
    const appointments = await Appointment.find(query).sort({ date: 1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


