const express = require('express');
const { getFlights, setFlights, getFlightDetails } = require('../controllers/flightController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('/search', getFlights);
router.post('/setFlights', setFlights);
router.get('/get',authMiddleware, getFlightDetails);

module.exports = router;
