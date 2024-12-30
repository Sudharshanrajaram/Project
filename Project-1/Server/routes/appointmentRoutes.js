const express = require('express');
const router = express.Router();
const { createAppointment, getAppointments, getAllAppointments } = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createAppointment);
router.get('/:userId', authMiddleware, getAppointments);
router.get('/all', authMiddleware,  getAllAppointments);


module.exports = router;
