export type FaqItem = { question: string; answer: string };

/** Homepage + site-wide FAQ — answers visible in DOM for AEO. */
export const homeFaqs: FaqItem[] = [
  {
    question: 'Ce este marketingul online și de ce ar trebui să îl folosesc?',
    answer:
      'Marketingul online este promovarea unei afaceri sau a unui produs prin internet: SEO, publicitate plătită (PPC), conținut, e-mail și social media. Merită pentru că majoritatea clienților caută produse și servicii online — fără prezență clară, pierzi cerere care există deja pe piață.',
  },
  {
    question: 'Cât timp durează până văd rezultate din marketing online?',
    answer:
      'Depinde de canal: SEO aduce rezultate de obicei în câteva luni; PPC și social ads pot genera trafic și lead-uri în zile sau săptămâni. Marketingul digital e pe termen lung — rezultatele variază după competiție, buget și calitatea ofertei.',
  },
  {
    question: 'Cum pot să îmi măresc bugetul pentru serviciile de marketing online?',
    answer:
      'Optimizează mai întâi conversiile pe site (ca fiecare vizitator să valoreze mai mult), concentrează bugetul pe canalele cu cel mai bun ROI și realocă treptat fonduri din canale ineficiente. Pe măsură ce apar rezultate măsurabile, e mai ușor să crești investiția.',
  },
  {
    question: 'Cum aleg serviciul potrivit pentru afacerea mea?',
    answer:
      'Pornește de la obiectiv: vizibilitate organică pe termen lung → SEO; lead-uri rapide → PPC; brand și încredere → site + copy; site vechi sau nesigur → mentenanță. Echipa de Tocilari propune un plan după nevoi, buget și publicul țintă.',
  },
  {
    question: 'Cum monitorizați performanța campaniilor de marketing online?',
    answer:
      'Folosim unelte de analiză (trafic, comportament pe site, conversii, cost pe lead, ranking keywords) și raportăm clar ce funcționează. Ajustăm campaniile pe baza datelor, nu pe intuiție.',
  },
  {
    question: 'Cum pot să încep să lucrez cu Echipa de Tocilari?',
    answer:
      'Completează formularul de contact sau scrie-ne pe e-mail. Programăm o consultație gratuită de 30 de minute, discutăm obiectivele și îți propunem un plan + buget estimativ. Dacă ești de acord, începem execuția.',
  },
];

export const seoFaqs: FaqItem[] = [
  {
    question: 'Pentru ce am nevoie de servicii SEO?',
    answer:
      'SEO te ajută să fii găsit pe Google când clienții caută exact ce oferi. Crește traficul organic, reduce dependența de ads plătite și construiește autoritate pe termen lung.',
  },
  {
    question: 'Cât durează până apar rezultate SEO?',
    answer:
      'În general 3–6 luni pentru mișcări vizibile pe piețe competitive din România, uneori mai rapid pe nișe locale sau low-competition. SEO e investiție cumulativă, nu switch on/off.',
  },
  {
    question: 'Ce include un pachet de servicii SEO la Echipa de Tocilari?',
    answer:
      'Audit tehnic, analiză concurență, strategie de keywords, optimizare on-page, acțiuni off-page (autoritate/linkuri de calitate) și monitorizare lunară cu ajustări pe date.',
  },
];

export const webFaqs: FaqItem[] = [
  {
    question: 'Ce tipuri de site web creați?',
    answer:
      'Landing page (o pagină de conversie), site de prezentare (broșură digitală multi-pagină) și magazin online (e-commerce) — fiecare cu design, UX și SEO de bază integrate.',
  },
  {
    question: 'Cât costă un site web?',
    answer:
      'Prețul depinde de tip (landing, prezentare, e-commerce), număr de pagini și funcționalități. Oferim oferte personalizate după nevoi și buget — contactează-ne pentru o estimare gratuită.',
  },
  {
    question: 'Site-ul va fi optimizat pentru mobil?',
    answer:
      'Da. Construim mobile-first: layout pe telefon, butoane ușor de apăsat, viteză și Core Web Vitals în prim-plan, apoi extindem pe tabletă și desktop.',
  },
];
