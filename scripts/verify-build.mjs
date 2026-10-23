import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const requiredRoutes = ['index.html','projects/index.html','product-thinking/index.html','about/index.html','contact/index.html','research/index.html','projects/customer-feedback-intelligence/index.html','projects/permission-aware-knowledge-assistant/index.html','projects/ai-reliability-observability-studio/index.html','catalog/index.html','frameworks/index.html','workbench/index.html','legacy/index.html'];

for (const route of requiredRoutes) {
  const target = path.join(dist, route);
  if (!fs.existsSync(target)) throw new Error(`Missing built route: ${route}`);
  const html = fs.readFileSync(target, 'utf8');
  if (!html.includes('</html>')) throw new Error(`Incomplete HTML output: ${route}`);
}

const home = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
for (const claim of ['Rishav Pandey', 'AI Product Manager', '13', '4', 'flagship case studies in depth', 'verified working implementation']) {
  if (!home.toLowerCase().includes(claim.toLowerCase())) throw new Error(`Homepage disclosure missing: ${claim}`);
}

const productPages = fs.readdirSync(path.join(dist, 'products'), { withFileTypes: true }).filter((entry) => entry.isDirectory());
if (productPages.length !== 64) throw new Error(`Expected 64 product routes, found ${productPages.length}`);

const portfolioPages = fs.readdirSync(path.join(dist, 'projects'), { withFileTypes: true }).filter((entry) => entry.isDirectory());
if (portfolioPages.length !== 13) throw new Error(`Expected 13 curated portfolio routes, found ${portfolioPages.length}`);

const blueprintUrlRoot = 'https://github.com/rpandey94-creator/ai-product-studio/blob/personal-ai-pm-portfolio/blueprints/';
for (const entry of portfolioPages) {
  const blueprint = path.join(root, 'blueprints', entry.name, 'README.md');
  if (!fs.existsSync(blueprint)) throw new Error(`Missing engineering blueprint: ${blueprint}`);
  const html = fs.readFileSync(path.join(dist, 'projects', entry.name, 'index.html'), 'utf8');
  const expectedUrl = `${blueprintUrlRoot}${entry.name}/README.md`;
  if (!html.includes(expectedUrl)) throw new Error(`Incorrect GitHub blueprint link for ${entry.name}`);
}

const renderedText = fs.readFileSync(path.join(dist, 'projects', 'index.html'), 'utf8');
if (renderedText.includes('Customer 360')) throw new Error('Customer 360 must not appear in the independent portfolio.');

console.log(`Verified ${requiredRoutes.length} critical routes, ${portfolioPages.length} curated portfolio cases with GitHub blueprints, and ${productPages.length} preserved research cases.`);
