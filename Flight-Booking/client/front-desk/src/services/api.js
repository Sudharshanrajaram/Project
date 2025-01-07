import axios from 'axios';

// Set base URL for the backend 

// Base API URL
const API_URL = 'https://project-1-5pcq.onrender.com/api';

// Search flights
export const searchFlights = async (criteria) => {
    try {
        const response = await axios.get(`${API_URL}/flights/search`, criteria);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Register user
export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/users/register`, userData);
    return response.data;
};

// Login user
export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/users/login`, userData);
    return response.data;
};


export const getPopularRoutes = async () => {
  try {
    const response = await axios.get(`${API_URL}/reports/popular-routes`);
    return response.data.routes;  // assuming the data structure has a 'routes' property
  } catch (error) {
    console.error('Error fetching popular routes:', error);
    throw error;
  }
};

// Function to get average booking value
export const getAverageBookingValue = async () => {
  try {
    const response = await axios.get(`${API_URL}/reports/average-booking-value`);
    return response.data.averagePrice;  // assuming the data has an 'averagePrice' property
  } catch (error) {
    console.error('Error fetching average booking value:', error);
    throw error;
  }
};

// Function to get cancellation rate
export const getCancellationRate = async () => {
  try {
    const response = await axios.get(`${API_URL}/reports/cancellation-rate`);
    return response.data.cancellationRate;  // assuming the data has 'cancellationRate'
  } catch (error) {
    console.error('Error fetching cancellation rate:', error);
    throw error;
  }
};

// Function to get user activity data
export const getUserActivity = async () => {
  try {
    const response = await axios.get(`${API_URL}/reports/user-activity`);
    return response.data.userActivity;  // assuming the data has 'userActivity'
  } catch (error) {
    console.error('Error fetching user activity:', error);
    throw error;
  }
};

