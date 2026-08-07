/**
 * Build 1:1 static mirror of echipadetocilari.ro (Elementor HTML/CSS/JS/assets)
 * + inject SEO/AEO/GEO/mobile enhancements in <head> only (no visual layout change).
 *
 * Source: legacy-mirror/ (scraped from production)
 * Output: dist/
 */
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const srcDir = path.join(root, 'legacy-mirror');
const outDir = path.join(root, 'dist');

const INDEXABLE = process.env.PUBLIC_INDEXABLE === 'true';
const SITE = (process.env.PUBLIC_SITE_URL || 'https://www.echipadetocilari.ro').replace(/\/$/, '');

if (!existsSync(srcDir) || !existsSync(path.join(srcDir, 'index.html'))) {
  console.error('Missing legacy-mirror/index.html — run mirror first.');
  process.exit(1);
}

console.log('→ Cleaning dist/');
if (existsSync(outDir)) rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

console.log('→ Copying 1:1 mirror (HTML/CSS/JS/images/fonts)...');
cpSync(srcDir, outDir, { recursive: true });

// ─── Page SEO map (AEO: direct answers in descriptions) ───
const pageMeta = {
  '/': {
    title: 'Marketing online făcut de tocilari | Echipa de Tocilari',
    description:
      'Echipa de Tocilari este agenția de marketing digital din România: creare site web, SEO, mentenanță, PPC, logo și copywriting. Consultație gratuită 30 minute.',
  },
  '/about-2/': {
    title: 'Despre noi | Echipa de Tocilari',
    description:
      'Cine suntem: Echipa de Tocilari — specialiști în marketing digital și tehnologie care construiesc site-uri, SEO și campanii pentru afaceri din România.',
  },
  '/creare-site-web/': {
    title: 'Creare site web | Echipa de Tocilari',
    description:
      'Creare site web modern: landing page, site de prezentare sau magazin online. Design, UX, viteză și SEO de bază — Echipa de Tocilari.',
  },
  '/servicii-seo/': {
    title: 'Servicii SEO | Echipa de Tocilari',
    description:
      'Servicii SEO în România: audit, keywords, on-page, off-page și monitorizare. Creștem traficul organic pe Google — Echipa de Tocilari.',
  },
  '/administrare-site/': {
    title: 'Administrare site & mentenanță | Echipa de Tocilari',
    description:
      'Administrare site și magazin online: actualizări, securitate, backup și conținut. Mentenanță la nivel înalt — Echipa de Tocilari.',
  },
  '/contact/': {
    title: 'Contact | Echipa de Tocilari',
    description:
      'Contactează Echipa de Tocilari pentru creare site, SEO sau mentenanță. Consultație gratuită 30 minute — remote în toată România.',
  },
  '/portofoliu/': {
    title: 'Portofoliu web design | Echipa de Tocilari',
    description:
      'Portofoliu Echipa de Tocilari: exemple de design web și direcții vizuale pentru site-uri de prezentare și landing page.',
  },
  '/services/': {
    title: 'Servicii marketing digital | Echipa de Tocilari',
    description:
      'Servicii complete: creare site, SEO, administrare, PPC, logo design și copywriting. Echipa de Tocilari.',
  },
  '/clients/': {
    title: 'Clienți | Echipa de Tocilari',
    description:
      'Clienții Echipei de Tocilari — branduri și afaceri care ne-au ales pentru marketing digital și web design.',
  },
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'ProfessionalService'],
  '@id': `${SITE}/#organization`,
  name: 'Echipa de Tocilari',
  url: SITE,
  description:
    'Agenție de marketing digital din România: creare site web, optimizare SEO, mentenanță, PPC, logo design și copywriting.',
  email: 'contact@echipadetocilari.ro',
  areaServed: 'România',
  openingHours: ['Mo-Su 09:00-17:00'],
  logo: `${SITE}/wp-content/uploads/2024/02/Logo_Echipa_de_Tocilari-1024x1024.webp`,
  image: `${SITE}/wp-content/uploads/2024/02/Logo_Echipa_de_Tocilari-1024x1024.webp`,
  knowsAbout: [
    'Creare site web',
    'Optimizare SEO',
    'Administrare site',
    'Pay Per Click',
    'Logo design',
    'Copywriting',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE}/#website`,
  url: SITE,
  name: 'Echipa de Tocilari',
  publisher: { '@id': `${SITE}/#organization` },
  inLanguage: 'ro-RO',
};

