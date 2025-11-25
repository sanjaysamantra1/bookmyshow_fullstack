import express from 'express';
import Event from '../models/Event.js';
import Show from '../models/Show.js';
import Booking from '../models/Booking.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { city, category, date } = req.query;
  const filter = {};
  if (city) filter.city = city;
  if (category) filter.category = category;
  if (date) filter.date = { $gte: new Date(date) };
  const events = await Event.find(filter);
  res.json(events);
});

router.get('/:id', async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: 'Event not found' });
  res.json(event);
});

router.post('/book', protect, async (req, res) => {
  const { eventId, showId, seats, amount } = req.body;
  const show = await Show.findById(showId);
  if (!show) return res.status(404).json({ message: 'Show not found' });
  show.seats.forEach(seat => {
    if (seats.includes(seat.seatNumber)) {
      seat.isBooked = true;
      seat.isHeld = false;
    }
  });
  await show.save();
  const booking = await Booking.create({
    user: req.user._id,
    type: 'event',
    event: eventId,
    show: showId,
    seats,
    amount,
    status: 'confirmed',
    paymentStatus: 'paid'
  });
  res.status(201).json({ message: 'Event booking confirmed', booking });
});

router.get('/:id/seats', async (req, res) => {
  const { showId } = req.query;
  const show = await Show.findById(showId);
  if (!show) return res.status(404).json({ message: 'Show not found' });
  res.json(show.seats);
});

router.post('/cancel', protect, async (req, res) => {
  const { bookingId } = req.body;
  const booking = await Booking.findOne({ _id: bookingId, user: req.user._id });
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  booking.status = 'cancelled';
  booking.paymentStatus = 'refunded';
  await booking.save();
  res.json({ message: 'Event booking cancelled', booking });
});

router.get('/:id/reviews', async (req, res) => {
  res.json([]);
});

router.post('/:id/review', protect, async (req, res) => {
  res.status(201).json({ message: 'Event review saved (not persisted in this demo)' });
});

export default router;
