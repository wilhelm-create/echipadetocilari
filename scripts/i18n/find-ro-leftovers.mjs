/**
 * Find remaining Romanian-looking text nodes on EN pages.
 */
import fs from 'fs';
import path from 'path';

const enRoot = path.join(process.cwd(), 'dist', 'en');

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (name.endsWith('.html')) out.push(full);
  }
  return out;
}

// Romanian signals: diacritics OR common RO function words in text nodes
const RO_DIAC = /[ăâîșțĂÂÎȘȚ]/;
const RO_WORDS =
  /\b(și|sau|pentru|care|acest|această|aceasta|noastre|noastră|voastră|dumneavoastră|să|sunt|este|săte|poți|poate|trebuie|dacă|când|cum|unde|dece|afiș|afișare|crește|creștem|îmbunătăț|îmbunătățim|vizibilitate|afacere|afacerii|clienți|clienti|servicii|serviciul|website-ul|site-ul|optimizare|administrare|mentenan|prezentare|gratuit|consulta|întreb|răspuns|durată|rezultate|campanie|campanii|conținut|continut|preț|pret|pachet|abonament|articole|cuvinte|strategii|concuren|piața|piata|trafic|vânzări|vanzari|online|România|București)\b/i;

const files = walk(enRoot);
const leftovers = new Map(); // text -> files

for (const file of files) {
  const h = fs.readFileSync(file, 'utf8');
  // strip scripts/styles
  const body = h
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ');

  const texts = [...body.matchAll(/>([^<]{8,})</g)]
    .map((m) => m[1].replace(/\s+/g, ' ').trim())
    .filter((t) => t.length >= 8)
    .filter((t) => !/^[\d\s.,;:€$%*+\-–—/\\|()[\]{}]+$/.test(t))
    .filter((t) => RO_DIAC.test(t) || RO_WORDS.test(t));

  for (const t of texts) {
    // skip pure English with "online" etc already
    if (
      /^(We |Our |The |How |What |Why |If |Book |Send |Talk |Meet |See |Choose |Professional |Digital |Website |SEO |PPC |Free |Contact |About |Home |Services |Clients |Portfolio |Follow |Important )/i.test(
        t
      ) &&
      !RO_DIAC.test(t)
    ) {
      continue;
    }
    if (!leftovers.has(t)) leftovers.set(t, new Set());
    leftovers.get(t).add(path.relative(enRoot, file));
  }
}

const sorted = [...leftovers.entries()].sort((a, b) => b[0].length - a[0].length);
console.log(`Found ${sorted.length} unique leftover strings across ${files.length} EN pages\n`);
for (const [text, filesSet] of sorted) {
  console.log('---');
  console.log(text);
  console.log('  @', [...filesSet].join(', '));
}