/** FAQ pairs extracted for AEO (visible content stays Elementor; schema helps AI). */
const homeFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Ce este marketingul online și de ce ar trebui să îl folosesc?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Marketingul online este promovarea unei afaceri prin internet (SEO, PPC, conținut, e-mail, social). Merită pentru că majoritatea clienților caută produse și servicii online.',
      },
    },
    {
      '@type': 'Question',
      name: 'Cât timp durează până când voi vedea rezultate din serviciile de marketing online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SEO aduce rezultate de obicei în câteva luni; PPC și social ads pot aduce rezultate în zile sau săptămâni. Marketingul online este pe termen lung.',
      },
    },
    {
      '@type': 'Question',
      name: 'Cum pot să încep să lucrez cu firma voastră de marketing online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Completează formularul de contact sau scrie pe e-mail. Oferim consultație, plan personalizat și buget estimativ; dacă ești de acord, începem colaborarea.',
      },
    },
  ],
};

function walkHtml(dir, list = []) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walkHtml(full, list);
    else if (name.endsWith('.html')) list.push(full);
  }
  return list;
}

function pathKeyFromFile(file) {
  let rel = path.relative(outDir, file).replace(/\\/g, '/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return '/' + rel.slice(0, -'index.html'.length);
  return '/' + rel;
}

function upsertMeta(html, attr, value) {
  // attr e.g. name="description" or property="og:title"
  const re = new RegExp(`<meta\\s+[^>]*${attr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^>]*>`, 'i');
  const tag = `<meta ${attr} content="${escapeAttr(value)}">`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace(/<\/head>/i, `  ${tag}\n</head>`);
}

function upsertTitle(html, title) {
  if (/<title[^>]*>[\s\S]*?<\/title>/i.test(html)) {
    return html.replace(/<title[^>]*>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  }
  return html.replace(/<\/head>/i, `  <title>${escapeHtml(title)}</title>\n</head>`);
}

function escapeAttr(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function injectJsonLd(html, schemas) {
  const blocks = schemas
    .map(
      (s) =>
        `<script type="application/ld+json">${JSON.stringify(s).replace(/</g, '\\u003c')}</script>`
    )
    .join('\n');
  // Remove old Rank Math schema duplicates optional — keep both for safety, inject ours after
  return html.replace(/<\/head>/i, `  ${blocks}\n</head>`);
}

function enhanceHtml(file) {
  let html = readFileSync(file, 'utf8');
  const key = pathKeyFromFile(file);
  const meta = pageMeta[key];

  // lang ro for SEO/AEO
  html = html.replace(/<html\b([^>]*)>/i, (m, attrs) => {
    if (/\blang\s*=/i.test(attrs)) {
      return `<html${attrs.replace(/\blang\s*=\s*["'][^"']*["']/i, ' lang="ro"')}>`;
    }
    return `<html lang="ro"${attrs}>`;
  });

  // Mobile viewport (keep if present)
  if (!/name=["']viewport["']/i.test(html)) {
    html = html.replace(
      /<head[^>]*>/i,
      (h) =>
        `${h}\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`
    );
  }

  // theme-color brand orange
  if (!/name=["']theme-color["']/i.test(html)) {
    html = html.replace(/<\/head>/i, '  <meta name="theme-color" content="#fd8649">\n</head>');
  }

  if (meta) {
    html = upsertTitle(html, meta.title);
    html = upsertMeta(html, 'name="description"', meta.description);
    html = upsertMeta(html, 'property="og:title"', meta.title);
    html = upsertMeta(html, 'property="og:description"', meta.description);
    html = upsertMeta(html, 'name="twitter:title"', meta.title);
    html = upsertMeta(html, 'name="twitter:description"', meta.description);
  }

  // Staging: noindex (unless PUBLIC_INDEXABLE=true)
  if (!INDEXABLE) {
    html = html.replace(
      /<meta\s+name=["']robots["'][^>]*>/gi,
      '<meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex">'
    );
    if (!/name=["']robots["']/i.test(html)) {
      html = html.replace(
        /<\/head>/i,
        '  <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex">\n  <meta name="googlebot" content="noindex, nofollow">\n</head>'
      );
    }
    // strip canonical pointing to production (avoid mixed signals on staging)
    html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/gi, '');
  } else {
    // self-canonical for production
    const canon = `${SITE}${key === '/' ? '/' : key}`;
    if (/rel=["']canonical["']/i.test(html)) {
      html = html.replace(
        /<link\s+rel=["']canonical["'][^>]*>/i,
        `<link rel="canonical" href="${canon}">`
      );
    } else {
      html = html.replace(/<\/head>/i, `  <link rel="canonical" href="${canon}">\n</head>`);
    }
  }

  // GEO / entity schemas — do not alter body
  const schemas = [orgSchema, websiteSchema];
  if (key === '/') schemas.push(homeFaqSchema);
  if (key === '/creare-site-web/') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Creare site web',
      provider: { '@id': `${SITE}/#organization` },
      areaServed: 'România',
      description: pageMeta['/creare-site-web/'].description,
      url: `${SITE}/creare-site-web/`,
    });
  }
  if (key === '/servicii-seo/') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Servicii SEO',
      provider: { '@id': `${SITE}/#organization` },
      areaServed: 'România',
      description: pageMeta['/servicii-seo/'].description,
      url: `${SITE}/servicii-seo/`,
    });
  }
  if (key === '/administrare-site/') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Administrare site',
      provider: { '@id': `${SITE}/#organization` },
      areaServed: 'România',
      description: pageMeta['/administrare-site/'].description,
      url: `${SITE}/administrare-site/`,
    });
  }

  html = injectJsonLd(html, schemas);

  // Mobile-first: ensure form inputs don't cause iOS zoom (16px) via tiny injected style
  // Only if no existing rule — safe additive CSS, no layout change
  if (!html.includes('/* ect-mobile-a11y */')) {
    html = html.replace(
      /<\/head>/i,
      `  <style>/* ect-mobile-a11y */input,textarea,select{font-size:16px}@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}}</style>\n</head>`
    );
  }

  writeFileSync(file, html, 'utf8');
  return key;
}

