# Crawl competitori (echivalent Screaming Frog Internal HTML)

Versiunea gratuită Screaming Frog nu are CLI fără licență. Pe 24 aug 2026 am extras aceleași coloane (Address, Status Code, Title 1, H1-1, Meta Description 1) prin fetch HTTP pe sitemap + HTML, max 80 URL-uri/site.

Script: `scripts/keyword-research/crawl-competitors.mjs`

`wsite.ro` și `servicii-seo.com` au răspuns doar pe homepage (fără sitemap util). Restul celor 18 domenii din `docs/keyword-research/screaming-frog-competitors.md` au CSV-uri complete în acest folder.

Reluare:
```bash
node scripts/keyword-research/crawl-competitors.mjs
node scripts/keyword-research/build-master-list.mjs
```
