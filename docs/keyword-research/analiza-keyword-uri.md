# Analiza keyword-urilor — Google Autocomplete RO

Sursă: `google-suggest-ro.csv` (828 keyword-uri unice, minate din Google Autocomplete hl=ro/gl=ro, 14 seed-uri din `docs/plan-seo-keywords.md`). Autocomplete = căutări reale, frecvente — dar **fără volume exacte** (vezi „Pași următori").

## Constatări principale

### 1. Intenția de preț e cel mai puternic semnal comercial
Keyword-uri reale: `creare site pret`, `creare site de prezentare pret`, `creare site web pret`, `cost creare magazin online`, `optimizare seo pret`, `servicii seo pret`, `administrare site pret`, `mentenanta site pret`, `cat costa mentenanta unui site`, `promovare site pe google pret`, `promovare online pret`, `google ads vs facebook ads cost`, `google ads keyword cost`.

→ Confirmă `/preturi/` ca pagină prioritară + secțiuni de preț cu ancore pe fiecare pagină de serviciu.

### 2. Intenția locală e masivă (validat planul)
`creare site bucuresti / cluj / iasi / timisoara / brasov / constanta`, `creare site web bucuresti / cluj / iasi / timisoara / brasov`, `creare magazin online` + 6 orașe, `servicii seo bucuresti / cluj / arad / alba iulia`, `agentie marketing online bucuresti / iasi / cluj / ploiesti`, `promovare online oradea / cluj / brasov / iasi`, `agentie promovare online oradea`.

→ Pagini locale: `/agentie-marketing-bucuresti/` (planificată) + pagini de serviciu cu secțiuni locale. Orașe cu volum dovedit: București, Cluj, Iași, Timișoara, Brașov, Constanța, Oradea.

### 3. Nișa emergentă: SEO pentru AI search
`servicii seo ai`, `servicii seo llm ai`, `servicii seo ai search`, `audit seo ai`.

→ Zero competiție locală probabilă, perfect aliniat cu poziționarea AEO/GEO a site-ului (llms.txt existent). Pagină/blog dedicat = first-mover.

### 4. Audit gratuit = lead magnet validat
`audit seo gratuit`, `audit seo free`, `audit seo site web gratuit`, `audit seo website`.

→ Pagina `/audit-seo-gratuit/` din plan, cu formular dedicat.

### 5. Verticale cu cerere reală
`creare site agentie imobiliara`, `creare site agentie de turism`, `creare site firma constructii`, `site uri promovare pensiuni`.

→ Pagini de verticale din plan (Faza 2); de minat și: restaurant, stomatologie, clinică, salon, avocat (pasul următor de minare).

### 6. Clusterul „google ads" e în mare parte navigațional
Majoritatea sugestiilor (`login`, `adsense`, `transparency center`, `certification`) nu sunt comerciale. Semnalul comercial real: `google ads expert`, `google ads specialist`, `google ads budget`, `google ads bonus credit`, `google ads keyword cost`.

→ Conținut informațional PPC + de minat seed-ul `agentie google ads` (lipsa din lista inițială).

### 7. WordPress e o poartă de intrare
`creare site wordpress`, `creare site wordpress bucurești`, `optimizare seo wordpress`, `creare magazin online wordpress`.

→ Pagină/articol de tip „site WordPress vs site custom" — atacă obiecția principală (clientul compară cu WordPress) și poziționează oferta pe performanță/mentenanță.

## Mapare keyword → pagină (actualizare la planul din `docs/plan-seo-keywords.md`)

| Cluster | Pagina țintă | Status |
|---|---|---|
| creare site / creare site web / realizare site | `/creare-site-web/` | există |
| creare site pret, cât costă site | `/preturi/` | **de creat** |
| creare site bucuresti + alte orașe | `/creare-site-web/` (secțiune locală) + pagini locale | de extins |
| creare magazin online (+ pret, orașe) | `/creare-magazin-online/` | **de creat** |
| optimizare seo / servicii seo (+ pret) | `/servicii-seo/` | există |
| audit seo gratuit | `/audit-seo-gratuit/` | **de creat** |
| seo local | `/seo-local/` | **de creat** |
| servicii seo ai / llm ai | pagină nouă AEO/GEO sau articol | **de creat** |
| administrare site / mentenanta site (+ pret) | `/administrare-site/` | există |
| google ads expert / specialist, promovare site google | `/pay-per-click/` (de repoziționat spre Google Ads) | de optimizat |
| agentie marketing online + orașe | `/agentie-marketing-bucuresti/` | **de creat** |
| verticale (imobiliare, turism, construcții, pensiuni) | pagini per verticală | **de creat** (Faza 2) |
| creare site wordpress vs custom | articol blog | **de creat** |

## Pași următori

1. **Volume exacte**: cont Google Ads (gratuit, fără cheltuieli) → Keyword Planner → încarcă lista din `google-suggest-ro.csv` → export CSV → prioritizare pe volume reale.
2. **Minare pas 2**: seed-uri lipsă — `agentie google ads`, `seo local`, `creare site restaurant`, `site cabinet stomatologic`, `site avocat`, `site salon`, EN seeds dacă vrem clienți internaționali.
3. **Google Search Console**: după lansare + indexare, GSC devine sursa #1 (query-uri reale cu impresii/clicuri).
4. Screaming Frog rămâne pentru audit tehnic periodic, nu pentru keywords.
