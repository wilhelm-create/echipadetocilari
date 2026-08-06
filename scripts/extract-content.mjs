import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';

const pages = [
  'index.html',
  'about-2/index.html',
  'creare-site-web/index.html',
  'servicii-seo/index.html',
  'administrare-site/index.html',
  'contact/index.html',
  'portofoliu/index.html',
  'services/index.html',
  'clients/index.html',
];

for (const p of pages) {
  const h = fs.readFileSync(path.join('public', p), 'utf8');
  const $ = cheerio.load(h);
  $('script, style, noscript').remove();
  const title = $('title').text();
  const desc = $('meta[name="description"]').attr('content') || '';
  const h1 = $('h1')
    .map((_, e) => $(e).text().replace(/\s+/g, ' ').trim())
    .get()
    .filter(Boolean);
  const h2 = $('h2')
    .map((_, e) => $(e).text().replace(/\s+/g, ' ').trim())
    .get()
    .filter(Boolean)
    .slice(0, 12);
  const h3 = $('h3')
    .map((_, e) => $(e).text().replace(/\s+/g, ' ').trim())
    .get()
    .filter(Boolean)
    .slice(0, 15);
  const paras = $('p')
    .map((_, e) => $(e).text().replace(/\s+/g, ' ').trim())
    .get()
    .filter((t) => t.length > 40)
    .slice(0, 12);
  const faqs = [];
  $('.elementor-tab-title, .elementor-toggle-title, .e-n-accordion-item-title').each((_, e) => {
    const q = $(e).text().replace(/\s+/g, ' ').trim();
    if (q) faqs.push(q);
  });
  console.log('\n==========', p, '==========');
  console.log('TITLE:', title);
  console.log('DESC:', desc);
  console.log('H1:', h1.join(' | '));
  console.log('H2:', h2.join('\n  - '));
  console.log('H3:', h3.join('\n  - '));
  console.log('P:', paras.map((x) => x.slice(0, 180)).join('\n  - '));
  if (faqs.length) console.log('FAQ Q:', faqs.join('\n  - '));
}
