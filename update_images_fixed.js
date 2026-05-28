const mongoose = require('mongoose')
require('dotenv').config()
const Product = require('./models/Product')

const domainMap = {
  'NordVPN': 'nordvpn.com',
  'ExpressVPN': 'expressvpn.com',
  'Surfshark': 'surfshark.com',
  'AutoCAD': 'autodesk.com',
  'Photoshop': 'adobe.com',
  'Figma': 'figma.com',
  'Netflix': 'netflix.com',
  'Spotify': 'spotify.com',
  'Office 365': 'office.com',
  'Windows 11': 'microsoft.com',
  'Gmail': 'gmail.com',
  'GitHub': 'github.com',
  'Semrush': 'semrush.com',
  'Ahrefs': 'ahrefs.com'
}

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/officialtoolstore')
  console.log('Connected to DB')
  
  const products = await Product.find({})
  let updatedCount = 0

  for (const product of products) {
    const enName = product.name.en || ''
    
    for (const [key, domain] of Object.entries(domainMap)) {
      if (enName.includes(key)) {
        // Use Google Favicon API with size=256 which provides high-res logos and is NEVER blocked by AdBlockers
        product.image = `https://www.google.com/s2/favicons?domain=${domain}&sz=256`
        await product.save()
        console.log(`Updated image for: ${enName}`)
        updatedCount++
        break
      }
    }
  }
  
  console.log(`Successfully updated images for ${updatedCount} products.`)
  mongoose.disconnect()
}

run()
