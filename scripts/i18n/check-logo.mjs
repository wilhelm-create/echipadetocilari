import fs from 'fs';

const h = fs.readFileSync('dist/en/index.html', 'utf8');
const start = h.indexOf('elementor-location-header');
const end = h.indexOf('</header>', start);
const header = h.slice(start, end + 10);
const srcs = [...header.matchAll(/src="([^"]+)"/g)].map((m) => m[1]);
console.log('header srcs', srcs);
const logoW = header.match(/theme-site-logo[\s\S]{0,1200}/);
console.log('logo widget', logoW?.[0]?.replace(/\s+/g, ' ').slice(0, 800));

// Check if file exists
const logoPath =
  'dist/wp-content/uploads/2024/02/Logo_Echipa_de_Tocilari-e1708028624694.webp';
console.log('file exists', fs.existsSync(logoPath), logoPath);

// All image paths that are relative without leading slash in EN page body
const relative = [...h.matchAll(/(?:src|href)="(?!https?:|\/|#|mailto:|data:)([^"]+\.(?:webp|png|jpg|jpeg|svg|css|js))"/gi)].map(
  (m) => m[1]
);
console.log('relative asset paths count', relative.length);
console.log('sample relative', relative.slice(0, 15));
