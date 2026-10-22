# Netlify and zero-card deployment strategy

The connected Netlify account was inspected on 21 October 2026: Free plan, 300 monthly credits, hard no-overage behavior, no payment card, no current usage, one concurrent build, deploy previews, CDN, functions, and storage.

## Current decision

- Keep the public lab as a static, buildless site connected to GitHub.
- Develop and test locally first.
- Use a Deploy Preview only after the branch is review-ready.
- Do not use Agent Runners or AI Gateway for work that can run locally; they share the limited credit pool.
- Do not enable paid add-ons, billing, cards, or paid model APIs.
- Publish production only after local tests, route checks, responsive checks, and preview review pass.

The first Python application is distributed as locally runnable source and evidence while its browser review layer remains static. Future public backends must independently pass a current no-card eligibility and quota check.
