import express from 'express';
import Offer from '../models/Offer.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const offers = await Offer.find({ isActive: true });
  res.json(offers);
});

router.get('/:id', async (req, res) => {
  const offer = await Offer.findById(req.params.id);
  if (!offer) return res.status(404).json({ message: 'Offer not found' });
  res.json(offer);
});

router.post('/apply', async (req, res) => {
  const { code, amount } = req.body;
  const offer = await Offer.findOne({ code, isActive: true });
  if (!offer) return res.status(404).json({ message: 'Invalid code' });
  const discount = (amount * offer.discountPercent) / 100;
  res.json({ discount, payable: amount - discount });
});

export default router;
