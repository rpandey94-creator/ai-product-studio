const { products, frameworks, qaCases } = window.STUDIO_DATA;
const main = document.querySelector('#main');
const toast = document.querySelector('#toast');
const rubricNames = ['Correctness', 'Relevance', 'Context', 'Safety', 'Tool use', 'Recovery'];
const severityWeight = { Critical: 4, High: 3, Medium: 2, Low: 1 };
let qaState = structuredClone(qaCases);
let selectedCaseId = qaState[0].id;

const statusClass = status => status === 'Working Demo' ? 'working' : status === 'Prototype' ? 'prototype' : 'plan';
const statusChip = product => `<span class="status ${statusClass(product.status)}">${product.status}</span>`;
const techList = items => `<div class="tech-list">${items.map(item => `<span class="tech">${item}</span>`).join('<span class="tech">·</span>')}</div>`;
const list = items => `<ul class="bullet-list">${items.map(item => `<li>${item}</li>`).join('')}</ul>`;

function notify(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(notify.timer);
  notify.timer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function productCard(product, featured = false) {
  return `<a class="product-card ${featured ? 'featured' : ''}" data-icon="${product.icon}" href="#/products/${product.slug}">
    <div class="card-top"><span class="product-number">${product.number} / 09</span>${statusChip(product)}</div>
    <h3 class="product-title">${product.title}</h3>
    <p class="product-short">${product.short}</p>
    <div class="card-bottom">${techList(product.frameworks)}<span class="card-arrow">↗</span></div>
  </a>`;
}

function homePage() {
  return `<div class="page">
    <section class="hero">
      <div class="hero-copy">
        <span class="eyebrow">Rishav · AI Product Manager & Builder</span>
        <h1>From ambiguous AI ideas to <em>testable systems.</em></h1>
        <p class="hero-lede">I turn conversational AI and agent concepts into focused workflows, requirements, evaluation plans, risk controls, and working evidence—without pretending a prototype is a production system.</p>
        <div class="hero-actions">
          <a class="button" href="#/qa-console">Open the working QA demo <span>→</span></a>
          <a class="button secondary" href="#/products">Explore the product roadmap</a>
        </div>
      </div>
      <div class="hero-board" aria-label="Studio systems map">
        <div class="board-top"><span>STUDIO / SYSTEM MAP</span><span class="pulse">Demo online</span></div>
        <div class="orbit">
          <div class="orbit-ring"></div><div class="orbit-ring"></div>
          <div class="orbit-core">BUSINESS<br/>↕<br/>AI SYSTEM</div>
          <span class="orb o1">EVALS</span><span class="orb o2">COST</span><span class="orb o3">RISK</span><span class="orb o4">VALUE</span>
        </div>
        <div class="board-stats"><div><strong>09</strong><small>product systems</small></div><div><strong>12</strong><small>frameworks mapped</small></div><div><strong>01</strong><small>working demo</small></div></div>
      </div>
    </section>
    <section class="trust-strip" aria-label="Experience summary">
      <p>Built on 6.5+ years across AI/ML, enterprise SaaS, data, business analysis, and product delivery.</p>
      <div class="trust-list"><span>Conversation QA</span><span>Agent workflows</span><span>Product discovery</span><span>Enterprise systems</span></div>
    </section>

    <section class="section" id="products">
      <div class="section-head"><div><span class="kicker">Product systems / 01</span><h2>A roadmap with honest states.</h2></div><p>Nine commercially relevant AI products, separated into working evidence, prototypes, and planned blueprints. Every page explains buyers, value, architecture, evaluation, security, and costs.</p></div>
      <div class="filters" id="home-filters"><button class="filter active" data-filter="All">All systems</button>${['Working Demo','Prototype','Concept / Planned'].map(x=>`<button class="filter" data-filter="${x}">${x}</button>`).join('')}</div>
      <div class="product-grid" id="home-product-grid">${products.map((p,i)=>productCard(p,i===2)).join('')}</div>
    </section>

    <section class="section">
      <div class="section-head"><div><span class="kicker">Working evidence / 02</span><h2>Evaluation before automation.</h2></div><p>The first shipped artifact is deliberately an evaluation product: a useful way to prove how I diagnose failures, define quality, and turn evidence into action.</p></div>
      <div class="proof-grid">
        <article class="proof-panel"><img src="/assets/conversation-qa-demo.png" alt="Fictional AI chatbot QA demonstration cover"/><h3>Conversation QA Console</h3><p>Review eight synthetic support conversations across correctness, relevance, context, safety, tool use, and recovery. Adjust scores, filter failures, and export the report.</p><a class="button" href="#/qa-console">Launch console →</a></article>
        <article class="proof-panel"><span class="eyebrow">What the demo proves</span><h3>Not a dashboard-shaped claim. A usable decision loop.</h3><p>The console connects transcript evidence to expected behavior, a failure taxonomy, severity, ownership, a recommended fix, and an impact-ranked backlog.</p><div class="metric-row"><div class="metric"><strong>8</strong><span>synthetic test cases</span></div><div class="metric"><strong>6</strong><span>rubric dimensions</span></div><div class="metric"><strong>2</strong><span>report formats</span></div></div><div class="disclosure" style="margin-top:22px">Fictional demonstration using synthetic data only. It is not represented as a paid client engagement or a deployed customer system.</div></article>
      </div>
    </section>

    <section class="section">
      <div class="section-head"><div><span class="kicker">Operating model / 03</span><h2>How I move from idea to evidence.</h2></div><p>A compact product loop designed to reduce expensive assumptions before implementation expands.</p></div>
      <div class="flow"><div class="flow-item">Frame the buyer, job, risk, and measurable outcome.</div><div class="flow-item">Map journeys, decisions, tools, data, and human checkpoints.</div><div class="flow-item">Define acceptance criteria, failure modes, and evaluation cases.</div><div class="flow-item">Build the smallest executable proof of the riskiest assumption.</div><div class="flow-item">Measure, prioritize the backlog, and set the next rollout gate.</div></div>
    </section>
  </div>`;
}

function productsPage() {
  return `<div class="page"><section class="page-hero"><div><div class="crumbs"><a href="#/">Studio</a> / Product roadmap</div><span class="eyebrow">Nine product archetypes</span><h1 class="page-title">AI products mapped from buyer to runtime.</h1><p>This is a transparent delivery roadmap—not a wall of finished-project claims. Open any system to inspect its commercial case, architecture, controls, evaluation, and what I can credibly deliver today.</p></div><span class="status working">1 working demo</span></section><div class="filters" id="product-filters"><button class="filter active" data-filter="All">All categories</button>${[...new Set(products.map(p=>p.category))].map(x=>`<button class="filter" data-filter="${x}">${x}</button>`).join('')}</div><div class="product-grid" id="all-product-grid">${products.map(p=>productCard(p)).join('')}</div></div>`;
}

function productPage(product) {
  if (!product) return notFound();
  document.title = `${product.title} — AI Product Studio`;
  return `<div class="page">
    <section class="page-hero"><div><div class="crumbs"><a href="#/">Studio</a> / <a href="#/products">Products</a> / ${product.number}</div><span class="eyebrow">${product.category}</span><h1 class="page-title">${product.title}</h1><p>${product.short}</p></div>${statusChip(product)}</section>
    <div class="detail-grid"><article>
      <section class="detail-section"><h2>Product case</h2><blockquote>${product.problem}</blockquote><p><strong>Why AI:</strong> ${product.whyAI}</p><p><strong>Value proposition:</strong> ${product.value}</p></section>
      <section class="detail-section"><h2>Target workflow</h2><div class="flow">${product.workflow.map(x=>`<div class="flow-item">${x}</div>`).join('')}</div></section>
      <section class="detail-section"><h2>Proposed architecture</h2>${list(product.architecture)}<p>This architecture is a product-level design and should be validated against the buyer's data, security, latency, and operating constraints.</p></section>
      <section class="detail-section"><h2>Evaluation and release evidence</h2>${list(product.evaluation)}</section>
      <section class="detail-section"><h2>Security and failure modes</h2><div class="finding-grid"><div class="finding"><small>Primary risks</small>${list(product.risks)}</div><div class="finding"><small>Controls</small>${list(product.security)}</div></div></section>
      <section class="detail-section"><h2>MVP boundary</h2><p>${product.mvp}</p><p><strong>Cost drivers:</strong> ${product.cost}</p></section>
      <section class="detail-section"><h2>Credible delivery today</h2><div class="disclosure">${product.today}</div>${product.demo ? `<p><a class="button" href="${product.demo}">Open working demo →</a></p>` : ''}</section>
    </article><aside class="detail-aside"><div class="aside-card"><h3>Likely buyer</h3><p>${product.buyer}</p></div><div class="aside-card"><h3>Success measures</h3>${list(product.metrics)}</div><div class="aside-card"><h3>Framework map</h3>${techList(product.frameworks)}<p style="margin-top:12px"><a href="#/frameworks">Inspect framework choices →</a></p></div><div class="aside-card"><h3>Delivery status</h3><p>${product.status}. Status reflects the independent artifact shown here, not prior employer work.</p></div></aside></div>
  </div>`;
}

function qaMetrics(cases) {
  const open = cases.filter(c=>c.status !== 'Pass');
  const passRate = Math.round((cases.filter(c=>c.status === 'Pass').length / cases.length) * 100);
  const avg = Math.round((cases.flatMap(c=>c.scores).reduce((a,b)=>a+b,0) / (cases.length * 6 * 5)) * 100);
  return {passRate, avg, critical: open.filter(c=>c.severity==='Critical').length, backlog: open.length};
}

function qaConsolePage() {
  const m = qaMetrics(qaState);
  return `<div class="page"><section class="page-hero"><div><div class="crumbs"><a href="#/">Studio</a> / Working demos / QA Console</div><span class="eyebrow">Synthetic-data working demo</span><h1 class="page-title">Conversation QA & Evaluation Console</h1><p>Inspect transcript evidence, compare expected and observed behavior, tune rubric scores, and export an impact-ranked failure backlog. Changes live only in your browser session.</p></div><span class="status working">Working Demo</span></section>
    <div class="dashboard"><div class="metric"><strong>${m.passRate}%</strong><span>scenario pass rate</span></div><div class="metric"><strong>${m.avg}%</strong><span>weighted rubric score</span></div><div class="metric"><strong>${m.critical}</strong><span>critical failures</span></div><div class="metric"><strong>${m.backlog}</strong><span>open backlog items</span></div></div>
    <div class="console-shell"><div class="console-top"><span class="console-title">SYNTHETIC SUPPORT EVALUATION / v1.0</span><div class="console-actions"><button class="button ghost small" id="reset-qa">Reset</button><button class="button ghost small" id="export-csv">CSV</button><button class="button small" id="export-json">JSON report</button></div></div><div class="console-body"><aside class="case-list"><div class="console-filters"><input class="input" id="case-search" aria-label="Search test cases" placeholder="Search cases…"/><select class="input" id="severity-filter" aria-label="Filter by severity"><option>All severities</option><option>Critical</option><option>High</option><option>Low</option></select></div><div class="case-scroll" id="case-rows"></div></aside><section class="case-detail" id="case-detail"></section></div></div>
    <section class="section"><div class="section-head"><div><span class="kicker">Prioritized backlog</span><h2>Failures ordered by impact.</h2></div><p>Priority combines severity with the current rubric deficit. Critical safety or unauthorized-action failures stay above average-score optimizations.</p></div><div class="backlog" id="backlog-table"></div></section>
    <div class="disclosure" style="margin-top:28px">This portfolio demo contains synthetic conversations and deterministic client-side scoring. Phoenix trace ingestion, multi-reviewer calibration, persistence, authentication, and automated model-judge runs are planned production extensions.</div></div>`;
}

function renderCaseList(filter = '', severity = 'All severities') {
  const target = document.querySelector('#case-rows');
  if (!target) return;
  const matches = qaState.filter(c => `${c.id} ${c.intent} ${c.issue}`.toLowerCase().includes(filter.toLowerCase()) && (severity === 'All severities' || c.severity === severity));
  target.innerHTML = matches.map(c=>`<button class="case-row ${c.id===selectedCaseId?'active':''}" data-case="${c.id}"><strong>${c.id} · ${c.intent}</strong><small><span>${c.issue}</span><span class="severity ${c.severity.toLowerCase()}">${c.severity}</span></small></button>`).join('') || '<div class="empty">No cases match.</div>';
}

function renderCaseDetail() {
  const c = qaState.find(x=>x.id===selectedCaseId) || qaState[0];
  const target = document.querySelector('#case-detail');
  if (!target) return;
  target.innerHTML = `<div class="case-head"><div><span class="mono">${c.id} · ${c.channel}</span><h2>${c.intent}</h2></div><span class="severity ${c.severity.toLowerCase()}">${c.severity}</span></div><div class="transcript">${c.transcript.map(([role,text])=>`<div class="message ${role.toLowerCase()}"><b>${role}</b>${text}</div>`).join('')}</div><h3>Evaluation rubric</h3><div class="rubric-grid">${rubricNames.map((name,i)=>`<div class="rubric-score"><label><span>${name}</span><strong>${c.scores[i]}/5</strong></label><input type="range" min="0" max="5" step="1" value="${c.scores[i]}" data-score="${i}" aria-label="${name} score"/></div>`).join('')}</div><div class="finding-grid"><div class="finding"><small>Expected behavior</small><p>${c.expected}</p></div><div class="finding"><small>Observed behavior</small><p>${c.observed}</p></div><div class="finding"><small>Issue classification</small><p>${c.issue}</p></div><div class="finding"><small>Recommended action · ${c.owner}</small><p>${c.fix}</p></div></div>`;
}

function renderBacklog() {
  const rows = qaState.filter(c=>c.status !== 'Pass').map(c=>({...c, priority:severityWeight[c.severity]*20 + (30 - c.scores.reduce((a,b)=>a+b,0))})).sort((a,b)=>b.priority-a.priority);
  const target = document.querySelector('#backlog-table');
  if (!target) return;
  target.innerHTML = `<table><thead><tr><th>Priority</th><th>Case</th><th>Failure</th><th>Severity</th><th>Owner</th><th>Recommended fix</th></tr></thead><tbody>${rows.map((c,i)=>`<tr><td>#${String(i+1).padStart(2,'0')}</td><td>${c.id}<br/>${c.intent}</td><td>${c.issue}</td><td><span class="severity ${c.severity.toLowerCase()}">${c.severity}</span></td><td>${c.owner}</td><td>${c.fix}</td></tr>`).join('')}</tbody></table>`;
}

function updateConsoleMetrics() {
  const values = qaMetrics(qaState);
  document.querySelectorAll('.dashboard .metric strong').forEach((el,i)=>el.textContent=[`${values.passRate}%`,`${values.avg}%`,values.critical,values.backlog][i]);
}

function download(filename, content, type) {
  const blob = new Blob([content], {type});
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement('a'), {href:url, download:filename});
  a.click();
  setTimeout(()=>URL.revokeObjectURL(url), 500);
  notify(`${filename} prepared locally.`);
}

