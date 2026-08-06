# Echipa de Tocilari

Rebuild modern al site-ului [echipadetocilari.ro](https://www.echipadetocilari.ro) pe **Astro 7 + Tailwind CSS 4**, optimizat pentru:

- **SEO** — semantic HTML, meta, canonical, sitemap, robots
- **AEO** — răspunsuri directe în primele paragrafe, FAQ vizibil în DOM, JSON-LD
- **GEO** — entitate clară (Organization), NAP unic, `llms.txt`
- **Mobile-first** — CTA sticky pe mobil, tap targets ≥44px, input 16px

## Stack

- Astro 7 (static)
- Tailwind CSS 4 (`@tailwindcss/vite`)
- `@astrojs/sitemap`
- Deploy: Vercel

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Config

- Brand / NAP / email: `src/data/business.ts`
- FAQ: `src/data/faqs.ts`
- Site URL: `PUBLIC_SITE_URL` (vezi `.env.example`)

## Note

- Formularul de contact folosește [FormSubmit](https://formsubmit.co) pe adresa din `business.email` (confirmă o dată pe e-mail).
- `legacy-mirror/` conține scrape-ul WordPress original (ignorat de git) — referință design/conținut.
