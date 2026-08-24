/**
 * Bilingual routing table — the single source of truth for RO ↔ EN pairing,
 * hreflang, the language switcher and the sitemap.
 *
 * EN slugs are natural search phrases, not literal translations of the RO ones
 * ("website-design", not "creare-site-web"), because they have to match how
 * people actually search in English.
 *
 * Note: these RO slugs are the Astro ones and differ from the old Elementor
 * mirror (`/despre-noi/` vs `/about-2/`, `/clienti/` vs `/clients/`). The
 * cutover needs 301s — see `legacyRedirects`.
 */
export const locales = ['ro', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ro';

export type RouteKey =
  | 'home'
  | 'services'
  | 'web'
  | 'seo'
  | 'maintenance'
  | 'ppc'
  | 'portfolio'
  | 'clients'
  | 'about'
  | 'contact';

export const routes: Record<RouteKey, Record<Locale, string>> = {
  home: { ro: '/', en: '/en/' },
  services: { ro: '/servicii/', en: '/en/services/' },
  web: { ro: '/creare-site-web/', en: '/en/website-design/' },
  seo: { ro: '/servicii-seo/', en: '/en/seo-services/' },
  maintenance: { ro: '/administrare-site/', en: '/en/website-maintenance/' },
  ppc: { ro: '/pay-per-click/', en: '/en/ppc-advertising/' },
  portfolio: { ro: '/portofoliu/', en: '/en/portfolio/' },
  clients: { ro: '/clienti/', en: '/en/clients/' },
  about: { ro: '/despre-noi/', en: '/en/about/' },
  contact: { ro: '/contact/', en: '/en/contact/' },
};

export const routeKeys = Object.keys(routes) as RouteKey[];

/** Which language a URL belongs to. */
export function getLocale(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'ro';
}

/** The route key a URL corresponds to, if any. */
export function getRouteKey(pathname: string): RouteKey | undefined {
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return routeKeys.find((k) => routes[k].ro === path || routes[k].en === path);
}

/** Same page in the other language; falls back to that language's home. */
export function alternatePath(pathname: string, target: Locale): string {
  const key = getRouteKey(pathname);
  return key ? routes[key][target] : routes.home[target];
}

export function localizedPath(key: RouteKey, locale: Locale): string {
  return routes[key][locale];
}

/**
 * Old Elementor URLs → their Astro equivalent. Wire these up as 301s at cutover
 * so the pages already indexed by Google keep their ranking.
 */
export const legacyRedirects: Record<string, RouteKey> = {
  '/about-2/': 'about',
  '/clients/': 'clients',
  '/home/': 'home',
  '/ex-creare-site-web/': 'web',
  '/ex-servicii-seo/': 'seo',
};
