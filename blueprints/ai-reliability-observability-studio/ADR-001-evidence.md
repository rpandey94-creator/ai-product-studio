# ADR-001: deterministic evidence before model judges

Decision: keep the executable deterministic evaluator core as the release baseline and add traces or LLM judges as versioned evidence sources.

Why: deterministic failures are reproducible and cheap; subjective judges require calibration, prompt/version capture, and disagreement review.

Rejected: a single aggregate quality score, hidden failing examples, and 100% passing demo fixtures.

