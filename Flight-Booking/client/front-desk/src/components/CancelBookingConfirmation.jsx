import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const CancelBookingConfirmation = () => {
    const [loading, setLoading] = useState(false);
    const [bookingDetails, setBookingDetails] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Fetch booking details based on the bookingId
    useEffect(() => {
        const fetchBookingDetails = async () => {
            const bookingId = localStorage.getItem('bookingId');
            try {
                const response = await axios.get(`http://localhost:5001/api/bookings/${bookingId}`, 
                 {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                });
                setBookingDetails(response.data);
                console.log(response.data);
            } catch (error) {
                setMessage('Error fetching booking details. Please try again later.');
            }
        };

        fetchBookingDetails();
    }, []);
    
    const cancelBooking = async () => {
        setLoading(true);
        setMessage('');
        const bookingId = localStorage.getItem('bookingId');
        try {
            const response = await axios.delete(`http://localhost:5001/api/bookings/delete/${bookingId}`,  {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            });

            setMessage(response.data.message);
            localStorage.removeItem('bookingId');
            navigate('/getBooking');  // Redirect to the bookings page after cancellation
        } catch (error) {
            setMessage('Error canceling booking. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto mt-10 p-8 bg-gradient-to-r from-blue-50 to-blue-200 rounded-lg shadow-2xl">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Cancel Booking</h2>

            {bookingDetails ? (
                <div className="bg-white p-6 rounded-lg shadow-xl ring-2 ring-gray-300 hover:ring-gray-400 transition-all duration-300">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">{bookingDetails.flightDetails.flightNumber}</h3>
                    <p className="text-gray-600"><strong>Booking ID :</strong> {bookingDetails._id}</p>
                    <p className="text-gray-600"><strong>Departure :</strong> {bookingDetails.flightDetails.departure}</p>
                    <p className="text-gray-600"><strong>Departure At :</strong> {new Date(bookingDetails.flightDetails.departureTime).toLocaleString()}</p>
                    <p className="text-gray-600"><strong>Arrival :</strong> {bookingDetails.flightDetails.arrival}</p>
                    <p className="text-gray-600"><strong>Arrival At :</strong> {new Date(bookingDetails.flightDetails.arrivalTime).toLocaleString()}</p>
                    <p className="text-gray-600"><strong>No Of Passengers :</strong> {bookingDetails.noOfPassengers}</p>
                    <p className="text-gray-600"><strong>Price:</strong> ₹{bookingDetails.flightDetails.price}</p>

                    {/* Cancellation confirmation */}
                    <p className="text-xl mt-6 mb-4 text-center text-red-600 font-semibold">Are you sure you want to cancel this booking?</p>

                    <div className="flex justify-center gap-6">
                        <button
                            onClick={cancelBooking}
                            disabled={loading}
                            className="bg-red-600 text-white py-2 px-8 rounded-lg text-sm font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors disabled:bg-gray-400"
                        >
                            {loading ? 'Cancelling...' : 'Yes, Cancel'}
                        </button>

                        <button
                            onClick={() => navigate('/getBooking')}
                            className="bg-gray-600 text-white py-2 px-8 rounded-lg text-sm font-semibold hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
                        >
                            No, Keep Booking
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-center text-lg text-gray-600">Loading booking details...</p>
            )}

            {message && (
                <p className={`mt-6 text-xl font-semibold text-center ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default CancelBookingConfirmation;
