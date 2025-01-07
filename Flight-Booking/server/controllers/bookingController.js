// Required modules
const nodemailer = require('nodemailer'); // For sending emails
const pdfkit = require('pdfkit'); // For generating PDF
const fs = require('fs'); // For file system operations
const path = require('path'); // For handling file paths
const Booking = require('../models/booking'); // Your Booking model
const User = require('../models/user'); // Your User model
require('dotenv').config(); // Load environment variables from .env

// Set up Nodemailer transporter (using Gmail as an example)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  // Email user from .env
    pass: process.env.EMAIL_PASS,  // Email password (use App Password if 2FA is enabled)
  },
});

// Create Booking
const createBooking = async (req, res) => {
  const { flightDetails, passengers, noOfPassengers } = req.body;
  const { userId } = req.user;

  try {
    const totalPrice = flightDetails.price * noOfPassengers;
    const booking = new Booking({
      userId,
      flightDetails,
      noOfPassengers: passengers.length,
      passengers,
      totalPrice,
    });

    // Fetch user data and link the booking
    const user = await User.findById(userId);
    user.bookings.push(booking._id);
    await user.save();

    booking.status = 'Confirmed';
    booking.paymentStatus = 'Paid';
    await booking.save();

    // Prepare booking details for email
    const bookingDetails = `
      Booking ID: ${booking._id}
      Flight: ${booking.flightDetails.flightNumber}
      Departure: ${booking.flightDetails.departure}
      Arrival: ${booking.flightDetails.arrival}
      Passengers: ${passengers.map(p => `${p.name} (Age: ${p.age})`).join(', ')}
      Total Price: ${totalPrice} INR
      Status: ${booking.status}
      Payment Status: ${booking.paymentStatus}
    `;

    // Send booking confirmation email
    await sendBookingConfirmationEmail(user.email, bookingDetails);

    // Generate and send PDF receipt
    const pdfPath = await generateReceiptPDF(booking);
    await sendReceiptEmail(user.email, pdfPath);

    res.status(201).json({ booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

// Send Booking Confirmation Email
const sendBookingConfirmationEmail = async (userEmail, bookingDetails) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Booking Confirmation',
    text: `Your booking has been confirmed!\n\n${bookingDetails}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Booking confirmation email sent!');
  } catch (error) {
    console.error('Error sending booking confirmation email:', error);
  }
};

// Generate PDF Receipt
const generateReceiptPDF = async (booking) => {
  const doc = new pdfkit();
  const pdfDirectory = path.join(__dirname, '../receipts');
  const pdfPath = path.join(pdfDirectory, `receipt_${booking._id}.pdf`);

  // Ensure the receipts directory exists
  if (!fs.existsSync(pdfDirectory)) {
    fs.mkdirSync(pdfDirectory, { recursive: true });
  }

  // Pipe the PDF output to a file
  doc.pipe(fs.createWriteStream(pdfPath));
  doc.fontSize(30).font('Helvetica-Bold').fillColor('#007bff').text('Booking Receipt', { align: 'center' });
  doc.moveDown(1);

  // Add a horizontal line after the title
  doc.moveTo(50, doc.y).lineTo(550, doc.y).strokeColor('#007bff').lineWidth(2).stroke();
  doc.moveDown(1); // Add some space after the line

  // Booking Information Section
  doc.fontSize(16).font('Helvetica-Bold').text('Booking Information:', { underline: true });
  doc.fontSize(12).font('Helvetica').text(`Booking ID: ${booking._id}`);
  doc.text(`Flight Number: ${booking.flightDetails.flightNumber}`);
  doc.text(`Departure: ${booking.flightDetails.departure}`);
  doc.text(`Departure Time: ${booking.flightDetails.departureTime}`);
  doc.text(`Arrival: ${booking.flightDetails.arrival}`);
  doc.text(`Arrival Time: ${booking.flightDetails.arrivalTime}`);
  doc.moveDown(1); // Space between sections

  // Passenger Details Section
  doc.fontSize(16).font('Helvetica-Bold').text('Passenger Details:', { underline: true });
  booking.passengers.forEach((passenger, index) => {
    doc.fontSize(12).font('Helvetica').text(`Passenger ${index + 1}: ${passenger.name}, Age: ${passenger.age}`);
  });
  doc.moveDown(1); // Space between sections

  // Passenger and Pricing Section
  doc.fontSize(16).font('Helvetica-Bold').text('Passenger & Pricing Details:', { underline: true });
  doc.fontSize(12).font('Helvetica').text(`No. of Passengers: ${booking.noOfPassengers}`);
  doc.text(`Total Price: ₹${booking.totalPrice}`);
  doc.moveDown(1); // Space between sections

  // Booking Status Section
  doc.fontSize(16).font('Helvetica-Bold').text('Booking Status:', { underline: true });
  doc.fontSize(12).font('Helvetica').text(`Status: ${booking.status}`);
  doc.text(`Payment Status: ${booking.paymentStatus}`);
  doc.moveDown(1); // Space between sections

  // Add a colored footer
  doc.moveTo(50, doc.y).lineTo(550, doc.y).strokeColor('#007bff').lineWidth(2).stroke();
  doc.moveDown(1); // Space after the line before footer

  // Footer Section
  doc.fontSize(10).font('Helvetica-Oblique').fillColor('#555555').text('Thank you for booking with us! For any inquiries, please contact support@yourcompany.com', {
    align: 'center',
    italic: true,
  });
  doc.end();

  return pdfPath;
};

// Send PDF Receipt Email
const sendReceiptEmail = async (userEmail, pdfPath) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Booking Receipt',
    text: 'Please find attached your booking receipt.',
    attachments: [
      {
        filename: `receipt_${path.basename(pdfPath)}`,
        path: pdfPath,
        contentType: 'application/pdf',
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Receipt email sent!');
  } catch (error) {
    console.error('Error sending receipt email:', error);
  }
};

// Get Booking History for a User
const getBookingHistory = async (req, res) => {
  const { userId } = req.user;
  try {
    const bookings = await Booking.find({ userId });
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving booking history' });
  }
};

// Cancel a Booking
const cancelBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Cancel the booking
    booking.status = 'Cancelled';
    booking.paymentStatus = 'Refunded';
    booking.refundDate = new Date();
    await booking.save();

    // Send cancel confirmation email
    const cancelDetails = `
      Your booking (ID: ${booking._id}) has been cancelled.
      Refund Status: ${booking.paymentStatus}
      Refund Date: ${booking.refundDate}
    `;
    await sendCancelConfirmationEmail(booking.userId, cancelDetails);

    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error cancelling booking' });
  }
};

// Send Cancellation Confirmation Email
const sendCancelConfirmationEmail = async (userId, cancelDetails) => {
  try {
    const user = await User.findById(userId);
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Booking Cancellation Confirmation',
      text: `Your booking has been cancelled.\n\n${cancelDetails}`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Cancellation confirmation email sent!');
  } catch (error) {
    console.error('Error sending cancellation confirmation email:', error);
  }
};

// Fetch Booking Details
const fetchBookingDetails = async (req, res) => {
  const { bookingId } = req.params;
  try {
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching booking details' });
  }
};

module.exports = { 
  createBooking, 
  getBookingHistory, 
  cancelBooking, 
  fetchBookingDetails 
};
