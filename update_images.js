const mongoose = require('mongoose')
require('dotenv').config()
const Product = require('./models/Product')

const imageMap = {
  'NordVPN': 'https://logos-world.net/wp-content/uploads/2021/04/NordVPN-Logo.png',
  'ExpressVPN': 'https://logos-world.net/wp-content/uploads/2021/02/ExpressVPN-Logo.png',
  'Surfshark': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Surfshark_logo.svg/2560px-Surfshark_logo.svg.png',
  'AutoCAD': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Autodesk_AutoCAD_2022_logo.svg/1200px-Autodesk_AutoCAD_2022_logo.svg.png',
  'Photoshop': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/2101px-Adobe_Photoshop_CC_icon.svg.png',
  'Figma': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Figma-logo.svg/1667px-Figma-logo.svg.png',
  'Netflix': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png',
  'Spotify': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png',
  'Office 365': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Microsoft_Office_logo_%282019%E2%80%93present%29.svg/2048px-Microsoft_Office_logo_%282019%E2%80%93present%29.svg.png',
  'Windows 11': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Windows_logo_-_2021_%28Dark_Blue%29.svg/2048px-Windows_logo_-_2021_%28Dark_Blue%29.svg.png',
  'Gmail': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png',
  'GitHub': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png',
  'Semrush': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Semrush_logo.svg/2560px-Semrush_logo.svg.png',
  'Ahrefs': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Ahrefs_logo.svg/2560px-Ahrefs_logo.svg.png'
}

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/officialtoolstore')
  console.log('Connected to DB')
  
  const products = await Product.find({})
  let updatedCount = 0

  for (const product of products) {
    const enName = product.name.en || ''
    
    for (const [key, imageUrl] of Object.entries(imageMap)) {
      if (enName.includes(key)) {
        product.image = imageUrl
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
