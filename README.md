# Rishav Pandey — AI Product Manager & Hands-On AI Builder

An independent, evidence-led portfolio showing how product opportunities move from discovery and prioritization through interface design, AI architecture, evaluation, and tested implementation.

## What is included

- Thirteen curated, independent AI product case studies with honest `Product Case Study — Designed`, `Interactive UX Prototype`, `Locally Implemented and Tested`, and `Public Live Demo` labels.
- Four flagship cases in depth: Customer Feedback Intelligence, Permission-Aware Enterprise Knowledge Assistant, AI Reliability & Observability Studio, and Real-Time Multimodal / Voice Assistant.
- Product-specific economics, component-level architecture decisions, official-source research, and engineering blueprints for all 13 cases.
- Two interactive React + TypeScript prototypes using clearly labeled synthetic data.
- One verified implementation: a typed, dependency-free Python evaluation pipeline with four deterministic evaluators, seven passing automated tests, and JSON/CSV/JUnit evidence.
- Explorable React Flow architectures that separate implemented technologies from proposed choices.
- A responsive Astro 7 site with purposeful GSAP motion and one deferred-loading React Three Fiber scene.
- The original 64-candidate catalog, framework atlas, eight simulations, roadmap, and legacy application preserved as a secondary research archive.

## Architecture choice

Astro statically renders the content-rich product cases. React + TypeScript is reserved for interfaces that need state, React Flow for architecture inspection, D3 for the archived opportunity map, GSAP for restrained motion, and React Three Fiber for the hero system model. The original buildless application remains at `/legacy/`; `registry.js` and `atlas.js` still own the preserved research data; independently runnable software remains under `apps/`.

Static routes keep every case addressable and indexable:

- `/projects/` — thirteen curated product directions
- `/projects/<slug>/` — complete product case studies
- `/product-thinking/` — product principles and decision model
- `/about/` — independent portfolio context and capabilities
- `/contact/` — verified ways to reach Rishav
- `/research/` — gateway to the preserved research system
- `/catalog/` — expandable 64-candidate research archive
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

## Deploy review to Netlify

The connected Netlify project uses `npm run build`, publishes `dist`, and pins Node 24 through `netlify.toml`. Portfolio changes must be reviewed on a Deploy Preview before the production branch is changed. The stable `prelaunch-interactive-lab` branch remains the rollback point; no paid Netlify feature is required.

`netlify.toml` already contains the publish directory, security headers, and cache policy.

## Truth and privacy boundary

The browser console and Python pipeline use synthetic data. The pipeline is genuine and tested; it is not described as a client deployment or model-judge system. Research candidates remain research, simulations remain simulations, and public/live claims require endpoint verification. This repository contains no confidential employer or customer material and claims no paid-client result.

## Framework verification

Framework purposes, repository activity, and license labels were checked against official repositories and documentation on 22 October 2026. Commercial adopters must re-check exact versions and terms. Start with `RESEARCH_METHOD.md`, `STATUS_LEDGER.md`, `FRAMEWORK_ATLAS.md`, `ROADMAP.md`, `NETLIFY_STRATEGY.md`, and `TESTING.md`.
