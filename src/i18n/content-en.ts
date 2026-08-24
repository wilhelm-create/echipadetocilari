/**
 * English page content — meta, services, FAQs, pricing, testimonials.
 *
 * The titles and descriptions are the search-tuned ones written for the
 * Elementor mirror; the slugs match one-to-one, so they carry over unchanged.
 */
import type { FaqItem } from '../data/faqs';
import type { PpcPlan } from '../data/ppc';
import type { RouteKey } from './routes';

export const metaEn: Record<RouteKey, { title: string; description: string }> = {
  home: {
    title: 'Digital Marketing Agency Romania | Online Marketing by Nerds',
    description:
      'Looking for a digital marketing agency in Romania? Echipa de Tocilari delivers website design, SEO services, website maintenance, PPC, and copywriting. Free 30-minute consultation.',
  },
  about: {
    title: 'About Us | Digital Marketing Team',
    description:
      'Meet Echipa de Tocilari: a nerdy digital marketing team in Romania focused on websites, SEO, and campaigns that help businesses get found and convert.',
  },
  web: {
    title: 'Website Design & Development | Business Websites & Landing Pages',
    description:
      'Professional website design and development: landing pages, business websites, and online stores. Fast, mobile-first sites with SEO basics built in.',
  },
  seo: {
    title: 'SEO Services Romania | Improve Google Rankings & Organic Traffic',
    description:
      'SEO services to improve Google rankings: SEO audit, keyword strategy, on-page SEO, off-page SEO, and ongoing monitoring. Grow organic traffic that converts.',
  },
  maintenance: {
    title: 'Website Maintenance Services | Updates, Security & Support',
    description:
      'Website maintenance and management for WordPress sites and online stores: updates, backups, security, and content support so your site stays fast and safe.',
  },
  ppc: {
    title: 'PPC Advertising Management | Google Ads Campaigns That Convert',
    description:
      'PPC advertising and Google Ads management: targeted campaigns that maximize budget impact and drive qualified leads. Packages from €99/month.',
  },
  portfolio: {
    title: 'Web Design Portfolio | Website Examples & Brand Work',
    description:
      'Browse our web design portfolio: business websites, landing pages, and visual directions we adapt to your brand and industry.',
  },
  clients: {
    title: 'Our Clients | Brands That Trust Our Digital Marketing',
    description:
      'See the businesses that chose Echipa de Tocilari for digital marketing, web design, and SEO. Real partnerships, measurable online growth.',
  },
  services: {
    title: 'Digital Marketing Services | Web Design, SEO, PPC & More',
    description:
      'Full digital marketing services: website design, SEO, website maintenance, PPC advertising, logo design, and copywriting — one partner for online growth.',
  },
  contact: {
    title: 'Contact a Digital Marketing Agency | Free Consultation',
    description:
      'Contact Echipa de Tocilari for website design, SEO, or maintenance. Book a free 30-minute consultation — we work remotely across Romania and beyond.',
  },
};

export const servicesEn = [
  {
    slug: 'website-design',
    href: '/en/website-design/',
    title: 'Website design',
    short:
      'Modern, fast, easy-to-navigate websites — landing page, business site, or online store.',
    answer:
      'We build custom websites (landing pages, business sites, e-commerce) optimised for speed, conversion, and SEO, delivered on a modern stack.',
  },
  {
    slug: 'seo-services',
    href: '/en/seo-services/',
    title: 'SEO optimization',
    short: 'We grow organic visibility with audits, keywords, on-page, off-page, and monitoring.',
    answer:
      'Our SEO services grow organic traffic through technical audits, keyword strategy, on-page and off-page optimisation, and continuous reporting.',
  },
  {
    slug: 'website-maintenance',
    href: '/en/website-maintenance/',
    title: 'Maintenance & support',
    short: 'Updates, security, and content — your site keeps running smoothly, without the stress.',
    answer:
      'Website maintenance covers updates, backups, security, and content changes, so your site stays fast, safe, and current.',
  },
  {
    slug: 'ppc-advertising',
    href: '/en/ppc-advertising/',
    title: 'PPC advertising',
    short: 'Targeted PPC campaigns that get the most out of your advertising budget.',
    answer:
      'PPC campaigns (Google Ads and similar networks) bring qualified traffic quickly, targeting purchase intent and optimising for conversions.',
  },
  {
    slug: 'logo-design',
    href: '/en/services/#logo-design',
    title: 'Logo design',
    short: 'A distinct visual mark that represents your brand and sticks in customers’ minds.',
    answer:
      'We design distinctive logos, tailored to your brand story and easy to use across web, print, and social media.',
  },
  {
    slug: 'copywriting',
    href: '/en/services/#copywriting',
    title: 'Copywriting',
    short: 'Words that resonate with your audience and turn visitors into customers.',
    answer:
      'Brand and conversion copywriting clarifies your offer, builds trust, and guides users towards action on your site and in campaigns.',
  },
] as const;

export const testimonialsEn = [
  {
    quote:
      'Working with this online marketing agency was a genuinely pleasant experience. The team was always friendly and professional, and the service was high quality. I was impressed by the results for my business.',
    name: 'Alexandru Drăgan',
    role: 'VetGO',
  },
  {
    quote:
      'I worked with this agency and was impressed by their level of expertise. They responded promptly, helped us improve our marketing strategy, and increased our online visibility. I recommend them with confidence.',
    name: 'Maria Andone',
    role: 'Restaurant Conacu',
  },
  {
    quote:
      'The best choice for anyone who wants to promote their business online. We saw a significant increase in sales and we will keep working with them on future campaigns.',
    name: 'Amanda Giocanu',
    role: 'Hostel Victoria',
  },
] as const;

