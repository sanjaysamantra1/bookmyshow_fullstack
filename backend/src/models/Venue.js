import mongoose from 'mongoose';

const venueSchema = new mongoose.Schema({
  name: String,
  city: String,
  address: String
}, { timestamps: true });

const Venue = mongoose.model('Venue', venueSchema);
export default Venue;
