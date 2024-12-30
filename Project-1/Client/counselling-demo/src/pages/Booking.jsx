import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';

function Booking() {
    const [appointments, setAppointments] = useState('');
    const [meetings, setMeetings] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const getUser = async () => {
      try{
          const res = await axios.get('http://localhost:5000/api/counselor/booked', {
            headers: {
              Authorization: localStorage.getItem('token')
            }
          });
          message.success('Booking fetched successfully');
          console.log(res.data);
          setAppointments(res.data);
  
        }catch(err){
          message.error('Failed to fetch appointments');
          setError('Failed to fetch appointments');
          console.log(err);
        }
        try{
          const res = await axios.get('http://localhost:5000/api/counselor/link', {
            headers: {
              Authorization: localStorage.getItem('token')
            }
          });
          message.success('Meetings fetched successfully');
          console.log(res.data);
          setMeetings(res.data);
        }catch(err){
         message.error('Counselor login only');
          setError('Failed to fetch Please login');
          console.log(err);
        }
      }
    
    
    
    
    useEffect(() => {
      
        const role = localStorage.getItem('role');
        if (!role) {
            
          navigate('/Clogin');
          return;
        }
      getUser();
    }, [navigate]);
  return (
    <div className="mt-10 bg-[#D9EAFD] px-10">
      <div className="p-6  mx-auto bg-[#D9EAFD] rounded ">
        <h2 className="text-4xl font-bold mb-6 text-center"> Bookings</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-4">
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <div key={appointment._id} className="mb-4 p-4 border rounded bg-white shadow-lg px-10 py-10 ">
                <p className="text-green-500 font-bold ">Assigned Counselor : <span className='text-gray-800 font-semibold'>{appointment.counselor}</span></p>
                <p className="font-semibold">Appointment ID: <span className='text-gray-600'>{appointment.data.appointmentId}</span></p>
                <p className="text-gray-800">Client Name: {appointment.data.clientName}</p>
                <p className="text-gray-800">Time: {appointment.data.time}</p>
                <p className="text-gray-800">Requested Type: {appointment.data.type}</p>
                <p className="text-gray-800">Status : {appointment.data.status}</p>
                
              </div>
            ))
          ) : (
            <p>No appointments scheduled.</p>
          )}
         
          </div>
          <div className=" ">
          {meetings.length > 0 && (
            <div className="mt-4">
              <h3 className="text-4xl font-bold mb-5 text-center">Upcoming Meetings</h3>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {meetings.map((meeting) => (
                  <div key={meeting._id} className="mb-4 p-4 border rounded bg-white shadow-lg px-10 py-10 ">
                    <a href={meeting.data} className='text-blue-600 text-xl font-semobold'>Meeting Link</a>
                    <p className="text-gray-800"><span className='font-semibold'>Meeting Time : </span>{meeting.createdAt}</p>
                    <p className="text-gray-800"><span  className='font-semibold'>Meeting Room : </span>{meeting.name}</p>
                    <p className="text-gray-800"><span  className='font-semibold'>Meeting With : </span>{meeting.userName}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          </div>  
      </div>
    </div>
  )
}

export default Booking