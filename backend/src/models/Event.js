import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: String,
  date: Date,
  city: String,
  venue: String,
  posterUrl: String
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);
export default Event;
