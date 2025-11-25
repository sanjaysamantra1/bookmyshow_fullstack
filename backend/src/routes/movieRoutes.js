import express from 'express';
import Movie from '../models/Movie.js';
import Show from '../models/Show.js';
import Booking from '../models/Booking.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { city, genre, language, format } = req.query;
  const filter = {};
  if (city) filter.city = city;
  if (genre) filter.genre = genre;
  if (language) filter.language = language;
  if (format) filter.format = format;
  const movies = await Movie.find(filter);
  res.json(movies);
});

router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).json({ message: 'Movie not found' });
  res.json(movie);
});

router.get('/:id/showtimes', async (req, res) => {
  const shows = await Show.find({ movie: req.params.id });
  res.json(shows);
});

router.get('/:id/seats', async (req, res) => {
  const { showId } = req.query;
  const show = await Show.findById(showId);
  if (!show) return res.status(404).json({ message: 'Show not found' });
  res.json(show.seats);
});

router.post('/:id/book', protect, async (req, res) => {
  const { showId, seats, amount } = req.body;
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
    type: 'movie',
    movie: req.params.id,
    show: showId,
    seats,
    amount,
    status: 'confirmed',
    paymentStatus: 'paid'
  });
  res.status(201).json({ message: 'Booking confirmed', booking });
});

router.get('/:id/reviews', async (req, res) => {
  res.json([]);
});

router.post('/:id/review', protect, async (req, res) => {
  res.status(201).json({ message: 'Review saved (not persisted in this demo)' });
});

export default router;
