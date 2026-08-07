/**
 * RO (source paths in legacy-mirror) → EN public paths (natural search slugs).
 */
export const routes = [
  {
    ro: '/',
    en: '/en/',
    roFile: 'index.html',
    enFile: 'en/index.html',
    labelRo: 'Acasă',
    labelEn: 'Home',
  },
  {
    ro: '/about-2/',
    en: '/en/about/',
    roFile: 'about-2/index.html',
    enFile: 'en/about/index.html',
    labelRo: 'Despre noi',
    labelEn: 'About us',
  },
  {
    ro: '/creare-site-web/',
    en: '/en/website-design/',
    roFile: 'creare-site-web/index.html',
    enFile: 'en/website-design/index.html',
    labelRo: 'Creare site web',
    labelEn: 'Website design',
  },
  {
    ro: '/servicii-seo/',
    en: '/en/seo-services/',
    roFile: 'servicii-seo/index.html',
    enFile: 'en/seo-services/index.html',
    labelRo: 'Servicii SEO',
    labelEn: 'SEO services',
  },
  {
    ro: '/administrare-site/',
    en: '/en/website-maintenance/',
    roFile: 'administrare-site/index.html',
    enFile: 'en/website-maintenance/index.html',
    labelRo: 'Administrare site',
    labelEn: 'Website maintenance',
  },
  {
    ro: '/contact/',
    en: '/en/contact/',
    roFile: 'contact/index.html',
    enFile: 'en/contact/index.html',
    labelRo: 'Contact',
    labelEn: 'Contact',
  },
  {
    ro: '/portofoliu/',
    en: '/en/portfolio/',
    roFile: 'portofoliu/index.html',
    enFile: 'en/portfolio/index.html',
    labelRo: 'Portofoliu',
    labelEn: 'Portfolio',
  },
  {
    ro: '/services/',
    en: '/en/services/',
    roFile: 'services/index.html',
    enFile: 'en/services/index.html',
    labelRo: 'Servicii',
    labelEn: 'Services',
  },
  {
    ro: '/clients/',
    en: '/en/clients/',
    roFile: 'clients/index.html',
    enFile: 'en/clients/index.html',
    labelRo: 'Clienți',
    labelEn: 'Clients',
  },
  {
    ro: '/pay-per-click/',
    en: '/en/ppc-advertising/',
    roFile: 'pay-per-click/index.html',
    enFile: 'en/ppc-advertising/index.html',
    labelRo: 'Pay Per Click',
    labelEn: 'PPC advertising',
  },
];

export const roToEn = Object.fromEntries(routes.map((r) => [r.ro, r.en]));
export const enToRo = Object.fromEntries(routes.map((r) => [r.en, r.ro]));
