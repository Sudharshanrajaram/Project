import React, { useState } from 'react'
import axios from 'axios';
import { message } from 'antd';
import { Link } from 'react-router-dom';

function GetSessionNotes() {
    const [getNote, setGetNotes] = useState('');
    const [appointmentId, setAppointmentId] = useState('')
    const getNotes = async (req,res) => {
        console.log(appointmentId)
        try {
                const response = await axios.get(`http://localhost:5000/api/session/getSession/${appointmentId}`, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })
                message.success('Session note fetched successfully');
                setGetNotes(response.data)
    
                console.log(getNote)
            } catch (error) {
                messsage.error('Error fetching session note');
                console.log(error)
            }
        }
  return (
    <div className='flex flex-col items-center justify-center mt-5 '>
        <div className='mb-2'>
                <h2 className='mb-2 text-2xl text-center font-bold'>Appointment Id</h2>
                     <input type="text" className='border border-gray-500 p-2 rounded-lg w-60 h-12'
                     placeholder='Enter Appointment Id' 
                    value={appointmentId} 
                    onChange={(e) => setAppointmentId(e.target.value)} />
                    <button className='mt-4 mb-4 ml-4 bg-blue-500 py-2 px-3 text-white rounded-lg' onClick={getNotes}>Get Notes</button>
                    <button className='mt-4 mb-4 ml-4 bg-blue-500 py-2 px-3 text-white rounded-lg'><Link to='/notes'>Create Notes</Link></button>
                    </div>
        
         {getNote && (
            <div className='bg-white px-30 py-10'>
                <h1 className=' font-bold text-2xl text-center'>Session Notes</h1>
                <div className=' mt-4 px-10'>
                    {getNote.map((note) => (
                        <div className='border-2 border-gray-300 rounded-lg py-10 px-5 mb-5' key={note._id}>
                            <p className='px-10'><span className='font-bold'>Appointment Id : </span>{note.appointmentId}</p>
                            <div className='flex flex-col px-10 justify-center '>
                            <p className='  '><span className='font-bold'>Name : </span>{note.ClientName}</p>
                            <p className='  '><span className='font-bold'>Age : </span>{note.ClientAge}</p>
                            <p className='  '><span className='font-bold'>Address : </span>{note.ClientAddress}</p>
                            <p className='  '><span className='font-bold'>Gender : </span>{note.ClientGender}</p>
                            <p className='  '><span className='font-bold'>Email : </span>{note.ClientEmail}</p>
                            <p className='  '><span className='font-bold'>Phone : </span>{note.ClientPhone}</p>
                            </div>
                            <p className='border-2 border-gray-300 rounded-lg px-10 py-2 mt-2 h-20 '><span className='font-bold'>Notes : </span>{note.notes}</p>
                        </div>
                    ))}
                    </div>
            </div>
        )} 
        </div>
  )
}

export default GetSessionNotes