function bindQA() {
  renderCaseList(); renderCaseDetail(); renderBacklog();
  document.querySelector('#case-rows')?.addEventListener('click', e => { const row=e.target.closest('[data-case]'); if(!row) return; selectedCaseId=row.dataset.case; renderCaseList(document.querySelector('#case-search').value, document.querySelector('#severity-filter').value); renderCaseDetail(); });
  document.querySelector('#case-detail')?.addEventListener('input', e => { if(!e.target.matches('[data-score]')) return; const c=qaState.find(x=>x.id===selectedCaseId); c.scores[Number(e.target.dataset.score)]=Number(e.target.value); e.target.closest('.rubric-score').querySelector('strong').textContent=`${e.target.value}/5`; updateConsoleMetrics(); renderBacklog(); });
  const refresh=()=>renderCaseList(document.querySelector('#case-search').value,document.querySelector('#severity-filter').value);
  document.querySelector('#case-search')?.addEventListener('input',refresh); document.querySelector('#severity-filter')?.addEventListener('change',refresh);
  document.querySelector('#reset-qa')?.addEventListener('click',()=>{qaState=structuredClone(qaCases);selectedCaseId=qaState[0].id;renderCaseList();renderCaseDetail();renderBacklog();updateConsoleMetrics();notify('Synthetic evaluation reset.');});
  document.querySelector('#export-json')?.addEventListener('click',()=>download('conversation-qa-report.json',JSON.stringify({generatedAt:new Date().toISOString(),disclosure:'Synthetic portfolio demonstration — not client data.',metrics:qaMetrics(qaState),cases:qaState},null,2),'application/json'));
  document.querySelector('#export-csv')?.addEventListener('click',()=>{const esc=v=>`"${String(v).replaceAll('"','""')}"`;const rows=[['id','intent','issue','severity','owner','recommended_fix','scores'],...qaState.map(c=>[c.id,c.intent,c.issue,c.severity,c.owner,c.fix,c.scores.join('|')])];download('conversation-qa-backlog.csv',rows.map(r=>r.map(esc).join(',')).join('\n'),'text/csv');});
}

