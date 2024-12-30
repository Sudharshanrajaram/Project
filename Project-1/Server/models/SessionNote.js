const mongoose = require('mongoose');

const sessionNoteSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment',
      required: true,
    },
    ClientName: {
      type: String,
      required: true,
    },
    ClientAge: {
      type: String,
      required: true,
    },
    ClientAddress: {
      type: String,
      required: true,
    },
    ClientPhone: {
      type: String,
      required: true,
    },
    ClientEmail: {
      type: String,
      required: true,
    },
    ClientGender: {
      type: String,
      required: true,
    },

    notes: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // This is the user creating the note (counselor)
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SessionNote = mongoose.model('SessionNote', sessionNoteSchema);

module.exports = SessionNote;
