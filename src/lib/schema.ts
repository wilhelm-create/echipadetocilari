import { business, services } from '../data/business';
import type { FaqItem } from '../data/faqs';

const site = business.url;

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': `${site}/#organization`,
    name: business.name,
    legalName: business.legalName,
    url: site,
    description: business.description,
    email: business.email || undefined,
    telephone: business.phone || undefined,
    areaServed: business.areaServed,
    priceRange: business.priceRange,
    openingHours: business.hoursSchema,
    logo: {
      '@type': 'ImageObject',
      url: `${site}/images/Logo_Echipa_de_Tocilari-1024x1024.webp`,
    },
    image: `${site}/images/Logo_Echipa_de_Tocilari-1024x1024.webp`,
    sameAs: business.sameAs,
    knowsAbout: services.map((s) => s.title),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site}/#website`,
    url: site,
    name: business.name,
    description: business.description,
    publisher: { '@id': `${site}/#organization` },
    inLanguage: 'ro-RO',
  };
}

export function webPageSchema(opts: {
  path: string;
  name: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
}) {
  const url = `${site}${opts.path.startsWith('/') ? opts.path : `/${opts.path}`}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: opts.name,
    description: opts.description,
    isPartOf: { '@id': `${site}/#website` },
    about: { '@id': `${site}/#organization` },
    inLanguage: 'ro-RO',
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
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: `${site}${opts.path}`,
    provider: { '@id': `${site}/#organization` },
    areaServed: business.areaServed,
    serviceType: opts.name,
  };
}
