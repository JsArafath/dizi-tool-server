const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { users } = require('../data/users')
const { protect } = require('../middleware/authMiddleware')
require('dotenv').config()

const router = express.Router()

const generateToken = (user) =>
  jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

// ── POST /api/auth/register ──────────────────────────
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password)
    return res.status(400).json({ success: false, message: 'All fields are required' })

  if (password.length < 6)
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' })

  const exists = users.find(u => u.email === email.toLowerCase())
  if (exists)
    return res.status(400).json({ success: false, message: 'Email already registered' })

  const hash = await bcrypt.hash(password, 10)
  const newUser = {
    id: users.length + 1,
    name,
    email: email.toLowerCase(),
    password: hash,
    role: 'user',
    createdAt: new Date().toISOString(),
  }
  users.push(newUser)

  const token = generateToken(newUser)
  res.status(201).json({
    success: true,
    message: 'Account created successfully',
    token,
    user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
  })
})

// ── POST /api/auth/login ─────────────────────────────
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password)
    return res.status(400).json({ success: false, message: 'Email and password are required' })

  const user = users.find(u => u.email === email.toLowerCase())
  if (!user)
    return res.status(401).json({ success: false, message: 'Invalid email or password' })

  const match = await bcrypt.compare(password, user.password)
  if (!match)
    return res.status(401).json({ success: false, message: 'Invalid email or password' })

  const token = generateToken(user)
  res.json({
    success: true,
    message: 'Login successful',
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  })
})

// ── GET /api/auth/me ─────────────────────────────────
router.get('/me', protect, (req, res) => {
  res.json({ success: true, user: req.user })
})

// ── POST /api/auth/logout ────────────────────────────
// JWT is stateless — logout is handled client-side (remove token)
router.post('/logout', protect, (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' })
})

module.exports = router
