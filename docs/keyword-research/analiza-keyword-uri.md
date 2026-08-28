# Analiza keyword-urilor

Două runde de research. Lista consolidată e în `lista-master-keywords.csv` (183 de keyword-uri cu volume), maparea pe pagini se generează în `mapare-pagini.md`.

---

# Runda 1: Google Autocomplete RO

Sursă: `google-suggest-ro.csv` (828 keyword-uri unice, minate din Google Autocomplete hl=ro/gl=ro, 14 seed-uri din `docs/plan-seo-keywords.md`). Autocomplete arată căutări reale și frecvente, dar fără volume exacte.

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

## Mapare keyword → pagină

Se generează automat în `docs/keyword-research/mapare-pagini.md`, cu volume, priorități și numărul de competitori per keyword. Nu o duplica aici: rulează `node scripts/keyword-research/build-master-list.mjs`.

---

# Runda 2 (2026-08-28): serviciile noi

Context: oferta se extinde cu magazin online, aplicații web, aplicații mobile și Meta Ads. Am minat 82 de termeni noi (`keywords-servicii-noi.txt`) prin ambele unelte din Keyword Planner. Exporturi: `keyword-stats-servicii-noi-volume-2026-08-28.csv` și `keyword-stats-servicii-noi-discover-2026-08-28.csv`.

## Cum se citesc variațiile

Contul gratuit dă volume în bucket-uri (50, 500, 5.000, 50.000). De aceea orice variație raportată de Planner apare ca exact ±90% sau ±900%: e un salt de bucket, nu un procent real.

## 1. „Agenție digitală" nu poate fi poziționarea de pe homepage

`agentie digitala` 50, `agentie digitala bucuresti` 50, `agentie digital` 50, `agentie dezvoltare web` fără date. Față de `agentie marketing online` 500, `agentie marketing digital` 500, `agentie de marketing online` 500, `agentii marketing online` 500, `agentie web design` 500 și `dezvoltare web` 500.

→ H1 propus pe `/`: **Agenție de marketing online și dezvoltare web în București**. Conține două expresii de 500 și acoperă ambele jumătăți ale ofertei. `dezvoltare web` a coborât un bucket an/an, deci e în scădere, dar rămâne de zece ori peste `agentie digitala`.

## 2. Aplicațiile web nu au cerere în search

`creare aplicatie web` nu returnează date deloc. Zero pe `aplicatii web la comanda`, `aplicatie web personalizata`, `platforma web personalizata`, `dezvoltare platforma online`, `creare aplicatie online`, `program de gestiune personalizat`, `sistem de programari online`. Maxim 50 pe `dezvoltare aplicatii web`, `dezvoltare software personalizat`, `software personalizat`, `crm personalizat`.

→ Serviciul rămâne în ofertă, dar ca secțiune pe `/services/`, fără pagină SEO și fără buget de conținut. Se vinde prin recomandare și cross-sell, nu prin Google.

## 3. Aplicații mobile: un singur termen viabil

`dezvoltare aplicatii mobile` 500 e singurul din tot clusterul. `creare aplicatie mobila` 50, `dezvoltare aplicatie mobila` 50, `realizare aplicatii mobile` 50, `creare aplicatie android` 50, `creare aplicatie ios` 50, iar variantele „la comandă", „pentru firmă" și cele locale sunt zero.

→ Pagină `/dezvoltare-aplicatii-mobile/`, H1 exact „Dezvoltare aplicații mobile". Nu „Creare aplicație mobilă", care ar rata de zece ori volumul. Atenție: termenul a coborât un bucket an/an.

## 4. Magazin online: cel mai bogat cluster nou

Head-ul `creare magazin online` are 5.000, confirmat de ambele unelte, plus treisprezece termeni la 500: `creare site magazin online`, `creare magazin online pret`, `creare magazin online bucuresti`, `creare magazine online`, `creare magazin online wordpress`, `creare magazin online shopify`, `creare magazin online magento`, `creare magazin magento`, `realizare magazin online magento`, `creare magazin online la cheie`, `magazin online la cheie`, `realizare magazin online`, `optimizare magazin online`.

Trei decizii de copy:

- **Scrie WordPress, nu WooCommerce.** `creare magazin online wordpress` are 500, `creare magazin online woocommerce` nu are date. Clientul nu cunoaște numele pluginului.
- **Secțiune de preț cu ancoră direct pe pagina de magazin**, pentru că `creare magazin online pret` are 500. Nu aștepta `/preturi/`.
- **Magento are volum neașteptat**, trei variante la 500. Pagină separată doar dacă lucrăm efectiv cu Magento.

## 5. Meta Ads: piața caută „Facebook", nu „Meta"

`agentie meta ads` și `campanii meta ads` sunt amândouă zero. În schimb `agentie facebook ads` 500 (a urcat un bucket an/an), `promovare facebook` 500 (a urcat un bucket și pe 3 luni și an/an), `promovare instagram` 500 (a urcat un bucket an/an), `agentie social media` 500.

→ Pagină `/agentie-facebook-ads/`, H1 „Agenție Facebook Ads", care acoperă și Instagram. Cuvântul „Meta" nu apare în copy. E singurul cluster din tot setul care crește pe mai mulți termeni simultan, și motivează scoaterea social ads din `/pay-per-click/`.

## 6. Adiacent, dar alt cumpărător

`firma it bucuresti` 500 și `externalizare it` 500 au volum real, dar aparțin cumpărătorului de outsourcing IT, nu clientului nostru. Rămân în listă marcate `nu urmărim: alt cumpărător`, ca să nu fie redescoperite ca oportunitate.

## Pași următori

1. **Google Search Console**: după lansare și indexare, GSC devine sursa #1 (query-uri reale cu impresii și clicuri). Toate volumele de aici sunt bucket-uri.
2. **Minare rămasă**: `site cabinet stomatologic`, `site avocat`, `site salon`, plus seed-uri EN dacă vrem clienți internaționali.
3. **Un singur keyword fără rând în Planner**: `creare site pret`. Google îl tratează ca variantă a `pret creare site`.
4. Screaming Frog rămâne pentru audit tehnic periodic, nu pentru keywords.
