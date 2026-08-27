/**
 * Merge competitor Internal-HTML CSVs + Google Autocomplete into the master list.
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const sfDir = path.join(root, 'docs/keyword-research/sf-competitors');
const suggestFile = path.join(root, 'docs/keyword-research/google-suggest-ro.csv');
const outCsv = path.join(root, 'docs/keyword-research/lista-master-keywords.csv');
const outMap = path.join(root, 'docs/keyword-research/mapare-pagini.md');

function parseCsv(text) {
  const rows = [];
  let i = 0;
  const len = text.length;
  const next = () => {
    const row = [];
    let cur = '';
    let q = false;
    for (; i < len; i++) {
      const c = text[i];
      if (q) {
        if (c === '"') {
          if (text[i + 1] === '"') {
            cur += '"';
            i++;
          } else q = false;
        } else cur += c;
      } else if (c === '"') q = true;
      else if (c === ',') {
        row.push(cur);
        cur = '';
      } else if (c === '\n') {
        i++;
        row.push(cur.replace(/\r$/, ''));
        return row;
      } else cur += c;
    }
    if (cur || row.length) {
      row.push(cur.replace(/\r$/, ''));
      return row;
    }
    return null;
  };
  const header = next();
  if (!header) return [];
  const idx = Object.fromEntries(header.map((h, n) => [h.trim(), n]));
  let row;
  while ((row = next())) {
    rows.push({
      url: row[idx.Address] || '',
      status: row[idx['Status Code']] || '',
      title: row[idx['Title 1']] || '',
      h1: row[idx['H1-1']] || '',
      desc: row[idx['Meta Description 1']] || '',
    });
  }
  return rows;
}

const norm = (s) =>
  String(s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const files = readdirSync(sfDir).filter((f) => f.endsWith('.csv'));
const byDomain = {};
for (const f of files) {
  const domain = f.replace(/\.csv$/, '');
  byDomain[domain] = parseCsv(readFileSync(path.join(sfDir, f), 'utf8'));
}

const suggest = new Set();
for (const line of readFileSync(suggestFile, 'utf8').split(/\r?\n/).slice(1)) {
  const m = line.match(/,"([^"]+)"\s*$/) || line.match(/,(.+)$/);
  if (m) suggest.add(norm(m[1]));
}

function competitorHits(needle) {
  const n = norm(needle);
  const hits = [];
  for (const [domain, pages] of Object.entries(byDomain)) {
    const hit = pages.some((p) => {
      const blob = `${p.url} ${p.title} ${p.h1}`;
      return norm(blob).includes(n);
    });
    if (hit) hits.push(domain);
  }
  return hits;
}

const OWNED = {
  home: '/',
  site: '/creare-site-web/',
  seo: '/servicii-seo/',
  admin: '/administrare-site/',
  ppc: '/pay-per-click/',
  logo: '/logo-design/',
  port: '/portofoliu/',
  svc: '/services/',
  about: '/about-2/',
  clients: '/clients/',
  contact: '/contact/',
};

/** Curated commercial keywords — mapped after competitor + autocomplete evidence. */
const KEYWORDS = [
  // Cluster creare site
  ['creare site web', 'creare-site', 'comercial', OWNED.site, 'P0', 'avem', 'Creare site web București | prezentare și landing page', 'Creare site web de prezentare în București'],
  ['creare site', 'creare-site', 'comercial', OWNED.site, 'P0', 'avem', '', ''],
  ['creare site de prezentare', 'creare-site', 'comercial', OWNED.site, 'P0', 'avem', '', ''],
  ['realizare site web', 'creare-site', 'comercial', OWNED.site, 'P1', 'avem', '', ''],
  ['web design bucuresti', 'creare-site', 'comercial', OWNED.site, 'P0', 'avem', '', ''],
  ['creare site wordpress', 'creare-site', 'comercial', OWNED.site, 'P1', 'avem', '', ''],
  ['creare landing page', 'creare-site', 'comercial', OWNED.site, 'P1', 'avem', '', ''],
  ['creare site firma', 'creare-site', 'comercial', OWNED.site, 'P1', 'avem', '', ''],
  ['firma creare site web', 'creare-site', 'comercial', OWNED.site, 'P1', 'avem', '', ''],
  ['creare magazin online', 'creare-site', 'comercial', 'de creat: /creare-magazin-online/', 'P0', 'nu', 'Creare magazin online | WooCommerce și Shopify', 'Creare magazin online pentru afacerea ta'],
  ['creare site web bucuresti', 'creare-site', 'comercial', OWNED.site, 'P0', 'avem', '', ''],
  ['site de prezentare pret', 'pret', 'comercial', 'de creat: /preturi/', 'P0', 'nu', '', ''],
  ['refacere site', 'creare-site', 'comercial', OWNED.site, 'P2', 'avem', '', ''],
  ['redesign site', 'creare-site', 'comercial', OWNED.site, 'P2', 'avem', '', ''],
  // SEO
  ['servicii seo', 'seo', 'comercial', OWNED.seo, 'P0', 'avem', 'Servicii SEO București | optimizare site Google', 'Servicii de optimizare SEO pentru Google'],
  ['optimizare seo', 'seo', 'comercial', OWNED.seo, 'P0', 'avem', '', ''],
  ['agentie seo', 'seo', 'comercial', OWNED.seo, 'P0', 'avem', '', ''],
  ['agentie seo bucuresti', 'seo', 'comercial', OWNED.seo, 'P0', 'avem', '', ''],
  ['servicii seo bucuresti', 'seo', 'comercial', OWNED.seo, 'P0', 'avem', '', ''],
  ['audit seo', 'seo', 'comercial', 'de creat: /audit-seo-gratuit/', 'P0', 'nu', 'Audit SEO gratuit | Echipa de Tocilari', 'Audit SEO gratuit pentru site-ul tău'],
  ['audit seo gratuit', 'seo', 'comercial', 'de creat: /audit-seo-gratuit/', 'P0', 'nu', '', ''],
  ['seo local', 'seo', 'comercial', 'de creat: /seo-local/', 'P1', 'nu', 'SEO local București | Google Business Profile', 'SEO local pentru afaceri din București'],
  ['optimizare seo magazin online', 'seo', 'comercial', OWNED.seo, 'P1', 'avem', '', ''],
  ['consultant seo', 'seo', 'comercial', OWNED.seo, 'P1', 'avem', '', ''],
  ['optimizare site google', 'seo', 'comercial', OWNED.seo, 'P1', 'avem', '', ''],
  ['servicii seo ai', 'seo', 'comercial', OWNED.seo, 'P2', 'avem', '', ''],
  // PPC
  ['google ads', 'ppc', 'comercial', OWNED.ppc, 'P0', 'avem', 'Campanii Google Ads București | administrare PPC', 'Campanii Google Ads'],
  ['agentie google ads', 'ppc', 'comercial', OWNED.ppc, 'P0', 'avem', '', ''],
  ['campanii google ads', 'ppc', 'comercial', OWNED.ppc, 'P0', 'avem', '', ''],
  ['promovare google', 'ppc', 'comercial', OWNED.ppc, 'P1', 'avem', '', ''],
  ['administrare google ads', 'ppc', 'comercial', OWNED.ppc, 'P1', 'avem', '', ''],
  ['facebook ads', 'ppc', 'comercial', OWNED.ppc, 'P2', 'avem', '', ''],
  ['meta ads', 'ppc', 'comercial', OWNED.ppc, 'P2', 'avem', '', ''],
  ['pay per click', 'ppc', 'comercial', OWNED.ppc, 'P2', 'avem', '', ''],
  ['promovare site pe google', 'ppc', 'comercial', OWNED.ppc, 'P1', 'avem', '', ''],
  // Mentenanță
  ['administrare site', 'mentenanta', 'comercial', OWNED.admin, 'P0', 'avem', 'Administrare și mentenanță site | Echipa de Tocilari', 'Administrare și mentenanță site web'],
  ['mentenanta site', 'mentenanta', 'comercial', OWNED.admin, 'P0', 'avem', '', ''],
  ['mentenanta wordpress', 'mentenanta', 'comercial', OWNED.admin, 'P1', 'avem', '', ''],
  ['mentenanta site web', 'mentenanta', 'comercial', OWNED.admin, 'P0', 'avem', '', ''],
  ['optimizare viteza site', 'mentenanta', 'comercial', OWNED.admin, 'P1', 'avem', '', ''],
  ['securitate site', 'mentenanta', 'comercial', OWNED.admin, 'P2', 'avem', '', ''],
  ['migrare site', 'mentenanta', 'comercial', OWNED.admin, 'P2', 'avem', '', ''],
  ['abonament mentenanta site', 'mentenanta', 'comercial', OWNED.admin, 'P1', 'avem', '', ''],
  ['cat costa mentenanta unui site', 'mentenanta', 'comercial', OWNED.admin, 'P1', 'avem', '', ''],
  // Agenție
  ['agentie marketing online', 'agentie', 'comercial', OWNED.home, 'P0', 'avem', 'Agenție marketing online București | Echipa de Tocilari', 'Agenție de marketing online în București'],
  ['agentie marketing digital', 'agentie', 'comercial', OWNED.home, 'P0', 'avem', '', ''],
  ['agentie marketing bucuresti', 'agentie', 'comercial', OWNED.home, 'P0', 'avem', '', ''],
  ['agentie marketing online bucuresti', 'agentie', 'comercial', OWNED.home, 'P0', 'avem', '', ''],
  ['promovare online', 'agentie', 'comercial', OWNED.home, 'P1', 'avem', '', ''],
  ['marketing online firme mici', 'agentie', 'comercial', OWNED.home, 'P2', 'avem', '', ''],
  ['strategie marketing digital', 'agentie', 'comercial', OWNED.svc, 'P2', 'avem', '', ''],
  ['agentie web design bucuresti', 'agentie', 'comercial', OWNED.home, 'P0', 'avem', '', ''],
  // Preț
  ['cat costa un site web', 'pret', 'comercial', 'de creat: /preturi/', 'P0', 'nu', 'Cât costă un site web în 2026 | prețuri orientative', 'Cât costă un site web în România'],
  ['pret creare site', 'pret', 'comercial', 'de creat: /preturi/', 'P0', 'nu', '', ''],
  ['creare site pret', 'pret', 'comercial', 'de creat: /preturi/', 'P0', 'nu', '', ''],
  ['cat costa seo', 'pret', 'comercial', 'de creat: /preturi/', 'P0', 'nu', '', ''],
  ['pret optimizare seo', 'pret', 'comercial', 'de creat: /preturi/', 'P0', 'nu', '', ''],
  ['servicii seo pret', 'pret', 'comercial', 'de creat: /preturi/', 'P1', 'nu', '', ''],
  ['cat costa un magazin online', 'pret', 'comercial', 'de creat: /preturi/', 'P0', 'nu', '', ''],
  ['administrare site pret', 'pret', 'comercial', 'de creat: /preturi/', 'P1', 'nu', '', ''],
  ['mentenanta site pret', 'pret', 'comercial', 'de creat: /preturi/', 'P1', 'nu', '', ''],
  ['seo sau google ads', 'pret', 'informational', 'de creat: articol blog', 'P1', 'nu', '', ''],
  // Informațional
  ['ce este seo', 'info', 'informational', 'de creat: articol blog', 'P2', 'nu', '', ''],
  ['cum apari pe prima pagina google', 'info', 'informational', 'de creat: articol blog', 'P1', 'nu', '', ''],
  ['cum imi fac magazin online', 'info', 'informational', 'de creat: articol blog', 'P2', 'nu', '', ''],
  ['cum optimizez google business profile', 'info', 'informational', 'de creat: /seo-local/', 'P2', 'nu', '', ''],
  ['greseli seo', 'info', 'informational', 'de creat: articol blog', 'P2', 'nu', '', ''],
  ['cum aleg o agentie de marketing', 'info', 'informational', OWNED.about, 'P2', 'avem', '', ''],
  // Verticale
  ['creare site restaurant', 'verticale', 'comercial', 'de creat: /site-web-restaurant/', 'P1', 'nu', '', ''],
  ['site pentru restaurant', 'verticale', 'comercial', 'de creat: /site-web-restaurant/', 'P1', 'nu', '', ''],
  ['creare site cabinet stomatologic', 'verticale', 'comercial', 'de creat: /site-web-cabinet-stomatologic/', 'P1', 'nu', '', ''],
  ['site pentru cabinet stomatologic', 'verticale', 'comercial', 'de creat: /site-web-cabinet-stomatologic/', 'P1', 'nu', '', ''],
  ['site pentru clinica veterinara', 'verticale', 'comercial', 'de creat: /site-web-clinica-veterinara/', 'P1', 'nu', '', ''],
  ['site pentru pensiune', 'verticale', 'comercial', 'de creat: /site-web-pensiune-hotel/', 'P2', 'nu', '', ''],
  ['seo pentru avocati', 'verticale', 'comercial', 'de creat: /seo-pentru-avocati/', 'P2', 'nu', '', ''],
  ['creare site avocat', 'verticale', 'comercial', 'de creat: /seo-pentru-avocati/', 'P2', 'nu', '', ''],
  ['creare site agentie imobiliara', 'verticale', 'comercial', 'de creat: verticală imobiliare', 'P2', 'nu', '', ''],
  ['site pentru salon', 'verticale', 'comercial', 'de creat: verticală salon', 'P2', 'nu', '', ''],
  // Brand / trust pages
  ['logo design', 'brand', 'comercial', OWNED.logo, 'P1', 'avem', 'Logo design și identitate vizuală | Echipa de Tocilari', 'Logo design și identitate vizuală'],
  ['creare logo', 'brand', 'comercial', OWNED.logo, 'P1', 'avem', '', ''],
  ['identitate vizuala', 'brand', 'comercial', OWNED.logo, 'P2', 'avem', '', ''],
  ['portofoliu web design', 'brand', 'navigational', OWNED.port, 'P2', 'avem', 'Portofoliu web design | Echipa de Tocilari', 'Portofoliu de web design'],
  ['contact agentie marketing', 'brand', 'navigational', OWNED.contact, 'P2', 'avem', 'Contact | consultație marketing București', 'Contactează agenția de marketing online'],
];

