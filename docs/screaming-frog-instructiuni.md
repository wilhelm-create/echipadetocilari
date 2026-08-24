# Screaming Frog — instrucțiuni de utilizare

## De ce nu l-am putut rula eu

Screaming Frog SEO Spider **v23.1** e instalat la
`C:\Program Files (x86)\Screaming Frog SEO Spider\`

CLI-ul (`ScreamingFrogSEOSpiderCli.exe`) există și răspunde la `--help`, dar orice crawl se oprește cu:

```
FATAL - Could not locate licence file, please check file exists and matches exact file path
        "C:\Users\andre\.ScreamingFrogSEOSpider\licence.txt".
```

**Modul headless / CLI este disponibil doar cu licență.** Fără licență, aplicația funcționează exclusiv din interfața grafică — pe care eu nu o pot opera. Deci: sau introduci licența (§1) și îl rulez eu, sau îl rulezi manual din GUI (§2).

---

## 1. Dacă ai (sau cumperi) licență — ca să îl pot rula eu

1. Deschide **Screaming Frog SEO Spider** din Start Menu.
2. Meniu **Licence → Enter Licence Key**.
3. Completează **Username** și **Licence Key** exact cum apar în emailul de la Screaming Frog (fără spații în plus).
4. **OK** → închide complet aplicația → redeschide-o. Sus ar trebui să scrie licențiat, iar limita de 500 URL-uri dispare.
5. Verifică din PowerShell că fișierul de licență a fost creat:

```bash
Test-Path "$env:USERPROFILE\.ScreamingFrogSEOSpider\licence.txt"
```

Dacă răspunde `True`, spune-mi și rulez eu crawl-ul complet, cu export automat de rapoarte.

Licența costă ~199 £/an. **Pentru site-ul tău (≈25 URL-uri) versiunea gratuită acoperă 80% din ce ai nevoie** — vezi §2. Licența devine utilă pentru: validare structured data, integrare Search Console/Analytics/PageSpeed, custom extraction, crawl comparison și automatizare.

---

## 2. Cum îl rulezi tu, din interfață (versiunea gratuită)

Limita gratuită e de 500 URL-uri. Site-ul tău are ~25. **E suficient.**

### 2.1 Configurare înainte de crawl

1. Deschide aplicația.
2. **Mode → Spider** (e modul implicit).
3. **Configuration → Spider → Crawl**: bifează `Crawl All Subdomains` dacă vrei să prinzi și eventuale subdomenii.
4. **Configuration → Spider → Extraction**: asigură-te că sunt bifate `Page Details`, `Structured Data` (dacă e disponibil), `HTML`.
5. **Configuration → robots.txt → Settings**: pentru site-ul live lasă `Respect robots.txt`.
   ⚠️ **Pentru build-ul Astro de pe staging trebuie să pui `Ignore robots.txt`** — altfel nu crawlează nimic, pentru că `public/robots.txt` blochează tot intenționat.

### 2.2 Crawl-ul

1. În bara de sus scrie: `https://www.echipadetocilari.ro`
2. Click **Start**. Așteaptă până bara de progres ajunge la 100%.

### 2.3 Ce te uiți, mai exact — în ordinea importanței

| Tab / filtru | Ce cauți | Ce ar trebui să găsești la tine |
|---|---|---|
| **Internal → HTML** | coloana `Status Code` | orice ≠ 200; `/coming-soon/` probabil live |
| **Response Codes → Client Error (4xx)** | linkuri rupte | — |
| **Response Codes → Redirection (3xx)** | lanțuri de redirect | — |
| **Page Titles → Missing / Duplicate / Below 30 Characters** | title-uri irosite | `Servicii SEO`, `Creare site web`, `Despre noi` — toate sub 30 |
| **Meta Description → Missing / Duplicate / Over 155** | — | verifică duplicatele între `/servicii-seo/` și `/ex-servicii-seo/` |
| **H1 → Missing / Duplicate / Multiple** | mai mult de un H1 pe pagină | — |
| **Canonicals → Canonicalised / Missing** | canonical greșit | paginile `/ex-*` |
| **Directives → Noindex** | pagini blocate din greșeală | — |
| **Images → Missing Alt Text** | alt lipsă | — |
| **Content → Low Content Pages** | pagini subțiri | posturile Lorem Ipsum |
| **Structured Data** *(doar licențiat)* | erori JSON-LD | — |

### 2.4 Vizualizări utile

- **Site Structure** (panoul din dreapta) — vezi adâncimea paginilor. Nimic comercial nu ar trebui să fie la depth > 2.
- **Visualisations → Force-Directed Crawl Diagram** — vezi paginile orfane și cum curge link equity.
- **Visualisations → Inlinks Anchor Text Word Cloud** — **cea mai relevantă pentru întrebarea ta despre keywords.** Îți arată cu ce cuvinte îți linkuiești propriile pagini. Dacă vezi „aici", „citește mai mult", „servicii" în loc de „creare site web", „optimizare SEO" — asta e o problemă directă de keyword targeting intern.

### 2.5 Export

**Bulk Export → Response Codes / Page Titles / …** sau, mai simplu, pe fiecare tab: butonul **Export** (sus-stânga în panoul de rezultate) → salvează CSV.

Salvează exporturile într-un folder și spune-mi unde — le citesc și îți fac analiza pe date reale.

### 2.6 Al doilea crawl: site-ul nou Astro (opțional, dar util)

Ca să compari noul build cu cel live, înainte de cutover:

```bash
npm run dev
```

Apoi în Screaming Frog: `Configuration → robots.txt → Settings → Ignore robots.txt`, și crawl pe `http://localhost:4321`.

---

## 3. Comanda CLI (pentru când ai licență)

Rulează un crawl complet și exportă tot ce ne trebuie, fără interfață:

```bash
& "C:\Program Files (x86)\Screaming Frog SEO Spider\ScreamingFrogSEOSpiderCli.exe" --crawl "https://www.echipadetocilari.ro" --headless --output-folder "C:\Users\andre\Desktop\sf-audit" --overwrite --timestamped-output --save-crawl --export-tabs "Internal:All,Response Codes:All,Page Titles:All,Meta Description:All,H1:All,H2:All,Images:All,Canonicals:All,Directives:All,Structured Data:All"
```

Alte opțiuni utile:
- `--config "cale\catre\config.seospiderconfig"` — folosește o configurație salvată din GUI (`File → Config → Save As`)
- `--crawl-sitemap "https://www.echipadetocilari.ro/sitemap.xml"` — crawlează exact ce e în sitemap
- `--bulk-export "All Inlinks,All Outlinks"` — exportă graful de linkuri intern
- `--create-sitemap` — generează sitemap XML din crawl

Dacă rulezi comanda asta (sau îmi confirmi că licența e activă), preiau eu de acolo.
