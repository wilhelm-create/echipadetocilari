import { business, services } from '../data/business';
import type { FaqItem } from '../data/faqs';
import { servicesEn } from '../i18n/content-en';
import type { Locale } from '../i18n/routes';

const site = business.url;

const lang = (locale: Locale) => (locale === 'en' ? 'en-US' : 'ro-RO');

const orgDescription = (locale: Locale) =>
  locale === 'en'
    ? 'Digital marketing agency in Romania: website design, SEO, website maintenance, PPC advertising, logo design, and copywriting.'
    : business.description;

export function organizationSchema(locale: Locale = 'ro') {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': `${site}/#organization`,
    name: business.name,
    legalName: business.legalName,
    url: site,
    description: orgDescription(locale),
    email: business.email || undefined,
    telephone: business.phone || undefined,
    areaServed: locale === 'en' ? 'Romania' : business.areaServed,
    priceRange: business.priceRange,
    openingHours: business.hoursSchema,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    vatID: business.vatId,
    identifier: business.registrationNumber,
    logo: {
      '@type': 'ImageObject',
      url: `${site}/images/Logo_Echipa_de_Tocilari-1024x1024.webp`,
    },
    image: `${site}/images/Logo_Echipa_de_Tocilari-1024x1024.webp`,
    sameAs: business.sameAs,
    knowsAbout: (locale === 'en' ? servicesEn : services).map((s) => s.title),
  };
}

export function websiteSchema(locale: Locale = 'ro') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site}/#website${locale === 'en' ? '-en' : ''}`,
    url: locale === 'en' ? `${site}/en/` : site,
    name: business.name,
    description: orgDescription(locale),
    publisher: { '@id': `${site}/#organization` },
    inLanguage: lang(locale),
  };
}

export function webPageSchema(opts: {
  path: string;
  name: string;
  description: string;
  locale?: Locale;
  datePublished?: string;
  dateModified?: string;
}) {
  const locale = opts.locale ?? 'ro';
  const url = `${site}${opts.path.startsWith('/') ? opts.path : `/${opts.path}`}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: opts.name,
    description: opts.description,
    isPartOf: { '@id': `${site}/#website${locale === 'en' ? '-en' : ''}` },
    about: { '@id': `${site}/#organization` },
    inLanguage: lang(locale),
    datePublished: opts.datePublished,
    dateModified: opts.dateModified || opts.datePublished,
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${site}${item.path}`,
    })),
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  locale?: Locale;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: `${site}${opts.path}`,
    provider: { '@id': `${site}/#organization` },
    areaServed: opts.locale === 'en' ? 'Romania' : business.areaServed,
    serviceType: opts.name,
  };
}
