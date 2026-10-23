# AI-Assisted Data Onboarding Pipeline

Status: **Product Case Study — Designed**.

First slice: local CSV registration, DuckDB dialect/type profiling, explicit target schema, heuristic mapping suggestions with reasons, dry-run transformations, row-level rejects, idempotent batch ID, and rollback verification. Never silently coerce types or apply a suggested mapping. Test encoding drift, ambiguous dates, sensitive columns, and partial loads.

