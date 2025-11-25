import express from 'express';
import Show from '../models/Show.js';

const router = express.Router();

router.get('/:showId/seats', async (req, res) => {
  const show = await Show.findById(req.params.showId);
  if (!show) return res.status(404).json({ message: 'Show not found' });
  res.json(show.seats);
});

router.get('/:showId/pricing', async (req, res) => {
  const show = await Show.findById(req.params.showId);
  if (!show) return res.status(404).json({ message: 'Show not found' });
  const pricing = {};
  show.seats.forEach(seat => {
    pricing[seat.type] = seat.price;
  });
  res.json(pricing);
});

router.post('/:showId/hold', async (req, res) => {
  const { seats } = req.body;
  const show = await Show.findById(req.params.showId);
  if (!show) return res.status(404).json({ message: 'Show not found' });
  show.seats.forEach(seat => {
    if (seats.includes(seat.seatNumber) && !seat.isBooked) {
      seat.isHeld = true;
    }
  });
  await show.save();
  res.json({ message: 'Seats held', show });
});

router.post('/:showId/release', async (req, res) => {
  const { seats } = req.body;
  const show = await Show.findById(req.params.showId);
  if (!show) return res.status(404).json({ message: 'Show not found' });
  show.seats.forEach(seat => {
    if (seats.includes(seat.seatNumber)) {
      seat.isHeld = false;
    }
  });
  await show.save();
  res.json({ message: 'Seats released', show });
});

export default router;
