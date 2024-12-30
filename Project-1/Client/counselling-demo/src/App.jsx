// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Payment from './pages/Payment';
import VideoCall from './components/VideoCall';
import AppointmentForm from './components/AppointmentForm';
import './App.css';
import SessionNotes from './components/SessionNotes';
import CounselorRegister from './pages/CounselorRegister';
import CounselorLogin from './pages/CounselorLogin';
import CounselorDash from './pages/CounselorDash';
import { AuthProvider } from './context/AuthProvider';
import GetSessionNotes from './components/GetSessionNotes';
import ChatContainer from './components/ChatContainer';
import ChatLists from './components/ChatList';
import UserLogin from './components/UserLogin';
import InputText from './components/InputText';
import Booking from './pages/Booking';


const App = () => {
  return (
    <div className='bg-[#D9EAFD] '>
    <Router>
      <Navbar />
      <div className=" pb-10">
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/payment" element={
            <AuthProvider>
            <Payment />
          </AuthProvider>}  />
          <Route path="/chat" element={<ChatContainer />} />
          <Route path="/video-call" element={<VideoCall />} />
          <Route path="/form" element={
          <AuthProvider>
            <AppointmentForm />
          </AuthProvider>} />
          <Route path='/notes' element={<SessionNotes />} />
          <Route path='/Clogin' element={<CounselorLogin />} />
          <Route path='/Cregister' element={<CounselorRegister />} />
          <Route path='/Cdashboard' element={<CounselorDash />} />
          <Route path='/getNotes' element={<GetSessionNotes />} />
          <Route path="/chat1" element={<ChatLists />} />
          <Route path="/chat2" element={<UserLogin />} />
          <Route path="/chat3" element={<InputText />} />
          <Route path="/Cbooking" element={<Booking />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
};

export default App;
