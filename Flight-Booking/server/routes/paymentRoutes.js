const express = require('express');
const router = express.Router();
const { paymentGateway } = require('../controllers/paymentController');

router.post('/pay', paymentGateway);


module.exports = router;
