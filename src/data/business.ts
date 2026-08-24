/** Single source of truth — NAP, brand, services. Never hardcode elsewhere. */
export const business = {
  name: 'Echipa de Tocilari',
  legalName: 'ECHIPA DE TOCILARI SRL',
  tagline: 'Marketing online făcut de tocilari',
  description:
    'Agenție de marketing digital din România: creare site web, optimizare SEO, mentenanță, PPC, logo design și copywriting. Soluții practice pentru afaceri care vor rezultate măsurabile.',
  url: 'https://www.echipadetocilari.ro',
  email: 'contact@echipadetocilari.ro',
  phone: '', // completează când e public pe site-ul live
  phoneDisplay: '',
  // NAP din footer-ul site-ului live — folosit în LocalBusiness schema (local SEO).
  address: {
    street: 'Strada Alexandru Zagoritz nr. 12, sector 2',
    locality: 'București',
    region: 'București',
    postalCode: '021998',
    country: 'RO',
  },
  vatId: 'RO47591744',
  registrationNumber: 'J40/2298/2023',
  hours: 'Luni–Duminică 09:00–17:00',
  hoursSchema: ['Mo-Su 09:00-17:00'],
  sameAs: [
    'https://www.facebook.com/EchipadeTocilari/',
    'https://www.linkedin.com/company/echipa-de-tocilari/',
  ] as string[],
  foundingNote:
    'Grup de specialiști pasionați de marketing și tehnologie, cu focus pe site-uri rapide, SEO și campanii care convertesc.',
  languages: ['ro'],
  priceRange: '$$',
  areaServed: 'România',
} as const;

export const nav = [
  { href: '/', label: 'Acasă' },
  {
    href: '/servicii/',
    label: 'Servicii',
    children: [
      { href: '/creare-site-web/', label: 'Creare site web' },
      { href: '/servicii-seo/', label: 'Servicii SEO' },
      { href: '/administrare-site/', label: 'Administrare site' },
      { href: '/pay-per-click/', label: 'Pay Per Click' },
    ],
  },
  { href: '/portofoliu/', label: 'Portofoliu' },
  { href: '/clienti/', label: 'Clienți' },
  { href: '/despre-noi/', label: 'Despre noi' },
  { href: '/contact/', label: 'Contact' },
] as const;

export const services = [
  {
    slug: 'creare-site-web',
    href: '/creare-site-web/',
    title: 'Creare site web',
    short:
      'Site-uri moderne, rapide și ușor de navigat — landing page, prezentare sau magazin online.',
    answer:
      'Echipa de Tocilari creează site-uri web personalizate (landing page, site de prezentare, e-commerce) optimizate pentru viteză, conversie și SEO, livrate pe stack modern.',
    icon: 'globe',
  },
  {
    slug: 'servicii-seo',
    href: '/servicii-seo/',
    title: 'Optimizare SEO',
    short:
      'Creștem vizibilitatea organică cu audit, keywords, on-page, off-page și monitorizare.',
    answer:
      'Serviciile SEO ale Echipei de Tocilari cresc traficul organic prin audit, strategie de keywords, optimizare on-page/off-page și raportare continuă.',
    icon: 'search',
  },
  {
    slug: 'administrare-site',
    href: '/administrare-site/',
    title: 'Mentenanță & administrare',
    short:
      'Actualizări, securitate și conținut — site-ul tău funcționează lin, fără stres.',
    answer:
      'Administrarea de site include actualizări, backup, securitate și modificări de conținut, astfel încât site-ul rămâne rapid, sigur și actualizat.',
    icon: 'shield',
  },
  {
    slug: 'logo-design',
    href: '/servicii/#logo-design',
    title: 'Logo design',
    short: 'Simbol vizual unic care reprezintă brandul și rămâne în mintea clienților.',
    answer:
      'Proiectăm logo-uri distincte, adaptate poveștii brandului tău și ușor de folosit pe web, print și social media.',
    icon: 'pen',
  },
  {
    slug: 'pay-per-click',
    href: '/pay-per-click/',
    title: 'Pay Per Click',
    short: 'Campanii PPC țintite care maximizează impactul bugetului de publicitate.',
    answer:
      'Campaniile PPC (Google Ads și rețele similare) aduc trafic calificat rapid, cu targetare pe intenție de cumpărare și optimizare pe conversii.',
    icon: 'ads',
  },
  {
    slug: 'copywriting',
    href: '/servicii/#copywriting',
    title: 'Copywriting',
    short: 'Texte care rezonează cu audiența și transformă vizitatori în clienți.',
    answer:
      'Copywriting-ul de brand și de conversie clarifică oferta, crește încrederea și ghidează utilizatorul spre acțiune pe site și în campanii.',
    icon: 'write',
  },
] as const;

/**
 * The three services shown on the homepage, with the original copy and icons
 * from the live site. The full list lives in `services` above — the homepage
 * deliberately shows only these three, as the Elementor build does.
 */
export const homeServices = [
  {
    href: '/creare-site-web/',
    icon: 'creare-site-web',
    title: 'Creare Site Web',
    desc: 'Oferim servicii de design și dezvoltare web personalizate pentru a crea site-uri moderne, rapide și ușor de navigat.',
  },
  {
    href: '/servicii-seo/',
    icon: 'optimizare-seo',
    title: 'Optimizare SEO',
    desc: 'Îmbunătățim vizibilitatea online a afacerii tale, prin folosirea unor strategii SEO eficiente.',
  },
  {
    href: '/administrare-site/',
    icon: 'mentenanta',
    title: 'Mentenanță',
    desc: 'Grijile legate de site-ul tău le preluăm noi! De la actualizări la securitate, ne asigurăm că totul funcționează lin, ca tu să te poți concentra pe ceea ce faci tu cel mai bine.',
  },
] as const;

/** Full quotes as they appear on the live site, in the same slide order. */
export const testimonials = [
  {
    quote:
      'Această agenție de marketing online este cea mai bună alegere pentru oricine dorește să își promoveze afacerea online. Echipa lor de specialiști a făcut o treabă excelentă în promovarea afacerii mele și am observat o creștere semnificativă a vânzărilor. Sunt foarte mulțumită de serviciile lor și vom colabora și la viitoarele campanii de promovare.',
    name: 'Amanda Giocanu',
    role: 'Hostel Victoria',
  },
  {
    quote:
      'Colaborarea cu această agenție de marketing online a fost o experiență foarte plăcută. Echipa lor a fost mereu amabilă și profesionistă, iar serviciile lor au fost de înaltă calitate. Am fost impresionat de rezultatele pe care le-au obținut pentru afacerea mea și îi recomand cu încredere pe acești profesioniști în marketing online.',
    name: 'Alexandru Drăgan',
    role: 'VetGO',
  },
  {
    quote:
      'Am lucrat cu această agenție de marketing online și am fost impresionată de nivelul lor de expertiză. Echipa lor a fost mereu disponibilă și a răspuns prompt la întrebările noastre. Ne-au ajutat să ne îmbunătățim strategia de marketing și să creștem vizibilitatea online a afacerii noastre. Recomand cu încredere această agenție.',
    name: 'Maria Andone',
    role: 'Restaurant Conacu',
  },
] as const;
