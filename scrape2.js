const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('taphoai.html', 'utf8');
const $ = cheerio.load(html);

$('img').each((i, el) => {
  if ($(el).attr('alt') && $(el).attr('alt').includes('Netflix')) {
    console.log('Attributes for Netflix image:', el.attribs);
  }
});
