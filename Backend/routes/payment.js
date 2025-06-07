const express = require('express');
const Razorpay = require('razorpay');
const User = require('../models/User');
const router = express.Router();

const dotenv = require('dotenv');
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post('/create-order', async (req, res) => {
  const options = {
    amount: 50000, // ₹500 in paise
    currency: 'INR',
    receipt: `receipt_${Date.now()}`,
  };
  try {
    const order = await razorpay.orders.create(options);
    res.json({ order_id: order.id, currency: order.currency, amount: order.amount });
  } catch (error) {
    res.status(500).send('Error creating order');
  }
});

router.post('/verify', async (req, res) => {
  const { uid, razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
  // In production, verify signature using crypto
  try {
    await User.findOneAndUpdate({ uid }, { isSubscribed: true });
    res.json({ status: 'success' });
  } catch (error) {
    res.status(500).send('Error verifying payment');
  }
});

router.get('/subscription/:uid', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    res.json({ isSubscribed: user.isSubscribed });
  } catch (error) {
    res.status(500).send('Error checking subscription');
  }
});

module.exports = router;
