/**
 * Generate English pages from RO Elementor HTML + dictionary.
 * Visual structure/CSS/JS preserved; text + SEO localized.
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { routes, roToEn } from './routes.mjs';
import { dictionary, enPageMeta, enFaqSchema } from './dictionary.mjs';

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

function applyDictionary(html) {
  // Sort longest first so longer phrases win
  const pairs = [...dictionary].sort((a, b) => b[0].length - a[0].length);
  let out = html;
  for (const [from, to] of pairs) {
    if (!from || from === to) continue;
    // Global replace of plain text (including inside HTML text nodes & attributes carefully)
    // Avoid breaking URLs by skipping replacements that look like paths when source has no path chars
    out = out.split(from).join(to);
  }
  return out;
}

function absolutizeAssets(html) {
  // EN pages live under /en/… — any relative wp-content path 404s.
  // Fix src, href, srcset, and CSS url() to root-absolute /wp-content/ and /wp-includes/.
  let out = html
    .replace(/(src|href)="(\.\.\/)+wp-content\//gi, '$1="/wp-content/')
    .replace(/(src|href)="(\.\.\/)+wp-includes\//gi, '$1="/wp-includes/')
    .replace(/(src|href)="wp-content\//gi, '$1="/wp-content/')
    .replace(/(src|href)="wp-includes\//gi, '$1="/wp-includes/')
    .replace(/url\((['"]?)(\.\.\/)+wp-content\//gi, 'url($1/wp-content/')
    .replace(/url\((['"]?)wp-content\//gi, 'url($1/wp-content/')
    .replace(/url\((['"]?)(\.\.\/)+wp-includes\//gi, 'url($1/wp-includes/')
    .replace(/url\((['"]?)wp-includes\//gi, 'url($1/wp-includes/');

  // srcset="path 836w, path2 288w" — each candidate path
  out = out.replace(/srcset="([^"]+)"/gi, (_, value) => {
    const fixed = value
      .split(',')
      .map((part) => {
        const trimmed = part.trim();
        // "url size" or just "url"
        const m = trimmed.match(/^(\S+)(\s+.+)?$/);
        if (!m) return part;
        let url = m[1];
        const rest = m[2] || '';
        url = url
          .replace(/^(\.\.\/)+wp-content\//, '/wp-content/')
          .replace(/^(\.\.\/)+wp-includes\//, '/wp-includes/')
          .replace(/^wp-content\//, '/wp-content/')
          .replace(/^wp-includes\//, '/wp-includes/');
        return url + rest;
      })
      .join(', ');
    return `srcset="${fixed}"`;
  });

  // Logo / home links that still point to index.html relative
  out = out.replace(/href="index\.html"/gi, 'href="/en/"');
  out = out.replace(/href="\.\.\/index\.html"/gi, 'href="/en/"');

  return out;
}

function rewriteInternalLinks(html) {
  let out = html;
  // Sort longer RO paths first
  const roPaths = Object.keys(roToEn).sort((a, b) => b.length - a.length);
  for (const ro of roPaths) {
    const en = roToEn[ro];
    // Absolute production URLs
    out = out.split(`https://www.echipadetocilari.ro${ro}`).join(en);
    out = out.split(`https://echipadetocilari.ro${ro}`).join(en);
    // Root-relative
    if (ro !== '/') {
      out = out.replaceAll(`href="${ro}"`, `href="${en}"`);
      out = out.replaceAll(`href='${ro}'`, `href='${en}'`);
      // relative without trailing: /creare-site-web
      const bare = ro.replace(/\/$/, '');
      out = out.replaceAll(`href="${bare}"`, `href="${en}"`);
      out = out.replaceAll(`href="${bare}/"`, `href="${en}"`);
    } else {
      out = out.replaceAll('href="/"', 'href="/en/"');
      // careful: don't double-replace /en/
    }
  }
  // Relative links used in menus sometimes
  const relMap = {
    'creare-site-web/': '/en/website-design/',
    'servicii-seo/': '/en/seo-services/',
    'administrare-site/': '/en/website-maintenance/',
    'about-2/': '/en/about/',
    'contact/': '/en/contact/',
    'portofoliu/': '/en/portfolio/',
    'services/': '/en/services/',
    'clients/': '/en/clients/',
    'pay-per-click/': '/en/ppc-advertising/',
  };
  for (const [rel, en] of Object.entries(relMap)) {
    out = out.replaceAll(`href="${rel}"`, `href="${en}"`);
    out = out.replaceAll(`href="/${rel}"`, `href="${en}"`);
  }
  // Fix accidental /en/en/
  out = out.replaceAll('/en/en/', '/en/');
  return out;
}

function upsertMeta(html, attr, value) {
  const re = new RegExp(`<meta\\s+[^>]*${attr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^>]*>`, 'i');
  const tag = `<meta ${attr} content="${escapeAttr(value)}">`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace(/<\/head>/i, `  ${tag}\n</head>`);
}

function setLang(html, lang) {
  return html.replace(/<html\b([^>]*)>/i, (m, attrs) => {
    if (/\blang\s*=/i.test(attrs)) {
      return `<html${attrs.replace(/\blang\s*=\s*["'][^"']*["']/i, ` lang="${lang}"`)}>`;
    }
    return `<html lang="${lang}"${attrs}>`;
  });
}

function injectHreflang(html, roPath, enPath, site) {
  const block = `
  <link rel="alternate" hreflang="ro" href="${site}${roPath === '/' ? '/' : roPath}" />
  <link rel="alternate" hreflang="en" href="${site}${enPath}" />
  <link rel="alternate" hreflang="x-default" href="${site}${roPath === '/' ? '/' : roPath}" />
`;
  // remove existing hreflang
  html = html.replace(/<link\s+rel=["']alternate["'][^>]*hreflang[^>]*>/gi, '');
  return html.replace(/<\/head>/i, `${block}</head>`);
}

/**
 * Visible language switcher:
 * 1) Fixed top-right pill (always on screen)
 * 2) Menu items injected into Elementor nav (desktop + mobile burger)
 */
