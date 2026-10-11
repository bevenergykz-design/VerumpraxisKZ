// Static export renders every page through the root layout, which hardcodes
// <html lang="ru">. Patch the language homepages so crawlers see the right
// language without JavaScript. Runs automatically after `npm run build`.
const fs = require('fs');
const path = require('path');

const pages = { en: 'en', kz: 'kk', zh: 'zh' };

for (const [dir, lang] of Object.entries(pages)) {
  const file = path.join(__dirname, '..', 'out', dir, 'index.html');
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, 'utf8');
  const fixed = html.replace('<html lang="ru"', `<html lang="${lang}"`);
  if (fixed !== html) {
    fs.writeFileSync(file, fixed);
    console.log(`html lang="${lang}" -> out/${dir}/index.html`);
  }
}
