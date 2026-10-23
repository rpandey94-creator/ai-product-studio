# Customer Feedback Intelligence — flagship blueprint

Status: **Interactive UX Prototype**. The browser has three synthetic themes and nine written excerpts; it has no clustering backend or customer data.

## Product contract

- Input: source event `{id, channel, text, occurred_at, account_segment}`.
- Output: evidence packet `{theme_id, label, members, representative_excerpts, trend_window, reviewer_state}`.
- Invariant: no published theme without inspectable source IDs; redact PII before external embedding.

## First executable slice

1. Load a versioned synthetic feedback set.
2. Run deterministic normalization and Presidio redaction.
3. Benchmark TF-IDF + HDBSCAN against sentence-transformer embeddings.
4. Export clusters and representative excerpts to the existing React review surface.
5. Record reviewer agreement and rejected/merged themes.

## Gates and failure tests

- Golden labels reviewed independently by two people; report Cohen’s κ separately from precision/recall.
- Reject runs with orphaned evidence, duplicate source IDs, unredacted seeded PII, or unstable cluster identifiers.
- Slice results by source, segment, language, and time window.

## Security and cost

Raw text is local by default, identifiers are pseudonymous, and retention is explicit. Measure cost per processed item, reviewer minute per accepted theme, and reprocessing cost after model changes.

## Milestones

- M1: local data/redaction contract and fixtures.
- M2: two clustering baselines and reviewer notebook.
- M3: traceable API feeding the prototype.
- M4: consented shadow trial; no automatic backlog writes.

