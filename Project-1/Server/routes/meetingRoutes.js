const express = require('express');
const router = express.Router();
const { generateJwt } = require('../controllers/meetingController');

router.post('/generate-jwt', generateJwt);

module.exports = router;