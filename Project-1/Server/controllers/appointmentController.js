const e = require('express');
const Appointment = require('../models/Appointment');
const Counselor = require('../models/counselor');
const nodemailer = require('nodemailer');
require('dotenv').config();


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
    },
});

// Create a new appointment
const createAppointment = async (req, res) => {
  try {
    const { clientName, counselor, time, type, counselorId, email } = req.body;
    
    const { userId } = req.user;
    const appointment = await Appointment({
      user: userId,
      clientName,
      counselor,
      time,
      type,
      counselorId: counselorId,
      status: "Scheduled", // Status can be 'Scheduled', 'Completed', or 'Cancelled'
    });
    await appointment.save();
    const adminUser = await Counselor.findOne({ name: counselor });  
    const Booking = adminUser.Booking;
    Booking.push({
      type: "new-appointment",
      message: `New appointment request from ${clientName}`,
      onClickPath: "/appointments",
      data: {
        appointmentId: appointment._id,
        user: userId,
        clientName,
        time,
        type,
        counselorId,
        status: "Scheduled",
        email,
      },
    });
    await adminUser.save();
    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: email,
      subject: 'Appointment Request',
      text: `Dear ${clientName}, Your Appointment request with ${counselor} has been Booked, waiting for Counselor's confirmation.${appointment}`,
    });
    res.status(201).send({ appointments: appointment, appointmentId: appointment._id});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all appointments for the logged-in user
const getAppointments = async (req, res) => {
  const {userId} = req.user;

  try {
    const appointments = await Appointment.find({ user: userId });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all appointments
const getAllAppointments = async (req, res) => {
  const { counselorId } = req.user;
  try {
    const appointments = await Appointment.find({counselorId: counselorId});
    res.json(appointments);
  } catch (error) { 
    res.status(500).json({ message: error.message });
  }
}

module.exports = { createAppointment, getAppointments, getAllAppointments };