function frameworksPage() {
  return `<div class="page"><section class="page-hero"><div><div class="crumbs"><a href="#/">Studio</a> / Framework atlas</div><span class="eyebrow">Verified technology map</span><h1 class="page-title">Frameworks are choices, not credentials.</h1><p>This atlas connects tools to product roles, commercial fit, limitations, licenses, and the nine-product roadmap. Repository activity and licenses were checked against official repositories on 21 October 2026.</p></div><span class="status prototype">12 mapped</span></section><div class="atlas-controls"><input class="input" id="framework-search" placeholder="Search purpose, product, or framework…" aria-label="Search framework atlas"/><select class="input" id="license-filter" aria-label="Filter by license"><option>All licenses</option>${[...new Set(frameworks.map(f=>f.license))].map(x=>`<option>${x}</option>`).join('')}</select></div><div class="atlas-grid" id="atlas-grid">${frameworkCards(frameworks)}</div><div class="disclosure" style="margin-top:28px">License labels are discovery guidance, not legal advice. Re-check the exact repository and version before commercial adoption—especially custom or source-available terms.</div></div>`;
}

function frameworkCards(items) { return items.map(f=>`<article class="framework-card"><span class="status prototype">${f.license}</span><h3>${f.name}</h3><p>${f.role}</p><div class="framework-meta"><div><span>Purpose</span><span>${f.purpose}</span></div><div><span>Strength</span><span>${f.strength}</span></div><div><span>Watch</span><span>${f.limitation}</span></div><div><span>Maps to</span><span>${f.products}</span></div><div><span>Activity</span><span>${f.activity}</span></div></div><div class="framework-links"><a class="button ghost small" href="${f.docs}" target="_blank" rel="noreferrer">Docs ↗</a><a class="button ghost small" href="${f.github}" target="_blank" rel="noreferrer">GitHub ↗</a></div></article>`).join(''); }

