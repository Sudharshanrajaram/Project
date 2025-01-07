const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (amount) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // amount in cents
            currency: 'usd',
        });
        return paymentIntent;
    } catch (error) {
        throw new Error('Error creating payment intent');
    }
};

module.exports = { createPaymentIntent };
