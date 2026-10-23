# Deployment notes

## Netlify target

- Hosting: Netlify free plan
- Source: GitHub repository, Git-based continuous deployment
- Production branch during review: `prelaunch-interactive-lab` (unchanged rollback point)
- Portfolio review branch: `personal-ai-pm-portfolio`
- Production URL: `https://rishav-ai-product-engineering-lab.netlify.app/`
- Production visibility: Public; verified from an anonymous browser session on 23 October 2026
- Deploy Preview visibility: Private; anonymous access redirects to Netlify Team Protection
- Build command: `npm run build`
- Publish directory: `dist`
- Runtime: Node 24
- Custom domain: not required; use the generated `netlify.app` subdomain

## Verification checklist

- [x] GitHub repository created and connected
- [x] Stable Netlify production deploy `prelaunch-interactive-lab@5f1bb8a` is successful and anonymously accessible
- [x] Local static build generated 90 routes
- [x] Ten frontend/data/logic tests and seven Python tests pass
- [x] Personal portfolio and all primary routes open on Deploy Preview #2
- [x] Feedback, knowledge-permission, Reliability Studio, and realtime voice interactions tested in the deployed preview
- [x] Mobile navigation and narrow layout tested locally at 390 px without overflow
- [x] Email, LinkedIn, GitHub, and internal links checked locally
- [x] All 13 blueprint buttons target existing Markdown files on the reviewed GitHub branch
- [x] Deployed client hydration and browser console checked after CSP repair; no runtime errors found
- [x] Production is public while Deploy Previews remain private
- [ ] Production promotion explicitly approved after Deploy Preview review

The only unchecked item is the deliberately gated production promotion.

## Transition to `main`

The existing `prelaunch-interactive-lab@5f1bb8a` production commit remains the Phase 1 rollback point. `astro-immersive-migration` is the reviewed framework checkpoint; `personal-ai-pm-portfolio` contains the resume-ready portfolio and case-study system. The complete portfolio is reviewed through private Deploy Preview #2. Only after explicit approval should PR #2 be merged into `main`, Netlify’s production branch be changed to `main`, and one verified production deploy be triggered. Retain both historical branches/tags and never force-push or delete the rollback branch.
