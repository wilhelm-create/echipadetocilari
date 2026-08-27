/**
 * Merge Google Ads Keyword Planner Historical metrics into the master list.
 */
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const statsSrc = path.join(
  process.env.USERPROFILE,
  'Downloads',
  'Keyword Stats 2026-08-28 at 02_29_16.csv',
);
const statsDst = path.join(root, 'docs/keyword-research/keyword-stats-google-ads-2026-08-28.csv');
const masterCsv = path.join(root, 'docs/keyword-research/lista-master-keywords.csv');
const masterJson = path.join(root, 'docs/keyword-research/lista-master-keywords.json');

function intervalFor(n) {
  if (n == null) return 'n/d';
  if (n <= 50) return '10–100';
  if (n <= 500) return '100–1.000';
  if (n <= 5000) return '1.000–10.000';
  return '10.000–100.000';
}

function parseTsv(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.length);
  const headerIdx = lines.findIndex((l) => l.startsWith('Keyword\t'));
  if (headerIdx < 0) throw new Error('No Keyword header');
  const header = lines[headerIdx].split('\t');
  const idx = Object.fromEntries(header.map((h, i) => [h.trim(), i]));
  const byKw = new Map();
  for (const line of lines.slice(headerIdx + 1)) {
    const cols = line.split('\t');
    const kw = (cols[idx.Keyword] || '').trim();
    const seg = (cols[idx.Segmentation] || '').trim();
    if (!kw || seg === 'All' || seg === 'Romania') continue;
    const raw = (cols[idx['Avg. monthly searches']] || '').trim();
    const n = raw === '' ? null : Number(raw);
    byKw.set(kw, {
      cautari_lunare: n,
      cautari_interval: intervalFor(n),
      concurenta_ads: (cols[idx.Competition] || '').trim(),
      cpc_low_ron: (cols[idx['Top of page bid (low range)']] || '').trim(),
      cpc_high_ron: (cols[idx['Top of page bid (high range)']] || '').trim(),
      yoy: (cols[idx['YoY change']] || '').trim(),
    });
  }
  return byKw;
}

function csvEscape(v) {
  const s = v == null ? '' : String(v);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function readStats(file) {
  const buf = readFileSync(file);
  if (buf[0] === 0xff && buf[1] === 0xfe) return buf.slice(2).toString('utf16le');
  if (buf[0] === 0xfe && buf[1] === 0xff) return buf.slice(2).swap16().toString('utf16le');
  if (buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) return buf.slice(3).toString('utf8');
  return buf.toString('utf8');
}

const statsText = readStats(statsSrc);
writeFileSync(statsDst, statsText);
const volumes = parseTsv(statsText);

const json = JSON.parse(readFileSync(masterJson, 'utf8'));
json.volumes = {
  source: 'Google Keyword Planner Historical metrics',
  location: 'Romania',
  dateRange: '1 August 2025 - 31 July 2026',
  importedAt: '2026-08-28',
  note: 'Cont gratuit: cifrele 50/500/5000/50000 sunt bucket-uri rotunjite, nu volume exacte.',
};

const missing = [];
for (const rec of json.records) {
  const v = volumes.get(rec.keyword);
  if (!v) {
    missing.push(rec.keyword);
    rec.cautari_lunare = '';
    rec.cautari_interval = 'n/d';
    rec.concurenta_ads = '';
    rec.cpc_low_ron = '';
    rec.cpc_high_ron = '';
    continue;
  }
  rec.cautari_lunare = v.cautari_lunare == null ? '' : v.cautari_lunare;
  rec.cautari_interval = v.cautari_interval;
  rec.concurenta_ads = v.concurenta_ads;
  rec.cpc_low_ron = v.cpc_low_ron;
  rec.cpc_high_ron = v.cpc_high_ron;
}

const cols = [
  'keyword',
  'cluster',
  'intentie',
  'pagina_tinta',
  'avem_pagina',
  'prioritate',
  'cautari_lunare',
  'cautari_interval',
  'concurenta_ads',
  'cpc_low_ron',
  'cpc_high_ron',
  'in_autocomplete',
  'competitori_nr',
  'competitori',
  'title_propus',
  'h1_propus',
];

const csvLines = [
  cols.join(','),
  ...json.records.map((r) => cols.map((c) => csvEscape(r[c] ?? '')).join(',')),
];
writeFileSync(masterCsv, csvLines.join('\r\n') + '\r\n');
writeFileSync(masterJson, JSON.stringify(json, null, 2) + '\n');

const ranked = [...json.records]
  .map((r) => ({ ...r, vol: Number(r.cautari_lunare) || 0 }))
  .sort((a, b) => b.vol - a.vol || a.keyword.localeCompare(b.keyword));

const withVol = ranked.filter((r) => r.vol > 0).length;
const noVol = ranked.length - withVol;
console.log(JSON.stringify({ missing, withVol, noVol, top: ranked.slice(0, 20).map((r) => [r.keyword, r.vol, r.pagina_tinta, r.avem_pagina]) }, null, 2));
