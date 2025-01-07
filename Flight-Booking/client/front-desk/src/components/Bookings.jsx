import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/UserContext';

const CancelBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const { setSetId } = useAuth();

    const handleSet = (booking) => {
        localStorage.setItem('bookingId', booking._id);
    };

    useEffect(() => {
        // Fetch user's bookings when component is mounted
        const fetchBookings = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:5001/api/bookings/history', {
                    headers: {
                        Authorization: token,
                    },
                });

                setBookings(response.data);
                console.log(response.data);
            } catch (error) {
                setMessage('Error fetching bookings. Please try again later.');
            }
        };

        fetchBookings();
    }, []);

    return (
        <div className="max-w-7xl mx-auto mt-10 p-8 bg-gradient-to-r from-blue-50 to-blue-200 rounded-lg shadow-2xl">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Your Bookings</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.map((booking) => (
                    <div key={booking._id} className="p-6 bg-white rounded-lg shadow-xl hover:shadow-2xl transition-all ease-in-out transform hover:scale-105">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">{booking.flightDetails.flightNumber}</h3>
                        <p className="text-gray-600"><strong>Booking ID :</strong> {booking._id}</p>
                        <p className="text-gray-600"><strong>Departure:</strong> {new Date(booking.flightDetails.departureTime).toLocaleString()}</p>
                        <p className="text-gray-600"><strong>Arrival:</strong> {new Date(booking.flightDetails.arrivalTime).toLocaleString()}</p>
                        <p className="text-gray-600"><strong>Price:</strong> ₹{booking.flightDetails.price}</p>
                        
                        {/* Status indicator with colors */}
                        <p className={`text-lg font-semibold ${booking.status === 'Cancelled' ? 'text-red-600' : 'text-green-600'}`}>
                            <strong>Status:</strong> {booking.status}
                        </p>

                        {/* Display passengers' details */}
                        <div className="mt-4">
                            <h4 className="text-lg font-semibold text-gray-700">Passenger Details</h4>
                            {booking.passengers.map((passenger, index) => (
                                <div key={index} className="text-gray-600">
                                    <p><strong>Name:</strong> {passenger.name}</p>
                                    <p><strong>Age:</strong> {passenger.age}</p>
                                </div>
                            ))}
                        </div>

                        {booking.status !== 'Cancelled' && (
                            <div className="mt-6 flex gap-4">
                                {/* Redirect user to cancel booking confirmation page */}
                                <Link to={`/cancel`}>
                                    <button
                                        className="bg-red-600 text-white py-2 px-6 rounded-lg text-sm font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors"
                                        onClick={() => handleSet(booking)}
                                    >
                                        Cancel Booking
                                    </button>
                                </Link>
                                <Link to='/print'>
                                    <button className="bg-indigo-600 text-white py-2 px-6 rounded-lg text-sm font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors">
                                        Print Details
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {message && (
                <p className={`mt-6 text-xl font-semibold text-center ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default CancelBooking;
