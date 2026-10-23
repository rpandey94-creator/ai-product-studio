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

The build regenerates typed JSON from the preserved source modules, checks the 64 / 63 / 8 preservation gate, type-checks Astro and TypeScript, prerenders 90 pages, and verifies the 13 personal-portfolio routes, all 13 curated cases, and all 64 archived research cases. Ten Vitest checks cover preservation, status claims, visitor-facing attribution removal, evidence taxonomy, architecture disclosures, product-specific formulas, voice state transitions, document review gates, framework maturity, and Evaluation Workbench evidence.

Manual browser checks cover the recruiter-first homepage, project index, Product Thinking, About, Contact, research archive, theme selection in the feedback prototype, role-scoped retrieval in the knowledge prototype, pass/fail selection in the Reliability Studio, desktop/mobile overflow, mobile navigation, and external links. Deploy Preview validation repeats these checks against the built Netlify output before any production promotion.

Evidence outputs under `evidence/` are generated, not hand-authored benchmark claims.
