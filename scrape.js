const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('taphoai.html', 'utf8');
const $ = cheerio.load(html);

const products = [];
let id = 1;

$('.product').each((i, el) => {
  const name = $(el).find('.product-title a').text().trim() || $(el).find('h3 a').text().trim();
  if (!name) return;

  const imgEl = $(el).find('img');
  let image = imgEl.attr('data-rl-src') || imgEl.attr('data-src') || imgEl.attr('data-lazy-src') || imgEl.attr('src') || '';
  if (image && image.startsWith('data:image')) {
    image = imgEl.attr('data-src') || imgEl.attr('data-lazy-src') || '';
  }

  const categoryArr = [];
  $(el).find('.product-category a').each((j, catEl) => {
    categoryArr.push($(catEl).text().trim());
  });
  const category = categoryArr.join(', ');

  const tags = [];
  $(el).find('.product-labels .product-label').each((j, badgeEl) => {
    tags.push($(badgeEl).text().trim());
  });

  const priceText = $(el).find('.woocommerce-Price-amount bdi').first().text().replace(/,/g, '').replace(/\./g, '').replace(/[^0-9]/g, '');
  let bdt = Number(priceText) || 0;
  
  if (bdt === 0) bdt = 1500;
  
  const packages = [
    { duration: '1 Tháng', usdt: (bdt/25000).toFixed(1), bdt } // using rough vnd to usdt mapping if needed, but keeping original structure
  ];

  products.push({
    id: id++,
    name: { en: name, bn: name },
    shortDesc: { en: name, bn: name },
    fullDesc: { en: name, bn: name },
    image,
    stock: 100,
    sold: Math.floor(Math.random() * 500) + 50,
    usdt: packages[0].usdt,
    bdt,
    packages,
    category,
    tags
  });
});

const uniqueProducts = [];
const seen = new Set();
for (const p of products) {
  if (!seen.has(p.name.en)) {
    seen.add(p.name.en);
    uniqueProducts.push(p);
  }
}

const db = { products: uniqueProducts };
fs.writeFileSync('data/products.json', JSON.stringify(db, null, 2));
console.log('Successfully wrote', uniqueProducts.length, 'products to products.json');
