# Deployment notes

## Netlify target

- Hosting: Netlify free plan
- Source: GitHub repository, Git-based continuous deployment
- Production branch during review: `astro-immersive-migration`
- Build command: `npm run build`
- Publish directory: `dist`
- Runtime: Node 24
- Custom domain: not required; use the generated `netlify.app` subdomain

## Verification checklist

- [ ] GitHub repository created and connected
- [ ] Netlify production deploy successful
- [x] Local static build generated 72 routes
- [x] Frontend preservation tests and seven Python tests pass
- [ ] Home and all primary static routes open on Deploy Preview
- [ ] Catalog, framework, architecture, and evaluation interactions tested on Deploy Preview
- [ ] Mobile navigation and narrow layout tested
- [ ] External links checked
- [ ] Console errors checked
- [ ] Live URL added back to the Upwork portfolio/profile only after successful verification

The unchecked items require live GitHub/Netlify deployment and browser validation.

## Transition to `main`

The existing `prelaunch-interactive-lab` commit remains the Phase 1 rollback point. This migration is developed on `astro-immersive-migration` and should reach production through a Deploy Preview. After the preview and production smoke tests pass, merge the migration branch into `main`, change Netlify’s production branch to `main`, trigger one verified deploy, and retain both historical branches/tags. Do not force-push or delete the Phase 1 branch.
