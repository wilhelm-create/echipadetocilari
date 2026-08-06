/** Single source of truth — NAP, brand, services. Never hardcode elsewhere. */
export const business = {
  name: 'Echipa de Tocilari',
  legalName: 'Echipa de Tocilari',
  tagline: 'Marketing online făcut de tocilari',
  description:
    'Agenție de marketing digital din România: creare site web, optimizare SEO, mentenanță, PPC, logo design și copywriting. Soluții practice pentru afaceri care vor rezultate măsurabile.',
  url: 'https://www.echipadetocilari.ro',
  email: 'contact@echipadetocilari.ro',
  phone: '', // completează când e public pe site-ul live
  phoneDisplay: '',
  address: {
    street: '',
    locality: 'România',
    region: '',
    country: 'RO',
  },
  hours: 'Luni–Duminică 09:00–17:00',
  hoursSchema: ['Mo-Su 09:00-17:00'],
  sameAs: [] as string[],
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
    ],
  },
  { href: '/portofoliu/', label: 'Portofoliu' },
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
    href: '/servicii/#ppc',
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

export const testimonials = [
  {
    quote:
      'Colaborarea cu această agenție de marketing online a fost o experiență foarte plăcută. Echipa a fost mereu amabilă și profesionistă, iar serviciile de înaltă calitate. Am fost impresionat de rezultatele pentru afacerea mea.',
    name: 'Alexandru Drăgan',
    role: 'VetGO',
  },
  {
    quote:
      'Am lucrat cu această agenție și am fost impresionată de nivelul de expertiză. Au răspuns prompt, ne-au ajutat să îmbunătățim strategia de marketing și să creștem vizibilitatea online. Recomand cu încredere.',
    name: 'Maria Andone',
    role: 'Restaurant Conacu',
  },
  {
    quote:
      'Cea mai bună alegere pentru oricine vrea să își promoveze afacerea online. Am observat o creștere semnificativă a vânzărilor și vom colabora și la viitoarele campanii.',
    name: 'Amanda Giocanu',
    role: 'Hostel Victoria',
  },
] as const;
