# Echipa de Tocilari — copie 1:1 + SEO/AEO/GEO

Site-ul este o **oglindă statică 1:1** a [echipadetocilari.ro](https://www.echipadetocilari.ro) (HTML/CSS/JS/imagini Elementor), cu **injectări doar în `<head>`** pentru SEO, AEO, GEO și mobile — **fără a schimba layout-ul vizual**.

## Cum funcționează

| | |
|---|---|
| **Vizual** | Fișiere din `legacy-mirror/` (scrape WordPress/Elementor) |
| **Build** | `npm run build` → copiază mirror în `dist/` + optimizează meta/schema |
| **Deploy** | Vercel static (`outputDirectory: dist`) |

## Comenzi

```bash
npm install
npm run build
npm run preview   # http://localhost:3000
```

`npm run build` verifică automat rezultatul din `dist/` la final (JS/JSON-LD valid,
meta prezente, hreflang complet, reguli de indexare corecte) și **iese cu eroare**
dacă ceva nu e în regulă.

Re-scrape original (opțional, actualizează `legacy-mirror/`):

```bash
npm i -D website-scraper && npm run mirror
# apoi mută public/www... → legacy-mirror dacă e nevoie
```

`website-scraper` se instalează doar la nevoie — nu e în `package.json`, ca să nu
încetinească build-urile de pe Vercel.

## Indexare

Controlată **exclusiv** de `PUBLIC_INDEXABLE` la build — nu există niciun header
hardcodat care să o suprascrie.

| | `PUBLIC_INDEXABLE` nesetat (staging) | `PUBLIC_INDEXABLE=true` (producție) |
|---|---|---|
| `meta robots` | `noindex, nofollow` pe tot | `index, follow` pe paginile noastre |
| `robots.txt` | `Disallow: /` | `Allow: /` + sitemap |
| `sitemap.xml` | absent | 20 URL-uri (10 RO + 10 EN) |

La lansare, setează în Vercel → Project Settings → Environment Variables:

```
PUBLIC_INDEXABLE=true
PUBLIC_SITE_URL=https://www.echipadetocilari.ro
```

Local:

```bash
PUBLIC_INDEXABLE=true PUBLIC_SITE_URL=https://www.echipadetocilari.ro npm run build
```

### Pagini rămase din scrape

`legacy-mirror/` conține și 16 pagini pe care nu le-am scris noi — pagini demo din
tema Astra/Beyond (`coming-soon`, `do-ppc-ninjas-really-exist`, …) și pagini de
atașament WordPress. Se publică, ca să rămână oglinda 1:1, dar primesc **întotdeauna
`noindex`** (inclusiv în producție) și nu primesc schema sau meta de-ale noastre.
Sursa de adevăr pentru „ce e pagină de-a noastră" este `scripts/i18n/routes.mjs`.

## Multilingual (RO default + EN secondary)

| RO | EN (natural search slugs) |
|----|---------------------------|
| `/` | `/en/` |
| `/creare-site-web/` | `/en/website-design/` |
| `/servicii-seo/` | `/en/seo-services/` |
| `/administrare-site/` | `/en/website-maintenance/` |
| `/about-2/` | `/en/about/` |
| `/contact/` | `/en/contact/` |
| `/portofoliu/` | `/en/portfolio/` |
| `/services/` | `/en/services/` |
| `/clients/` | `/en/clients/` |
| `/pay-per-click/` | `/en/ppc-advertising/` |

- `hreflang` ro / en / x-default pe ambele limbi
- Language switcher (buton fixed: English ↔ Română)
- Dicționar + meta EN: `scripts/i18n/`

## Optimizări (păstrează look 1:1)

- `lang="ro"` / `lang="en"`
- title + description AEO (răspunsuri directe, keywords naturale EN)
- JSON-LD Organization / WebSite / FAQ / Service (per limbă)
- theme-color, viewport, input 16px (anti-zoom iOS)
- `prefers-reduced-motion`
- `llms.txt` (RO + EN)
- fără sitemap pe staging (până la `PUBLIC_INDEXABLE=true`)
