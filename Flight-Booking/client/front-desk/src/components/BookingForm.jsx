import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/UserContext';

const BookingForm = () => {
  const [noOfPassengers, setNoOfPassengers] = useState(1);
  const [flightDetails, setFlightDetails] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [passengerDetails, setPassengerDetails] = useState([{ name: '', age: '' }]); // Initialize with one passenger
  const { payment, setPayment, amount, setAmount } = useAuth();
  
  const navigate = useNavigate();

  // Fetch all available flight details
  const fetchDetails = async () => {
    try {
      const response = await axios.get('https://project-1-5pcq.onrender.com/api/flights/get', {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      setFlightDetails(response.data);
    } catch (error) {
      console.error('Error fetching flight details:', error);
    }
  };
  const addPassenger = () => {
    setPassengerDetails([...passengerDetails, { name: '', age: '' }]);
  };

  // Remove a passenger input field
  const removePassenger = (index) => {
    const updatedPassengers = passengerDetails.filter((_, i) => i !== index);
    setPassengerDetails(updatedPassengers);
  };

  // Handle input changes for passenger name and age
  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengerDetails];
    updatedPassengers[index][field] = value;
    setPassengerDetails(updatedPassengers);
  };

  // Handle booking submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFlight) {
      alert('Please select a flight to book.');
      return;
    }
    
    try {
      if (payment === 0) {
        alert('Please Click book and pay before enter details.');
        navigate('/pay');
        return;
      }
      const userId = localStorage.getItem('userId');
      const response = await axios.post('https://project-1-5pcq.onrender.com/api/bookings', {
        userId, // Assuming user is authenticated
        flightDetails: selectedFlight.flightDetails,
        passengers: passengerDetails,
        noOfPassengers // Pass the passenger details
      }, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      console.log('Booking Response:', response.data);
      alert('Flight booked successfully!');
      navigate('/getBooking');
      setPayment(0);
    } catch (error) {
      console.error('Error booking flight:', error);
    }
  };
  
  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
    const price = flight.flightDetails.price;
    console.log('Price:', price);
    setAmount(price * noOfPassengers);
    console.log('Amount:', amount);
    console.log('Selected Flight:', flight);
  };

  const deSelect = () => {
    setSelectedFlight(null);
  };

  // Add a new passenger input field
 

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div className="p-6 md:p-10 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg font-sans">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-600 tracking-wide">Bookings</h1>

      {/* If no flight selected, prompt the user */}
      {!selectedFlight && (
        <p className="text-xl text-center mb-4 text-gray-700">Please select a flight to proceed with booking.</p>
      )}

      {/* Display flight details in a responsive grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {flightDetails.length > 0 ? (
          flightDetails.map((flight) => (
            <div
              key={flight.flightId}
              className="border border-gray-300 p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-200 transition-all transform hover:scale-105 duration-300"
            >
              <h2 className="text-2xl font-semibold mb-2 text-blue-600">{flight.flightDetails.flightNumber}</h2>
              <p className="text-gray-700 mb-2">{flight.flightDetails.departure} - {flight.flightDetails.arrival}</p>
              <p className="text-gray-700 mb-2">
                <span className="font-bold">Departure:</span> {new Date(flight.flightDetails.departureTime).toLocaleString()} - 
                <span className="font-bold"><br /> Arrival:</span> {new Date(flight.flightDetails.arrivalTime).toLocaleString()}
              </p>
              <p className="text-gray-700 mb-2">Price: ₹{flight.flightDetails.price}</p>
              <p className="text-gray-700 mb-2">Available Seats: {flight.flightDetails.availableSeats}</p>
              <p className="text-gray-700 mb-2">Class: {flight.flightDetails.flightClass}</p>
              <p className="text-gray-700 mb-2">ID: {flight.flightDetails.flightId}</p>
              {/* Select button with dynamic color change */}
              <button
                onClick={() => handleSelectFlight(flight)}
                className="mt-4 px-4 py-2 text-white rounded-md bg-green-600 hover:bg-green-700 transition-all duration-300"
              >
                Select Flight
              </button>
              <button 
                onClick={deSelect} 
                className="mt-4 px-4 py-2 text-white rounded-md bg-blue-600 hover:bg-blue-700 transition-all duration-300 ml-3"
              >
                UnSelect
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-gray-600">No flights available.</p>
        )}
      </div>

      {selectedFlight && (
        <div className="mt-6 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Booking Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="noOfPassengers" className="block text-gray-700 font-semibold mb-2">
                Number of Passengers
              </label>
              <input
                type="number"
                id="noOfPassengers"
                value={noOfPassengers}
                onChange={(e) => setNoOfPassengers(e.target.value)}
                className="border border-gray-400 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-lg"
                min="1"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="passengerDetails" className="block text-gray-700 font-semibold mb-2">
                Passenger Details
              </label>
              {passengerDetails.map((passenger, index) => (
                <div key={index} className="mb-4">
                  <input
                    type="text"
                    placeholder="Name"
                    value={passenger.name}
                    onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                    className="border border-gray-400 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-lg mb-2"
                  />
                  <input
                    type="number"
                    placeholder="Age"
                    value={passenger.age}
                    onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                    className="border border-gray-400 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-lg"
                  />
                  {passengerDetails.length > 1 && (
                    <button 
                      type="button"
                      onClick={() => removePassenger(index)}
                      className="mt-2 px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                    >
                      Remove Passenger
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addPassenger}
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Add Another Passenger
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white py-3 px-6 rounded-full shadow-lg hover:from-blue-500 hover:via-indigo-400 hover:to-purple-500 transform hover:scale-105 transition-all duration-300 flex justify-center items-center space-x-2 font-semibold tracking-wide text-lg"
            >
              <span>Book Flight</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 4.5a.75.75 0 011.5 0v7.793l2.147-2.146a.75.75 0 111.061 1.06l-3.5 3.5a.75.75 0 01-1.061 0l-3.5-3.5a.75.75 0 111.06-1.061L8.5 12.293V4.5a.75.75 0 011.5 0v7.793l2.147-2.146a.75.75 0 111.061 1.06l-3.5 3.5a.75.75 0 01-1.061 0l-3.5-3.5a.75.75 0 111.06-1.061L8.5 12.293V4.5z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
