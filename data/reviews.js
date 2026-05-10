const initialReviews = [
  { id: 1, author: 'Sajjad Hossain', rating: 5, comment: 'Best service! I got my account in just 5 minutes.', createdAt: new Date(Date.now() - 86400000 * 2).toISOString() },
  { id: 2, author: 'Rakib Hasan', rating: 4, comment: 'Good quality, but support response was a bit slow.', createdAt: new Date(Date.now() - 86400000 * 5).toISOString() },
]

let reviews = [...initialReviews]
let nextId = reviews.length + 1

const getAll = () => {
  // Return newest first
  return [...reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

const add = (review) => {
  const newReview = { 
    id: nextId++, 
    ...review,
    createdAt: new Date().toISOString()
  }
  reviews.push(newReview)
  return newReview
}

const remove = (id) => {
  const idx = reviews.findIndex(r => r.id === id)
  if (idx === -1) return false
  reviews.splice(idx, 1)
  return true
}

module.exports = { getAll, add, remove }
