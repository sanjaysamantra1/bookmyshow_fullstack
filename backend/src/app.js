import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import userRoutes from './routes/userRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import offerRoutes from './routes/offerRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import miscRoutes from './routes/miscRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import showRoutes from './routes/showRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ message: 'BookMyShow clone API is running' });
});

app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/misc', miscRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/shows', showRoutes);
app.use('/api/bookings', bookingRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Server error'
  });
});

export default app;