const header = [
  'keyword',
  'cluster',
  'intentie',
  'pagina_tinta',
  'avem_pagina',
  'prioritate',
  'in_autocomplete',
  'competitori_nr',
  'competitori',
  'title_propus',
  'h1_propus',
];

const lines = [header.join(',')];
const records = [];

function csvEscape(s) {
  const v = String(s ?? '');
  if (/[",\n]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
  return v;
}

for (const [kw, cluster, intent, page, prio, have, title, h1] of KEYWORDS) {
  const hits = competitorHits(kw);
  const inAuto = suggest.has(norm(kw)) ? 'da' : 'nu';
  const rec = {
    keyword: kw,
    cluster,
    intentie: intent,
    pagina_tinta: page,
    avem_pagina: have,
    prioritate: prio,
    in_autocomplete: inAuto,
    competitori_nr: hits.length,
    competitori: hits.join('; '),
    title_propus: title,
    h1_propus: h1,
  };
  records.push(rec);
  lines.push(
    [
      rec.keyword,
      rec.cluster,
      rec.intentie,
      rec.pagina_tinta,
      rec.avem_pagina,
      rec.prioritate,
      rec.in_autocomplete,
      rec.competitori_nr,
      rec.competitori,
      rec.title_propus,
      rec.h1_propus,
    ]
      .map(csvEscape)
      .join(','),
  );
}

mkdirSync(path.dirname(outCsv), { recursive: true });
writeFileSync(outCsv, `${lines.join('\n')}\n`, 'utf8');

const byPage = new Map();
for (const r of records) {
  if (!byPage.has(r.pagina_tinta)) byPage.set(r.pagina_tinta, []);
  byPage.get(r.pagina_tinta).push(r);
}

const pageOrder = [
  OWNED.home,
  OWNED.site,
  OWNED.seo,
  OWNED.admin,
  OWNED.ppc,
  OWNED.logo,
  OWNED.port,
  OWNED.svc,
  OWNED.about,
  OWNED.clients,
  OWNED.contact,
];

let md = `# Mapare keyword → pagină (cele 11 pagini existente)

Sursă: crawl HTML echivalent Screaming Frog pe 18 competitori (${new Date().toISOString().slice(0, 10)}) + Google Autocomplete RO.
Nu forțăm pe o pagină existentă un head term care merită URL propriu (ex. \`creare magazin online\` nu e primary pe \`/creare-site-web/\`).

`;

function section(path, primary, secondary, avoid) {
  const rows = (byPage.get(path) || []).sort((a, b) => b.competitori_nr - a.competitori_nr);
  md += `## ${path}\n\n`;
  md += `- **Primary:** \`${primary}\`\n`;
  md += `- **Secundare:** ${secondary.map((s) => `\`${s}\``).join(', ')}\n`;
  md += `- **Nu forțăm aici:** ${avoid.map((s) => `\`${s}\``).join(', ')}\n`;
  if (rows.length) {
    md += `\n| Keyword | Prioritate | Competitori | Autocomplete |\n|---|---|---:|---|\n`;
    for (const r of rows) {
      md += `| ${r.keyword} | ${r.prioritate} | ${r.competitori_nr} | ${r.in_autocomplete} |\n`;
    }
  }
  md += '\n';
}

section(OWNED.home, 'agentie marketing online bucuresti', ['agentie marketing digital', 'agentie web design bucuresti', 'promovare online'], ['creare site web', 'servicii seo', 'google ads']);
section(OWNED.site, 'creare site web', ['creare site de prezentare', 'web design bucuresti', 'creare site wordpress', 'realizare site web'], ['creare magazin online (pagină nouă)', 'pret creare site (pagină /preturi/)']);
section(OWNED.seo, 'servicii seo', ['optimizare seo', 'agentie seo bucuresti', 'optimizare site google'], ['seo local (pagină nouă)', 'audit seo gratuit (pagină nouă)']);
section(OWNED.admin, 'administrare site', ['mentenanta site', 'mentenanta wordpress', 'optimizare viteza site'], ['mentenanta ca URL separat — rămâne pe această pagină ca secundar']);
section(OWNED.ppc, 'campanii google ads', ['agentie google ads', 'administrare google ads', 'promovare google'], ['pay per click ca head term', 'facebook ads ca primary']);
section(OWNED.logo, 'logo design', ['creare logo', 'identitate vizuala'], ['branding full-service ca pagină separată']);
section(OWNED.port, 'portofoliu web design', ['site-uri realizate'], ['head terms comerciale']);
section(OWNED.svc, 'servicii marketing digital', ['strategie marketing digital'], ['canibalizare cu homepage / creare site / SEO']);
section(OWNED.about, 'despre echipa de tocilari', ['cum aleg o agentie de marketing'], ['head terms comerciale']);
section(OWNED.clients, 'clienti echipa de tocilari', [], ['head terms comerciale']);
section(OWNED.contact, 'contact agentie marketing', [], ['head terms comerciale']);

md += `## Gap-uri P0 (pagini de creat, nu în această rundă)\n\n`;
const gaps = records.filter((r) => r.avem_pagina === 'nu' && r.prioritate === 'P0');
const seen = new Set();
for (const g of gaps) {
  if (seen.has(g.pagina_tinta)) continue;
  seen.add(g.pagina_tinta);
  md += `- **${g.pagina_tinta}** — ${records
    .filter((r) => r.pagina_tinta === g.pagina_tinta)
    .map((r) => `\`${r.keyword}\``)
    .join(', ')} (${competitorHits(g.keyword).length}+ competitori pe head term)\n`;
}

writeFileSync(outMap, md, 'utf8');
writeFileSync(
  path.join(root, 'docs/keyword-research/lista-master-keywords.json'),
  JSON.stringify({ generatedAt: new Date().toISOString(), sites: Object.keys(byDomain).length, records }, null, 2),
  'utf8',
);

const p0 = records.filter((r) => r.prioritate === 'P0').length;
console.log(`Wrote ${records.length} keywords (${p0} P0) → ${path.relative(root, outCsv)}`);
console.log(`Mapping → ${path.relative(root, outMap)}`);
