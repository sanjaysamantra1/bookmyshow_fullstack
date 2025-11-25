import mongoose from 'mongoose';

const walletTransactionSchema = new mongoose.Schema({
  type: { type: String, enum: ['credit', 'debit'], required: true },
  amount: { type: Number, required: true },
  description: String,
  createdAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  city: { type: String },
  walletBalance: { type: Number, default: 0 },
  walletTransactions: [walletTransactionSchema],
  rewardsPoints: { type: Number, default: 0 },
  isAdmin: { type: Boolean, default: false }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
