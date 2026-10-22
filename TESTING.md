# Testing and evidence

## Automated Python tests

From `apps/evaluation-workbench`:

```powershell
python -m unittest discover -s tests -v
python -m eval_workbench.runner --dataset data/synthetic_cases.json --out ../../evidence/evaluation-workbench-report.json --csv ../../evidence/evaluation-workbench-results.csv --junit ../../evidence/evaluation-workbench-junit.xml
```

Coverage includes a passing response, unsafe unauthorized action, empty dataset, duplicate IDs, missing fields, report generation, and a deliberately failing quality gate.

## Static application checks

```powershell
node --check app.js
node --check registry.js
node --check atlas.js
node --check framework-metadata.js
node --check framework-metadata-connector.js
node --check framework-release-metadata.js
node --check experiences.js
node --check labs.js
```

Manual browser checks cover home, builds, catalog, opportunities, roadmap, Evaluation Workbench, framework atlas, services, about, filtering, details, external-source links, mobile navigation, and honest status text.

Evidence outputs under `evidence/` are generated, not hand-authored benchmark claims.