function bindFrameworks() {
  const update=()=>{const q=document.querySelector('#framework-search').value.toLowerCase();const l=document.querySelector('#license-filter').value;const matches=frameworks.filter(f=>Object.values(f).join(' ').toLowerCase().includes(q)&&(l==='All licenses'||f.license===l));document.querySelector('#atlas-grid').innerHTML=matches.length?frameworkCards(matches):'<div class="empty">No framework matches.</div>';};
  document.querySelector('#framework-search')?.addEventListener('input',update);document.querySelector('#license-filter')?.addEventListener('change',update);
}

function servicesPage() {
  const services=[
    {n:'01',title:'Chatbot QA Audit',text:'A structured review of an existing chatbot or agent using a representative test set and explicit acceptance criteria.',items:['Evaluation rubric and test plan','Evidence-linked issue log','Severity and impact classification','Prioritized remediation backlog','Readout with recommended next steps'],note:'Best first engagement: narrow scope, no platform purchase required.'},
    {n:'02',title:'AI Product Discovery Sprint',text:'Turn an AI idea into a decision-ready product definition before committing engineering effort.',items:['Problem and target-user framing','Journey and workflow maps','MVP requirements and user stories','Risk, evaluation, and success metrics','Phased build roadmap'],note:'Scope and estimate depend on integrations and domain risk.'},
    {n:'03',title:'Workflow & Requirements Pack',text:'Convert an operating process or client brief into implementation-ready logic for product and engineering teams.',items:['Current and target-state workflows','Roles, decisions, tools, and data','Functional and non-functional requirements','Failure paths and human checkpoints','Acceptance criteria and traceability'],note:'Suitable for founders, SaaS teams, and implementation partners.'}
  ];
  return `<div class="page"><section class="page-hero"><div><div class="crumbs"><a href="#/">Studio</a> / Services</div><span class="eyebrow">Freelance service packages</span><h1 class="page-title">Start with a decision, not a giant build.</h1><p>Clear, fixed-scope starting points for conversational AI QA, product discovery, and workflow definition. Deliverables are tailored to the actual product and buyer context.</p></div></section><div class="service-grid">${services.map(s=>`<article class="service-card"><span class="mono">${s.n}</span><h3>${s.title}</h3><p>${s.text}</p>${list(s.items)}<span class="price-note">${s.note}</span><a class="button secondary" href="https://www.upwork.com/freelancers/~0143ef6ffa552833a7" target="_blank" rel="noreferrer" style="margin-top:22px">View Upwork profile ↗</a></article>`).join('')}</div><div class="disclosure" style="margin-top:28px">For work initiated on Upwork, communication and contracting should remain on Upwork until its rules permit otherwise. This site does not route Upwork-originated leads to off-platform payment.</div></div>`;
}

