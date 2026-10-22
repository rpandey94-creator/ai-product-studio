import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const requiredRoutes = ['index.html','catalog/index.html','simulations/index.html','architecture/index.html','frameworks/index.html','opportunities/index.html','workbench/index.html','roadmap/index.html','products/eval-workbench/index.html','products/mcp-tool-hub/index.html','legacy/index.html'];

for (const route of requiredRoutes) {
  const target = path.join(dist, route);
  if (!fs.existsSync(target)) throw new Error(`Missing built route: ${route}`);
  const html = fs.readFileSync(target, 'utf8');
  if (!html.includes('</html>')) throw new Error(`Incomplete HTML output: ${route}`);
}

const home = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
for (const claim of ['64', '63', 'Browser experiences labeled simulation', 'Locally runnable real system']) {
  if (!home.toLowerCase().includes(claim.toLowerCase())) throw new Error(`Homepage disclosure missing: ${claim}`);
}

const productPages = fs.readdirSync(path.join(dist, 'products'), { withFileTypes: true }).filter((entry) => entry.isDirectory());
if (productPages.length !== 64) throw new Error(`Expected 64 product routes, found ${productPages.length}`);

console.log(`Verified ${requiredRoutes.length} critical routes and ${productPages.length} product case files.`);
