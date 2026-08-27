/**
 * Crawl competitor HTML like Screaming Frog Internal → CSV.
 * GUI SF cannot run headless without a licence; this extracts Address/Title/H1/meta.
 */
import { mkdirSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '../../docs/keyword-research/sf-competitors');

const SITES = [
  'https://www.webis.ro',
  'https://digitalcuisine.ro',
  'https://sonic-web-design.ro',
  'https://mipadoweb.ro',
  'https://spartanseo.ro',
  'https://www.webhero.ro',
  'https://seomark.ro',
  'https://wsite.ro',
  'https://searchads.ro',
  'https://re7consulting.ro',
  'https://divasweb.ro',
  'https://bromedia.ro',
  'https://servicii-seo.com',
  'https://webdesignersalley.ro',
  'https://agentiewebdesignbucuresti.ro',
  'https://oricemedia.ro',
  'https://rauden.ro',
  'https://digitalpath.ro',
];

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36';
const MAX_PAGES = 80;
const TIMEOUT_MS = 12000;

function csvEscape(value) {
  const s = String(value ?? '').replace(/\r?\n/g, ' ').trim();
  if (/[",]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function decode(html) {
  return html
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)));
}

function stripTags(html) {
  return decode(html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}

async function fetchText(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      redirect: 'follow',
      headers: { 'User-Agent': UA, Accept: 'text/html,application/xml;q=0.9,*/*;q=0.8' },
    });
    const text = await res.text();
    return { status: res.status, finalUrl: res.url, text };
  } finally {
    clearTimeout(t);
  }
}

function hostOf(site) {
  return new URL(site).hostname.replace(/^www\./, '');
}

function sameHost(url, site) {
  try {
    const a = new URL(url, site).hostname.replace(/^www\./, '');
    return a === hostOf(site);
  } catch {
    return false;
  }
}

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/gi)].map((m) => decode(m[1].trim()));
}

async function sitemapUrls(site) {
  const origins = [site.replace(/\/$/, '')];
  const candidates = [
    '/robots.txt',
    '/sitemap.xml',
    '/sitemap_index.xml',
    '/wp-sitemap.xml',
    '/sitemap_index.xml.gz',
    '/page-sitemap.xml',
    '/post-sitemap.xml',
  ];
  const found = new Set();
  const queue = [];

  try {
    const robots = await fetchText(`${origins[0]}/robots.txt`);
    if (robots.status < 400) {
      for (const m of robots.text.matchAll(/sitemap:\s*(\S+)/gi)) queue.push(m[1]);
    }
  } catch {
    /* ignore */
  }
  for (const c of candidates) queue.push(`${origins[0]}${c}`);

  const seenMaps = new Set();
  while (queue.length && found.size < MAX_PAGES) {
    const mapUrl = queue.shift();
    if (!mapUrl || seenMaps.has(mapUrl) || mapUrl.endsWith('.gz')) continue;
    seenMaps.add(mapUrl);
    try {
      const { status, text } = await fetchText(mapUrl);
      if (status >= 400 || !text) continue;
      const locs = extractLocs(text);
      const isIndex = /sitemapindex/i.test(text) || locs.some((u) => /sitemap/i.test(u));
      for (const loc of locs) {
        if (!sameHost(loc, site)) continue;
        if (isIndex && /sitemap|\.xml/i.test(loc) && !seenMaps.has(loc)) {
          queue.push(loc);
        } else if (!/\.(jpg|jpeg|png|gif|webp|svg|pdf|css|js|xml)$/i.test(loc)) {
          found.add(loc.split('#')[0]);
        }
      }
    } catch {
      /* ignore */
    }
  }
  found.add(`${origins[0]}/`);
  return [...found].slice(0, MAX_PAGES);
}

function extractPage(html, url, status) {
  const title = stripTags((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ''])[1]);
  const h1 = stripTags((html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i) || [, ''])[1]);
  const desc = decode(
    (
      html.match(
        /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i,
      ) ||
      html.match(
        /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["'][^>]*>/i,
      ) || [, '']
    )[1],
  );
  return { url, status, title, h1, description: desc };
}

async function crawlSite(site) {
  const domain = hostOf(site);
  console.log(`→ ${domain}`);
  let urls = [];
  try {
    urls = await sitemapUrls(site);
  } catch (err) {
    console.warn(`  sitemap fail: ${err.message}`);
  }
  if (urls.length < 2) urls = [site.endsWith('/') ? site : `${site}/`];

  const rows = [];
  for (const url of urls) {
    try {
      const { status, text } = await fetchText(url);
      if (!/text\/html|application\/xhtml/i.test(text.slice(0, 200)) && !/<html/i.test(text)) {
        if (status >= 400) rows.push({ url, status, title: '', h1: '', description: '' });
        continue;
      }
      rows.push(extractPage(text, url, status));
    } catch (err) {
      rows.push({ url, status: 0, title: `ERROR ${err.message}`, h1: '', description: '' });
    }
  }
  const header = 'Address,Status Code,Title 1,H1-1,Meta Description 1';
  const body = rows
    .map((r) => [r.url, r.status, r.title, r.h1, r.description].map(csvEscape).join(','))
    .join('\n');
  mkdirSync(outDir, { recursive: true });
  const file = path.join(outDir, `${domain}.csv`);
  writeFileSync(file, `${header}\n${body}\n`, 'utf8');
  console.log(`  ${rows.length} URLs → ${path.basename(file)}`);
  return { domain, rows };
}

const results = [];
for (const site of SITES) {
  try {
    results.push(await crawlSite(site));
  } catch (err) {
    console.warn(`FAIL ${site}: ${err.message}`);
  }
}
writeFileSync(
  path.join(outDir, '_summary.json'),
  JSON.stringify(
    {
      crawledAt: new Date().toISOString(),
      method: 'HTTP fetch of sitemap + HTML (SF-equivalent Internal HTML columns)',
      sites: results.map((r) => ({ domain: r.domain, urls: r.rows.length })),
    },
    null,
    2,
  ),
);
console.log(`Done: ${results.length} sites → ${outDir}`);
