import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SessionNotes() {
    const [notes, setNotes] = useState('');
    const [appointmentId, setAppointmentId] = useState('');
    const navigate = useNavigate();
    const [ClientName, setClientName] = useState('');
    const [ClientAge, setClientAge] = useState('');
    const [ClientAddress, setClientAddress] = useState('');
    const [ClientGender, setClientGender] = useState('');
    const [ClientEmail, setClientEmail] = useState('');
    const [ClientPhone, setClientPhone] = useState('');

    const createNotes = async (req, res) => {
        try {
            const response = await axios.post('https://project-rniz.onrender.com/api/session', {
                appointmentId,
                notes, ClientName, ClientAge, ClientAddress, ClientGender, ClientEmail, ClientPhone
            }, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            message.success('Session note created successfully');
            setNotes(response.data)
            window.location.reload();
            
        } catch (error) {
            message.error('Error creating session note Counselor only');
            console.log(error)
        }
    }
   
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token){
            message.error('Please login first');
            navigate('/login');
            return;
        }
    }, [navigate])
    
  return (
    <div className='flex flex-col items-center justify-center mt-5'>    
        <div className=''> 
            <div className='flex flex-col items-center justify-center'>
                <h2 className='mb-4 text-2xl font-bold'>Appointment Id</h2>
                     <input type="text" className='border border-gray-500 p-2 rounded-lg w-60 h-12'
                     placeholder='Enter Appointment Id' 
                    value={appointmentId} 
                    onChange={(e) => setAppointmentId(e.target.value)} />
                    </div>
                    <div className='mt-4 flex flex-col'>
                    <h1 className='mb-4 mt-4 font-bold text-2xl text-center '>Session Notes</h1>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    
                    <input type="text"
                    value={ClientName} className='border border-gray-500 p-2 rounded-lg w-60 h-12 mb-2'
                    placeholder='Enter Client Name'
                    onChange={(e) => setClientName(e.target.value)}/>
                    <input type="text"
                    value={ClientAge} className='border border-gray-500 p-2 rounded-lg w-60 h-12 mb-2'
                    placeholder='Enter Client Age'
                    onChange={(e) => setClientAge(e.target.value)}/>
                    <input type="text" className='border border-gray-500 p-2 rounded-lg w-60 h-12 mb-2'
                    value={ClientAddress}
                    placeholder='Enter Client Address'
                    onChange={(e) => setClientAddress(e.target.value)}/>
                    <input type="email" className='border border-gray-500 p-2 rounded-lg w-60 h-12 mb-2'
                    value={ClientEmail}
                    placeholder='Enter Client Email'
                    onChange={(e) => setClientEmail(e.target.value)}/>
                    <select type="text" className='border border-gray-500 p-2 rounded-lg w-60 h-12 mb-2'
                    value={ClientGender}
                    placeholder='Enter Client Gender'
                    onChange={(e) => setClientGender(e.target.value)}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <input type="text" className='border border-gray-500 p-2 rounded-lg w-60 h-12 mb-2'
                    value={ClientPhone}
                    placeholder='Enter Client Phone Number'
                    onChange={(e) => setClientPhone(e.target.value)}/>
                    </div>
                    <textarea 
                    name="notes"
                    placeholder='Your notes here...'
                    value={notes} 
                    className='w-full mt-4 p-4 mb-4 border h-40 border border-gray-500 rounded-lg'
                    onChange={(e)=> setNotes(e.target.value)}></textarea>
                    <div className='flex justify-center gap-5'>
                    <button className='mt-4 bg-blue-500 py-2 px-3 text-white rounded-lg w-40' onClick={createNotes}>Create Notes</button>
                    <button className='mt-4 bg-blue-500 py-2 px-3 text-white rounded-lg w-40'><Link to='/getNotes'>Get Notes</Link></button>
                    </div>
                    </div>
        </div>
    </div>
  )
}

export default SessionNotes