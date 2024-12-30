const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Counselor = require('../models/counselor');

// Register new user
const registerCounselor = async (req, res) => {
  try{
    const { name, email, password } = req.body;
    const existingUser = await Counselor.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await Counselor({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
const loginCounselor = async (req, res) => {
  const { email, password } = req.body;

  try {
    const counselor = await Counselor.findOne({ email });

    if (!counselor) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, counselor.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ counselorId: counselor._id, name:counselor.name, role: counselor.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token , role: counselor.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get booked appointments
const getBookedAppointments = async (req, res) => {
  const { counselorId } = req.user;
  try {
    const counselor = await Counselor.findById(counselorId);
    res.json(counselor.Booking )
  } catch(error) {
    res.status(500).json({ message: error.message });
  }
}

const getMeeting = async (req, res) => {
  const { counselorId } = req.user;
  try {
    const counselor = await Counselor.findById(counselorId);
    res.json(counselor.Meeting )
  } catch(error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { registerCounselor, loginCounselor, getBookedAppointments, getMeeting };