function injectLangSwitcher(html, currentLang, roHref, enHref) {
  const roActive = currentLang === 'ro';
  const enActive = currentLang === 'en';

  // Top-left under logo area on mobile; left of header on desktop — avoids overlapping "Ai o idee?" CTA
  const bar = `
<!-- language switcher: always visible, does not cover header CTA -->
<style id="ect-lang-css">
#ect-lang-switch{
  position:fixed;
  top:auto;
  bottom:max(1rem, env(safe-area-inset-bottom));
  right:max(1rem, env(safe-area-inset-right));
  left:auto;
  z-index:2147483646;
  font-family:Montserrat,system-ui,sans-serif;
  display:inline-flex;
  align-items:center;
  gap:0;
  background:#fff;
  border:2px solid #fd8649;
  border-radius:999px;
  overflow:hidden;
  box-shadow:0 8px 28px rgba(253,134,73,.35);
}
#ect-lang-switch a{
  display:inline-flex;align-items:center;justify-content:center;
  min-width:52px;min-height:48px;padding:0 1rem;
  font-size:14px;font-weight:700;letter-spacing:.06em;
  text-decoration:none;color:#fd8649;background:transparent;
  transition:background .15s,color .15s;
}
#ect-lang-switch a[aria-current="true"]{background:#fd8649;color:#fff}
#ect-lang-switch a:hover{background:#ff6c2a;color:#fff}
#ect-lang-switch a + a{border-left:1px solid rgba(253,134,73,.35)}
/* Desktop: sit just under header, left side — clear of right CTA */
@media (min-width:1025px){
  #ect-lang-switch{
    top:1.1rem;
    bottom:auto;
    left:max(1rem, env(safe-area-inset-left));
    right:auto;
  }
}
</style>
<nav id="ect-lang-switch" aria-label="Language / Limbă">
  <a href="${roHref}" hreflang="ro" lang="ro" ${roActive ? 'aria-current="true"' : ''} title="Română">RO</a>
  <a href="${enHref}" hreflang="en" lang="en" ${enActive ? 'aria-current="true"' : ''} title="English">EN</a>
</nav>
`;

  // Remove old switcher if present
  html = html.replace(/<!-- language switcher[\s\S]*?<\/div>\s*/i, '');
  html = html.replace(/<div id="ect-lang-switch"[\s\S]*?<\/div>\s*/i, '');
  html = html.replace(/<style id="ect-lang-css">[\s\S]*?<\/style>\s*/i, '');
  html = html.replace(/<nav id="ect-lang-switch"[\s\S]*?<\/nav>\s*/i, '');

  // Inject menu items into Elementor nav lists (before </ul>)
  const roItem = `<li class="menu-item menu-item-type-custom menu-item-object-custom ect-lang-menu"><a href="${roHref}" class="elementor-item" hreflang="ro" lang="ro">Română</a></li>`;
  const enItem = `<li class="menu-item menu-item-type-custom menu-item-object-custom ect-lang-menu"><a href="${enHref}" class="elementor-item" hreflang="en" lang="en">English</a></li>`;
  // Avoid duplicate injections
  if (!html.includes('ect-lang-menu')) {
    html = html.replace(
      /(<\/ul>\s*<\/nav>)/gi,
      `${roItem}${enItem}$1`
    );
  }

  return html.replace(/<\/body>/i, `${bar}\n</body>`);
}

/**
 * @param {object} opts
 * @param {string} opts.outDir
 * @param {string} opts.site
 * @param {boolean} opts.indexable
 * @param {object} opts.orgSchema base org
 */
