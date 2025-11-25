import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  genre: [String],
  language: [String],
  format: [String],
  durationMins: Number,
  certificate: String,
  posterUrl: String,
  city: [String]
}, { timestamps: true });

const Movie = mongoose.model('Movie', movieSchema);
export default Movie;
