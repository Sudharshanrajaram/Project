const express = require('express');
const { createBooking, getBookingHistory, cancelBooking, fetchBookingDetails } = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createBooking);
router.get('/history', authMiddleware, getBookingHistory);
router.delete('/delete/:bookingId', authMiddleware, cancelBooking);
router.get('/:bookingId',  fetchBookingDetails);

module.exports = router;
