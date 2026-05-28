const fs = require('fs')
const mongoose = require('mongoose')
require('dotenv').config()
const Product = require('./models/Product')

const data = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'))

const translateStr = (str) => {
  if (!str) return { en: 'Product item', bn: 'প্রোডাক্ট আইটেম' }
  const lower = str.toLowerCase()
  
  if (lower.includes('windsurf')) return { en: 'Genuine Windsurf Pro Max Account', bn: 'অরিজিনাল উইন্ডসার্ফ প্রো ম্যাক্স একাউন্ট' }
  if (lower.includes('claude')) return { en: 'Genuine Claude Pro Max Account', bn: 'অরিজিনাল ক্লদ প্রো ম্যাক্স একাউন্ট' }
  if (lower.includes('chatgpt') || lower.includes('openai')) return { en: 'Free ChatGPT/Codex Account', bn: 'ফ্রি চ্যাটজিপিটি/কোডেক্স একাউন্ট' }
  if (lower.includes('canva')) return { en: 'Canva Pro Lifetime', bn: 'ক্যানভা প্রো লাইফটাইম' }
  if (lower.includes('antigravity')) return { en: 'Antigravity Ultra - Official Upgrade', bn: 'অ্যান্টিগ্রাভিটি আলট্রা - অফিসিয়াল আপগ্রেড' }
  if (lower.includes('cursor')) return { en: 'Cursor Unlimited Requests', bn: 'কার্সার আনলিমিটেড রিকোয়েস্ট' }
  if (lower.includes('hotmail')) return { en: 'Hotmail Live Forever Email', bn: 'হটমেইল লাইভ ফরএভার ইমেইল' }
  if (lower.includes('gmail')) return { en: 'Aged Gmail Account', bn: 'পুরনো জিমেইল একাউন্ট' }
  if (lower.includes('midjourney')) return { en: 'Midjourney Pro Subscription', bn: 'মিডজার্নি প্রো সাবস্ক্রিপশন' }
  if (lower.includes('adobe')) return { en: 'Adobe Creative Cloud', bn: 'অ্যাডোবি ক্রিয়েটিভ ক্লাউড' }
  if (lower.includes('office')) return { en: 'Microsoft Office 365', bn: 'মাইক্রোসফট অফিস ৩৬৫' }
  if (lower.includes('netflix')) return { en: 'Netflix Premium 4K', bn: 'নেটফ্লিক্স প্রিমিয়াম ৪কে' }
  if (lower.includes('youtube')) return { en: 'YouTube Premium No Ads', bn: 'ইউটিউব প্রিমিয়াম (বিজ্ঞাপন ছাড়া)' }
  if (lower.includes('spotify')) return { en: 'Spotify Premium Individual', bn: 'স্পটিফাই প্রিমিয়াম' }
  if (lower.includes('zoom')) return { en: 'Zoom Pro Meeting Account', bn: 'জুম প্রো মিটিং একাউন্ট' }
  
  return { en: 'Premium Digital Tool Subscription', bn: 'প্রিমিয়াম ডিজিটাল টুল সাবস্ক্রিপশন' }
}

const translateDuration = (str) => {
  if (str.includes('Th') || str.includes('th')) return '1 Month'
  if (str.includes('N') || str.includes('n')) return '1 Year'
  return 'Lifetime'
}

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/officialtoolstore')
  console.log('Connected to DB')
  
  await Product.deleteMany({})
  console.log('Cleared existing DB')
  
  const mapped = data.products.map((p, idx) => {
    const t = translateStr(p.name.en)
    
    let packages = []
    if (p.packages) {
      packages = p.packages.map(pkg => ({
        duration: translateDuration(pkg.duration),
        usdt: Number(pkg.usdt) || 0,
        bdt: Number(pkg.bdt) || 0
      }))
    } else {
      packages = [{ duration: '1 Month', usdt: Number(p.usdt), bdt: Number(p.bdt) }]
    }

    return {
      id: p.id || (idx + 1),
      name: t,
      shortDesc: { en: t.en + ' for personal and professional use.', bn: t.bn + ' আপনার ব্যক্তিগত এবং পেশাদার ব্যবহারের জন্য।' },
      fullDesc: { en: 'Get instant access to ' + t.en + ' with 100% warranty and 24/7 support. Fast delivery.', bn: '১০০% ওয়ারেন্টি এবং ২৪/৭ সাপোর্ট সহ ' + t.bn + ' -এ দ্রুত অ্যাক্সেস পান।' },
      image: p.image,
      icon: '🚀',
      iconBg: '#eef0ff',
      stock: p.stock || 100,
      sold: p.sold || 0,
      usdt: Number(p.usdt) || 0,
      bdt: Number(p.bdt) || 0,
      packages: packages,
      category: p.category ? 'Premium Software' : 'AI Tools',
      tags: p.tags && p.tags.length > 0 ? p.tags.filter(tg => !tg.includes('?')).map(tg => tg.replace('Mua', 'Buy')) : ['HOT']
    }
  })
  
  await Product.insertMany(mapped)
  console.log('Inserted', mapped.length, 'translated products into MongoDB!')
  mongoose.disconnect()
}

run()
