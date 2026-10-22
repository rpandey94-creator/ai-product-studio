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
- Responsive layout, keyboard-accessible controls, SEO metadata, and Netlify security headers.

## Architecture choice

The public lab uses semantic HTML, modular CSS, and data-driven vanilla JavaScript. This buildless shell has no frontend package supply chain or build-minute requirement. `registry.js` owns product research, `atlas.js` owns technology research, and independently runnable applications live under `apps/`.

Hash routes keep every product addressable on static hosting without server configuration:

- `#/catalog` — unlimited research registry
- `#/opportunities` — evidence-backed 2027 opportunity map
- `#/roadmap` — transparent engineering sequence
- `#/products/<slug>` — preserved product experiments
- `#/qa-console` — Evaluation Workbench browser layer and real pipeline evidence
- `#/frameworks` — 63-technology framework atlas
- `#/services` and `#/about`

## Run locally

Serve this directory with any static HTTP server:

```powershell
python -m http.server 4173
```

No API key, account, paid service, or card is needed. To run the first engineering application, follow `apps/evaluation-workbench/README.md`.

## Deploy to Netlify

1. Create a GitHub repository and push this directory.
2. In Netlify, import the repository.
3. Leave the build command empty and use `.` as the publish directory.
4. Deploy to a free `netlify.app` subdomain.

`netlify.toml` already contains the publish directory, security headers, and cache policy.

## Truth and privacy boundary

The browser console and Python pipeline use synthetic data. The pipeline is genuine and tested; it is not described as a client deployment or model-judge system. Research candidates remain research, simulations remain simulations, and public/live claims require endpoint verification. This repository contains no confidential employer or customer material and claims no paid-client result.

## Framework verification

Framework purposes, repository activity, and license labels were checked against official repositories and documentation on 22 October 2026. Commercial adopters must re-check exact versions and terms. Start with `RESEARCH_METHOD.md`, `STATUS_LEDGER.md`, `FRAMEWORK_ATLAS.md`, `ROADMAP.md`, `NETLIFY_STRATEGY.md`, and `TESTING.md`.
