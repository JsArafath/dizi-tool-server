const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  author: { type: String, required: true },
  text: { type: String, required: true },
  rating: { type: Number, required: true },
  date: { type: String, required: true },
  verified: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
