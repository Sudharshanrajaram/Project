import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const FlightSearchPage = () => {
  const [flights, setFlights] = useState([]);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [loading, setLoading] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [selectedFlight, setSelectedFlight] = useState(null);  // State for the selected flight
  const navigate = useNavigate();
  const { selectedFlightId, setSelectedFlightId } = useAuth();

  // Search for flights from the API
  const searchFlights = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5001/api/flights/search', {
        params: { origin, destination, date, minPrice, maxPrice, adults },
      });
      setFlights(response.data.data);
    } catch (error) {
      console.error('Error fetching flights:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter flights based on price range
  const filteredFlights = flights.filter((flight) => {
    const price = flight.price.total;
    return price >= minPrice && price <= maxPrice;
  });
  const userId  = localStorage.getItem('userId');
  // Book the selected flight
  const bookFlight = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/flights/setFlights', {
        selectedFlightId,
        userId
      });
      console.log('Flight booked:', response.data);
      navigate('/booking');
    } catch (error) {
      console.error('Error booking flight:', error);
    }
  };

  // Handle selecting a flight
  const handleSelectFlight = (flight) => {
    const selectedFlightData = {
      flightId: flight.id,
      departure: flight.itineraries?.[0]?.segments?.[0]?.departure?.iataCode || 'N/A',
      departureTime: flight.itineraries?.[0]?.segments?.[0]?.departure?.at || 'N/A',
      arrival: flight.itineraries?.[0]?.segments?.[0]?.arrival?.iataCode || 'N/A',
      arrivalTime: flight.itineraries?.[0]?.segments?.[0]?.arrival?.at || 'N/A',
      price: flight.price?.total || 0,
      flightClass: flight.travelerPricings?.[0]?.fareDetailsBySegment?.[0]?.cabin || 'N/A',
      flightNumber: flight.itineraries?.[0]?.segments?.[0]?.number || 'N/A',
      availableSeats: flight.numberOfBookableSeats || 0,
    };
    setSelectedFlightId(selectedFlightData);
    setSelectedFlight(flight);  // Update selected flight state
    console.log('Selected flight details:', selectedFlightData);
  };

  // Only re-run when `selectedFlightDetails` changes
  useEffect(() => {
    console.log('Selected flight details:', selectedFlightId);
  }, [selectedFlightId]);

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-blue-500 min-h-screen p-8">
  <h1 className="text-5xl font-extrabold text-center text-white mb-10">Find Your Perfect Flight</h1>

  {/* Search filters */}
  <div className="max-w-screen-lg mx-auto bg-white p-8 rounded-2xl shadow-lg">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Origin</label>
        <select
          type="text"
          placeholder="Origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="w-full p-4 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="">Select Origin</option>
          <option value="PNQ">Pune (PNQ)</option>
        <option value="IXC">Chandigarh (IXC)</option>
        <option value="DEL">Delhi (DEL)</option>
        <option value="BOM">Mumbai (BOM)</option>
        <option value="BLR">Bengaluru (BLR)</option>
        <option value="MAA">Chennai (MAA)</option>
        <option value="CCU">Kolkata (CCU)</option>
        <option value="HYD">Hyderabad (HYD)</option>
        <option value="GOI">Goa (GOI)</option>
        <option value="AMD">Ahmedabad (AMD)</option>
        <option value="TRV">Thiruvananthapuram (TRV)</option>
        <option value="VTZ">Visakhapatnam (VTZ)</option>
        <option value="COK">Kochi (COK)</option>
        <option value="PNY">Pondicherry (PNY)</option>
        <option value="IXR">Ranchi (IXR)</option>
        <option value="JAI">Jaipur (JAI)</option>
        <option value="NAG">Nagpur (NAG)</option>
        <option value="BLK">Bhilai (BLK)</option>
        <option value="STV">Surat (STV)</option>
        <option value="LUH">Ludhiana (LUH)</option>
        <option value="VNS">Varanasi (VNS)</option>
        <option value="ISU">Indore (ISU)</option>
        <option value="UDR">Udaipur (UDR)</option>
        <option value="IXB">Bagdogra (IXB)</option>
        <option value="IXA">Agartala (IXA)</option>
        <option value="IXE">Mangalore (IXE)</option>
        <option value="IXM">Madurai (IXM)</option>
        <option value="BHO">Bhopal (BHO)</option>
        <option value="GAY">Gaya (GAY)</option>
        <option value="SXR">Srinagar (SXR)</option>
        <option value="IXD">Prayagraj (IXD)</option>
        <option value="PAT">Patna (PAT)</option>
        <option value="IMF">Imphal (IMF)</option>
        <option value="IXT">Tezu (IXT)</option>
        <option value="IXL">Leh (IXL)</option>
        <option value="IXN">Kohima (IXN)</option>
        <option value="GWL">Gwalior (GWL)</option>
        <option value="IXC">Chandigarh (IXC)</option>
        <option value="VGA">Vijayawada (VGA)</option>
        <option value="BOM">Mumbai (BOM)</option>
        <option value="DEL">Delhi (DEL)</option>
        <option value="BLR">Bengaluru (BLR)</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Destination</label>
        <select
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full p-4 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
        <option value="">Select Destination</option>
        <option value="PNQ">Pune (PNQ)</option>
        <option value="IXC">Chandigarh (IXC)</option>
        <option value="DEL">Delhi (DEL)</option>
        <option value="BOM">Mumbai (BOM)</option>
        <option value="BLR">Bengaluru (BLR)</option>
        <option value="MAA">Chennai (MAA)</option>
        <option value="CCU">Kolkata (CCU)</option>
        <option value="HYD">Hyderabad (HYD)</option>
        <option value="GOI">Goa (GOI)</option>
        <option value="AMD">Ahmedabad (AMD)</option>
        <option value="TRV">Thiruvananthapuram (TRV)</option>
        <option value="VTZ">Visakhapatnam (VTZ)</option>
        <option value="COK">Kochi (COK)</option>
        <option value="PNY">Pondicherry (PNY)</option>
        <option value="IXR">Ranchi (IXR)</option>
        <option value="JAI">Jaipur (JAI)</option>
        <option value="NAG">Nagpur (NAG)</option>
        <option value="BLK">Bhilai (BLK)</option>
        <option value="STV">Surat (STV)</option>
        <option value="LUH">Ludhiana (LUH)</option>
        <option value="VNS">Varanasi (VNS)</option>
        <option value="ISU">Indore (ISU)</option>
        <option value="UDR">Udaipur (UDR)</option>
        <option value="IXB">Bagdogra (IXB)</option>
        <option value="IXA">Agartala (IXA)</option>
        <option value="IXE">Mangalore (IXE)</option>
        <option value="IXM">Madurai (IXM)</option>
        <option value="BHO">Bhopal (BHO)</option>
        <option value="GAY">Gaya (GAY)</option>
        <option value="SXR">Srinagar (SXR)</option>
        <option value="IXD">Prayagraj (IXD)</option>
        <option value="PAT">Patna (PAT)</option>
        <option value="IMF">Imphal (IMF)</option>
        <option value="IXT">Tezu (IXT)</option>
        <option value="IXL">Leh (IXL)</option>
        <option value="IXN">Kohima (IXN)</option>
        <option value="GWL">Gwalior (GWL)</option>
        <option value="IXC">Chandigarh (IXC)</option>
        <option value="VGA">Vijayawada (VGA)</option>
        <option value="BOM">Mumbai (BOM)</option>
        <option value="DEL">Delhi (DEL)</option>
        <option value="BLR">Bengaluru (BLR)</option>

        </select>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">No of Adults</label>
        <input
          type="number"
          placeholder="No of Adults"
          value={adults}
          onChange={(e) => setAdults(e.target.value)}
          className="w-full p-4 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-4 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
    </div>

    {/* Search Button */}
    <button
      onClick={searchFlights}
      disabled={loading}
      className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
    >
      {loading ? 'Searching...' : 'Search Flights'}
    </button>
  </div>

  {/* Price Range Filter */}
  <div className="max-w-screen-lg mx-auto mt-8 bg-white p-8 rounded-2xl shadow-lg">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter Flights by Price</h2>
    <div className="flex gap-6 mb-6">
      <div className="space-y-2 w-full">
        <label className="text-sm font-medium text-gray-700">Min Price</label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(parseFloat(e.target.value))}
          className="w-full p-4 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          min={0}
        />
      </div>
      <div className="space-y-2 w-full">
        <label className="text-sm font-medium text-gray-700">Max Price</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
          className="w-full p-4 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          min={0}
        />
      </div>
    </div>
  </div>

  {/* Display Filtered Flights */}
  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    {filteredFlights.length > 0 ? (
      filteredFlights.map((flight, index) => (
        <div
          key={flight.id}
          className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 p-6 ${selectedFlight?.id === flight.id ? 'border-4 border-blue-600' : ''}`}
        >
          <h2 className="text-2xl text-center font-semibold text-blue-600 mb-4">Flight {index + 1}</h2>

          <div className="space-y-4">
            <p><strong>Departure:</strong> {flight.itineraries?.[0]?.segments?.[0]?.departure?.iataCode}</p>
            <p><strong>Arrival:</strong> {flight.itineraries?.[0]?.segments?.[0]?.arrival?.iataCode}</p>
            <p><strong>Departure Time:</strong> {flight.itineraries?.[0]?.segments?.[0]?.departure?.at}</p>
            <p><strong>Arrival Time:</strong> {flight.itineraries?.[0]?.segments?.[0]?.arrival?.at}</p>
            <p><strong>Flight Number:</strong> {flight.itineraries?.[0]?.segments?.[0]?.number}</p>
            <p><strong>Price:</strong> ₹{flight.price?.total}</p>
            <p><strong>Duration:</strong> {flight.itineraries?.[0]?.duration}</p>
            <p><strong>Available Seats:</strong> {flight.numberOfBookableSeats}</p>
            <p><strong>Flight Class:</strong> {flight.travelerPricings?.[0]?.fareDetailsBySegment?.[0]?.cabin}</p>
          </div>

          <div className="flex gap-6 items-center mt-4">
            <button
              onClick={() => handleSelectFlight(flight)}
              className={`w-full py-3 rounded-xl text-white transition duration-300 ${selectedFlight?.id === flight.id ? 'bg-green-600' : 'bg-blue-600 hover:bg-green-700'}`}
            >
              {selectedFlight?.id === flight.id ? 'Selected' : 'Select Flight'}
            </button>
            <button
              onClick={bookFlight}
              className="w-full py-3 rounded-xl bg-green-600 text-white hover:bg-green-700 transition duration-300"
            >
              Book Flight
            </button>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center text-lg text-gray-600">No flights available based on your search criteria.</p>
    )}
  </div>
</div>

  );
};

export default FlightSearchPage;
