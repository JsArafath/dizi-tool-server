const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const store = require('../data/productStore')

const router = express.Router()

// Admin-only middleware
const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin')
    return res.status(403).json({ success: false, message: 'Admin access required' })
  next()
}

// ── GET /api/products — public
router.get('/', (req, res) => {
  res.json({ success: true, products: store.getAll() })
})

// ── POST /api/products — admin only
router.post('/', protect, adminOnly, (req, res) => {
  const { nameEn, nameBn, shortDescEn, shortDescBn, fullDescEn, fullDescBn,
          icon, iconBg, stock, usdt, bdt } = req.body

  if (!nameEn || !usdt || !bdt || !stock)
    return res.status(400).json({ success: false, message: 'nameEn, usdt, bdt, stock are required' })

  const product = store.add({
    icon: icon || '📦',
    iconBg: iconBg || '#f0f4f8',
    name:      { en: nameEn,      bn: nameBn      || nameEn },
    shortDesc: { en: shortDescEn || '', bn: shortDescBn || shortDescEn || '' },
    fullDesc:  { en: fullDescEn  || '', bn: fullDescBn  || fullDescEn  || '' },
    stock: Number(stock),
    sold: 0,
    usdt: Number(usdt),
    bdt: Number(bdt),
  })

  res.status(201).json({ success: true, product })
})

// ── DELETE /api/products/:id — admin only
router.delete('/:id', protect, adminOnly, (req, res) => {
  const ok = store.remove(Number(req.params.id))
  if (!ok) return res.status(404).json({ success: false, message: 'Product not found' })
  res.json({ success: true, message: 'Product deleted' })
})

// ── PUT /api/products/:id — admin only
router.put('/:id', protect, adminOnly, (req, res) => {
  const updated = store.update(Number(req.params.id), req.body)
  if (!updated) return res.status(404).json({ success: false, message: 'Product not found' })
  res.json({ success: true, product: updated })
})

module.exports = router
