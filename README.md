# AI Product Studio

A fast, dependency-free portfolio that connects AI product strategy to architecture, evaluation, risk, cost, and working evidence.

## What is included

- Nine honest AI product showcases with buyer, workflow, architecture, metrics, evaluation, security, cost, MVP scope, and delivery status.
- A working Conversation QA & AI Evaluation Console using eight synthetic support conversations.
- A searchable 12-framework atlas with official documentation and repository links.
- Three fixed-scope freelance service packages.
- A separate link to the existing authorized enterprise experience portfolio.
- Responsive layout, keyboard-accessible controls, SEO metadata, and Netlify security headers.

## Architecture choice

The studio uses semantic HTML, modular CSS, and data-driven vanilla JavaScript. This buildless architecture was selected deliberately for the current zero-upfront-cost constraint: it has no package supply chain, no build minutes, near-zero maintenance overhead, and deploys directly to Netlify. Product and framework content lives in `data.js`; routing and interactions live in `app.js`.

Hash routes keep every product addressable on static hosting without server configuration:

- `#/products/<slug>` — nine individual product case studies
- `#/qa-console` — working evaluation demo
- `#/frameworks` — searchable framework atlas
- `#/services` and `#/about`

## Run locally

Serve this directory with any static HTTP server. For example:

```powershell
npx serve .
```

No API key, account, or paid service is needed. Opening `index.html` directly may work for most content, but a local server is recommended because browsers handle root-relative assets more reliably over HTTP.

## Deploy to Netlify

1. Create a GitHub repository and push this directory.
2. In Netlify, import the repository.
3. Leave the build command empty and use `.` as the publish directory.
4. Deploy to a free `netlify.app` subdomain.

`netlify.toml` already contains the publish directory, security headers, and cache policy.

## Truth and privacy boundary

The QA console is a fictional demonstration that uses synthetic data. Planned products are labeled `Concept / Planned`; partial implementation is labeled `Prototype`; only the usable browser-based console is labeled `Working Demo`. This repository contains no confidential employer or customer material and claims no paid-client result.

## Framework verification

Framework purposes, repository activity, and license labels were checked against official GitHub repositories and documentation on 21 October 2026. Commercial adopters should re-check the exact version and license terms before use, especially Dify's custom license and Phoenix's Elastic License 2.0.
