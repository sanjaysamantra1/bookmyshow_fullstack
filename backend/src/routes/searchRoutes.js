import express from 'express';
import Movie from '../models/Movie.js';
import Event from '../models/Event.js';
import Venue from '../models/Venue.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { q } = req.query;
  const regex = q ? new RegExp(q, 'i') : /.*/;
  const [movies, events, venues] = await Promise.all([
    Movie.find({ title: regex }),
    Event.find({ name: regex }),
    Venue.find({ name: regex })
  ]);
  res.json({ movies, events, venues });
});

router.get('/recommendations', async (req, res) => {
  const movies = await Movie.find().limit(5);
  const events = await Event.find().limit(5);
  res.json({ movies, events });
});

router.get('/filters', async (req, res) => {
  res.json({
    genres: ['Action', 'Comedy', 'Drama'],
    languages: ['Hindi', 'English', 'Tamil', 'Telugu'],
    formats: ['2D', '3D', 'IMAX'],
    categories: ['Movie', 'Event', 'Sports']
  });
});

export default router;