const htmlFiles = walkHtml(outDir);
console.log(`→ Enhancing ${htmlFiles.length} HTML pages (SEO/AEO/GEO, keep 1:1 visuals)...`);
const keys = htmlFiles.map(enhanceHtml);
console.log('  pages:', keys.filter((k) => pageMeta[k]).join(', ') || '(meta map partial)');

// robots.txt — staging closed by default
const robots = INDEXABLE
  ? `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`
  : `User-agent: *\nDisallow: /\n\nUser-agent: Googlebot\nDisallow: /\n\nUser-agent: Bingbot\nDisallow: /\n`;
writeFileSync(path.join(outDir, 'robots.txt'), robots, 'utf8');

// Minimal llms.txt for GEO/dev tools (cheap, valid URLs)
writeFileSync(
  path.join(outDir, 'llms.txt'),
  `# Echipa de Tocilari\n\n> Agenție marketing digital România: web, SEO, mentenanță, PPC.\n\n## Pages\n- ${SITE}/\n- ${SITE}/creare-site-web/\n- ${SITE}/servicii-seo/\n- ${SITE}/administrare-site/\n- ${SITE}/contact/\n- ${SITE}/portofoliu/\n- ${SITE}/about-2/\n`,
  'utf8'
);

// Simple sitemap only when indexable
if (INDEXABLE) {
  const urls = Object.keys(pageMeta)
    .map(
      (p) =>
        `  <url><loc>${SITE}${p === '/' ? '/' : p}</loc><changefreq>weekly</changefreq></url>`
    )
    .join('\n');
  writeFileSync(
    path.join(outDir, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    'utf8'
  );
}

console.log(`✓ Build complete → dist/ (1:1 visuals + SEO inject, indexable=${INDEXABLE})`);
