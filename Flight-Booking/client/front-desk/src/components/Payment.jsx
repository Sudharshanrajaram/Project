// src/App.js
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useAuth } from '../context/UserContext';

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
      const { data } = await axios.post('https://project-1-5pcq.onrender.com/api/payments/pay', {
        amount, name
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
        message.success('Please select your flight and enter your details then confirm booking');
        navigate('/booking');
      }
    } catch (error) {
      message.error('Payment failed');
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl mx-auto">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Secure Checkout</h2>
      <input
        type="text"
        className="w-full p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Cardholder Name"
        required
      />
      <div className="mb-6 flex justify-between items-center">
        <label className="text-lg text-gray-600">Amount</label>
        <input
          className="w-20 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          type="number"
          value={amount / 100}
          onChange={(e) => setAmount(e.target.value * 100)}
          min="1"
          required
        />
      </div>
      <div className="mb-6">
        <CardElement className="bg-gray-100 p-4 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div className="flex justify-center">
        <button
          className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          type="submit"
          disabled={!stripe || loading}
        >
          {loading ? 'Processing…' : 'Pay Now'}
        </button>
      </div>
    </form>
  );
}

function Payment() {
  return (
    <div className="min-h-screen bg-gradient-to-t from-blue-100 to-blue-300 py-16 px-4 sm:px-6 md:px-12">
      <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">Complete Your Payment</h1>
      <div className="flex justify-center items-center">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
}

export default Payment;
