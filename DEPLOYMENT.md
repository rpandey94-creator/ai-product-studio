# Deployment notes

## Netlify target

- Hosting: Netlify free plan
- Source: GitHub repository, Git-based continuous deployment
- Production branch during review: `prelaunch-interactive-lab` (unchanged rollback point)
- Portfolio review branch: `personal-ai-pm-portfolio`
- Build command: `npm run build`
- Publish directory: `dist`
- Runtime: Node 24
- Custom domain: not required; use the generated `netlify.app` subdomain

## Verification checklist

- [x] GitHub repository created and connected
- [x] Stable Netlify production deploy successful
- [x] Local static build generated 90 routes
- [x] Frontend preservation tests and seven Python tests pass
- [ ] Personal portfolio and all primary routes open on Deploy Preview
- [x] Feedback, knowledge-permission, and Reliability Studio interactions tested locally
- [x] Mobile navigation and narrow layout tested locally at 390 px without overflow
- [x] Email, LinkedIn, GitHub, and internal links checked locally
- [ ] Console errors checked
- [ ] Production promotion explicitly approved after Deploy Preview review

The unchecked items require live GitHub/Netlify deployment and browser validation.

## Transition to `main`

The existing `prelaunch-interactive-lab` commit remains the Phase 1 rollback point. `astro-immersive-migration` is the reviewed framework checkpoint; `personal-ai-pm-portfolio` adds the personal positioning and case-study system. Review the complete portfolio on a Deploy Preview. Only after explicit approval should the portfolio be merged into `main`, Netlify’s production branch be changed to `main`, and one verified production deploy be triggered. Retain both historical branches/tags and never force-push or delete the rollback branch.
