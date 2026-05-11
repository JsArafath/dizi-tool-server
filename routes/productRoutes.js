const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const Product = require('../models/Product')

const router = express.Router()

// Admin-only middleware
const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin')
    return res.status(403).json({ success: false, message: 'Admin access required' })
  next()
}

// ── GET /api/products — public
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ id: 1 })
    res.json({ success: true, products })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// ── POST /api/products — admin only
router.post('/', protect, adminOnly, async (req, res) => {
  const { nameEn, nameBn, shortDescEn, shortDescBn, fullDescEn, fullDescBn,
          image, stock, packages, category, tags, options } = req.body

  if (!nameEn || !stock || !packages || packages.length === 0)
    return res.status(400).json({ success: false, message: 'nameEn, stock, and at least one package are required' })

  const baseUsdt = packages[0].usdt;
  const baseBdt = packages[0].bdt;

  try {
    // Determine next ID
    const lastProduct = await Product.findOne().sort({ id: -1 })
    const nextId = lastProduct ? lastProduct.id + 1 : 1

    const product = new Product({
      id: nextId,
      image: image || null,
      icon: '📦',
      iconBg: '#f0f4f8',
      name:      { en: nameEn,      bn: nameBn      || nameEn },
      shortDesc: { en: shortDescEn || '', bn: shortDescBn || shortDescEn || '' },
      fullDesc:  { en: fullDescEn  || '', bn: fullDescBn  || fullDescEn  || '' },
      stock: Number(stock),
      sold: 0,
      packages: packages,
      usdt: Number(baseUsdt),
      bdt: Number(baseBdt),
      category: category || '',
      tags: tags || [],
      options: options || {
        guarantee: 'No warranty',
        share: 'Pro trial',
        duration: 'Random',
        accountType: 'Session'
      }
    })

    await product.save()
    res.status(201).json({ success: true, product })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// ── DELETE /api/products/:id — admin only
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({ id: Number(req.params.id) })
    if (!deleted) return res.status(404).json({ success: false, message: 'Product not found' })
    res.json({ success: true, message: 'Product deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// ── PUT /api/products/:id — admin only
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const updated = await Product.findOneAndUpdate(
      { id: Number(req.params.id) },
      req.body,
      { new: true }
    )
    if (!updated) return res.status(404).json({ success: false, message: 'Product not found' })
    res.json({ success: true, product: updated })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router
