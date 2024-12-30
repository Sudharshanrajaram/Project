// src/components/VideoCall.jsx
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { message } from 'antd';

const VideoCall = () => {
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [counselorName, setCounselorName] = useState('');
  const [email, setEmail] = useState('');
  const [jwtToken, setJwtToken] = useState('');
  const [error, setError] = useState('');
  const [meetingLink, setMeetingLink] = useState('');

  const generateJWT = async(req,res) => {
    if (!username || !roomName) {
      message.error('Both username and room name are required.');
      setError('Both username and room name are required.');
      return;
    }

    setError('');
    const response = await axios.post('http://localhost:5000/api/meet/generate-jwt', {
      username: username,
      roomName: roomName,
      counselorName: counselorName,
      email: email
    });
    localStorage.setItem('jwtToken', response.data.token);
    message.success('JWT token generated successfully');
    setJwtToken(response.data.token);
    setError('');
    message.success('Meeting link generated successfully');
    setMeetingLink(response.data.meetingLink);
    localStorage.setItem('Link', response.data.meetingLink );
    alert('Meeting link sent to Client Mail');
  };
  const joinMeeting = async () => {
    const jwtToken = localStorage.getItem('jwtToken');
    const meetingLink = localStorage.getItem('Link');
    if (jwtToken && meetingLink) {
      window.location.href = meetingLink;
    }
  };
  useEffect(() => {
    
  }, []);

  return (
    <div className="">
      <h1 className='text-4xl text-center font-bold mt-6'>Online Meetups</h1>
      <div className='flex flex-col items-center justify-center mt-10'>
      <div className=" flex flex-col w-60">
        <label className='font-semibold'>Client Name</label>
        <input className='w-full border-2 border-black rounded-md p-2 mt-2'
          type="text"
          id="username"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className=" flex flex-col w-60 mt-2">
        <label className='font-semibold'>Room Name</label>
        <input  className='w-full border-2 border-black rounded-md p-2 mt-2'
          type="text"
          id="room"
          placeholder="Enter room name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <label className='font-semibold mt-2' >Counselor Name</label>
        <input  className='w-full border-2 border-black rounded-md p-2 mt-2'
          type="text"
          id="room"
          placeholder="Enter Counselor Name"
          value={counselorName}
          onChange={(e) => setCounselorName(e.target.value)}
        />
        <label className='font-semibold mt-2' >Registered Client Email </label>
        <input  className='w-full border-2 border-black rounded-md p-2 mt-2'
          type="email"
          id="room"
          placeholder="EnterEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button className=" mt-6 bg-blue-500 text-white px-3 py-2 w-60 rounded-lg" onClick={generateJWT}>Create Meeting</button>

      {error && <div className="error">{error}</div>}

      {jwtToken && (
        <div id="token-output" style={{ marginTop: '20px' }}>
          <br />
          <button className='bg-blue-500 text-white px-3 py-2 rounded-lg'  onClick={joinMeeting}>Join Meeting</button>
        </div>
      )}
      </div>
    </div>
  );


}

export default VideoCall;
