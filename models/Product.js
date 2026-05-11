const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: {
    en: { type: String, required: true },
    bn: { type: String }
  },
  shortDesc: {
    en: { type: String, default: '' },
    bn: { type: String, default: '' }
  },
  fullDesc: {
    en: { type: String, default: '' },
    bn: { type: String, default: '' }
  },
  image: { type: String },
  icon: { type: String, default: '📦' },
  iconBg: { type: String, default: '#f0f4f8' },
  stock: { type: Number, default: 100 },
  sold: { type: Number, default: 0 },
  usdt: { type: Number, required: true },
  bdt: { type: Number, required: true },
  packages: [{
    duration: String,
    usdt: Number,
    bdt: Number
  }],
  category: { type: String, default: 'AI' },
  tags: [{ type: String }] // e.g. "Hot", "-43%"
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
