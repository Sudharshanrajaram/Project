const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  counselor: {
    type: String,
    required: true,
    enum: ['Counselor1', 'Counselor2', 'Counselor3'],
    default: 'Counselor1',
  },
  clientName:{
    type: String,
    required: true
  },
  time: {
    type: Date,
    required: true,
  },
  counselorId: {
    type: String,
    ref: 'Counselor',
    required: true,
  },
  type: {
    type: String,
    enum: ['Mental Health', 'Relationship', 'Career'],
    required: true,
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Completed', 'Cancelled'],
    default: 'Scheduled',
  },
}, {
  timestamps: true,
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
