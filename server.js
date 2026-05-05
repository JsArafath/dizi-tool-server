require('dotenv').config()
const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')

const app = express()
const PORT = process.env.PORT || 5000

// ── Middleware ───────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())

// ── Routes ───────────────────────────────────────────
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'OfficialToolStore API is running 🚀' })
})

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

// ── Start ────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 OfficialToolStore Server running on http://localhost:${PORT}`)
  console.log(`📡 Client URL: ${process.env.CLIENT_URL}\n`)
})
