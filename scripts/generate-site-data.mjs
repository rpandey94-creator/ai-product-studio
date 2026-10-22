import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const context = vm.createContext({ window: {} });
const sources = [
  'framework-metadata.js',
  'framework-release-metadata.js',
  'framework-metadata-connector.js',
  'atlas.js',
  'registry.js',
  'data.js',
  'experiences.js',
];

for (const source of sources) {
  vm.runInContext(fs.readFileSync(path.join(root, source), 'utf8'), context, { filename: source });
}

const dataDir = path.join(root, 'src', 'data');
fs.mkdirSync(dataDir, { recursive: true });

const outputs = {
  'registry.json': context.window.ENGINEERING_REGISTRY,
  'frameworks.json': context.window.FRAMEWORK_ATLAS,
  'studio.json': context.window.STUDIO_DATA,
  'experiences.json': context.window.STUDIO_EXPERIENCES,
};

for (const [filename, value] of Object.entries(outputs)) {
  fs.writeFileSync(path.join(dataDir, filename), `${JSON.stringify(value, null, 2)}\n`);
}

const counts = {
  catalog: context.window.ENGINEERING_REGISTRY.catalog.length,
  frameworks: context.window.FRAMEWORK_ATLAS.length,
  experiences: Object.keys(context.window.STUDIO_EXPERIENCES.caseStudies)
    .filter((slug) => slug !== 'customer-360-copilot').length,
};

if (counts.catalog !== 64 || counts.frameworks !== 63 || counts.experiences !== 8) {
  throw new Error(`Preservation check failed: ${JSON.stringify(counts)}`);
}

console.log(`Generated site data: ${counts.catalog} candidates, ${counts.frameworks} frameworks, ${counts.experiences} simulations.`);
