const mongoose = require('mongoose')
require('dotenv').config()
const Product = require('./models/Product')

const newProducts = [
  // SECURITY
  {
    name: { en: 'NordVPN Premium 1 Year', bn: 'নর্ডভিপিএন প্রিমিয়াম ১ বছর' },
    shortDesc: { en: 'Secure your internet with NordVPN.', bn: 'নর্ডভিপিএন দিয়ে আপনার ইন্টারনেট সুরক্ষিত করুন।' },
    fullDesc: { en: 'Premium 1 Year NordVPN account with maximum security and privacy.', bn: 'সর্বোচ্চ নিরাপত্তা এবং প্রাইভেসি সহ প্রিমিয়াম ১ বছর নর্ডভিপিএন অ্যাকাউন্ট।' },
    category: 'SECURITY',
    usdt: 2.5, bdt: 300,
    packages: [ { duration: '1 Year', usdt: 2.5, bdt: 300 } ]
  },
  {
    name: { en: 'ExpressVPN Premium Account', bn: 'এক্সপ্রেসভিপিএন প্রিমিয়াম অ্যাকাউন্ট' },
    shortDesc: { en: 'Fastest VPN for streaming and privacy.', bn: 'স্ট্রিমিং এবং প্রাইভেসির জন্য সবচেয়ে দ্রুত ভিপিএন।' },
    fullDesc: { en: 'Experience the fastest servers globally with ExpressVPN.', bn: 'এক্সপ্রেসভিপিএন এর মাধ্যমে বিশ্বব্যাপী সবচেয়ে দ্রুত সার্ভারগুলোর অভিজ্ঞতা নিন।' },
    category: 'SECURITY',
    usdt: 3.0, bdt: 350,
    packages: [ { duration: '1 Year', usdt: 3.0, bdt: 350 } ]
  },
  {
    name: { en: 'Surfshark VPN Lifetime', bn: 'সার্ফশার্ক ভিপিএন লাইফটাইম' },
    shortDesc: { en: 'Unlimited devices with Surfshark.', bn: 'সার্ফশার্কের সাথে আনলিমিটেড ডিভাইস ব্যবহার করুন।' },
    fullDesc: { en: 'Protect all your devices with a single Surfshark account.', bn: 'একটি সার্ফশার্ক অ্যাকাউন্ট দিয়ে আপনার সমস্ত ডিভাইস সুরক্ষিত করুন।' },
    category: 'SECURITY',
    usdt: 4.0, bdt: 480,
    packages: [ { duration: 'Lifetime', usdt: 4.0, bdt: 480 } ]
  },

  // DESIGN
  {
    name: { en: 'AutoCAD 2024 License', bn: 'অটোক্যাড ২০২৪ লাইসেন্স' },
    shortDesc: { en: 'Official AutoCAD license for professionals.', bn: 'পেশাদারদের জন্য অফিসিয়াল অটোক্যাড লাইসেন্স।' },
    fullDesc: { en: 'Create stunning 2D and 3D designs with AutoCAD 2024.', bn: 'অটোক্যাড ২০২৪ দিয়ে অসাধারণ ২ডি এবং ৩ডি ডিজাইন তৈরি করুন।' },
    category: 'DESIGN',
    usdt: 8.0, bdt: 950,
    packages: [ { duration: '1 Year', usdt: 8.0, bdt: 950 } ]
  },
  {
    name: { en: 'Adobe Photoshop CC', bn: 'অ্যাডোবি ফটোশপ সিসি' },
    shortDesc: { en: 'The ultimate photo editing software.', bn: 'সেরা ফটো এডিটিং সফটওয়্যার।' },
    fullDesc: { en: 'Transform your images with Adobe Photoshop CC.', bn: 'অ্যাডোবি ফটোশপ সিসি দিয়ে আপনার ছবিগুলোকে নতুন রূপ দিন।' },
    category: 'DESIGN',
    usdt: 5.5, bdt: 650,
    packages: [ { duration: '1 Year', usdt: 5.5, bdt: 650 } ]
  },
  {
    name: { en: 'Figma Professional Plan', bn: 'ফিগমা প্রফেশনাল প্ল্যান' },
    shortDesc: { en: 'Collaborative UI/UX design tool.', bn: 'যৌথভাবে UI/UX ডিজাইনের টুল।' },
    fullDesc: { en: 'Design and prototype together with Figma Pro.', bn: 'ফিগমা প্রো এর সাহায্যে একসাথে ডিজাইন এবং প্রোটোটাইপ তৈরি করুন।' },
    category: 'DESIGN',
    usdt: 4.5, bdt: 500,
    packages: [ { duration: '1 Year', usdt: 4.5, bdt: 500 } ]
  },

  // ENTERTAINMENT
  {
    name: { en: 'Netflix Premium 4K', bn: 'নেটফ্লিক্স প্রিমিয়াম ৪কে' },
    shortDesc: { en: 'Watch your favorite movies in 4K.', bn: '৪কে রেজোলিউশনে আপনার প্রিয় মুভি দেখুন।' },
    fullDesc: { en: 'Private profile on a Netflix 4K Premium account.', bn: 'নেটফ্লিক্স ৪কে প্রিমিয়াম অ্যাকাউন্টে প্রাইভেট প্রোফাইল।' },
    category: 'ENTERTAINMENT',
    usdt: 1.5, bdt: 180,
    packages: [ { duration: '1 Month', usdt: 1.5, bdt: 180 } ]
  },
  {
    name: { en: 'Spotify Premium Individual', bn: 'স্পটিফাই প্রিমিয়াম ইন্ডিভিজুয়াল' },
    shortDesc: { en: 'Ad-free music listening.', bn: 'বিজ্ঞাপনমুক্ত গান শুনুন।' },
    fullDesc: { en: 'Listen to your favorite songs without any interruptions.', bn: 'কোনো বিরতি ছাড়া আপনার প্রিয় গানগুলো শুনুন।' },
    category: 'ENTERTAINMENT',
    usdt: 1.0, bdt: 120,
    packages: [ { duration: '1 Month', usdt: 1.0, bdt: 120 } ]
  },

  // COMPUTER SOFTWARE
  {
    name: { en: 'Microsoft Office 365 Lifetime', bn: 'মাইক্রোসফট অফিস ৩৬৫ লাইফটাইম' },
    shortDesc: { en: 'Word, Excel, PowerPoint, and more.', bn: 'ওয়ার্ড, এক্সেল, পাওয়ারপয়েন্ট এবং আরও অনেক কিছু।' },
    fullDesc: { en: 'Lifetime license for Microsoft Office 365 on 5 devices.', bn: '৫টি ডিভাইসের জন্য মাইক্রোসফট অফিস ৩৬৫ এর লাইফটাইম লাইসেন্স।' },
    category: 'COMPUTER SOFTWARE',
    usdt: 3.5, bdt: 420,
    packages: [ { duration: 'Lifetime', usdt: 3.5, bdt: 420 } ]
  },
  {
    name: { en: 'Windows 11 Pro Key', bn: 'উইন্ডোজ ১১ প্রো কি' },
    shortDesc: { en: 'Genuine Windows 11 Pro activation key.', bn: 'আসল উইন্ডোজ ১১ প্রো অ্যাক্টিভেশন কি।' },
    fullDesc: { en: 'Activate your PC with a genuine Windows 11 Pro license key.', bn: 'একটি আসল উইন্ডোজ ১১ প্রো লাইসেন্স কি দিয়ে আপনার পিসি অ্যাক্টিভেট করুন।' },
    category: 'COMPUTER SOFTWARE',
    usdt: 2.5, bdt: 300,
    packages: [ { duration: 'Lifetime', usdt: 2.5, bdt: 300 } ]
  },

  // ACCOUNT
  {
    name: { en: 'Aged Gmail Account (2015-2018)', bn: 'পুরনো জিমেইল অ্যাকাউন্ট (২০১৫-২০১৮)' },
    shortDesc: { en: 'High trust aged Gmail accounts.', bn: 'উচ্চ নির্ভরযোগ্যতার পুরনো জিমেইল অ্যাকাউন্ট।' },
    fullDesc: { en: 'Perfect for business and marketing needs.', bn: 'ব্যবসা এবং মার্কেটিংয়ের জন্য একদম পারফেক্ট।' },
    category: 'ACCOUNT',
    usdt: 0.5, bdt: 60,
    packages: [ { duration: 'Lifetime', usdt: 0.5, bdt: 60 } ]
  },
  {
    name: { en: 'GitHub Student Developer Pack', bn: 'গিটহাব স্টুডেন্ট ডেভেলপার প্যাক' },
    shortDesc: { en: 'Access premium developer tools for free.', bn: 'বিনামূল্যে প্রিমিয়াম ডেভেলপার টুলস অ্যাক্সেস করুন।' },
    fullDesc: { en: 'Includes DigitalOcean, Canva Pro, and much more.', bn: 'ডিজিটালওশান, ক্যানভা প্রো এবং আরও অনেক কিছু অন্তর্ভুক্ত।' },
    category: 'ACCOUNT',
    usdt: 4.0, bdt: 480,
    packages: [ { duration: '1 Year', usdt: 4.0, bdt: 480 } ]
  },

  // SEO TOOLS
  {
    name: { en: 'Semrush Guru Shared Account', bn: 'সেমরাশ গুরু শেয়ার্ড অ্যাকাউন্ট' },
    shortDesc: { en: 'Advanced SEO and marketing tool.', bn: 'অ্যাডভান্সড এসইও এবং মার্কেটিং টুল।' },
    fullDesc: { en: 'Analyze your competitors and improve your SEO.', bn: 'আপনার প্রতিযোগীদের বিশ্লেষণ করুন এবং আপনার এসইও উন্নত করুন।' },
    category: 'TOOLS',
    usdt: 3.0, bdt: 350,
    packages: [ { duration: '1 Month', usdt: 3.0, bdt: 350 } ]
  },
  {
    name: { en: 'Ahrefs Standard Shared', bn: 'আহরেফস স্ট্যান্ডার্ড শেয়ার্ড' },
    shortDesc: { en: 'Powerful backlink analysis tool.', bn: 'শক্তিশালী ব্যাকলিংক অ্যানালাইসিস টুল।' },
    fullDesc: { en: 'Discover backlink opportunities and keyword ideas.', bn: 'ব্যাকলিংক সুযোগ এবং কীওয়ার্ড আইডিয়া খুঁজুন।' },
    category: 'TOOLS',
    usdt: 3.5, bdt: 400,
    packages: [ { duration: '1 Month', usdt: 3.5, bdt: 400 } ]
  }
]

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/officialtoolstore')
  console.log('Connected to DB')
  
  // Find max ID
  const lastProduct = await Product.findOne().sort({ id: -1 })
  let nextId = lastProduct ? lastProduct.id + 1 : 1
  
  const mapped = newProducts.map(p => ({
    ...p,
    id: nextId++,
    image: 'https://placehold.co/600x400/8cc63f/ffffff?text=' + encodeURIComponent(p.category),
    icon: '🚀',
    iconBg: '#eef0ff',
    stock: 100,
    sold: Math.floor(Math.random() * 50),
    tags: ['HOT']
  }))
  
  await Product.insertMany(mapped)
  console.log('Inserted', mapped.length, 'new products into MongoDB!')
  mongoose.disconnect()
}

run()
