import express from 'express';
import City from '../models/City.js';
import Venue from '../models/Venue.js';
import Movie from '../models/Movie.js';
import Event from '../models/Event.js';

const router = express.Router();

router.get('/cities', async (req, res) => {
  const cities = await City.find();
  res.json(cities);
});

router.get('/cities/:id/venues', async (req, res) => {
  const city = decodeURIComponent(req.params.id);
  const venues = await Venue.find({ city });
  res.json(venues);
});

router.get('/cities/:id/movies', async (req, res) => {
  const city = decodeURIComponent(req.params.id);
  const movies = await Movie.find({ city });
  res.json(movies);
});

router.get('/cities/:id/events', async (req, res) => {
  const city = decodeURIComponent(req.params.id);
  const events = await Event.find({ city });
  res.json(events);
});

router.get('/venues', async (req, res) => {
  const venues = await Venue.find();
  res.json(venues);
});

router.get('/venues/:id', async (req, res) => {
  const venue = await Venue.findById(req.params.id);
  if (!venue) return res.status(404).json({ message: 'Venue not found' });
  res.json(venue);
});

router.get('/languages', (req, res) => {
  res.json(['Hindi', 'English', 'Tamil', 'Telugu']);
});

router.get('/categories', (req, res) => {
  res.json(['Movie', 'Event', 'Sports']);
});

router.get('/health-check', (req, res) => {
  res.json({ status: 'ok' });
});

router.get('/version', (req, res) => {
  res.json({ version: '1.0.0', name: 'BookMyShow clone API' });
});

router.get('/config', (req, res) => {
  res.json({ paymentGateway: 'mock', environment: process.env.NODE_ENV || 'development' });
});

export default router;
