import scrape from 'website-scraper';
import { existsSync, rmSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'public');

const urls = [
  'https://www.echipadetocilari.ro/',
  'https://www.echipadetocilari.ro/creare-site-web/',
  'https://www.echipadetocilari.ro/administrare-site/',
  'https://www.echipadetocilari.ro/portofoliu/',
  'https://www.echipadetocilari.ro/about-2/',
  'https://www.echipadetocilari.ro/contact/',
  'https://www.echipadetocilari.ro/servicii-seo/',
  'https://www.echipadetocilari.ro/clients/',
  'https://www.echipadetocilari.ro/services/',
  'https://www.echipadetocilari.ro/pay-per-click/',
  // secondary / legacy pages still linked
  'https://www.echipadetocilari.ro/ex-servicii-seo/',
  'https://www.echipadetocilari.ro/ex-creare-site-web/',
  'https://www.echipadetocilari.ro/home/',
  'https://www.echipadetocilari.ro/coming-soon/',
  // blog posts from sitemap
  'https://www.echipadetocilari.ro/will-there-be-a-future-post-facebook/',
  'https://www.echipadetocilari.ro/always-learn-from-experience-and-past-mistakes/',
  'https://www.echipadetocilari.ro/the-weekly-podcast-design-meets-technology/',
  'https://www.echipadetocilari.ro/onward-our-award-winning-creative-campaign/',
  'https://www.echipadetocilari.ro/the-digital-marketing-revolution-is-here-is-here-now/',
  'https://www.echipadetocilari.ro/fun-fun-and-more-fun-come-work-at-beyond/',
  'https://www.echipadetocilari.ro/lets-party-our-end-of-the-year-celebration/',
  'https://www.echipadetocilari.ro/do-ppc-ninjas-really-exist/',
  'https://www.echipadetocilari.ro/case-study-how-to-improve-your-seo-scores/',
];

if (existsSync(outDir)) {
  console.log('Removing existing public/ ...');
  rmSync(outDir, { recursive: true, force: true });
}

console.log(`Mirroring ${urls.length} pages → ${outDir}`);

const result = await scrape({
  urls,
  directory: outDir,
  recursive: true,
  maxRecursiveDepth: 2,
  maxDepth: 3,
  requestConcurrency: 4,
  filenameGenerator: 'bySiteStructure',
  urlFilter: (url) => {
    try {
      const u = new URL(url);
      // same origin only
      if (!u.hostname.includes('echipadetocilari.ro')) return false;
      // skip admin, feeds, login, query-heavy
      if (u.pathname.includes('/wp-admin')) return false;
      if (u.pathname.includes('/wp-login')) return false;
      if (u.pathname.includes('/feed')) return false;
      if (u.pathname.includes('/xmlrpc')) return false;
      if (u.pathname.includes('/cdn-cgi')) return false;
      // allow assets + pages
      return true;
    } catch {
      return false;
    }
  },
  sources: [
    { selector: 'img', attr: 'src' },
    { selector: 'img', attr: 'srcset' },
    { selector: 'input', attr: 'src' },
    { selector: 'source', attr: 'src' },
    { selector: 'source', attr: 'srcset' },
    { selector: 'video', attr: 'src' },
    { selector: 'audio', attr: 'src' },
    { selector: 'embed', attr: 'src' },
    { selector: 'object', attr: 'data' },
    { selector: 'script', attr: 'src' },
    { selector: 'link[rel="stylesheet"]', attr: 'href' },
    { selector: 'link[rel*="icon"]', attr: 'href' },
    { selector: 'link[rel="preload"]', attr: 'href' },
    { selector: 'link[rel="apple-touch-icon"]', attr: 'href' },
    { selector: 'link[rel="manifest"]', attr: 'href' },
    { selector: 'meta[property="og:image"]', attr: 'content' },
    { selector: 'meta[name="twitter:image"]', attr: 'content' },
    { selector: 'a', attr: 'href' },
  ],
  request: {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    },
  },
});

console.log(`Saved ${result.length} resources`);
console.log('Done.');
