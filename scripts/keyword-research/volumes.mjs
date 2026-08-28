/**
 * Shared reader for Google Keyword Planner exports.
 *
 * Every `docs/keyword-research/keyword-stats-*.csv` is a Planner export, so both
 * the master-list builder and the volume merger read the whole folder instead of
 * one hardcoded download. Exports come as UTF-16 TSV; we normalise them to UTF-8
 * on first read so the committed files stay diffable.
 *
 * Two Planner tools produce slightly different shapes: "Historical metrics" adds
 * a Segmentation column with All/Romania subtotal rows, "Discover new keywords"
 * does not. Both are handled by the same parser.
 */
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const statsDir = path.join(root, 'docs/keyword-research');

/** Free Planner accounts round to 50/500/5.000/50.000, so report the bucket. */
export function intervalFor(n) {
  if (n == null) return 'n/d';
  if (n <= 50) return '10–100';
  if (n <= 500) return '100–1.000';
  if (n <= 5000) return '1.000–10.000';
  return '10.000–100.000';
}

function decode(buf) {
  if (buf[0] === 0xff && buf[1] === 0xfe) return { text: buf.slice(2).toString('utf16le'), utf8: false };
  if (buf[0] === 0xfe && buf[1] === 0xff) return { text: buf.slice(2).swap16().toString('utf16le'), utf8: false };
  if (buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) return { text: buf.slice(3).toString('utf8'), utf8: false };
  return { text: buf.toString('utf8'), utf8: true };
}

/**
 * Planner writes an em dash for "no data" and blanks for zero-volume terms.
 * Both must become null, otherwise `intervalFor` reads NaN as the top bucket.
 */
function parseSearches(raw) {
  const s = String(raw ?? '').trim();
  if (!s || /^[-–—\s]+$/.test(s)) return null;
  const n = Number(s.replace(/,/g, ''));
  return Number.isFinite(n) ? n : null;
}

function parseStatsTsv(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.length);
  const headerIdx = lines.findIndex((l) => l.startsWith('Keyword\t'));
  if (headerIdx < 0) throw new Error('No Keyword header');
  const header = lines[headerIdx].split('\t');
  const idx = Object.fromEntries(header.map((h, i) => [h.trim(), i]));
  const col = (cols, name) => (idx[name] == null ? '' : (cols[idx[name]] || '').trim());

  const rows = new Map();
  for (const line of lines.slice(headerIdx + 1)) {
    const cols = line.split('\t');
    const kw = col(cols, 'Keyword');
    const seg = col(cols, 'Segmentation');
    if (!kw || seg === 'All' || seg === 'Romania') continue;
    const n = parseSearches(col(cols, 'Avg. monthly searches'));
    rows.set(kw, {
      cautari_lunare: n,
      cautari_interval: intervalFor(n),
      concurenta_ads: col(cols, 'Competition'),
      cpc_low_ron: col(cols, 'Top of page bid (low range)'),
      cpc_high_ron: col(cols, 'Top of page bid (high range)'),
      trend_3luni: col(cols, 'Three month change'),
      trend_yoy: col(cols, 'YoY change'),
    });
  }
  return rows;
}

/**
 * @returns {{ volumes: Map<string, object>, files: string[] }}
 *   Keywords present in several exports keep the first row that carries a
 *   number, so a later export cannot blank out a known volume.
 */
export function loadVolumes() {
  const files = readdirSync(statsDir)
    .filter((f) => /^keyword-stats-.*\.csv$/.test(f))
    .sort();
  const volumes = new Map();
  for (const f of files) {
    const file = path.join(statsDir, f);
    const { text, utf8 } = decode(readFileSync(file));
    if (!utf8) writeFileSync(file, text, 'utf8');
    for (const [kw, rec] of parseStatsTsv(text)) {
      const prev = volumes.get(kw);
      if (!prev || (prev.cautari_lunare == null && rec.cautari_lunare != null)) volumes.set(kw, rec);
    }
  }
  return { volumes, files };
}
