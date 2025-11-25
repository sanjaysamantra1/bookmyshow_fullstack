import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Booking from '../models/Booking.js';
import { protect } from '../middleware/authMiddleware.js';
import generateToken from '../utils/generateToken.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, city } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash, city });
    const token = generateToken(user);
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, city: user.city }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user)
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });
    const token = generateToken(user);
    console.log('token::',token)
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, city: user.city }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/logout', protect, (req, res) => {
  res.json({ message: 'Logged out (client should discard token)' });
});

router.get('/profile', protect, async (req, res) => {
  res.json(req.user);
});

router.put('/profile', protect, async (req, res) => {
  try {
    const { name, city } = req.body;
    if (name) req.user.name = name;
    if (city) req.user.city = city;
    await req.user.save();
    res.json(req.user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/bookings', protect, async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate('movie event show')
    .sort({ createdAt: -1 });
  res.json(bookings);
});

router.post('/bookings/cancel', protect, async (req, res) => {
  const { bookingId } = req.body;
  const booking = await Booking.findOne({ _id: bookingId, user: req.user._id });
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  booking.status = 'cancelled';
  booking.paymentStatus = 'refunded';
  await booking.save();
  res.json({ message: 'Booking cancelled', booking });
});

router.post('/tickets/transfer', protect, async (req, res) => {
  res.json({ message: 'Ticket transfer simulated (no real transfer logic implemented)' });
});

router.post('/wallet/add', protect, async (req, res) => {
  const { amount } = req.body;
  const amt = Number(amount) || 0;
  req.user.walletBalance += amt;
  req.user.walletTransactions.push({ type: 'credit', amount: amt, description: 'Add to wallet' });
  await req.user.save();
  res.json({ balance: req.user.walletBalance, transactions: req.user.walletTransactions });
});

router.get('/wallet', protect, async (req, res) => {
  res.json({ balance: req.user.walletBalance, transactions: req.user.walletTransactions });
});

router.get('/rewards', protect, async (req, res) => {
  res.json({ points: req.user.rewardsPoints, rewards: [] });
});

router.post('/rewards/redeem', protect, async (req, res) => {
  const { points } = req.body;
  const pts = Number(points) || 0;
  if (pts > req.user.rewardsPoints) {
    return res.status(400).json({ message: 'Not enough points' });
  }
  req.user.rewardsPoints -= pts;
  await req.user.save();
  res.json({ message: 'Redeemed points', remaining: req.user.rewardsPoints });
});

export default router;
