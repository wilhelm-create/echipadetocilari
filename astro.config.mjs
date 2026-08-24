// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Only emit sitemap when explicitly launching for search (PUBLIC_INDEXABLE=true).
const indexable = process.env.PUBLIC_INDEXABLE === 'true';

// https://astro.build/config
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://www.echipadetocilari.ro',
  trailingSlash: 'always',
  compressHTML: true,
  // The Elementor mirror still owns dist/ and is what Vercel deploys today.
  // Astro builds alongside it until it reaches parity and we flip the cutover.
  outDir: './dist-astro',
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: indexable
    ? [
        sitemap({
          filter: (page) => !page.includes('/404'),
          changefreq: 'weekly',
          priority: 0.7,
          lastmod: new Date(),
        }),
      ]
    : [],
});