function aboutPage() {
  const experience=[
    ['Oct 2025 – Mar 2026','ClimatyAI · Product Manager, Agentic AI Products','Agentic workflows, multimodal product experiences, AI evaluation, product requirements, and inference economics.'],
    ['Dec 2021 – Mar 2025','Sprinklr · Associate Product Manager, Enterprise SaaS','Conversational AI, customer intelligence, enterprise product delivery, intent taxonomies, validation, and reusable capabilities.'],
    ['Nov 2020 – Dec 2021','WhiteHat Jr · Business Analyst','Sales funnels, operational analytics, KPIs, and process improvement.'],
    ['Sep 2019 – Aug 2020','Innovaccer · Data Analyst','SQL, EMR standardization, data quality, and ETL.'],
    ['Jan 2019 – Sep 2019','Dataflow · Business Analyst','AI credential-verification model validation and operational workflows.']
  ];
  return `<div class="page"><section class="page-hero"><div><div class="crumbs"><a href="#/">Studio</a> / About</div><span class="eyebrow">Product judgment × implementation evidence</span><h1 class="page-title">Enterprise context. Independent build discipline.</h1><p>I have 6.5+ years across AI/ML, enterprise SaaS, product management, business analysis, and data. This studio is where I make the product logic, architecture choices, evaluation methods, and implementation progress visible.</p></div></section><div class="about-grid"><aside><div class="aside-card"><h3>Education</h3><p>Integrated B.Tech + M.Tech, Computer Science Engineering — Intelligent Systems<br/><br/>Gautam Buddha University · 2013–2018 · CGPA 8.2/10</p></div><div class="aside-card"><h3>Separate portfolio</h3><p>Authorized public enterprise experience—including customer intelligence, hospitality, and AI advertising work—remains in a separate collection.</p><p style="margin-top:14px"><a class="button secondary" href="https://rishav-product-portfolio.pages.dev/" target="_blank" rel="noreferrer">View enterprise portfolio ↗</a></p></div></aside><section><span class="kicker">Experience timeline</span><div class="experience">${experience.map(([date,title,text])=>`<article class="experience-item"><small>${date}</small><div><h3>${title}</h3><p>${text}</p></div></article>`).join('')}</div><div class="disclosure" style="margin-top:30px">The independent studio does not reproduce confidential employer artifacts or claim ownership of employer deployments. Planned product pages are labeled as plans; working demos are labeled and testable.</div></section></div></div>`;
}

