const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  amount: Number,
  currency: String,
  status: String,
  created: { type: Date, default: Date.now },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;