export function generateEnglishPages({ outDir, site, indexable, orgSchema }) {
  const results = [];

  for (const route of routes) {
    const srcPath = path.join(outDir, route.roFile);
    if (!existsSync(srcPath)) {
      console.warn('  skip missing', route.roFile);
      continue;
    }

    let html = readFileSync(srcPath, 'utf8');
    // Drop RO JSON-LD we inject on RO pages (and Rank Math) so EN schemas stay clean
    html = html.replace(
      /<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi,
      ''
    );
    html = applyDictionary(html);
    html = absolutizeAssets(html);
    html = rewriteInternalLinks(html);
    html = setLang(html, 'en');

    const meta = enPageMeta[route.en];
    if (meta) {
      if (/<title[^>]*>[\s\S]*?<\/title>/i.test(html)) {
        html = html.replace(
          /<title[^>]*>[\s\S]*?<\/title>/i,
          `<title>${escapeHtml(meta.title)}</title>`
        );
      }
      html = upsertMeta(html, 'name="description"', meta.description);
      html = upsertMeta(html, 'property="og:title"', meta.title);
      html = upsertMeta(html, 'property="og:description"', meta.description);
      html = upsertMeta(html, 'property="og:locale"', 'en_US');
      html = upsertMeta(html, 'name="twitter:title"', meta.title);
      html = upsertMeta(html, 'name="twitter:description"', meta.description);
    }

    html = injectHreflang(html, route.ro, route.en, site);
    html = injectLangSwitcher(
      html,
      'en',
      route.ro === '/' ? '/' : route.ro,
      route.en
    );

    // SEO index rules
    if (!indexable) {
      html = html.replace(
        /<meta\s+name=["']robots["'][^>]*>/gi,
        '<meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex">'
      );
      if (!/name=["']robots["']/i.test(html)) {
        html = html.replace(
          /<\/head>/i,
          '  <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex">\n</head>'
        );
      }
      html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/gi, '');
    } else {
      const canon = `${site}${route.en}`;
      if (/rel=["']canonical["']/i.test(html)) {
        html = html.replace(
          /<link\s+rel=["']canonical["'][^>]*>/i,
          `<link rel="canonical" href="${canon}">`
        );
      } else {
        html = html.replace(/<\/head>/i, `  <link rel="canonical" href="${canon}">\n</head>`);
      }
    }

    // EN schemas
    const websiteEn = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${site}/#website-en`,
      url: `${site}/en/`,
      name: 'Echipa de Tocilari',
      inLanguage: 'en-US',
      publisher: { '@id': `${site}/#organization` },
    };
    const webpage = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${site}${route.en}#webpage`,
      url: `${site}${route.en}`,
      name: meta?.title,
      description: meta?.description,
      inLanguage: 'en-US',
      isPartOf: { '@id': `${site}/#website-en` },
      about: { '@id': `${site}/#organization` },
    };
    const schemas = [
      {
        ...orgSchema,
        description:
          'Digital marketing agency in Romania: website design, SEO services, website maintenance, PPC advertising, logo design, and copywriting.',
        knowsAbout: [
          'Website design',
          'SEO services',
          'Website maintenance',
          'PPC advertising',
          'Logo design',
          'Copywriting',
          'Digital marketing',
        ],
        areaServed: 'Romania',
      },
      websiteEn,
      webpage,
    ];
    if (route.en === '/en/') schemas.push(enFaqSchema);
    if (route.en === '/en/website-design/') {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Website design and development',
        description: meta.description,
        provider: { '@id': `${site}/#organization` },
        areaServed: 'Romania',
        url: `${site}/en/website-design/`,
      });
    }
    if (route.en === '/en/seo-services/') {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'SEO services',
        description: meta.description,
        provider: { '@id': `${site}/#organization` },
        areaServed: 'Romania',
        url: `${site}/en/seo-services/`,
      });
    }
    if (route.en === '/en/website-maintenance/') {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Website maintenance',
        description: meta.description,
        provider: { '@id': `${site}/#organization` },
        areaServed: 'Romania',
        url: `${site}/en/website-maintenance/`,
      });
    }

    const ld = schemas
      .map(
        (s) =>
          `<script type="application/ld+json">${JSON.stringify(s).replace(/</g, '\\u003c')}</script>`
      )
      .join('\n');
    html = html.replace(/<\/head>/i, `  ${ld}\n</head>`);

    // og:url
    html = upsertMeta(html, 'property="og:url"', `${site}${route.en}`);

    const dest = path.join(outDir, route.enFile);
    mkdirSync(path.dirname(dest), { recursive: true });
    writeFileSync(dest, html, 'utf8');
    results.push(route.en);
  }

  return results;
}

/** Add hreflang + EN switcher to existing RO pages in dist. */
export function patchRomanianPages({ outDir, site }) {
  for (const route of routes) {
    const file = path.join(outDir, route.roFile);
    if (!existsSync(file)) continue;
    let html = readFileSync(file, 'utf8');
    html = injectHreflang(html, route.ro, route.en, site);
    html = injectLangSwitcher(html, 'ro', route.ro === '/' ? '/' : route.ro, route.en);
    // Ensure ro lang
    html = setLang(html, 'ro');
    writeFileSync(file, html, 'utf8');
  }
}
