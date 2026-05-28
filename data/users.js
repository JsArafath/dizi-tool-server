const bcrypt = require('bcryptjs')

// In-memory user store — swap with MongoDB later
const users = []

// Pre-seed an admin user
;(async () => {
  const hash = await bcrypt.hash('admin123', 10)
  users.push({
    id: 1,
    name: 'Admin',
    email: 'admin@officialtoolstore.com',
    password: hash,
    role: 'admin',
    createdAt: new Date().toISOString(),
  })
})()

module.exports = { users }
