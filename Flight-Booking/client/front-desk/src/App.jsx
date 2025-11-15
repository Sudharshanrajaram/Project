import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { UserProvider } from './context/UserContext';
import './App.css';
import FlightSearch from './components/FligthSearch';
import BookingForm from './components/BookingForm';
import Bookings from './components/Bookings';
import Confirmation from './components/Confirmation';
import ReportsDashboard from './components/ReportsDashboard';
import Payment from './components/Payment';
import CancelBookingConfirmation from './components/CancelBookingConfirmation';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/flightSearch" element={<FlightSearch />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="/booking"
            element={
              <PrivateRoute>
                <BookingForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/getBooking"
            element={
              <PrivateRoute>
                <Bookings />
              </PrivateRoute>
            }
          />
          <Route
            path="/print"
            element={
              <PrivateRoute>
                <Confirmation />
              </PrivateRoute>
            }
          />
          <Route
            path="/report"
            element={
              <PrivateRoute>
                <ReportsDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/pay"
            element={
              <PrivateRoute>
                <Payment />
              </PrivateRoute>
            }
          />
          <Route
            path="/cancel"
            element={
              <PrivateRoute>
                <CancelBookingConfirmation />
              </PrivateRoute>
            }
          />
        </Routes>
      </UserProvider>
    </Router>
  );
};

export default App;
