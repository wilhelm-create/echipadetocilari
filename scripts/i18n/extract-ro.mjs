import fs from 'fs';
import path from 'path';

const file = process.argv[2] || 'legacy-mirror/servicii-seo/index.html';
const h = fs.readFileSync(file, 'utf8');
const texts = [...h.matchAll(/>([^<]{25,200})</g)]
  .map((m) => m[1].replace(/\s+/g, ' ').trim())
  .filter((t) => /[ăâîșțĂÂÎȘȚ]/.test(t) || /[a-zăâîșț]{4,}/i.test(t))
  .filter((t) => !/^[\d\s.,€$%*]+$/.test(t));
console.log([...new Set(texts)].join('\n'));
