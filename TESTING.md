# Testing and evidence

## Automated Python tests

From `apps/evaluation-workbench`:

```powershell
python -m unittest discover -s tests -v
python -m eval_workbench.runner --dataset data/synthetic_cases.json --out ../../evidence/evaluation-workbench-report.json --csv ../../evidence/evaluation-workbench-results.csv --junit ../../evidence/evaluation-workbench-junit.xml
```

Coverage includes a passing response, unsafe unauthorized action, empty dataset, duplicate IDs, missing fields, report generation, and a deliberately failing quality gate.

## Astro application checks

```powershell
npm test
npm run build
```

The build regenerates typed JSON from the preserved source modules, checks the 64 / 63 / 8 preservation gate, type-checks Astro and TypeScript, prerenders 72 pages, and verifies critical routes plus all 64 case files. Vitest independently validates catalog, simulation, framework-status, and Evaluation Workbench evidence invariants.

Manual browser checks cover home, catalog search, framework search, architecture switching, the eight simulations and legacy routes, the Evaluation Workbench’s pass/fail selection, desktop/mobile overflow, mobile navigation, links, and console errors.

Evidence outputs under `evidence/` are generated, not hand-authored benchmark claims.
