const express = require('express');
const router = express.Router();
const { registerCounselor, loginCounselor, getBookedAppointments, getMeeting} = require('../controllers/counselorController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', registerCounselor);
router.post('/login', loginCounselor);
router.get('/booked', authMiddleware, getBookedAppointments);
router.get('/link', authMiddleware, getMeeting);

module.exports = router;
