require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const reviewRoutes = require('./routes/reviewRoutes')

const app = express()
const PORT = process.env.PORT || 5000

// ── Middleware ───────────────────────────────────────
// Allowed origins — add your deployed client URL to CLIENT_URL env var
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'https://dizi-tool-client.vercel.app',
  'https://officialtoolstore.com',
  'https://www.officialtoolstore.com',
  ...(process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',').map(u => u.trim()) : []),
]

app.use(cors({
  origin: (origin, cb) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return cb(null, true)
    if (allowedOrigins.includes(origin)) return cb(null, true)
    cb(new Error(`CORS: ${origin} not allowed`))
  },
  credentials: true,
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true })) // Need this to parse POST requests from external gateways

// ── Database Connection ────────────────────────────────
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    console.log('🔄 Initializing new MongoDB connection...');
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };
    cached.promise = mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/officialtoolstore', opts)
      .then((mongoose) => {
        console.log('✅ Connected to MongoDB');
        return mongoose;
      });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('❌ MongoDB Connection Error:', e);
    throw e;
  }
  return cached.conn;
};

// Vercel Serverless Middleware
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: 'Database connection failed' });
  }
});

// ── Routes ───────────────────────────────────────────
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/payment', paymentRoutes)
app.use('/api/reviews', reviewRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'OfficialToolStore API is running 🚀' })
})


// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

// ── Database & Start ─────────────────────────────────
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 OfficialToolStore Server running on http://localhost:${PORT}`)
    console.log(`📡 Client URL: ${process.env.CLIENT_URL}\n`)
  })
}

module.exports = app;
