import express from 'express';
import Booking from '../models/Booking.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:id/cancel', protect, async (req, res) => {
  const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id });
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  booking.status = 'cancelled';
  booking.paymentStatus = 'refunded';
  await booking.save();
  res.json({ message: 'Booking cancelled', booking });
});

router.get('/:id/refund-status', protect, async (req, res) => {
  const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id });
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  res.json({ refundStatus: booking.paymentStatus === 'refunded' ? 'completed' : 'pending' });
});

router.post('/:id/reschedule', protect, async (req, res) => {
  res.json({ message: 'Reschedule simulated (not implemented)' });
});

export default router;
