# Progressive frontend migration ledger

## Preserved baseline

- Phase 1 rollback branch: `prelaunch-interactive-lab`
- Verified baseline commit: `5f1bb8a845bacc0f23ebea68354db024dfc2fa66`
- Source records remain in the original JavaScript modules.
- The original application is copied unchanged into the Astro public output at `/legacy/`.

## Phase 2 architecture

- Astro owns content-rich routes and produces static HTML.
- React + TypeScript owns only stateful explorers.
- React Three Fiber owns one abstract homepage system map and is deferred to capable desktops.
- GSAP owns reveal choreography and is disabled by reduced-motion preferences.
- React Flow owns the explorable architecture canvas with a text fallback.
- D3 owns the opportunity score scales and SVG geometry.
- Phaser is deliberately omitted: no current experience has a game loop that justifies an engine.

## Release gate

1. Generate data and enforce 64 / 63 / 8 preservation counts.
2. Run Astro type checks and static build.
3. Verify critical routes and all 64 generated case files.
4. Run Vitest preservation tests and the seven Python workbench tests.
5. Inspect desktop and mobile layouts, interactions, links, and console output locally.
6. Push the migration branch and review a Netlify Deploy Preview.
7. Publish only after the preview passes; later merge into `main` and repoint production.
