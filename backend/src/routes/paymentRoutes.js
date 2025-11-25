import express from 'express';

const router = express.Router();

router.post('/initiate', (req, res) => {
  res.json({ paymentId: 'PAY123', status: 'initiated' });
});

router.post('/verify', (req, res) => {
  res.json({ status: 'success' });
});

router.post('/refund', (req, res) => {
  res.json({ status: 'refunded' });
});

router.get('/wallet/balance', (req, res) => {
  res.json({ balance: 0 });
});

router.post('/wallet/credit', (req, res) => {
  res.json({ message: 'Wallet credited (simulated)' });
});

router.post('/wallet/debit', (req, res) => {
  res.json({ message: 'Wallet debited (simulated)' });
});

export default router;
