/**
 * Fix Elementor animations on static hosting:
 * 1. Normalize script/link URLs (ver%3D → ver=) for reliability
 * 2. Download any missing webpack chunks from production
 * 3. Inject polyfill that triggers entrance animations + Lottie if Elementor stalls
 * 4. Ensure elementor-invisible elements animate in
 */
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const ORIGIN = 'https://www.echipadetocilari.ro';

function walk(dir, pred, out = []) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, pred, out);
    else if (pred(full)) out.push(full);
  }
  return out;
}

async function downloadIfMissing(relPath) {
  const clean = relPath.replace(/^\//, '').split('?')[0];
  const local = path.join(root, 'legacy-mirror', clean);
  if (existsSync(local) && statSync(local).size > 100) return { path: clean, status: 'exists' };

  mkdirSync(path.dirname(local), { recursive: true });
  try {
    const res = await fetch(`${ORIGIN}/${clean}`, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122 Safari/537.36',
      },
    });
    if (!res.ok) return { path: clean, status: `http ${res.status}` };
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(local, buf);
    return { path: clean, status: 'downloaded', bytes: buf.length };
  } catch (e) {
    return { path: clean, status: e.message };
  }
}

// Animation CSS Elementor may lazy-load
const animNames = [
  'fadeIn',
  'fadeInDown',
  'fadeInLeft',
  'fadeInRight',
  'fadeInUp',
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

console.log('→ Ensuring animation CSS files...');
for (const name of animNames) {
  const rel = `wp-content/plugins/elementor/assets/lib/animations/styles/${name}.min.css`;
  const r = await downloadIfMissing(rel);
  if (r.status === 'downloaded') console.log('  +', r.path);
}

// Common Elementor/Pro webpack chunks (best-effort from live site listing via frontend)
const chunkCandidates = [
  'wp-content/plugins/elementor/assets/js/shared-frontend-handlers.d9b9d49f1f92a8c5.min.js',
  'wp-content/plugins/elementor/assets/lib/waypoints/waypoints.min.js',
  'wp-content/plugins/elementor/assets/lib/swiper/v8/swiper.min.js',
  'wp-content/plugins/elementor-pro/assets/js/webpack-pro.runtime.min.js',
  'wp-content/plugins/elementor-pro/assets/lib/sticky/jquery.sticky.min.js',
];

// Scrape chunk names from minified webpack runtime + frontend
function extractChunks(file) {
  if (!existsSync(file)) return [];
  const t = readFileSync(file, 'utf8');
  const found = new Set();
  for (const m of t.matchAll(/"([^"]+\.js)"/g)) {
    const n = m[1];
    if (n.includes('handlers') || n.includes('chunk') || n.includes('bundle') || n.includes('frontend')) {
      found.add(n.replace(/^\.\//, ''));
    }
  }
  for (const m of t.matchAll(/([a-z0-9_-]+\.[a-f0-9]{8,}\.bundle\.min\.js)/gi)) {
    found.add(m[1]);
  }
  for (const m of t.matchAll(/([a-z0-9_-]+\.[a-f0-9]{8,}\.min\.js)/gi)) {
    found.add(m[1]);
  }
  return [...found];
}

const elJsDir = path.join(root, 'legacy-mirror/wp-content/plugins/elementor/assets/js');
const proJsDir = path.join(root, 'legacy-mirror/wp-content/plugins/elementor-pro/assets/js');

const chunkFiles = [
  ...walk(elJsDir, (f) => f.endsWith('.js')),
  ...walk(proJsDir, (f) => f.endsWith('.js')),
].flatMap(extractChunks);

console.log('→ Chunks referenced:', chunkFiles.length);

for (const name of chunkFiles) {
  // try under elementor and elementor-pro js dirs
  for (const base of [
    'wp-content/plugins/elementor/assets/js/',
    'wp-content/plugins/elementor-pro/assets/js/',
  ]) {
    const r = await downloadIfMissing(base + name.replace(/^\//, ''));
    if (r.status === 'downloaded') console.log('  +', r.path);
  }
}

// Also try known handler files from Elementor 3.x/4.x
const known = [
  'wp-content/plugins/elementor/assets/js/text-editor.7a4a6c9f5e6b0a1d.min.js',
];
// Pull directory listing by trying common names from live HTML of original
const liveHtml = await fetch(ORIGIN + '/', {
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122 Safari/537.36',
  },
}).then((r) => r.text());

const liveScripts = [...liveHtml.matchAll(/src=["']([^"']+\.js[^"']*)["']/gi)].map((m) =>
  m[1].replace(ORIGIN, '').replace(/^\//, '').split('?')[0]
);

console.log('→ Live page scripts:', liveScripts.length);
for (const s of liveScripts) {
  if (!s.includes('wp-content') && !s.includes('wp-includes')) continue;
  // decode ver=
  const decoded = decodeURIComponent(s);
  const r = await downloadIfMissing(decoded);
  if (r.status === 'downloaded') console.log('  +', r.path);
  // also save with original encoded name if different - skip, build normalizes
}

// Lottie JSON
for (const j of [
  'wp-content/uploads/2023/03/dlf10_Tu6NPeCh0d.json',
  'wp-content/uploads/2023/03/dlf10_7fCbvNSmFD.json',
  'wp-content/plugins/elementor-pro/modules/lottie/assets/animations/default.json',
]) {
  await downloadIfMissing(j);
}

// Write polyfill into legacy-mirror
const polyfill = `/* Elementor static animation polyfill */
(function () {
  function reduce() {
    try {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) {
      return false;
    }
  }

  function revealEl(el) {
    if (!el || el.dataset.ectRevealed === '1') return;
    el.dataset.ectRevealed = '1';
    var settings = {};
    try {
      var raw = el.getAttribute('data-settings');
      if (raw) settings = JSON.parse(raw);
    } catch (e) {}
    var anim = settings.animation || settings._animation || '';
    el.classList.remove('elementor-invisible');
    if (anim && !reduce()) {
      el.style.animationName = anim;
      el.classList.add('animated', anim);
      // load CSS if Elementor didn't
      var href =
        '/wp-content/plugins/elementor/assets/lib/animations/styles/' +
        anim +
        '.min.css';
      if (!document.querySelector('link[href*="' + anim + '.min"]')) {
        var l = document.createElement('link');
        l.rel = 'stylesheet';
        l.href = href;
        document.head.appendChild(l);
      }
    } else {
      el.style.opacity = '1';
      el.style.visibility = 'visible';
    }
  }

  function initEntrance() {
    var nodes = document.querySelectorAll('.elementor-invisible, [data-settings*="animation"]');
    if (!nodes.length) return;

    if (reduce() || !('IntersectionObserver' in window)) {
      nodes.forEach(revealEl);
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          revealEl(entry.target);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
    );

    nodes.forEach(function (el) {
      io.observe(el);
    });

    // above-the-fold immediate
    setTimeout(function () {
      nodes.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.9 && r.bottom > 0) revealEl(el);
      });
    }, 100);

    // failsafe: never leave invisible
    setTimeout(function () {
      document.querySelectorAll('.elementor-invisible').forEach(revealEl);
    }, 2000);
  }

  function initLottieFallback() {
    if (reduce()) return;
    var hosts = document.querySelectorAll('.elementor-widget-lottie, .e-lottie__container');
    if (!hosts.length) return;

    function run(lottie) {
      if (!lottie || !lottie.loadAnimation) return;
      document.querySelectorAll('.elementor-widget-lottie').forEach(function (widget) {
        if (widget.dataset.ectLottie === '1') return;
        var container = widget.querySelector('.e-lottie__animation') || widget;
        if (container.querySelector('svg')) return; // already rendered by Elementor
        var settings = {};
        try {
          var el = widget.closest('.elementor-element') || widget;
          var raw = el.getAttribute('data-settings');
          if (raw) settings = JSON.parse(raw);
        } catch (e) {}
        var url =
          (settings.source_json && settings.source_json.url) ||
          (settings.custom_json_url && settings.custom_json_url.url) ||
          '';
        if (!url) return;
        widget.dataset.ectLottie = '1';
        try {
          lottie.loadAnimation({
            container: container,
            renderer: 'svg',
            loop: settings.loop !== 'no',
            autoplay: true,
            path: url,
          });
        } catch (err) {
          console.warn('[ect] lottie', err);
        }
      });
    }

    // Prefer already-loaded lottie from Elementor
    if (window.lottie) {
      // Wait a bit for Elementor Pro to init first
      setTimeout(function () {
        run(window.lottie);
      }, 800);
      return;
    }

    var s = document.createElement('script');
    s.src = '/wp-content/plugins/elementor-pro/assets/lib/lottie/lottie.min.js';
    s.onload = function () {
      setTimeout(function () {
        run(window.lottie);
      }, 200);
    };
    document.head.appendChild(s);
  }

  function boot() {
    initEntrance();
    initLottieFallback();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
  // Elementor may finish later
  window.addEventListener('elementor/frontend/init', function () {
    setTimeout(initLottieFallback, 300);
  });
  setTimeout(boot, 1500);
})();
`;

const polyPath = path.join(root, 'legacy-mirror/wp-content/ect-anim-polyfill.js');
writeFileSync(polyPath, polyfill, 'utf8');
console.log('→ Wrote', polyPath);

// Patch all HTML in legacy-mirror: normalize %3D URLs + inject polyfill before </body>
function patchHtml(file) {
  let html = readFileSync(file, 'utf8');
  const orig = html;

  // Normalize encoded = in asset paths (browser ok, some CDNs picky)
  html = html.replace(/(src|href)="([^"]*?)_ver%3D([^"]*)"/gi, '$1="$2_ver=$3"');

  // Ensure absolute root paths for Elementor config assets already use /wp-content - OK

  // Inject polyfill once
  if (!html.includes('ect-anim-polyfill.js')) {
    html = html.replace(
      /<\/body>/i,
      '  <script src="/wp-content/ect-anim-polyfill.js" defer></script>\n</body>'
    );
  }

  // Ensure elementor-invisible has a CSS fallback so content shows even without JS
  if (!html.includes('/* ect-invis-fallback */')) {
    html = html.replace(
      /<\/head>/i,
      `  <style>/* ect-invis-fallback */.elementor-invisible{opacity:0}.elementor-invisible.animated,.elementor-invisible[data-ect-revealed="1"]{opacity:1}@media(prefers-reduced-motion:reduce){.elementor-invisible{opacity:1!important}}</style>\n</head>`
    );
  }

  if (html !== orig) writeFileSync(file, html, 'utf8');
}

const htmlFiles = walk(path.join(root, 'legacy-mirror'), (f) => f.endsWith('.html'));
htmlFiles.forEach(patchHtml);
console.log('→ Patched', htmlFiles.length, 'HTML files');

// Also fix CSS url() references if needed - skip for now

console.log('Done. Run npm run build next.');
