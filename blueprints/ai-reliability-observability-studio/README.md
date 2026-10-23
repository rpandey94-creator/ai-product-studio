# AI Reliability & Observability Studio — flagship blueprint

Status: **Locally Implemented and Tested**. The repository contains a dependency-free Python evaluation runner, eight synthetic fixtures, generated JSON/CSV/JUnit evidence, seven passing unit tests, and a React failure-review interface.

## Verified contract

- Input: typed synthetic case with expected behavior and response.
- Output: correctness, safety, tool-use, and recovery scores; failure codes; release-gate result.
- Current evidence: 8 fixtures executed; 5 pass and 3 intentional negative cases fail.

## Next executable slice

1. Version datasets, evaluator configuration, application commit, and environment in every run.
2. Instrument one real local agent using OpenTelemetry/OpenInference.
3. Link spans to the same deterministic evaluators.
4. Add calibrated model-judge experiments only after human labels exist.
5. Compare runs on identical dataset/evaluator versions.

## Gates and failure tests

Schema errors, duplicate IDs, empty data, unauthorized actions, malformed tool results, missing reports, threshold failures, and stale evidence must fail loudly. Trace retention must exclude secrets and unnecessary user content.

## Economics

Record deterministic compute time, model-judge token cost, human review time, storage/retention, and investigation time. Avoided-incident value remains a modeled scenario until field evidence exists.

## Milestones

- M1 complete: deterministic workbench and reports.
- M2: versioned dataset manifest and trend comparison.
- M3: one traced agent pipeline.
- M4: calibrated judge disagreement and CI release gate.

