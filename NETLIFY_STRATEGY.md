# Netlify and zero-card deployment strategy

The connected Netlify account was inspected on 21 October 2026: Free plan, 300 monthly credits, hard no-overage behavior, no payment card, no current usage, one concurrent build, deploy previews, CDN, functions, and storage.

## Current decision

- Keep the public lab as a statically generated Astro site connected to GitHub. No Netlify adapter is needed because there are no server-rendered routes.
- Develop and test locally first.
- Use a Deploy Preview only after the branch is review-ready.
- Do not use Agent Runners for this design pass: Netlify documents that runs consume AI inference and compute credits, while the complete migration can be implemented and verified locally. Re-evaluate only for a future focused integration failure where its platform context creates unique value.
- Do not activate Functions, Forms, or Image CDN for the current release. The site has no justified server workflow or public form, and its small checked-in images do not warrant an adapter/runtime change.
- Do not enable paid add-ons, billing, cards, or paid model APIs.
- Publish production only after local tests, route checks, responsive checks, and preview review pass.

The first Python application is distributed as locally runnable source and evidence while its browser review layer remains static. Future public backends must independently pass a current no-card eligibility and quota check.
