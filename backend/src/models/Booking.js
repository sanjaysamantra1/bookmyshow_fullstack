import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['movie', 'event'], required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  show: { type: mongoose.Schema.Types.ObjectId, ref: 'Show' },
  seats: [String],
  amount: Number,
  status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
  paymentStatus: { type: String, enum: ['paid', 'refunded'], default: 'paid' }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
