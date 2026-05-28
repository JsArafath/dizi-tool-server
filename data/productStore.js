const { products: staticProducts } = require('../data/products.json')

// Runtime product store (initialized from static data)
let products = [...staticProducts]
let nextId = products.length + 1

const getAll = () => products

const add = (product) => {
  const newProduct = { ...product, id: nextId++ }
  products.push(newProduct)
  return newProduct
}

const remove = (id) => {
  const idx = products.findIndex(p => p.id === id)
  if (idx === -1) return false
  products.splice(idx, 1)
  return true
}

const update = (id, data) => {
  const idx = products.findIndex(p => p.id === id)
  if (idx === -1) return null
  products[idx] = { ...products[idx], ...data }
  return products[idx]
}

module.exports = { getAll, add, remove, update }
