import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Confirmation = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch user's bookings when component is mounted
        const fetchBookings = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('https://project-1-5pcq.onrender.com/api/bookings/history', {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                });

                setBookings(response.data);  // Assuming the response contains 'bookings'
            } catch (error) {
                setMessage('Error fetching bookings. Please try again later.');
            }
        };

        fetchBookings();
    }, []);

    const printReceipt = (bookingItem) => {
      const printWindow = window.open('', '', 'height=600,width=900');
      printWindow.document.write('<html><head><title>Booking Confirmation</title>');
      printWindow.document.write(`
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
          body {
            font-family: 'Poppins', sans-serif;
            background-color: #f8fafc;
            color: #333;
            margin: 0;
            padding: 0;
          }
          h1 {
            text-align: center;
            font-size: 28px;
            color: #2b2d42;
            margin-bottom: 20px;
          }
          .receipt-container {
            background-color: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            padding: 30px;
            max-width: 900px;
            margin: 30px auto;
            font-size: 16px;
          }
          .section-title {
            font-size: 22px;
            font-weight: 500;
            color: #2b2d42;
            margin-bottom: 15px;
            text-decoration: underline;
          }
          .details-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          .details-table th, .details-table td {
            padding: 12px;
            border: 1px solid #e4e7eb;
            text-align: left;
            font-size: 16px;
          }
          .details-table th {
            background-color: #f4f7fc;
            color: #2b2d42;
          }
          .details-table td {
            background-color: #fafafa;
          }
          .status {
            padding: 8px 15px;
            border-radius: 20px;
            font-weight: bold;
            text-transform: capitalize;
          }
          .status-paid {
            background-color: #4caf50;
            color: white;
          }
          .status-pending {
            background-color: #f44336;
            color: white;
          }
          .footer {
            text-align: center;
            margin-top: 25px;
            font-size: 14px;
            color: #888;
          }
          .footer a {
            color: #4a90e2;
            text-decoration: none;
          }
          @media print {
            body {
              background-color: white;
              margin: 0;
              padding: 0;
            }
            .no-print {
              display: none;
            }
          }
        </style>
      `);
      printWindow.document.write('</head><body>');
  
      printWindow.document.write(`
        <div class="receipt-container">
          <h1>Booking Confirmation</h1>
  
          <div class="section-title">Booking Details</div>
          <table class="details-table">
            <tr>
              <th>Booking ID</th>
              <td>${bookingItem._id}</td>
            </tr>
            <tr>
              <th>Flight Number</th>
              <td>${bookingItem.flightDetails.flightNumber}</td>
            </tr>
            <tr>
              <th>Departure</th>
              <td>${bookingItem.flightDetails.departure}</td>
            </tr>
            <tr>
              <th>Arrival</th>
              <td>${bookingItem.flightDetails.arrival}</td>
            </tr>
            <tr>
              <th>Departure Time</th>
              <td>${new Date(bookingItem.flightDetails.departureTime).toLocaleString()}</td>
            </tr>
            <tr>
              <th>Arrival Time</th>
              <td>${new Date(bookingItem.flightDetails.arrivalTime).toLocaleString()}</td>
            </tr>
            <tr>
              <th>Price</th>
              <td>₹${bookingItem.flightDetails.price}</td>
            </tr>
            <tr>
              <th>Flight Class</th>
              <td>${bookingItem.flightDetails.flightClass}</td>
            </tr>
            <tr>
              <th>No of Passengers</th>
              <td>${bookingItem.noOfPassengers}</td>
            </tr>
          </table>
  
          <div class="section-title">Passenger Details</div>
          <table class="details-table">
            ${bookingItem.passengers.map(passenger => `
              <tr>
                <th>Name</th>
                <td>${passenger.name}</td>
              </tr>
              <tr>
                <th>Age</th>
                <td>${passenger.age}</td>
              </tr>
            `).join('')}
          </table>
  
          <div class="section-title">Payment Status</div>
          <div class="status ${bookingItem.paymentStatus === 'Not Paid' ? 'status-pending' : 'status-paid'}">
            ${bookingItem.paymentStatus}
          </div>
  
          <div class="section-title">Booking Status</div>
          <p>${bookingItem.status}</p>
  
          <div class="section-title">Created At</div>
          <p>${new Date(bookingItem.createdAt).toLocaleString()}</p>
  
          <div class="footer">
            <p>Thank you for booking with us!</p>
            <p><a href="mailto:support@company.com">Contact Support</a> | <a href="http://company.com">Visit our website</a></p>
          </div>
        </div>
      `);
  
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
  };
  

    return (
        <div className="max-w-6xl mx-auto mt-8 p-8 border border-gray-200 rounded-lg shadow-2xl bg-white">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Your Bookings</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {bookings.map((booking) => (
                    <div key={booking._id} className="p-6 bg-gray-50 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-110">
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">{booking.flightDetails.flightNumber}</h3>
                        <p className="text-gray-600 mb-2"><strong>Departure:</strong> {booking.flightDetails.departure} - {new Date(booking.flightDetails.departureTime).toLocaleString()}</p>
                        <p className="text-gray-600 mb-2"><strong>Arrival:</strong> {booking.flightDetails.arrival} - {new Date(booking.flightDetails.arrivalTime).toLocaleString()}</p>
                        <p className="text-gray-600 mb-2"><strong>Price:</strong> ₹{booking.flightDetails.price}</p>
                        <p className="text-gray-600 mb-4"><strong>Status:</strong> {booking.status}</p>
                        <button onClick={() => printReceipt(booking)} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
                            Print
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Confirmation;
