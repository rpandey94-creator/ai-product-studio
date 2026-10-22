# AI Product Engineering Lab 2027

An expandable, evidence-led lab that connects AI product discovery to architecture, implementation, evaluation, testing, deployment, and learning.

## What is included

- A data-driven research registry of 64 differentiated AI product candidates with filters, demand evidence, architecture, frameworks, acceptance criteria, cost, and status.
- A 2027 opportunity map that separates direct buyer/employer evidence from strategic inference.
- A framework and SDK atlas covering 63 technologies with official sources, license class, deployment constraints, alternatives, and point-in-time GitHub metadata.
- A locally runnable AI Evaluation Workbench: typed Python pipeline, four deterministic evaluators, seven passing tests, and JSON/CSV/JUnit evidence.
- Eight preserved interactive product experiments with honest simulation labels; Customer 360 is not part of the forward-looking core.
- Three fixed-scope freelance service packages.
- A separate link to the existing authorized enterprise experience portfolio.
- An Astro 7 static content shell, selective React + TypeScript islands, React Flow architecture maps, a D3 opportunity map, purposeful GSAP reveals, and one deferred-loading React Three Fiber scene.
- Responsive layout, reduced-motion behavior, keyboard-accessible controls, SEO metadata, and Netlify security headers.

## Architecture choice

The public lab now uses Astro for statically rendered content and React + TypeScript only for interaction that benefits from client state. The original buildless application remains available at `/legacy/` as a regression reference. `registry.js` still owns product research, `atlas.js` still owns technology research, and a generated-data gate guarantees that 64 catalog entries, 63 framework records, and eight active simulations survive the migration. Independently runnable applications remain under `apps/`.

Static routes keep every case addressable and indexable:

- `/catalog/` — expandable 64-candidate research field
- `/opportunities/` — evidence-backed 2027 opportunity map
- `/architecture/` — explorable MCP, RAG, and orchestration system maps
- `/products/<slug>/` — 64 detailed product case files
- `/simulations/` — eight explicitly labeled browser simulations
- `/workbench/` — Evaluation Workbench evidence explorer
- `/frameworks/` — 63-technology framework atlas
- `/roadmap/` — transparent engineering sequence
- `/legacy/` — preserved original Phase 1 browser application

## Run locally

Use Node 24, then install and start the Astro development server:

```powershell
npm install
npm run dev
```

No API key, account, paid service, or card is needed. `npm test` runs frontend preservation tests. To run the first engineering application, follow `apps/evaluation-workbench/README.md`.

## Deploy to Netlify

1. Create a GitHub repository and push this directory.
2. In Netlify, import the repository.
3. Use `npm run build` as the build command and `dist` as the publish directory. `netlify.toml` supplies both and pins Node 24.
4. Deploy to a free `netlify.app` subdomain.

`netlify.toml` already contains the publish directory, security headers, and cache policy.

## Truth and privacy boundary

The browser console and Python pipeline use synthetic data. The pipeline is genuine and tested; it is not described as a client deployment or model-judge system. Research candidates remain research, simulations remain simulations, and public/live claims require endpoint verification. This repository contains no confidential employer or customer material and claims no paid-client result.

## Framework verification

Framework purposes, repository activity, and license labels were checked against official repositories and documentation on 22 October 2026. Commercial adopters must re-check exact versions and terms. Start with `RESEARCH_METHOD.md`, `STATUS_LEDGER.md`, `FRAMEWORK_ATLAS.md`, `ROADMAP.md`, `NETLIFY_STRATEGY.md`, and `TESTING.md`.
