import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import Notification from '../models/Notification.js';

const router = express.Router();

router.post('/send', protect, async (req, res) => {
  const { userId, title, body } = req.body;
  const notif = await Notification.create({ user: userId, title, body });
  res.status(201).json(notif);
});

router.get('/', protect, async (req, res) => {
  const notifs = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(notifs);
});

router.post('/subscribe', protect, (req, res) => {
  res.json({ message: 'Subscribed (mock)' });
});

router.post('/unsubscribe', protect, (req, res) => {
  res.json({ message: 'Unsubscribed (mock)' });
});

export default router;
