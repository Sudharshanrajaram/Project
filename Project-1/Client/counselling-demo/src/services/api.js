import axios from 'axios';


const API_URL = 'http://localhost:5000/api';

export const registerUser = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/auth/register`, {name, email, password });
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data;
};

export const registerCounselor = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/counselor/register`, {name, email, password });
  return response.data;
};

export const loginCounselor = async (email, password) => {
  const response = await axios.post(`${API_URL}/counselor/login`, { email, password });
  return response.data;
};

export const getUserProfile = async () => {
  const response = await axios.get(`${API_URL}/auth/profile`, {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });
  return response.data;
};

// Appointment functions
export const createAppointment = async (data) => {
 const  response = await axios.post(`${API_URL}/appointments`,data,{
    headers: {
      Authorization: localStorage.getItem('token'),
    },
 });
 return response.data;
};
