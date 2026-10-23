# Architecture

```text
synthetic_cases.json
        │ validate
        ▼
EvaluationCase contracts
        │
        ├── correctness evaluator (required evidence coverage)
        ├── policy evaluator (forbidden content + authorization)
        ├── tool-use evaluator (expected tool + permission)
        └── recovery evaluator (escalation decision)
        │
        ▼
EvaluationResult + failure taxonomy
        │
        ├── JSON evidence report
        ├── CSV analysis export
        ├── JUnit CI report
        └── process quality gate
```

The standard library keeps the first vertical slice reproducible and zero-cost. Evaluators are pure functions, so later adapters can add Promptfoo, Ragas, Phoenix/OpenTelemetry traces, or model judges without changing the case schema or deterministic gates.
