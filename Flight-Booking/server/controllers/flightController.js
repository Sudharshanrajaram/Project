// controllers/flightController.js
const axios = require("axios");
const Flight = require("../models/flight");

// Helper function to get the Amadeus API access token
async function getAmadeusAccessToken() {
  try {
    const response = await axios.post(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.AMADEUS_API_KEY, // Your Amadeus API client_id
        client_secret: process.env.AMADEUS_API_SECRET, // Your Amadeus API client_secret
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    return response.data.access_token; // Return the access token
  } catch (error) {
    console.error("Error getting Amadeus access token", error);
    throw new Error("Unable to get access token");
  }
}

// Function to search for flights using the Amadeus API
const getFlights = async (req, res) => {
  const {
    origin,
    destination,
    date,
    adults,
    currencyCode = "INR",
    minPrice,
    maxPrice,
  } = req.query;

  if (!origin || !destination || !date) {
    return res
      .status(400)
      .json({ error: "Origin, destination, and date are required" });
  }

  try {
    // Get Amadeus access token
    const accessToken = await getAmadeusAccessToken();

    // Send the request to Amadeus Flight Offers Search endpoint
    const response = await axios.get(
      "https://test.api.amadeus.com/v2/shopping/flight-offers",
      {
        params: {
          originLocationCode: origin, // e.g., JFK (New York)
          destinationLocationCode: destination, // e.g., LHR (London)
          departureDate: date, // e.g., 2024-04-15
          adults: adults, // Number of adults
          currencyCode: currencyCode, // Currency code (optional)
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // Use the access token in the Authorization header
        },
      }
    );
    const filteredFlights = response.data.data.filter((flight) => {
      const price = flight.price.total;
      return price >= minPrice && price <= maxPrice;
    });

    // Return the flight data as a JSON response
    res.json(response.data);
  } catch (error) {
    console.error("Error searching flights", error);
    res.status(500).json({ error: "Error searching flights" });
  }
};

const setFlights = async (req, res) => {
  const { selectedFlightId, userId } = req.body;
  try {
    const flight = new Flight({ flightDetails: selectedFlightId, userId });
    await flight.save();
    res.status(201).json({ flight, _id: flight._id });
  } catch (error) {
    res.status(500).json({ error: "Error setting flights", error });
    console.error("Error setting flights", error);
  }
};

const getFlightDetails = async (req, res) => {
  const { userId } = req.user;
  try {
    const flights = await Flight.find({ userId });
    res.json(flights);
  } catch (error) {
    res.status(500).json({ error: "Error fetching flights", error });
    console.error("Error fetching flights", error);
  }
};

module.exports = { getFlights, setFlights, getFlightDetails };
