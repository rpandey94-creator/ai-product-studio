# Architecture overview

## Current static application

```text
Browser
├── index.html        semantic shell and metadata
├── styles.css        responsive visual system
├── data.js           product, framework, and synthetic QA data
├── app.js            router, renderers, filters, scoring, exports
└── assets/           optimized presentation images
```

The application sends no conversation data to a server. Rubric changes remain in memory and reports are generated locally using browser Blob downloads.

## Conversation QA Console decision model

Each case contains a transcript, expected behavior, observed behavior, failure class, severity, ownership, recommended fix, and six 0–5 rubric scores. The dashboard reports:

- scenario pass rate;
- normalized rubric score;
- critical failure count;
- open backlog size.

Backlog order is deterministic: severity weight dominates, then the total score deficit breaks ties. This prevents a high average from hiding a severe safety or unauthorized-action failure.

## Planned production evolution

1. Python/FastAPI service for persisted test sets and reviewer sessions.
2. Phoenix/OpenTelemetry trace ingestion.
3. Authentication, tenant isolation, and role-aware review.
4. Configurable rubrics and multi-reviewer calibration.
5. Optional model-assisted evaluation with human override.
6. CI release gates and regression trends.

These are planned extensions, not current capabilities.
