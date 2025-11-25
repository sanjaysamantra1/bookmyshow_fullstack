import mongoose from 'mongoose';

const seatSchema = new mongoose.Schema({
  seatNumber: String,
  type: { type: String, default: 'regular' },
  price: Number,
  isBooked: { type: Boolean, default: false },
  isHeld: { type: Boolean, default: false }
});

const showSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  venue: String,
  city: String,
  startTime: Date,
  seats: [seatSchema]
}, { timestamps: true });

const Show = mongoose.model('Show', showSchema);
export default Show;
