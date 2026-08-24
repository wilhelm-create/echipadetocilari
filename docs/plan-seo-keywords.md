# Analiză nișă + plan de extindere pe keywords — Echipa de Tocilari

Data: 2026-08-12
Scop: SEO (Google clasic) + AEO (answer engines / featured snippets) + GEO (ChatGPT, Perplexity, AI Overviews)

---

## 0. TL;DR — verdictul pe keywords

**Keyword-urile pe care le folosești sunt corecte, dar sunt doar ~15% din nișă.**

Ce e bine: slug-urile comerciale sunt exacte (`/creare-site-web/`, `/servicii-seo/`, `/administrare-site/`, `/pay-per-click/`), FAQ-urile sunt în DOM, schema JSON-LD e peste media pieței.

Ce lipsește și te costă cel mai mult:
1. **Zero targeting local** — „București" apare doar în adresă. În RO, volumul comercial e pe `agentie seo bucuresti`, `creare site web bucuresti`.
2. **Zero pagini de preț** — `cat costa un site web`, `pret optimizare seo` sunt cele mai căutate query-uri comerciale din nișă. Toți concurenții au pagină. Tu nu.
3. **Zero conținut informațional** — 0 articole reale. Nu ai cum să apari în AI Overviews / ChatGPT fără conținut citabil.
4. **Title tags trunchiate** — `Servicii SEO` (12 caractere) irosește ~45 de caractere de real estate în SERP.
5. **Nișe verticale neexploatate** — ai testimoniale de la clinică veterinară, restaurant și hostel, dar nicio pagină care să țintească acele industrii.

---

## 1. Analiza nișei

### 1.1 Ce vinzi și unde te poziționezi

Agenție full-service de marketing digital, sediu București, servesc toată România, 6 linii de servicii: creare site, SEO, mentenanță, PPC, logo, copywriting.

Problema de poziționare: **„full-service" e cea mai competitivă și cea mai prost diferențiată poziție din piață.** Toți concurenții spun același lucru. Diferențierea reală trebuie să vină din verticale (industrii) sau din dovezi (studii de caz cu cifre).

### 1.2 Piața și prețurile (benchmark 2026)

| Serviciu | Interval de piață RO |
|---|---|
| Site de prezentare (5–10 pagini) | 500 – 2.500 € |
| Site custom design UX/UI | +1.500 – 5.000 € |
| SEO lunar, IMM | 300 – 1.500 €/lună |
| SEO lunar, firme mici (cabinet, restaurant) | 200 – 400 €/lună |
| SEO lunar, competitiv | până la 3.000 €/lună |
| Marketing digital, entry | de la 299 €/lună |

Sursa: benchmark public din SERP-ul RO (vezi secțiunea Surse). **Faptul că aceste cifre sunt publice și căutate înseamnă că pagina de prețuri e o oportunitate, nu un risc.**

### 1.3 Concurența — ce fac ei și tu nu

Concurenți direcți identificați în SERP: `marketiu.ro`, `themarkers.ro`, `digitalrocket.ro`, `webxtatic.com`, `impact-ads.ro`, `seoads.ro`, `weboom.ro`, `agentieseobucuresti.ro`, `lansaresite.ro`.

Pattern-uri câștigătoare pe care le au ei și tu nu le ai:

