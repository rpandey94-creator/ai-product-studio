# Learning guide

## Walkthrough

1. `models.py` defines the contract: inputs cannot silently omit the case ID, intent, or response.
2. `evaluators.py` contains four small, inspectable evaluators and converts failed checks into stable failure codes.
3. `runner.py` is the product boundary: it loads data, runs evaluation, writes evidence, and returns a CI-friendly exit code.
4. `tests/test_pipeline.py` proves the happy path, dangerous behavior, malformed data, duplicate IDs, report creation, and a failing gate.

## Feature-change exercise

Add a `latency_ms` field and an evaluator that fails above a configurable latency budget. Start with one passing and one failing test, then expose `--max-latency-ms` in the runner.

## Debugging scenario

If a clearly correct response fails, inspect normalization, Unicode punctuation, and the exact required term. Decide whether the fixture is overly brittle before weakening the gate. Preserve deterministic evidence rather than hiding the failure.

## Interview questions

- Why keep deterministic checks when a model judge can understand semantics?
- Where should human calibration enter the pipeline?
- How would you prevent evaluation data leakage?
- Which failures must block release regardless of the aggregate score?
- How would you version datasets and evaluator changes?

## Adapting for a paying customer

Replace synthetic cases with an approved, redacted sample; map policies to explicit rules; add role-based review and trace storage; calibrate thresholds with domain specialists; and agree which critical failures always block release. Keep raw customer data out of the public portfolio.

## Mastery status

The implementation is executed and tested. Personal mastery is intentionally **not claimed**; it should be marked separately after you can explain the architecture, make the exercise change, and diagnose the scenario without assistance.
