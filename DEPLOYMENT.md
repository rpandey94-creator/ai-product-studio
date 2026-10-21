# Deployment notes

## Netlify target

- Hosting: Netlify free plan
- Source: GitHub repository, Git-based continuous deployment
- Build command: none
- Publish directory: repository root (`.`)
- Custom domain: not required; use the generated `netlify.app` subdomain

## Verification checklist

- [ ] GitHub repository created and connected
- [ ] Netlify production deploy successful
- [ ] Home and all hash routes open
- [ ] QA case selection, scoring, filtering, reset, JSON, and CSV tested
- [ ] Framework search and license filter tested
- [ ] Mobile navigation and narrow layout tested
- [ ] External links checked
- [ ] Console errors checked
- [ ] Live URL added back to the Upwork portfolio/profile only after successful verification

The unchecked items require live GitHub/Netlify deployment and browser validation.
