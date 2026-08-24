/** Pachete Google Ads — preluate din pagina live /pay-per-click/. */
export type PpcPlan = {
  name: string;
  price: string;
  period: string;
  highlight?: boolean;
  summary: string;
  features: string[];
};

const shared = [
  'Monitorizare campanie de 2 ori pe săptămână',
  'Optimizare continuă a anunțurilor (scor de optimizare, scor de relevanță)',
  'Analiză continuă a performanței și ajustare de bid-uri pentru KPI (search impression share, număr conversii, rată de conversie, cost per conversie)',
  'Adăugarea săptămânală a cuvintelor cheie negative',
  'Verificare buget de 2 ori pe săptămână',
];

export const ppcPlans: PpcPlan[] = [
  {
    name: 'Start',
    price: '99€',
    period: 'abonament lunar',
    summary: 'Pentru afaceri care pornesc primele campanii Google Ads.',
    features: [
      'Setup cont Google Ads',
      'Setup campanii Google Ads Search — maximum 40 de Ad grupuri',
      ...shared,
    ],
  },
  {
    name: 'Silver',
    price: '199€',
    period: 'abonament lunar',
    highlight: true,
    summary: 'Pentru cei care vor să măsoare conversiile, nu doar clicurile.',
    features: [
      'Setup cont Google Ads',
      'Setup campanii Google Ads Search — maximum 80 de Ad grupuri',
      'Setare conversion tracking',
      'Sistem antifraudă PPC',
      'Rapoarte lunare + recomandări',
      ...shared,
    ],
  },
  {
    name: 'Gold',
    price: '299€',
    period: 'abonament lunar',
    summary: 'Pentru conturi mari, cu multe grupuri de anunțuri și bugete serioase.',
    features: [
      'Setup cont Google Ads',
      'Setup campanii Google Ads Search — maximum 120 de Ad grupuri',
      'Setare conversion tracking',
      'Sistem antifraudă PPC',
      'Rapoarte lunare + recomandări',
      ...shared,
    ],
  },
];

export const ppcFaqs = [
  {
    question: 'Ce este publicitatea PPC (pay-per-click)?',
    answer:
      'PPC este o formă de publicitate online în care plătești pentru fiecare clic pe anunțurile tale, afișate în rezultatele căutării Google sau pe site-uri partenere. Costul per clic (CPC) variază după competiția pe cuvintele cheie și nivelul de licitare al concurenței.',
  },
  {
    question: 'În cât timp aduc rezultate campaniile PPC?',
    answer:
      'Spre deosebire de SEO, PPC poate aduce trafic calificat în zile. Primele conversii apar de obicei în prima–a doua săptămână, iar optimizarea pe date (cuvinte negative, bid-uri, anunțuri) îmbunătățește costul per conversie lună de lună.',
  },
  {
    question: 'Bugetul de publicitate este inclus în abonament?',
    answer:
      'Nu. Abonamentul acoperă setarea, administrarea și optimizarea campaniilor. Bugetul plătit către Google se facturează separat, direct de Google, și îl controlezi tu în întregime.',
  },
  {
    question: 'Pot targeta doar o anumită zonă geografică?',
    answer:
      'Da. Anunțurile pot fi afișate doar utilizatorilor dintr-o anumită localitate, județ sau rază în jurul afacerii tale — util mai ales pentru servicii locale, unde bugetul irosit pe alte zone nu are sens.',
  },
];
