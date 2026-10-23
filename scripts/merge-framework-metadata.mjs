import { readFile, writeFile } from 'node:fs/promises';
import vm from 'node:vm';

const root = new URL('../', import.meta.url);
const context = { window: {} };
vm.createContext(context);
vm.runInContext(await readFile(new URL('framework-metadata.js', root), 'utf8'), context);
vm.runInContext(await readFile(new URL('framework-metadata-connector.js', root), 'utf8'), context);
vm.runInContext(await readFile(new URL('framework-release-metadata.js', root), 'utf8'), context);
const repositories = context.window.FRAMEWORK_METADATA;
await writeFile(new URL('research/framework-metadata-complete.json', root), JSON.stringify({
  generatedAt: new Date().toISOString(),
  sources: ['GitHub REST API (anonymous)', 'Connected GitHub REST API'],
  verificationNote: 'Repository metadata is a point-in-time activity signal, not proof of buyer demand or a legal license opinion.',
  repositories
}, null, 2));
console.log(JSON.stringify({repositories:Object.keys(repositories).length, verified:Object.values(repositories).filter(item=>!item.error).length}, null, 2));
