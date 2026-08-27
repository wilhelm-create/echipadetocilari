# Screaming Frog — crawl competitori (versiunea gratuită, GUI)

Obiectiv: exporți câte un CSV per competitor, eu extrag din ele keyword-urile țintite (title-uri, H1, meta descriptions, structura paginilor) și fac matricea finală keywords → pagini de construit.

**Atenție — două limite ale versiunii gratuite:**
1. **Max 500 URL-uri per crawl** — suficient pentru aceste site-uri (majoritatea au < 100 pagini).
2. **Nu poți salva crawl-ul** (File → Save cere licență) — deci **expotezi CSV-ul imediat după fiecare crawl, înainte de a trece la următorul site.**

---

## Pasul 0 — o singură dată, la început

1. Deschide Screaming Frog SEO Spider.
2. **Mode → Spider** (implicit).
3. Lasă `Configuration → robots.txt → Settings` pe **Respect robots.txt** (corect pentru site-urile competitorilor).
4. Creează pe Desktop, în folderul proiectului, folderul: `Screaming Frog competitori\`

## Pasul 1 — per competitor (repeti de 18 ori)

1. În bara de sus lipește URL-ul competitorului (din tabelul de mai jos) → **Start**.
2. Așteaptă până progresul ajunge la **100%** (sau se oprește la 500 — e OK).
3. Mergi pe tabul **Internal** (primul din stânga).
4. În dropdown-ul de filtru (sub tab) alege **HTML** — rămân doar paginile, nu imaginile/CSS-ul.
5. Butonul **Export** (sus-stânga în panoul de rezultate) → salvează ca:
   `Screaming Frog competitori\<domeniu>.csv` — ex. `webis.ro.csv`
6. Verifică că fișierul are mai mult de 5 rânduri (dacă are 1–2, site-ul a blocat crawlerul — notează și mergi mai departe).
7. **Clear** (butonul cu X din bara de sus) și treci la următorul competitor.

Acest singur CSV per competitor conține tot ce îmi trebuie: address, title, meta description, H1, H2, word count, indexabilitate.

## Pasul 2 — opțional, doar pentru top 5 (dacă ai răbdare)

La competitorii marcați ⭐, înainte de Clear, fă și exportul de anchor text:
**Bulk Export → Links → All Anchor Text** → salvează ca `Screaming Frog competitori\<domeniu>-anchors.csv`.
(Asta îmi arată cu ce cuvinte-și linkuiesc ei propriile pagini de servicii — foarte valoros pentru keyword targeting.)

---

## Lista competitorilor de crawlat

| # | URL de introdus în Screaming Frog | De ce ne interesează |
|---|---|---|
| 1 ⭐ | `https://www.webis.ro` | 29 de pagini pe verticale (`creare-site-restaurant` etc.) |
| 2 ⭐ | `https://digitalcuisine.ro` | 10 pagini locale (orașe) + prețuri publice |
| 3 ⭐ | `https://sonic-web-design.ro` | pagini per platformă (WordPress/Shopify) + 12 verticale + tarife |
| 4 ⭐ | `https://mipadoweb.ro` | audit SEO gratuit + calculator preț + Facebook Ads |
| 5 ⭐ | `https://spartanseo.ro` | SEO-only, prețuri, SGE/AI — direct pe nișa noastră AEO |
| 6 | `https://www.webhero.ro` | prețuri complete (site/magazin/SEO/mentenanță) |
| 7 | `https://seomark.ro` | audit gratuit + calculator SEO + email marketing |
| 8 | `https://wsite.ro` | prețuri 390–1390€, gamă largă |
| 9 | `https://searchads.ro` | PPC/social ads + web design București |
| 10 | `https://re7consulting.ro` | 10+ pagini de marketing pe verticale |
| 11 | `https://divasweb.ro` | pagini oraș × serviciu + AI/automatizări |
| 12 | `https://bromedia.ro` | prețuri + articol „creare site web preț" |
| 13 | `https://servicii-seo.com` | pachete SEO cu local inclus |
| 14 | `https://webdesignersalley.ro` | prețuri pe componente (blog +70€, pagină +35€) |
| 15 | `https://agentiewebdesignbucuresti.ro` | EMD pe exact keyword-ul țintă |
| 16 | `https://oricemedia.ro` | Google Ads + Facebook + branding |
| 17 | `https://rauden.ro` | are puncte slabe (title „Home") — de studiat ce face prost |
| 18 | `https://digitalpath.ro` | web design București |

Bonus (dacă mai ai chef): `https://itexclusiv.ro`, `https://web9.ro`, `https://adsymphony.ro`, `https://digitalmetrics.ro`, `https://accentweb.ro`.

---

## Ce fac eu după ce ai exporturile

Spune-mi „gata" și:
1. Citesc toate CSV-urile din `Screaming Frog competitori\`.
2. Extrag per competitor: toate title-urile și H1-urile (keyword targeting real), paginile de servicii/local/verticale, word count per pagină (cât conținut au).
3. Produc **matricea finală**: keyword → volum estimat (autocomplete) → câți competitori îl țintesc → noi avem pagină? → prioritate.
4. Rezultatul: lista definitivă de pagini de construit, ordonată, cu title/H1 propus pentru fiecare.
