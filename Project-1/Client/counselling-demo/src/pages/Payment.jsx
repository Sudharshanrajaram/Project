// src/App.js
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

// Your Stripe public key
const stripePromise = loadStripe('pk_test_51Qb1LeCD1BFcTzNKn0EFCS3V5lV8YVVyFzNzpU1QYVQePU2DSpLe4BXiNxwWnlyNrOcwfHAfMdDRJfffBZdEGewo00Bn6m5Xtx');

function CheckoutForm() {
  const { payment, setPayment, amount, setAmount } = useAuth();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      // Call the backend to create a payment intent
      const { data } = await axios.post('http://localhost:5000/api/payment/pay', {
        amount,
      });

      const { clientSecret } = data;

      // Confirm the payment with the client secret
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        console.error(error);
        alert(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        setPayment(paymentIntent.amount);
        message.success('Payment successful');
        navigate('/form');
      }
    } catch (error) {
      message.error('Payment failed');
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className='bg-[#E7E8D8] border-2 border-black p-4 rounded-lg md:w-1/2 md:py-10 md:px-20 '>
      <h2 className='text-2xl font-semibold text-center  mb-5'>Checkout</h2>
      <input type="text" 
      className='w-full p-2 mb-4 border rounded-lg'
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder='Cardholder Name' />
      <div className='mb-5 flex justify-center items-center' >
        <label className=' text-xl'>
          Amount : 
          <input className='text-black p-1 px-4 rounded-lg'
            type="number"
            value={amount / 100}
            onChange={(e) => setAmount(e.target.value * 100)}
            min="1"
          />
        </label>
      </div>
      <CardElement className='bg-white p-2 rounded-lg' />
      <div className='flex justify-center items-center mb-10'>
      <button className='bg-[#FF9D3D] px-8 py-1  rounded-lg mt-4 text-white' type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing…' : 'Pay'}
      </button>
      </div>
    </form>
  );
}

function Payment() {
  return (
    <div className=' bg-[#D9EAFD] mb-5 mt-10 rounded-lg h-screen '>
      <h1 className='text-center text-4xl mb-5  '>Payment</h1>
      <div className='flex justify-center items-center '>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
      </div>
    </div>
  );
}

export default Payment;