function notFound() { return `<div class="page"><section class="page-hero"><div><span class="eyebrow">404 / Route not found</span><h1 class="page-title">This system is not on the map.</h1><p>Return to the product studio and choose a documented route.</p><p><a class="button" href="#/">Back to studio</a></p></div></section></div>`; }

function bindFilters(containerId, gridId, mode='status') {
  const container=document.querySelector(containerId); const grid=document.querySelector(gridId); if(!container||!grid)return;
  container.addEventListener('click',e=>{const btn=e.target.closest('[data-filter]');if(!btn)return;container.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;const matches=products.filter(p=>f==='All'||p[mode]===f);grid.innerHTML=matches.map((p,i)=>productCard(p,containerId==='#home-filters'&&p.slug==='conversation-qa-console')).join('');});
}

function render() {
  const path=(location.hash.slice(1)||'/').split('?')[0];
  document.title='Rishav — AI Product Studio';
  let html, bind=()=>{};
  if(path==='/') { html=homePage(); bind=()=>bindFilters('#home-filters','#home-product-grid','status'); }
  else if(path==='/products') { html=productsPage(); bind=()=>bindFilters('#product-filters','#all-product-grid','category'); }
  else if(path.startsWith('/products/')) html=productPage(products.find(p=>p.slug===path.split('/')[2]));
  else if(path==='/qa-console') { html=qaConsolePage(); bind=bindQA; }
  else if(path==='/frameworks') { html=frameworksPage(); bind=bindFrameworks; }
  else if(path==='/services') html=servicesPage();
  else if(path==='/about') html=aboutPage();
  else html=notFound();
  main.innerHTML=html; bind(); window.scrollTo({top:0,behavior:'instant'}); document.querySelector('.primary-nav').classList.remove('open'); document.querySelector('.menu-toggle').setAttribute('aria-expanded','false');
}

document.querySelector('.menu-toggle').addEventListener('click', e=>{const nav=document.querySelector('.primary-nav');const open=nav.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',String(open));});
window.addEventListener('hashchange',render);
render();
