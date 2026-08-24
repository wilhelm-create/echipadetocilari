/**
 * Interface copy per language — everything that is chrome rather than page
 * content: navigation, buttons, form labels, footer headings.
 *
 * Page-level prose lives in the page files; this is only what repeats.
 */
import type { Locale, RouteKey } from './routes';

type NavItem = { key: RouteKey; children?: RouteKey[] };

/** Shared across languages — only the labels differ. */
export const navStructure: NavItem[] = [
  { key: 'home' },
  { key: 'services', children: ['web', 'seo', 'maintenance', 'ppc'] },
  { key: 'portfolio' },
  { key: 'clients' },
  { key: 'about' },
  { key: 'contact' },
];

export const ui = {
  ro: {
    htmlLang: 'ro',
    ogLocale: 'ro_RO',
    schemaLang: 'ro-RO',
    skipToContent: 'Sari la conținut',
    navLabel: 'Navigare principală',
    mobileNavLabel: 'Meniu mobil',
    openMenu: 'Deschide meniul',
    closeMenu: 'Închide meniul',
    homeAria: 'acasă',
    ctaShort: 'Consultație gratuită',
    ctaLong: 'Consultație gratuită de 30 min',
    ctaSticky: 'Consultație gratuită · 30 min',
    routeLabels: {
      home: 'Acasă',
      services: 'Servicii',
      web: 'Creare site web',
      seo: 'Servicii SEO',
      maintenance: 'Administrare site',
      ppc: 'Pay Per Click',
      portfolio: 'Portofoliu',
      clients: 'Clienți',
      about: 'Despre noi',
      contact: 'Contact',
    } satisfies Record<RouteKey, string>,
    footer: {
      areaHeading: 'Zonă deservită',
      areaValue: 'online & remote',
      navHeading: 'Navigare',
      servicesHeading: 'Servicii',
      talkHeading: 'Hai să vorbim',
      talkBody:
        'Consultație gratuită de 30 de minute. Îți spunem ce merită prioritate pentru afacerea ta.',
      talkCta: 'Programează consultația',
      rights: 'Toate drepturile rezervate.',
    },
    form: {
      eyebrow: 'Scrie-ne un mesaj astăzi',
      heading: 'Hai să vorbim despre proiectul tău',
      intro:
        'Completează formularul — îți răspundem cu pașii concreți și o consultație gratuită de 30 de minute. Fără obligații.',
      name: 'Nume',
      namePlaceholder: 'Numele tău',
      email: 'Email',
      emailPlaceholder: 'email@companie.ro',
      phone: 'Telefon',
      phonePlaceholder: '07xx xxx xxx',
      service: 'Serviciu de interes',
      servicePlaceholder: 'Alege un serviciu',
      serviceOptions: [
        'Creare site web',
        'Servicii SEO',
        'Administrare / mentenanță',
        'PPC',
        'Logo & branding',
        'Copywriting',
        'Altceva / nu știu încă',
      ],
      message: 'Mesaj',
      messagePlaceholder:
        'Spune-ne pe scurt ce vrei să obții (site nou, mai mult trafic, magazin online…)',
      submit: 'Trimite mesajul',
      consent:
        'Prin trimitere ești de acord să te contactăm în legătură cu cererea ta. Nu vindem datele tale. Alternativ:',
      subject: 'Lead nou — Echipa de Tocilari',
    },
    faq: {
      heading: 'Întrebări adresate frecvent (FAQ)',
      eyebrow: 'Noi avem răspunsurile',
    },
  },

  en: {
    htmlLang: 'en',
    ogLocale: 'en_US',
    schemaLang: 'en-US',
    skipToContent: 'Skip to content',
    navLabel: 'Main navigation',
    mobileNavLabel: 'Mobile menu',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    homeAria: 'home',
    ctaShort: 'Free consultation',
    ctaLong: 'Free 30-min consultation',
    ctaSticky: 'Free consultation · 30 min',
    routeLabels: {
      home: 'Home',
      services: 'Services',
      web: 'Website design',
      seo: 'SEO services',
      maintenance: 'Website maintenance',
      ppc: 'PPC advertising',
      portfolio: 'Portfolio',
      clients: 'Clients',
      about: 'About us',
      contact: 'Contact',
    } satisfies Record<RouteKey, string>,
    footer: {
      areaHeading: 'Area served',
      areaValue: 'online & remote',
      navHeading: 'Navigation',
      servicesHeading: 'Services',
      talkHeading: "Let's talk",
      talkBody:
        'A free 30-minute consultation. We tell you what actually deserves priority for your business.',
      talkCta: 'Book the consultation',
      rights: 'All rights reserved.',
    },
    form: {
      eyebrow: 'Send us a message today',
      heading: "Let's talk about your project",
      intro:
        'Fill in the form — you get concrete next steps and a free 30-minute consultation. No strings attached.',
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'you@company.com',
      phone: 'Phone',
      phonePlaceholder: '+40 7xx xxx xxx',
      service: 'Service you need',
      servicePlaceholder: 'Choose a service',
      serviceOptions: [
        'Website design',
        'SEO services',
        'Maintenance & support',
        'PPC advertising',
        'Logo & branding',
        'Copywriting',
        'Something else / not sure yet',
      ],
      message: 'Message',
      messagePlaceholder:
        'Tell us briefly what you want to achieve (new website, more traffic, online store…)',
      submit: 'Send message',
      consent:
        'By submitting you agree to be contacted about your enquiry. We never sell your data. Alternatively:',
      subject: 'New lead — Echipa de Tocilari',
    },
    faq: {
      heading: 'Frequently asked questions',
      eyebrow: 'We have the answers',
    },
  },
} as const;

export function t(locale: Locale) {
  return ui[locale];
}
