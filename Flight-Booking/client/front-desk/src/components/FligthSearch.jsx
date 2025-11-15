import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

/**
 * FlightSearchPage.jsx
 * - Full UI + logic for searching, filtering, selecting and booking flights.
 * - Tailwind CSS classes used for styling.
 */

const FlightSearchPage = () => {
  const [flights, setFlights] = useState([]);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [loading, setLoading] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [selectedFlight, setSelectedFlight] = useState(null);

  const navigate = useNavigate();
  const { selectedFlightId, setSelectedFlightId } = useAuth();

  // ----- Helpers -----
  const formatTime = (iso) => {
    if (!iso) return "N/A";
    try {
      const d = new Date(iso);
      return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
      return iso;
    }
  };

  // ----- Search flights API call -----
  const searchFlights = async () => {
    // Minimal validation
    if (!origin || !destination) {
      alert("Please choose origin and destination.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        "https://project-1-5pcq.onrender.com/api/flights/search",
        {
          params: { origin, destination, date, minPrice, maxPrice, adults },
        }
      );

      // API contract: response.data.data = array of flights
      const data = response?.data?.data ?? [];
      setFlights(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching flights:", error);
      alert("Unable to fetch flights. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  // ----- Price filtering (client side) -----
  const filteredFlights = flights.filter((flight) => {
    const price = Number(flight?.price?.total ?? 0);
    return price >= Number(minPrice ?? 0) && price <= Number(maxPrice ?? Infinity);
  });

  // ----- Select a flight -----
  const handleSelectFlight = (flight) => {
    if (!flight) return;

    const selectedFlightData = {
      flightId: flight.id ?? flight._id ?? Math.random().toString(36).slice(2),
      departure: flight.itineraries?.[0]?.segments?.[0]?.departure?.iataCode || "N/A",
      departureTime: flight.itineraries?.[0]?.segments?.[0]?.departure?.at || "N/A",
      arrival: flight.itineraries?.[0]?.segments?.[0]?.arrival?.iataCode || "N/A",
      arrivalTime: flight.itineraries?.[0]?.segments?.[0]?.arrival?.at || "N/A",
      price: flight?.price?.total ?? 0,
      flightClass:
        flight.travelerPricings?.[0]?.fareDetailsBySegment?.[0]?.cabin || "N/A",
      flightNumber: flight.itineraries?.[0]?.segments?.[0]?.number || "N/A",
      availableSeats: flight.numberOfBookableSeats ?? 0,
    };

    setSelectedFlightId(selectedFlightData); // store in context for other pages
    setSelectedFlight(flight); // local selected state
  };

  // ----- Book flight (calls your setFlights endpoint) -----
  const bookFlight = async () => {
    // ensure something selected
    const userId = localStorage.getItem("userId");
    if (!selectedFlightId) {
      alert("Please select a flight first.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "https://project-1-5pcq.onrender.com/api/flights/setFlights",
        {
          selectedFlightId,
          userId,
        }
      );

      // backend returns booking info (assumed)
      console.log("Flight booked:", response?.data);
      // navigate to booking page or booking confirmation
      navigate("/booking");
    } catch (error) {
      console.error("Error booking flight:", error);
      alert("Failed to book flight. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Log selected flight for debugging (context-driven)
  useEffect(() => {
    // selectedFlightId comes from context — handy for debugging
    // eslint-disable-next-line no-console
    console.log("Selected flight in context:", selectedFlightId);
  }, [selectedFlightId]);

  return (
    <div className="bg-gradient-to-b from-indigo-700 to-blue-600 min-h-screen py-8 px-4 md:px-10">
      {/* Page title */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center text-white drop-shadow-lg mb-8">
        ✈️ Find Your Perfect Flight
      </h1>

      {/* Search card */}
      <div className="max-w-6xl mx-auto bg-white/20 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-2xl border border-white/10">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Search Flights</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Origin */}
          <div>
            <label className="block text-sm text-white mb-2">Origin</label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-600">🛫</span>
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full pl-10 p-3 rounded-xl bg-white/90 border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                aria-label="Origin airport"
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
                <option value="VNS">Varanasi (VNS)</option>
                <option value="ISU">Indore (ISU)</option>
                <option value="UDR">Udaipur (UDR)</option>
                <option value="IXB">Bagdogra (IXB)</option>
                <option value="IXA">Agartala (IXA)</option>
                <option value="IXE">Mangalore (IXE)</option>
                <option value="IXM">Madurai (IXM)</option>
                <option value="BHO">Bhopal (BHO)</option>
              </select>
            </div>
          </div>

          {/* Destination */}
          <div>
            <label className="block text-sm text-white mb-2">Destination</label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-600">🛬</span>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full pl-10 p-3 rounded-xl bg-white/90 border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                aria-label="Destination airport"
              >
                <option value="">Select Destination</option>
                <option value="DEL">Delhi (DEL)</option>
                <option value="BOM">Mumbai (BOM)</option>
                <option value="BLR">Bengaluru (BLR)</option>
                <option value="MAA">Chennai (MAA)</option>
                <option value="HYD">Hyderabad (HYD)</option>
                <option value="CCU">Kolkata (CCU)</option>
                <option value="GOI">Goa (GOI)</option>
                <option value="TRV">Thiruvananthapuram (TRV)</option>
                <option value="IXB">Bagdogra (IXB)</option>
                <option value="IXM">Madurai (IXM)</option>
                <option value="BHO">Bhopal (BHO)</option>
              </select>
            </div>
          </div>

          {/* Adults */}
          <div>
            <label className="block text-sm text-white mb-2">Adults</label>
            <input
              type="number"
              min={1}
              value={adults}
              onChange={(e) => setAdults(Math.max(1, Number(e.target.value)))}
              className="w-full p-3 rounded-xl bg-white/90 border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              aria-label="Number of adults"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm text-white mb-2">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/90 border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              aria-label="Travel date"
            />
          </div>
        </div>

        <button
          onClick={searchFlights}
          disabled={loading}
          className="w-full mt-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl text-lg font-semibold shadow-lg hover:from-indigo-700 hover:to-blue-800 transition"
        >
          {loading ? "Searching..." : "🔎 Search Flights"}
        </button>
      </div>

      {/* Price filter card */}
      <div className="max-w-5xl mx-auto mt-8 bg-white/20 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/10">
        <h3 className="text-white font-semibold mb-3">Filter by Price</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-white block mb-2">Min Price</label>
            <input
              type="number"
              min={0}
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value || 0))}
              className="w-full p-3 rounded-xl bg-white/90 border border-gray-200 outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-white block mb-2">Max Price</label>
            <input
              type="number"
              min={0}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value || 1000000))}
              className="w-full p-3 rounded-xl bg-white/90 border border-gray-200 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Flight results */}
      <div className="max-w-7xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFlights.length > 0 ? (
          filteredFlights.map((flight, idx) => {
            const flightId = flight.id ?? flight._id ?? idx;
            const isSelected = selectedFlight?.id === flight?.id || selectedFlightId?.flightId === flightId;

            const dep =
              flight.itineraries?.[0]?.segments?.[0]?.departure?.iataCode ?? "N/A";
            const arr =
              flight.itineraries?.[0]?.segments?.[0]?.arrival?.iataCode ?? "N/A";
            const depTime =
              flight.itineraries?.[0]?.segments?.[0]?.departure?.at ?? "N/A";
            const arrTime =
              flight.itineraries?.[0]?.segments?.[0]?.arrival?.at ?? "N/A";
            const flightNumber =
              flight.itineraries?.[0]?.segments?.[0]?.number ?? "N/A";
            const duration = flight.itineraries?.[0]?.duration ?? "N/A";
            const seats = flight.numberOfBookableSeats ?? 0;
            const cabin =
              flight.travelerPricings?.[0]?.fareDetailsBySegment?.[0]?.cabin ??
              "N/A";
            const price = flight.price?.total ?? 0;

            return (
              <div
                key={flightId}
                className={`bg-white rounded-2xl p-5 shadow-2xl transform transition hover:-translate-y-2
                  ${isSelected ? "ring-4 ring-green-400" : "border border-gray-200"}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-indigo-700">Flight {idx + 1}</h4>
                    <p className="text-sm text-gray-500">{flightNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-extrabold text-green-600">₹{price}</p>
                    <p className="text-xs text-gray-400">{duration}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 mb-4">
                  <div>
                    <p className="text-xs text-gray-400">Departure</p>
                    <p className="font-medium">{dep}</p>
                    <p className="text-xs text-gray-500">{formatTime(depTime)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Arrival</p>
                    <p className="font-medium">{arr}</p>
                    <p className="text-xs text-gray-500">{formatTime(arrTime)}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div>
                    <p><strong>Seats:</strong> {seats}</p>
                    <p><strong>Class:</strong> {cabin}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Available</p>
                    <p className="font-medium">{seats}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleSelectFlight(flight)}
                    className={`flex-1 py-3 rounded-xl font-semibold text-white transition
                      ${isSelected ? "bg-green-600" : "bg-indigo-600 hover:bg-indigo-700"}`}
                  >
                    {isSelected ? "Selected" : "Select Flight"}
                  </button>

                  <button
                    onClick={bookFlight}
                    className="flex-1 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition"
                  >
                    Book Flight
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center text-gray-200 py-8">
            {loading ? (
              <p>Loading flights...</p>
            ) : (
              <p className="text-lg">No flights available. Try different filters.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightSearchPage;
