const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const store = require('../data/reviews')

const router = express.Router()

// Admin-only middleware
const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin')
    return res.status(403).json({ success: false, message: 'Admin access required' })
  next()
}

// ── GET /api/reviews — public
router.get('/', (req, res) => {
  res.json({ success: true, reviews: store.getAll() })
})

// ── POST /api/reviews — public (anyone can submit)
router.post('/', (req, res) => {
  const { author, rating, comment } = req.body

  if (!author || !rating || !comment) {
    return res.status(400).json({ success: false, message: 'author, rating, comment are required' })
  }

  const review = store.add({ author, rating: Number(rating), comment })
  res.status(201).json({ success: true, review })
})

// ── DELETE /api/reviews/:id — admin only
router.delete('/:id', protect, adminOnly, (req, res) => {
  const ok = store.remove(Number(req.params.id))
  if (!ok) return res.status(404).json({ success: false, message: 'Review not found' })
  res.json({ success: true, message: 'Review deleted' })
})

module.exports = router
