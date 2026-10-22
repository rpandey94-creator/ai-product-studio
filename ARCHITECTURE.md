# Architecture overview

## Public research and portfolio application

```text
Source records (registry.js, atlas.js, data.js, evidence/)
        │ generated + count-checked at build time
        ▼
Astro static content shell (src/pages, 72 prerendered routes)
        ├── React + TypeScript islands: catalog, workbench, framework filters
        ├── React Flow: MCP, RAG, and bounded-agent architecture maps
        ├── D3: evidence opportunity visualization
        ├── React Three Fiber: deferred desktop homepage scene
        ├── GSAP: reduced-motion-aware reveal choreography
        └── /legacy/: preserved Phase 1 buildless application
```

Astro emits static HTML to `dist`; there is no server adapter, database, API key, or runtime charge. Interactive libraries hydrate only on routes that use them. The Three.js scene hydrates only on larger screens when the visitor has not requested reduced motion.

The static application sends no conversation data to a server. Rubric changes remain in memory and reports are generated locally using browser Blob downloads.

## Independently runnable applications

`apps/evaluation-workbench` is the first real vertical slice. It is a dependency-free Python package with typed contracts, deterministic evaluators, a CLI, tests, architecture, and learning material. Generated evidence lives in `evidence/` so runtime truth is visible from the public shell.

## Conversation QA Console decision model

Each case contains a transcript, expected behavior, observed behavior, failure class, severity, ownership, recommended fix, and six 0–5 rubric scores. The dashboard reports:

- scenario pass rate;
- normalized rubric score;
- critical failure count;
- open backlog size.

Backlog order is deterministic: severity weight dominates, then the total score deficit breaks ties. This prevents a high average from hiding a severe safety or unauthorized-action failure.

## Planned Evaluation Workbench evolution

1. Optional FastAPI service for persisted test sets and reviewer sessions.
2. Phoenix/OpenTelemetry trace ingestion (with Phoenix’s Elastic-2.0 terms preserved).
3. Authentication, tenant isolation, and role-aware review.
4. Configurable rubrics and multi-reviewer calibration.
5. Optional model-assisted evaluation with human override.
6. CI release gates and regression trends.

These are planned extensions, not current capabilities. The broader sequence is documented in `ROADMAP.md`.
