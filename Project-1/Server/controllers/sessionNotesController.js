const SessionNote = require('../models/SessionNote');

// Create a new session note
const createSessionNote = async (req, res) => {
  const { appointmentId, ClientName, ClientAge, ClientAddress, ClientGender, ClientEmail, ClientPhone, notes } = req.body;
  const { counselorId } = req.user;
  const createdBy = counselorId;
  try {
    const sessionNote = new SessionNote({
      appointmentId,
      notes,
      createdBy, ClientName, ClientAge, ClientAddress, ClientGender, ClientEmail, ClientPhone
    });
    await sessionNote.save();
    res.status(201).json(sessionNote);
  } catch (error) {
    res.status(500).json({ message: 'Error creating session note', error: error.message });
  }
};

// Get session notes by appointment ID (for a counselor or client)
const getSessionNotesByAppointment = async (req, res) => {
  const { appointmentId } = req.params;
   // Assuming you have user authentication middleware
  try {
    const sessionNotes = await SessionNote.find({ appointmentId });
    res.status(200).json(sessionNotes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching session notes', error: error.message });
  }
};


module.exports = { createSessionNote, getSessionNotesByAppointment};
