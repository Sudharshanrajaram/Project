const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    flightDetails: {
        flightNumber: {
            type: String,
            required: true
        },
        departure: {
            type: String,
            required: true
        },
        arrival: {
            type: String,
            required: true
        },
        departureTime: {
            type: String,
            required: true
        },
        arrivalTime: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        availableSeats: {
            type: String,
            required: true
        },
        flightClass: {
            type: String,
            required: true
        },
        flightId: {
            type: String,
            required: true
        }
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
