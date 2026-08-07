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

Re-scrape original (opțional, actualizează `legacy-mirror/`):

```bash
npm run mirror
# apoi mută public/www... → legacy-mirror dacă e nevoie
```

## Indexare (staging)

Implicit **nu e indexabil**:

- `meta robots` noindex
- `robots.txt` Disallow
- header `X-Robots-Tag`

La lansare pe domeniu real:

```bash
PUBLIC_INDEXABLE=true PUBLIC_SITE_URL=https://www.echipadetocilari.ro npm run build
```

## Optimizări (păstrează look 1:1)

- `lang="ro"`
- title + description AEO (răspunsuri directe)
- JSON-LD Organization / WebSite / FAQ / Service
- theme-color, viewport, input 16px (anti-zoom iOS)
- `prefers-reduced-motion`
- `llms.txt`
- fără sitemap pe staging
