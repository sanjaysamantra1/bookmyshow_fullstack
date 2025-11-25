import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
  title: String,
  description: String,
  code: { type: String, unique: true },
  discountPercent: Number,
  validTill: Date,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Offer = mongoose.model('Offer', offerSchema);
export default Offer;
