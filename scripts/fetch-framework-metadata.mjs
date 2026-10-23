import { readFile, writeFile } from 'node:fs/promises';
import vm from 'node:vm';

const root = new URL('../', import.meta.url);
const source = await readFile(new URL('atlas.js', root), 'utf8');
const context = { window: { FRAMEWORK_METADATA: {} } };
vm.createContext(context);
vm.runInContext(source, context);

const uniqueRepos = [...new Set(context.window.FRAMEWORK_ATLAS.map(item => item.repo).filter(url => url.startsWith('https://github.com/')))];
const metadata = {};
for (const repoUrl of uniqueRepos) {
  const slug = new URL(repoUrl).pathname.replace(/^\//, '').replace(/\/$/, '');
  const response = await fetch(`https://api.github.com/repos/${slug}`, {
    headers: { 'Accept': 'application/vnd.github+json', 'User-Agent': 'ai-product-studio-research' }
  });
  if (!response.ok) {
    metadata[repoUrl] = { verifiedAt: new Date().toISOString(), error: `GitHub ${response.status}` };
    continue;
  }
  const repo = await response.json();
  const releaseResponse = await fetch(`https://api.github.com/repos/${slug}/releases/latest`, {
    headers: { 'Accept': 'application/vnd.github+json', 'User-Agent': 'ai-product-studio-research' }
  });
  const release = releaseResponse.ok ? await releaseResponse.json() : null;
  metadata[repoUrl] = {
    verifiedAt: new Date().toISOString(),
    repo: repo.full_name,
    description: repo.description,
    license: repo.license?.spdx_id || 'Not detected by GitHub',
    defaultBranch: repo.default_branch,
    pushedAt: repo.pushed_at,
    archived: repo.archived,
    stars: repo.stargazers_count,
    latestRelease: release?.tag_name || 'No GitHub release detected',
    latestReleaseAt: release?.published_at || null
  };
}

await writeFile(new URL('research/framework-metadata.json', root), JSON.stringify({generatedAt:new Date().toISOString(), source:'GitHub REST API', repositories:metadata}, null, 2));
await writeFile(new URL('framework-metadata.js', root), `window.FRAMEWORK_METADATA = ${JSON.stringify(metadata, null, 2)};\n`);
console.log(JSON.stringify({repositories: uniqueRepos.length, verified: Object.values(metadata).filter(item => !item.error).length, errors: Object.values(metadata).filter(item => item.error).length}, null, 2));
