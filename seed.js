const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/officialtoolstore';

const taphoaiProducts = [
  {
    name: { en: 'Netflix premium – Xem Phim HD/4K, Không Quảng Cáo', bn: 'Netflix premium – Xem Phim HD/4K, Không Quảng Cáo' },
    shortDesc: { en: 'Watch unlimited movies, TV shows, and more.', bn: 'Watch unlimited movies, TV shows, and more.' },
    fullDesc: { en: 'Full HD/4K quality, no ads. Support all devices.', bn: 'Full HD/4K quality, no ads. Support all devices.' },
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg', // Placeholder
    stock: 100,
    sold: 520,
    usdt: 3,
    bdt: 350,
    packages: [
      { duration: '1 Month', usdt: 3, bdt: 350 },
      { duration: '3 Months', usdt: 8.5, bdt: 1000 },
      { duration: '6 Months', usdt: 16, bdt: 1900 },
      { duration: '1 Year', usdt: 30, bdt: 3600 }
    ],
    category: 'Giải trí',
    tags: ['Hot']
  },
  {
    name: { en: 'Tài khoản Windsurf Pro Max chính hãng', bn: 'Tài khoản Windsurf Pro Max chính hãng' },
    shortDesc: { en: 'Windsurf Pro Max account for developers.', bn: 'Windsurf Pro Max account for developers.' },
    fullDesc: { en: 'Premium developer account with unlimited features.', bn: 'Premium developer account with unlimited features.' },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/C_Programming_Language.svg/1200px-C_Programming_Language.svg.png',
    stock: 50,
    sold: 120,
    usdt: 10,
    bdt: 1200,
    packages: [
      { duration: '1 Month', usdt: 10, bdt: 1200 },
      { duration: '1 Year', usdt: 100, bdt: 12000 }
    ],
    category: 'Developer',
    tags: ['Hot']
  },
  {
    name: { en: 'Kling AI – Tạo Video AI Đỉnh Cao 2026', bn: 'Kling AI – Tạo Video AI Đỉnh Cao 2026' },
    shortDesc: { en: 'Best AI video generator.', bn: 'Best AI video generator.' },
    fullDesc: { en: 'Generate high quality videos with Kling AI.', bn: 'Generate high quality videos with Kling AI.' },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/1200px-GitHub_Invertocat_Logo.svg.png',
    stock: 80,
    sold: 210,
    usdt: 15,
    bdt: 1800,
    packages: [
      { duration: '1 Month', usdt: 15, bdt: 1800 }
    ],
    category: 'AI Tạo ảnh/Video/Audio',
    tags: ['Hot']
  },
  {
    name: { en: 'Codex Plus/Pro proxy – OpenAI API Codex', bn: 'Codex Plus/Pro proxy – OpenAI API Codex' },
    shortDesc: { en: 'OpenAI API Proxy.', bn: 'OpenAI API Proxy.' },
    fullDesc: { en: 'Fast and reliable proxy for OpenAI API.', bn: 'Fast and reliable proxy for OpenAI API.' },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1200px-OpenAI_Logo.svg.png',
    stock: 30,
    sold: 45,
    usdt: 20,
    bdt: 2400,
    packages: [
      { duration: '1 Month', usdt: 20, bdt: 2400 }
    ],
    category: 'Chat/Viết bài',
    tags: ['Hot']
  },
  {
    name: { en: 'Canva Pro Chính Chủ', bn: 'Canva Pro Chính Chủ' },
    shortDesc: { en: 'Canva Pro on your own email.', bn: 'Canva Pro on your own email.' },
    fullDesc: { en: 'Lifetime or yearly Canva Pro upgrade.', bn: 'Lifetime or yearly Canva Pro upgrade.' },
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg',
    stock: 500,
    sold: 1200,
    usdt: 5,
    bdt: 600,
    packages: [
      { duration: '1 Year', usdt: 5, bdt: 600 },
      { duration: 'Lifetime', usdt: 12, bdt: 1400 }
    ],
    category: 'Thiết kế',
    tags: ['Hot', '-21%']
  }
];

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    
    console.log('Clearing existing products...');
    await Product.deleteMany({});
    
    console.log('Seeding Taphoai products...');
    await Product.insertMany(taphoaiProducts);
    
    console.log('✅ Seeding complete!');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  });
