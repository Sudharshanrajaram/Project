// routes/reports.js
const express = require('express');
const Booking = require('../models/booking');
const User = require('../models/user');
const router = express.Router();

router.get('/popular-routes', async (req, res) => {
    try {
        const routes = await Booking.aggregate([
            { $group: { _id: { departure: "$flightDetails.departure", arrival: "$flightDetails.arrival" }, count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);

        res.json({ routes });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching popular routes', error });
    }
});

router.get('/average-booking-value', async (req, res) => {
    try {
        const averageValue = await Booking.aggregate([
            { $group: { _id: null, averagePrice: { $avg: "$flightDetails.price" } } },
        ]);

        res.json({ averagePrice: averageValue[0]?.averagePrice });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching average booking value' });
    }
});

router.get('/cancellation-rate', async (req, res) => {
    try {
        const totalBookings = await Booking.countDocuments({});
        const cancelledBookings = await Booking.countDocuments({ status: 'Cancelled' });

        const cancellationRate = totalBookings === 0 ? 0 : (cancelledBookings / totalBookings) * 100;

        res.json({ cancellationRate });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching cancellation rate' });
    }
});

router.get('/user-activity', async (req, res) => {
    try {
        const userActivity = await User.aggregate([
            { $lookup: { from: 'bookings', localField: '_id', foreignField: 'userId', as: 'bookings' } },
            { $unwind: '$bookings' },
            { $group: { _id: '$_id', totalBookings: { $sum: 1 }, email: { $first: '$email' }, name: { $first: '$username' } } },
            { $sort: { totalBookings: -1 } },
            { $limit: 10 }
        ]);

        res.json({ userActivity });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user activity', error });
    }
});

module.exports = router;
