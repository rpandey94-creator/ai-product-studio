# AI Evaluation Workbench

A dependency-free Python vertical slice for evaluating synthetic conversational-AI responses. It executes locally, produces inspectable evidence, and intentionally avoids paid model APIs.

## Run on Windows

From this folder in the VS Code terminal:

```powershell
python -m unittest discover -s tests -v
python -m eval_workbench.runner --dataset data/synthetic_cases.json --out ../../evidence/evaluation-workbench-report.json --csv ../../evidence/evaluation-workbench-results.csv --junit ../../evidence/evaluation-workbench-junit.xml
```

Use `--fail-under 0.75` to turn the measured pass rate into a CI gate. Exit codes are `0` for success, `1` for a failed quality threshold, and `2` for invalid input or runtime errors.

## What is real

- Typed case and result contracts.
- Deterministic correctness, policy, tool-use, and recovery evaluators.
- Positive, negative, and edge-case tests.
- JSON, CSV, and JUnit-compatible evidence outputs.
- A quality-gate exit code suitable for GitHub Actions.

This is not an LLM-as-judge system and does not claim semantic equivalence. Model-judge, trace, and multi-reviewer calibration layers remain future work.
