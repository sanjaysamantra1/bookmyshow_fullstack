import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import Movie from '../models/Movie.js';
import Event from '../models/Event.js';
import Offer from '../models/Offer.js';
import Booking from '../models/Booking.js';

const router = express.Router();

router.post('/movies', protect, admin, async (req, res) => {
  const movie = await Movie.create(req.body);
  res.status(201).json(movie);
});

router.put('/movies/:id', protect, admin, async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(movie);
});

router.delete('/movies/:id', protect, admin, async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ message: 'Movie deleted' });
});

router.post('/events', protect, admin, async (req, res) => {
  const event = await Event.create(req.body);
  res.status(201).json(event);
});

router.put('/events/:id', protect, admin, async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(event);
});

router.delete('/events/:id', protect, admin, async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: 'Event deleted' });
});

router.get('/bookings', protect, admin, async (req, res) => {
  const bookings = await Booking.find().populate('user movie event show');
  res.json(bookings);
});

router.post('/offer', protect, admin, async (req, res) => {
  const offer = await Offer.create(req.body);
  res.status(201).json(offer);
});

router.put('/offer/:id', protect, admin, async (req, res) => {
  const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(offer);
});

router.delete('/offer/:id', protect, admin, async (req, res) => {
  await Offer.findByIdAndDelete(req.params.id);
  res.json({ message: 'Offer deleted' });
});

router.get('/reports/sales', protect, admin, async (req, res) => {
  const totalBookings = await Booking.countDocuments();
  const totalRevenue = await Booking.aggregate([{ $group: { _id: null, sum: { $sum: '$amount' } } }]);
  res.json({ totalBookings, totalRevenue: totalRevenue[0]?.sum || 0 });
});

router.get('/reports/user-activity', protect, admin, async (req, res) => {
  const activity = await Booking.aggregate([{ $group: { _id: '$user', count: { $sum: 1 } } }]);
  res.json({ activity });
});

router.get('/reports/popular-shows', protect, admin, async (req, res) => {
  const popular = await Booking.aggregate([{ $group: { _id: '$show', count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $limit: 10 } ]);
  res.json({ popular });
});

export default router;
