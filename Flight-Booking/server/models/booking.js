const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  flightDetails: {
    flightNumber: String,
    departure: String,
    departureTime: Date,
    arrival: String,
    arrivalTime: Date,
    price: Number,
    flightClass: String,
  },
  noOfPassengers: { type: Number, required: true },
  passengers: [passengerSchema], 
  status: { type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled'],
    default: 'Pending' },
  paymentStatus: { type: String,
    enum: ['Not Paid', 'Paid','Refunded'],
    default: 'Not Paid' },
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
