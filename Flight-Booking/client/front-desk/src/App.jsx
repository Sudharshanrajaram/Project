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

const App = () => {
    return (
        
            <Router>
                <UserProvider>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/flightSearch" element={<FlightSearch />} />
                    <Route path="/booking" element={<BookingForm />} />
                    <Route path="/getBooking" element={<Bookings />} />
                    <Route path="/print" element={<Confirmation />} />
                    <Route path="/report" element={<ReportsDashboard />} />
                    <Route path="/pay" element={<Payment />} />
                    <Route path="/cancel" element={<CancelBookingConfirmation />} />
                </Routes>
                </UserProvider>
            </Router>
        
    );
};

export default App;
