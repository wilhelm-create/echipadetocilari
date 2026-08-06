import { readFileSync } from 'fs';

const h = readFileSync('public/index.html', 'utf8');
const jsons = [...h.matchAll(/[^\s"'<>]+\.json/g)].map((x) => x[0]);
console.log('JSON refs:\n', [...new Set(jsons)].join('\n'));

const teams = [...h.matchAll(/Team-\d[^"' )\s]*/g)].map((x) => x[0]);
console.log('Teams:\n', [...new Set(teams)].join('\n'));

// absolute still
const abs = [...h.matchAll(/https:\/\/www\.echipadetocilari\.ro[^"'\\s]*/g)].map((x) => x[0]);
console.log('Abs count', abs.length);
console.log([...new Set(abs)].slice(0, 30).join('\n'));
