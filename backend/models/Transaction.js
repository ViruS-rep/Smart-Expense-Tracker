const mongoose = require('mongoose');

const CATEGORIES = [
  'Food & Dining',
  'Groceries',
  'Transport',
  'Rent',
  'Utilities',
  'Entertainment',
  'Healthcare',
  'Shopping',
  'Education',
  'Investments',
  'Travel',
  'Others',
];

const PAYMENT_METHODS = ['Cash', 'UPI', 'Debit Card', 'Credit Card', 'Net Banking', 'Other'];

const transactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: { type: String, enum: ['income', 'expense'], default: 'expense' },
    amount: { type: Number, required: true, min: 0 },
    category: { type: String, enum: CATEGORIES, default: 'Others' },
    description: { type: String, trim: true, default: '' },
    paymentMethod: { type: String, enum: PAYMENT_METHODS, default: 'UPI' },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

transactionSchema.statics.CATEGORIES = CATEGORIES;
transactionSchema.statics.PAYMENT_METHODS = PAYMENT_METHODS;

module.exports = mongoose.model('Transaction', transactionSchema);
