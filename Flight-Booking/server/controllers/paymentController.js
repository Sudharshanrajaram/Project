const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const Transaction = require('../models/payment');



const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const paymentGateway =  async (req, res) => {
  const { amount, currency = 'usd', name } = req.body;

  try {
    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency
    });

    // Save transaction to MongoDB
    const transaction = new Transaction({
      amount,
      currency,
      name,
      status: 'pending',
    });
    await transaction.save();

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).send('Server error');
  }
};

module.exports ={ paymentGateway };