| Tactică | Cine o folosește | Tu |
|---|---|---|
| Preț afișat în title tag („De la 1800 lei/luna") | webxtatic, impact-ads | ✗ |
| Oraș în domeniu / title | agentieseobucuresti, serviciiseobucuresti | ✗ |
| Pagină dedicată de prețuri | aproape toți | ✗ |
| Blog cu articole „cât costă…" | beyond-development, trifumedia, cyberfolks, instatic | ✗ |
| Pagină SEO local separată | themarkers, omnimedia, netseo | ✗ |
| Pagină SEO e-commerce separată | seomagazinonline, weboom | ✗ |
| Prezență pe agregatoare (Clutch, Sortlist, TechBehemoths, necesit.ro) | majoritatea | ✗ |

**Ultimul rând e cel mai important pentru GEO.** Când am căutat „top agenții marketing România", rezultatele #1 au fost Clutch, Sortlist și TechBehemoths — exact paginile pe care ChatGPT și Perplexity le citează când cineva întreabă „ce agenție de marketing să aleg în București".

---

## 2. Audit keywords — pagină cu pagină

### 2.1 Ce ai acum

| Pagină | Title actual | Lungime | Verdict |
|---|---|---|---|
| `/` | Agenție marketing digital & web design | 38 | OK, dar fără oraș |
| `/servicii/` | Servicii de marketing digital | 29 | Slab — termen fără volum |
| `/creare-site-web/` | Creare site web | 15 | Head term corect, dar irosit |
| `/servicii-seo/` | Servicii SEO | 12 | Head term corect, dar irosit |
| `/administrare-site/` | Administrare site & mentenanță | 30 | Bun |
| `/pay-per-click/` | Campanii Pay Per Click (PPC) & Google Ads | 42 | Cel mai bun din site |
| `/portofoliu/` | Portofoliu web design | 21 | OK |
| `/clienti/` | Clienți & testimoniale | 22 | OK (pagină non-SEO) |
| `/despre-noi/` | Despre noi | 10 | Irosit |
| `/contact/` | Contact | 7 | OK (brand query) |

Șablonul din `src/layouts/BaseLayout.astro:43` adaugă ` · Echipa de Tocilari` (22 caractere). Deci `Servicii SEO` devine `Servicii SEO · Echipa de Tocilari` = 34 caractere. **Google afișează ~60.** Pierzi 26 de caractere pe cea mai importantă pagină comercială.

### 2.2 Title tags — rescrieri propuse

```
/                    Agenție Marketing Online București | Site-uri, SEO, Google Ads
/servicii/           Servicii Marketing Digital: SEO, Site Web, PPC | Prețuri
/creare-site-web/    Creare Site Web București — Prezentare & Magazin Online
/servicii-seo/       Servicii SEO București | Optimizare SEO Site & Magazin Online
/administrare-site/  Administrare & Mentenanță Site WordPress | Abonament Lunar
/pay-per-click/      Campanii Google Ads & PPC | Agenție Certificată București
/portofoliu/         Portofoliu Web Design — Site-uri Realizate de Noi
/despre-noi/         Despre Echipa de Tocilari — Agenție Marketing București
```

Regula: **head term + modificator geografic sau comercial**, sub 60 de caractere incluzând sufixul de brand. Pentru titlurile de mai sus, dezactivează sufixul automat sau scurtează-l la ` | EdT`.

### 2.3 H1-uri — rescrieri propuse

H1 actual pe `/servicii-seo/` este `Servicii SEO`. Propunere: `Servicii SEO în București și în toată România`.
Pe `/creare-site-web/`: `Creare Site Web — Prezentare, Landing Page și Magazin Online`.

Nu duplica title-ul în H1 — folosește H1 pentru a prinde varianta long-tail pe care title-ul nu o încape.

### 2.4 Problema „tocilari"

Brand excelent, memorabil, diferențiat. **Dar are volum de căutare aproape zero.** Nu poate purta trafic. Îl păstrezi ca brand, dar niciun title/H1 comercial nu trebuie să se bazeze pe el. Homepage-ul actual are H1 `Marketing online făcut de tocilari!` — bun pentru conversie, zero pentru SEO. Soluție: păstrează-l ca tagline vizual (`<p class="eyebrow">`) și pune H1 pe keyword.

---

## 3. Probleme tehnice blocante (de rezolvat ÎNAINTE de conținut)

Aceste lucruri sunt live acum pe `www.echipadetocilari.ro` și fac rău activ.

### 3.1 🔴 CRITIC — 9 articole Lorem Ipsum indexabile

`post-sitemap.xml` conține 9 articole din tema demo, în engleză, cu corp de text Lorem Ipsum. Verificat direct:

> `/do-ppc-ninjas-really-exist/` → „Proin gravida nisi turpis, posuere elementum leo laoreet Curabitur accumsan maximus. Lorem ipsum dolor sit amet…"

Altele: `/lets-party-our-end-of-the-year-celebration/`, `/fun-fun-and-more-fun-come-work-at-beyond/`, `/will-there-be-a-future-post-facebook/` etc.

**Impact:** o agenție de marketing cu blog Lorem Ipsum indexat este cel mai prost semnal de calitate posibil — atât pentru sistemele de site quality Google, cât și pentru modelele AI care evaluează credibilitatea entității. **Șterge-le (410) sau redirecționează-le 301 către `/`.** Nu le pune noindex, șterge-le.

### 3.2 🔴 Pagini duplicate / orfane în sitemap

```
/ex-servicii-seo/       ← duplicat vechi al /servicii-seo/
/ex-creare-site-web/    ← duplicat vechi al /creare-site-web/
/home/                  ← duplicat al /
/coming-soon/           ← pagină de lansare, încă live din 2023
/about-2/               ← slug generat automat de WordPress
/clients/  /services/   ← versiuni EN neintenționate
```

Toate → 301 către echivalentul corect, apoi scoase din sitemap.

### 3.3 🟠 Migrarea Astro schimbă URL-uri — 301 obligatorii

Repo-ul are slug-uri noi față de live:

| Live acum | Astro |
|---|---|
| `/about-2/` | `/despre-noi/` |
| `/clients/` | `/clienti/` |
| `/services/` | `/servicii/` |

Fără 301 în `vercel.json`, pierzi tot equity-ul acumulat pe acele URL-uri.

### 3.4 🟠 Date NAP incomplete → local SEO și GEO slabe

În `src/data/business.ts`:
- `phone: ''` și `phoneDisplay: ''` — gol. Schema `ProfessionalService` iese fără `telephone`.
- `sameAs: []` — gol. **Acesta e cel mai important câmp pentru GEO.** `sameAs` e felul în care motoarele generative leagă site-ul de entitatea „Echipa de Tocilari" pe Google Business Profile, Facebook, LinkedIn, Clutch. Fără el, ești o entitate necunoscută.
- Lipsește `@type: LocalBusiness` cu `geo` (latitude/longitude) și `hasMap` către Google Business Profile.

### 3.5 🟢 Corect deja (nu strica)

- `robots.txt` blochează tot — **corect** cât timp Astro e pe staging. La lansare: deblochează, și **deblochează explicit `GPTBot`, `OAI-SearchBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`** (acum sunt toți blocați — asta e sinucidere pentru GEO).
- `llms.txt` există — rar în piața RO, avantaj real.
- Schema: Organization, WebPage, Breadcrumb, Service, FAQPage — solid.
- `hreflang` ro/en/x-default — corect implementat.
- Pattern-ul „**Răspuns direct:**" din `/servicii-seo/` și `/creare-site-web/` — **excelent pentru AEO, extinde-l pe toate paginile.**

---

## 4. Harta de keywords — 8 clustere

> ⚠️ Nu am acces la Keyword Planner / Ahrefs, deci **nu am volume exacte.** Prioritizarea de mai jos e pe intenție + competiție observată în SERP. Validează volumele în Google Keyword Planner (gratuit cu cont Google Ads) înainte de a scrie.

### Cluster 1 — Creare site web (comercial, prioritate 1)
`creare site web` · `creare site de prezentare` · `creare magazin online` · `firma creare site web` · `realizare site web` · `web design bucuresti` · `creare site wordpress` · `creare landing page` · `creare site firma` · `site de prezentare pret`

### Cluster 2 — SEO (comercial, prioritate 1)
`servicii seo` · `optimizare seo` · `agentie seo` · `agentie seo bucuresti` · `audit seo` · `seo local` · `optimizare seo magazin online` · `consultant seo` · `servicii seo bucuresti` · `optimizare site google`

### Cluster 3 — PPC / Ads (comercial, prioritate 2)
`google ads` · `agentie google ads` · `campanii google ads` · `promovare google` · `facebook ads` · `meta ads` · `remarketing` · `administrare google ads`

### Cluster 4 — Mentenanță (comercial, prioritate 2)
`administrare site` · `mentenanta site` · `mentenanta wordpress` · `optimizare viteza site` · `securitate site` · `migrare site` · `abonament mentenanta site`

### Cluster 5 — Brand agenție (comercial, prioritate 2)
`agentie marketing online` · `agentie marketing digital` · `agentie marketing bucuresti` · `promovare online` · `marketing online firme mici` · `strategie marketing digital`

### Cluster 6 — Preț & comparație (comercial-informațional, **prioritate 1 — cel mai mare ROI**)
`cat costa un site web` · `cat costa seo` · `pret creare site` · `pret optimizare seo` · `seo sau google ads` · `wordpress sau shopify` · `agentie sau freelancer` · `cat costa un magazin online`

### Cluster 7 — Informațional / blog (AEO + GEO, prioritate 2)
`ce este seo` · `cum apari pe prima pagina google` · `cum imi fac magazin online` · `cum optimizez google business profile` · `greseli seo` · `core web vitals` · `de ce am nevoie de site` · `cum aleg o agentie de marketing` · `checklist lansare site`

### Cluster 8 — Verticale industrie (long-tail, **cea mai mare rată de conversie**)
`site pentru cabinet stomatologic` · `site pentru restaurant` · `site pentru clinica veterinara` · `site pentru pensiune` · `seo pentru avocati` · `marketing pentru restaurante` · `site pentru salon` · `site pentru cabinet medical`

**Ai deja dovada socială pentru trei dintre ele:** VetGO (veterinar), Restaurant Conacu (HoReCa), Hostel Victoria (cazare). Aceste pagini se scriu singure din studiile de caz.

---

## 5. Plan de extindere a site-ului

### Faza 0 — Igienizare (săptămâna 1) — BLOCANT

| # | Acțiune | Fișier / loc |
|---|---|---|
| 0.1 | Șterge cele 9 posturi Lorem Ipsum (410 sau 301 → `/`) | WordPress live |
| 0.2 | 301 pentru `/ex-*`, `/home/`, `/coming-soon/`, `/about-2/`, `/clients/`, `/services/` | `vercel.json` |
| 0.3 | Completează `phone`, `phoneDisplay`, `sameAs` | `src/data/business.ts` |
| 0.4 | Adaugă `LocalBusiness` + `geo` + `hasMap` | `src/lib/schema.ts` |
| 0.5 | Rescrie toate title + H1 după §2.2–2.3 | `src/pages/*.astro` |
| 0.6 | Creează / revendică Google Business Profile, NAP identic cu site-ul | extern |
| 0.7 | La cutover: `robots.txt` deblochează, **inclusiv boții AI** | `public/robots.txt` |

### Faza 1 — Pagini comerciale noi (lunile 1–2)

Fiecare e o pagină de serviciu completă, nu o secțiune.

| Pagină nouă | Keyword principal | De ce |
|---|---|---|
| `/preturi/` | `cat costa un site web`, `pret seo` | Cel mai mare volum comercial din nișă. Afișează intervale, nu prețuri fixe. |
| `/creare-magazin-online/` | `creare magazin online` | Serviciu cu preț mediu mai mare, acum îngropat în `/creare-site-web/`. |
| `/seo-local/` | `seo local`, `google business profile` | Cluster separat, concurenții au pagini dedicate. |
| `/google-ads/` | `agentie google ads`, `campanii google ads` | „Pay Per Click" e termenul din 2015. Volumul real e pe „Google Ads". Păstrează `/pay-per-click/` cu 301 sau canonical. |
| `/audit-seo-gratuit/` | `audit seo` | Magnet de lead-uri + keyword comercial. |
| `/agentie-marketing-bucuresti/` | `agentie marketing bucuresti` | Pagina locală principală. |

### Faza 2 — Verticale industrie (lunile 2–4)

`/site-web-cabinet-stomatologic/` · `/site-web-restaurant/` · `/site-web-clinica-veterinara/` · `/site-web-pensiune-hotel/` · `/seo-pentru-avocati/`

Structura fiecăreia: problema industriei → ce include pachetul → studiu de caz real → preț orientativ → FAQ specific → formular.
**Începe cu cele trei pentru care ai deja clienți.** Fiecare pagină trebuie să linkeze către studiul de caz corespunzător din portofoliu.

### Faza 3 — Studii de caz cu cifre (lunile 3–5)

`/portofoliu/` e acum „direcții de design". Transformă-l în `/studii-de-caz/` cu pagini individuale:
`/studii-de-caz/vetgo/`, `/studii-de-caz/restaurant-conacu/`, `/studii-de-caz/hostel-victoria/`

Format obligatoriu: **context → ce am făcut → cifre înainte/după → durată → citat client.**
Cifrele sunt materia primă a GEO: modelele AI citează conținut cu date concrete, nu adjective.

### Faza 4 — Blog / hub de conținut (lunile 4–12, continuu)

Minim 2 articole/lună, fiecare 1.200+ cuvinte, fiecare linkând către o pagină de serviciu.

Primele 10, în ordinea priorității:
1. Cât costă un site web în România în 2026 — ghid cu prețuri reale
2. Cât costă SEO în România — pe tipuri de afaceri
3. SEO sau Google Ads: ce alegi în funcție de buget
4. Cum apari pe prima pagină Google — ghid pas cu pas
5. Cum îți optimizezi Google Business Profile (checklist)
6. WordPress, Shopify sau custom: care platformă pentru magazinul tău
7. 12 greșeli SEO care îți omoară traficul
8. Checklist complet de lansare a unui site
9. Ce este SEO local și de ce contează pentru afacerea ta din București
10. Agenție sau freelancer: comparație onestă

### Faza 5 — Autoritate off-site (continuu, începe din luna 1)

- Listare pe **Clutch, Sortlist, TechBehemoths, necesit.ro** — apar în top pentru „agenții marketing România" și sunt sursele pe care le citează AI-urile.
- Google Business Profile complet + strategie de recenzii (recenziile sunt cel mai puternic factor local).
- Citations RO: paginiaurii.ro, firme.info, listafirme.ro — **NAP identic peste tot**.
- Completează `sameAs` cu toate profilurile de mai sus.

---

## 6. AEO — optimizare pentru answer engines

Ce ai deja: `FAQPage` schema, pattern-ul „Răspuns direct:", răspunsuri în DOM. Bază bună.

Ce mai trebuie:

1. **Extinde „Răspuns direct:" pe toate paginile.** Format: H2 sub formă de întrebare → paragraf de 40–60 de cuvinte care răspunde complet și autonom → apoi detaliile.
2. **H2/H3 formulate ca întrebări reale.** `Pentru ce am nevoie de servicii SEO?` (există deja pe `/servicii-seo/`) e exact modelul corect — replică-l.
3. **Tabele de comparație.** Answer engines extrag tabele preferențial. Ex.: SEO vs Google Ads, tipuri de site cu preț și durată.
4. **`HowTo` schema** pe articolele procedurale (optimizare GBP, lansare site).
5. **`AggregateRating` + `Review` schema** pe testimonialele existente din `src/data/business.ts` — sunt reale, folosește-le.
6. **`Article` + `author` schema** pe blog, cu o pagină de autor reală. Semnalele de autor sunt E-E-A-T.
7. **Definiții scurte, autonome** pentru fiecare termen tehnic — asta e ce extrage un featured snippet.

## 7. GEO — vizibilitate în ChatGPT, Perplexity, AI Overviews

1. **Deblochează boții AI la lansare.** `public/robots.txt` blochează acum `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `Applebot-Extended`. Cât timp rămân blocați, **nu poți apărea în niciun răspuns AI.** Corect acum (staging), fatal după lansare.
2. **Umple `sameAs`.** Fără el nu ești o entitate recunoscută.
3. **Extinde `llms.txt`** pe măsură ce adaugi pagini — ai deja fișierul, e un avantaj față de piață.
4. **Publică date proprii.** „Din 40 de site-uri auditate de noi în 2026, 68% aveau LCP peste 2,5s." Genul ăsta de propoziție e ce citează un model. Adjectivele nu se citează.
5. **Fii prezent pe agregatoare** (§5, Faza 5) — modelele citează Clutch/Sortlist mai des decât site-urile agențiilor.
6. **Consistență a entității:** același nume, aceeași adresă, aceeași descriere pe site, GBP, LinkedIn, Facebook, Clutch. Inconsistențele dizolvă entitatea.
7. **Menține versiunea EN.** ChatGPT și Perplexity procesează masiv în engleză; `/en/` există deja — un avantaj real, ține-o la paritate.

---

## 8. Ordinea de execuție (rezumat)

```
Săpt. 1      Faza 0 — igienizare + NAP + title/H1 + GBP
Săpt. 2      Cutover Astro + 301-uri + robots deblocat (inclusiv boți AI)
Luna 1–2     Faza 1 — 6 pagini comerciale noi (/preturi/ prima)
Luna 1+      Faza 5 — listări Clutch/Sortlist + recenzii (paralel, continuu)
Luna 2–4     Faza 2 — 5 pagini verticale industrie
Luna 3–5     Faza 3 — studii de caz cu cifre
Luna 4–12    Faza 4 — blog, 2 articole/lună
```

**KPI de urmărit:** poziții pe cele 10 head-terms din Cluster 1+2, trafic organic total, lead-uri din formular pe pagină, apariții în AI Overviews (verificare manuală lunară pe 10 query-uri), citări în ChatGPT/Perplexity pe „agenție marketing București".

---

## Surse

- [Cât Costă un Site Web în România în 2026 — Beyond Development](https://www.beyond-development.ro/blog/cat-costa-un-site-web-romania-2026)
- [Cât Costă un Site de Prezentare în România 2026 — Trifu Media](https://trifumedia.com/blog/cat-costa-site-prezentare-romania)
- [Cât costă un site web în 2026 — cyberfolks.ro](https://cyberfolks.ro/blog/cat-costa-un-site-web/)
- [Cât costă SEO în România: ghidul complet pentru 2026 — Carpathian Marketing](https://www.carpathian-marketing-agency.ro/insights/cat-costa-seo-romania)
- [Prețuri SEO România 2026 — INSTATIC](https://instatic.ro/blog/preturi-seo)
- [Cât costă servicii SEO în România în 2026 — eSys Agency](https://esysagency.ro/blog-web-design/cat-costa-servicii-seo-in-romania)
- [Top SEO Companies in Romania — Clutch](https://clutch.co/ro/seo-firms)
- [The 10 Best SEO Agencies in Romania — Sortlist](https://www.sortlist.com/seo/romania-ro)
- [Top 20+ SEO Agencies in Romania — TechBehemoths](https://techbehemoths.com/companies/seo/romania)
- [Top 20 firme optimizare SEO București — Necesit.ro](https://www.necesit.ro/optimizare-seo-si-promovare-online/bucuresti)
- [Agenție de Digital Marketing — Marketiu](https://marketiu.ro/)
- [Agenție marketing de la 1800 lei/lună — WebXtatic](https://www.webxtatic.com/)
- [Agentie Marketing Digital București — ImpactAds](https://www.impact-ads.ro/agentie-marketing-digital/)
- [SEO local România — netSEO](https://netseo.ro/seo-local-romania)
- [SEO Local România, Google Business Profile — OmniMedia](https://www.omnimedia.ro/seo-local/)
- [Optimizare SEO Magazin Online](https://seomagazinonline.ro/)