export const homeFaqsEn: FaqItem[] = [
  {
    question: 'What is online marketing and why should I use it?',
    answer:
      'Online marketing promotes a business or product over the internet: SEO, paid advertising (PPC), content, email, and social media. It is worth it because most customers search for products and services online — without a clear presence, you lose demand that already exists in the market.',
  },
  {
    question: 'How long does it take to see results from online marketing?',
    answer:
      'It depends on the channel: SEO usually takes a few months, while PPC and social ads can generate traffic and leads within days or weeks. Digital marketing is a long game — results vary with competition, budget, and how strong your offer is.',
  },
  {
    question: 'How do I choose the right service for my business?',
    answer:
      'Start from the objective: long-term organic visibility → SEO; fast leads → PPC; brand and trust → website and copy; an old or insecure site → maintenance. We propose a plan based on your needs, budget, and target audience.',
  },
  {
    question: 'How do you measure campaign performance?',
    answer:
      'We use analytics tools (traffic, on-site behaviour, conversions, cost per lead, keyword rankings) and report clearly on what works and what does not. Campaigns are adjusted on data, not on intuition.',
  },
  {
    question: 'How can I start working with Echipa de Tocilari?',
    answer:
      'Fill in the contact form or email us. We schedule a free 30-minute consultation, discuss your goals, and propose a plan with an estimated budget. If you are happy with it, we start.',
  },
];

export const seoFaqsEn: FaqItem[] = [
  {
    question: 'Why do I need SEO services?',
    answer:
      'SEO helps you get found on Google exactly when customers search for what you offer. It grows organic traffic, reduces dependence on paid ads, and builds long-term authority.',
  },
  {
    question: 'How long until SEO results show up?',
    answer:
      'Generally 3–6 months for visible movement in competitive markets, sometimes faster in local or low-competition niches. SEO is a cumulative investment, not an on/off switch.',
  },
  {
    question: 'What does an SEO package include?',
    answer:
      'Technical audit, competitor analysis, keyword strategy, on-page optimisation, off-page work (authority and quality links), and monthly monitoring with data-driven adjustments.',
  },
];

export const webFaqsEn: FaqItem[] = [
  {
    question: 'What kinds of websites do you build?',
    answer:
      'Landing pages (a single conversion-focused page), business websites (multi-page digital brochures), and online stores (e-commerce) — each with design, UX, and SEO fundamentals built in.',
  },
  {
    question: 'How much does a website cost?',
    answer:
      'The price depends on the type (landing page, business site, e-commerce), the number of pages, and the features you need. We provide tailored quotes — get in touch for a free estimate.',
  },
  {
    question: 'Will the website be optimised for mobile?',
    answer:
      'Yes. We build mobile-first: phone layout, tap-friendly buttons, speed and Core Web Vitals up front, then we extend to tablet and desktop.',
  },
];

export const ppcFaqsEn: FaqItem[] = [
  {
    question: 'What is PPC (pay-per-click) advertising?',
    answer:
      'PPC is online advertising where you pay for each click on your ads, shown in Google search results or on partner sites. The cost per click (CPC) varies with keyword competition and how much competitors bid.',
  },
  {
    question: 'How quickly do PPC campaigns deliver results?',
    answer:
      'Unlike SEO, PPC can bring qualified traffic within days. First conversions typically appear in the first or second week, and data-driven optimisation improves cost per conversion month over month.',
  },
  {
    question: 'Is the advertising budget included in the subscription?',
    answer:
      'No. The subscription covers campaign setup, management, and optimisation. The budget paid to Google is billed separately, directly by Google, and stays entirely under your control.',
  },
  {
    question: 'Can I target only a specific geographic area?',
    answer:
      'Yes. Ads can be shown only to users in a given city, county, or radius around your business — particularly useful for local services, where budget spent elsewhere is wasted.',
  },
];

const sharedEn = [
  'Campaign monitoring twice a week',
  'Continuous ad optimisation (optimisation score, relevance score)',
  'Ongoing performance analysis and bid adjustments for KPIs (search impression share, conversions, conversion rate, cost per conversion)',
  'Weekly negative keyword additions',
  'Budget check twice a week',
];

export const ppcPlansEn: PpcPlan[] = [
  {
    name: 'Start',
    price: '€99',
    period: 'monthly subscription',
    summary: 'For businesses launching their first Google Ads campaigns.',
    features: [
      'Google Ads account setup',
      'Google Ads Search campaign setup — up to 40 ad groups',
      ...sharedEn,
    ],
  },
  {
    name: 'Silver',
    price: '€199',
    period: 'monthly subscription',
    highlight: true,
    summary: 'For those who want to measure conversions, not just clicks.',
    features: [
      'Google Ads account setup',
      'Google Ads Search campaign setup — up to 80 ad groups',
      'Conversion tracking setup',
      'PPC anti-fraud system',
      'Monthly reports + recommendations',
      ...sharedEn,
    ],
  },
  {
    name: 'Gold',
    price: '€299',
    period: 'monthly subscription',
    summary: 'For large accounts with many ad groups and serious budgets.',
    features: [
      'Google Ads account setup',
      'Google Ads Search campaign setup — up to 120 ad groups',
      'Conversion tracking setup',
      'PPC anti-fraud system',
      'Monthly reports + recommendations',
      ...sharedEn,
    ],
  },
];
