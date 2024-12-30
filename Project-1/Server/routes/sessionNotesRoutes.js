const express = require('express');
const router = express.Router();
const { createSessionNote, getSessionNotesByAppointment } = require('../controllers/sessionNotesController');
const authMiddleware = require('../middleware/authMiddleware');

// Route for creating a session note
router.post('/', authMiddleware, createSessionNote);

// Route for getting session notes by appointment ID
router.get('/getSession/:appointmentId',  getSessionNotesByAppointment);

module.exports = router;
