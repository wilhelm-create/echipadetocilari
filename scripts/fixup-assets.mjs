import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '..', 'public');
const ORIGIN = 'https://www.echipadetocilari.ro';

function walk(dir, exts, out = []) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, exts, out);
    else if (exts.some((e) => name.toLowerCase().endsWith(e))) out.push(full);
  }
  return out;
}

function collectAssetUrls(text) {
  const found = new Set();
  // absolute URLs to same origin assets
  const abs = [
    ...text.matchAll(/https?:\/\/(?:www\.)?echipadetocilari\.ro(\/wp-content\/[^"'\\?\s)#]+)/gi),
    ...text.matchAll(/https?:\\\/\\\/(?:www\.)?echipadetocilari\.ro(\\\/wp-content\\\/[^"'\\?\s)#]+)/gi),
  ];
  for (const m of abs) {
    let p = m[1].replace(/\\\//g, '/');
    // strip trailing junk from CSS/html
    p = p.replace(/[);,}]+$/, '');
    found.add(p);
  }
  // also lottie json paths
  const json = [
    ...text.matchAll(/https?:\/\/(?:www\.)?echipadetocilari\.ro(\/wp-content\/[^"']+\.json)/gi),
    ...text.matchAll(/https?:\\\/\\\/(?:www\.)?echipadetocilari\.ro(\\\/wp-content\\\/[^"']+\.json)/gi),
  ];
  for (const m of json) {
    found.add(m[1].replace(/\\\//g, '/'));
  }
  return found;
}

async function download(relPath) {
  const clean = relPath.split('?')[0].replace(/^\/+/, '');
  const local = path.join(publicDir, clean);
  if (existsSync(local) && statSync(local).size > 0) return { path: clean, status: 'exists' };

  mkdirSync(path.dirname(local), { recursive: true });
  const url = `${ORIGIN}/${clean}`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      },
    });
    if (!res.ok) return { path: clean, status: `http ${res.status}` };
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(local, buf);
    return { path: clean, status: 'downloaded', bytes: buf.length };
  } catch (e) {
    return { path: clean, status: `error ${e.message}` };
  }
}

function rewriteFile(filePath) {
  let text = readFileSync(filePath, 'utf8');
  const original = text;

  // Rewrite absolute same-origin asset URLs to root-relative
  text = text.replace(
    /https?:\/\/(?:www\.)?echipadetocilari\.ro(\/wp-content\/[^"'\\?\s)#]+)/gi,
    (match, p1) => {
      const clean = p1.replace(/[);,}]+$/, '');
      // keep trailing junk if any outside
      const extra = p1.slice(clean.length);
      return clean + extra;
    }
  );

  // JSON-escaped absolute URLs in data-settings / lottie
  text = text.replace(
    /https?:\\\/\\\/(?:www\.)?echipadetocilari\.ro(\\\/wp-content\\\/[^"']+)/gi,
    (match, p1) => p1 // leave as \/wp-content\/... which is root-relative when unescaped... actually keep escaped form but origin-less
  );
  // Fix: convert to \/wp-content\/... (root-relative escaped)
  text = text.replace(
    /https?:\\\/\\\/(?:www\.)?echipadetocilari\.ro(\\\/wp-content\\\/[^"']+)/gi,
    '$1'
  );

  // canonical / og:url stay pointing to original brand domain is OK for clone identity,
  // but for deploy as independent site, leave them — user can change later.
  // Also rewrite internal page links that are absolute to relative
  text = text.replace(
    /https?:\/\/(?:www\.)?echipadetocilari\.ro(\/(?!wp-json|feed|comments|wp-admin)[^"'#?\s]*)/gi,
    (match, p1) => {
      if (p1.startsWith('/wp-content')) return p1; // already handled-ish
      if (p1 === '/' || p1 === '') return '/';
      return p1.endsWith('/') ? p1 : p1;
    }
  );

  // Escaped page URLs in JSON-LD
  text = text.replace(
    /https?:\\\/\\\/(?:www\.)?echipadetocilari\.ro(\\\/[^"']*)/gi,
    (match, p1) => {
      if (p1.includes('wp-content') || p1.includes('wp-json') || p1.includes('#')) {
        return p1;
      }
      return p1;
    }
  );

  if (text !== original) {
    writeFileSync(filePath, text, 'utf8');
    return true;
  }
  return false;
}

// --- main ---
const files = walk(publicDir, ['.html', '.css', '.js']);
console.log(`Scanning ${files.length} files...`);

const allAssets = new Set();
for (const f of files) {
  const text = readFileSync(f, 'utf8');
  for (const a of collectAssetUrls(text)) allAssets.add(a);
}

// also hardcode known lottie from homepage pattern scan
const indexHtml = readFileSync(path.join(publicDir, 'index.html'), 'utf8');
const lottieMatches = [
  ...indexHtml.matchAll(/uploads\/\d{4}\/\d{2}\/[^"'\\]+\.json/g),
  ...indexHtml.matchAll(/uploads\\\/\d{4}\\\/\d{2}\\\/[^"'\\]+\.json/g),
];
for (const m of lottieMatches) {
  allAssets.add('/wp-content/' + m[0].replace(/\\\//g, '/').replace(/^wp-content\//, ''));
}

// Known logo from schema
allAssets.add(
  '/wp-content/uploads/2023/02/Copie-a-fisierului-echipadetocilari-logo-pe-diforma-portocalie1.png'
);

console.log(`Found ${allAssets.size} absolute asset candidates`);

let downloaded = 0;
let failed = 0;
for (const a of allAssets) {
  const r = await download(a);
  if (r.status === 'downloaded') {
    downloaded++;
    console.log(`  + ${r.path} (${r.bytes} B)`);
  } else if (r.status !== 'exists') {
    failed++;
    console.log(`  ! ${r.path}: ${r.status}`);
  }
}

console.log(`Downloaded ${downloaded}, failed ${failed}`);

let rewritten = 0;
for (const f of files) {
  if (rewriteFile(f)) {
    rewritten++;
  }
}
console.log(`Rewrote ${rewritten} files`);

// Download elementor animation CSS that might be lazy-loaded
const anims = [
  'fadeInUp',
  'fadeIn',
  'fadeInDown',
  'fadeInLeft',
  'fadeInRight',
  'zoomIn',
  'bounceIn',
  'slideInUp',
  'slideInDown',
  'rotateIn',
  'rotateInDownLeft',
  'rotateInUpRight',
  'e-animation-grow',
  'e-animation-pulse',
  'e-animation-bob',
  'e-animation-wobble-vertical',
];
for (const name of anims) {
  const rel = `/wp-content/plugins/elementor/assets/lib/animations/styles/${name}.min.css`;
  const r = await download(rel);
  if (r.status === 'downloaded') console.log(`  anim + ${name}`);
}

// Lottie lib
await download('/wp-content/plugins/elementor-pro/assets/lib/lottie/lottie.min.js');
await download('/wp-content/plugins/elementor-pro/assets/css/widget-lottie.min.css');

// Explicit lottie JSON common path
const lottiePathMatch = indexHtml.match(
  /source_json&quot;:\{&quot;url&quot;:&quot;([^&]+)/
);
if (lottiePathMatch) {
  let u = lottiePathMatch[1]
    .replace(/\\\//g, '/')
    .replace(/https:\/\/www\.echipadetocilari\.ro/, '');
  console.log('Lottie from data-settings:', u);
  await download(u);
}

// Also try regex for .json URLs
const allJson = [...indexHtml.matchAll(/\/wp-content\/uploads\/[^"'\\ ]+\.json/g)];
for (const m of allJson) {
  await download(m[0]);
}
const escJson = [...indexHtml.matchAll(/\\\/wp-content\\\/uploads\\\/[^"'\\ ]+\\.json/g)];
for (const m of escJson) {
  await download(m[0].replace(/\\\//g, '/'));
}

console.log('Cleanup done.');
