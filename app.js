const { products: legacyProducts, qaCases } = window.STUDIO_DATA;
const products = legacyProducts.filter(product => product.slug !== 'customer-360-copilot').map((product,index) => ({...product, number:String(index+1).padStart(2,'0')}));
const frameworks = window.FRAMEWORK_ATLAS;
const registry = window.ENGINEERING_REGISTRY;
const main = document.querySelector('#main');
const toast = document.querySelector('#toast');
const rubricNames = ['Correctness', 'Relevance', 'Context', 'Safety', 'Tool use', 'Recovery'];
const severityWeight = { Critical: 4, High: 3, Medium: 2, Low: 1 };
let qaState = structuredClone(qaCases);
let selectedCaseId = qaState[0].id;

const statusClass = status => status.includes('Working') || status.includes('Runnable') ? 'working' : status === 'Interactive Simulation' || status === 'Prototype' ? 'prototype' : 'plan';
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
    <div class="card-top"><span class="product-number">BUILD ${product.number}</span>${statusChip(product)}</div>
    <h3 class="product-title">${product.title}</h3>
    <p class="product-short">${product.short}</p>
    <span class="card-lab-hint">Open product lab <span>→</span></span>
    <div class="card-bottom">${techList(product.frameworks)}<span class="card-arrow">↗</span></div>
  </a>`;
}

function homePage() {
  return `<div class="page">
    <section class="hero">
      <div class="hero-copy">
        <span class="eyebrow">Rishav · AI Product Manager & Builder</span>
        <h1>An unbounded <em>AI product engineering lab.</em></h1>
        <p class="hero-lede">A research-driven system for finding valuable AI problems, selecting the right frameworks, building reproducible applications, and publishing evidence without confusing a simulation with a live AI backend.</p>
        <div class="hero-actions">
          <a class="button" href="#/qa-console">Open the Evaluation Workbench <span>→</span></a>
          <a class="button secondary" href="#/catalog">Explore ${registry.catalog.length} researched candidates</a>
        </div>
      </div>
      <div class="hero-board" aria-label="Studio systems map">
        <div class="board-top"><span>STUDIO / SYSTEM MAP</span><span class="pulse">Demo online</span></div>
        <div class="orbit">
          <div class="orbit-ring"></div><div class="orbit-ring"></div>
          <div class="orbit-core">BUSINESS<br/>↕<br/>AI SYSTEM</div>
          <span class="orb o1">EVALS</span><span class="orb o2">COST</span><span class="orb o3">RISK</span><span class="orb o4">VALUE</span>
        </div>
        <div class="board-stats"><div><strong>${registry.catalog.length}</strong><small>research candidates</small></div><div><strong>${frameworks.length}</strong><small>frameworks mapped</small></div><div><strong>01</strong><small>tested local system</small></div></div>
      </div>
    </section>
    <section class="trust-strip" aria-label="Experience summary">
      <p>Built on 6.5+ years across AI/ML, enterprise SaaS, data, business analysis, and product delivery.</p>
      <div class="trust-list"><span>Conversation QA</span><span>Agent workflows</span><span>Product discovery</span><span>Enterprise systems</span></div>
    </section>

    <section class="section" id="products">
      <div class="section-head"><div><span class="kicker">Verified builds / 01</span><h2>Builds, experiments, and honest states.</h2></div><p>These existing browser experiences are preserved as experiments. Simulations remain explicitly labeled; the Evaluation Workbench now also has an executable, tested Python pipeline.</p></div>
      <div class="filters" id="home-filters"><button class="filter active" data-filter="All">All systems</button>${[...new Set(products.map(product=>product.status))].map(x=>`<button class="filter" data-filter="${x}">${x}</button>`).join('')}</div>
      <div class="product-grid" id="home-product-grid">${products.map((p,i)=>productCard(p,p.slug==='conversation-qa-console')).join('')}</div>
    </section>

    <section class="section"><div class="section-head"><div><span class="kicker">Research system / 02</span><h2>Demand evidence before build effort.</h2></div><p>The catalog separates demonstrated demand from speculative 2027 opportunities, and scores candidates by demand, engineering value, feasibility, and zero-cost fit.</p></div><div class="portal-grid"><a class="portal-card" href="#/catalog"><span>01 / CATALOG</span><strong>${registry.catalog.length} product candidates</strong><p>Filter by category, industry, framework, and implementation state.</p></a><a class="portal-card" href="#/opportunities"><span>02 / MARKET</span><strong>${registry.opportunityMap.length} opportunity clusters</strong><p>Trace every market conclusion back to dated evidence.</p></a><a class="portal-card" href="#/roadmap"><span>03 / PROGRESSION</span><strong>Six-build starting sequence</strong><p>One verified vertical slice at a time—never a new maximum.</p></a></div></section>

    <section class="section">
      <div class="section-head"><div><span class="kicker">Working evidence / 03</span><h2>Evaluation before automation.</h2></div><p>The first real vertical slice pairs this browser review experience with a dependency-free Python pipeline, automated tests, and machine-readable evidence.</p></div>
      <div class="proof-grid">
        <article class="proof-panel"><img src="/assets/conversation-qa-demo.png" alt="Synthetic AI evaluation demonstration cover"/><h3>AI Evaluation Workbench</h3><p>Review eight synthetic support cases in the browser, then inspect the real local pipeline’s correctness, policy, tool-use, and recovery results.</p><a class="button" href="#/qa-console">Launch workbench →</a></article>
        <article class="proof-panel"><span class="eyebrow">What is executed</span><h3>A reproducible evaluation pipeline—not a dashboard-shaped claim.</h3><p>The Python package validates typed fixtures, executes four deterministic evaluators, emits JSON/CSV/JUnit evidence, and can fail a CI process below a chosen threshold.</p><div class="metric-row"><div class="metric"><strong>8</strong><span>synthetic test cases</span></div><div class="metric"><strong>7</strong><span>automated tests passing</span></div><div class="metric"><strong>3</strong><span>evidence formats</span></div></div><div class="disclosure" style="margin-top:22px">Locally runnable real system using synthetic data. It is not an LLM-as-judge backend or a client deployment.</div></article>
      </div>
    </section>

    <section class="section">
      <div class="section-head"><div><span class="kicker">Operating model / 04</span><h2>How I move from idea to evidence.</h2></div><p>A compact product loop designed to reduce expensive assumptions before implementation expands.</p></div>
      <div class="flow"><div class="flow-item">Frame the buyer, job, risk, and measurable outcome.</div><div class="flow-item">Map journeys, decisions, tools, data, and human checkpoints.</div><div class="flow-item">Define acceptance criteria, failure modes, and evaluation cases.</div><div class="flow-item">Build the smallest executable proof of the riskiest assumption.</div><div class="flow-item">Measure, prioritize the backlog, and set the next rollout gate.</div></div>
    </section>
  </div>`;
}

function productsPage() {
  return `<div class="page"><section class="page-hero"><div><div class="crumbs"><a href="#/">Lab</a> / Builds & experiments</div><span class="eyebrow">Preserved implementation track</span><h1 class="page-title">Verified build, simulations, and delivery boundaries.</h1><p>These are the existing portfolio experiences after removing Customer 360 from the forward-looking core. Open any system to inspect its commercial case, architecture, controls, evaluation, and honest status.</p></div><span class="status working">1 tested local system</span></section><div class="filters" id="product-filters"><button class="filter active" data-filter="All">All categories</button>${[...new Set(products.map(p=>p.category))].map(x=>`<button class="filter" data-filter="${x}">${x}</button>`).join('')}</div><div class="product-grid" id="all-product-grid">${products.map(p=>productCard(p)).join('')}</div></div>`;
}

function productPage(product) {
  if (!product) return notFound();
  document.title = `${product.title} — AI Product Studio`;
  return `<div class="page">
    <section class="page-hero"><div><div class="crumbs"><a href="#/">Studio</a> / <a href="#/products">Products</a> / ${product.number}</div><span class="eyebrow">${product.category}</span><h1 class="page-title">${product.title}</h1><p>${product.short}</p></div>${statusChip(product)}</section>
    ${window.STUDIO_LABS.render(product)}
    <div class="detail-grid"><article>
      <section class="detail-section"><span class="section-index">01 / WHY THIS SHOULD EXIST</span><h2>Buyer, pain, and commercial wedge</h2><blockquote>${product.problem}</blockquote><p><strong>Target customer:</strong> ${product.industryPersona}</p><p><strong>Jobs to be done:</strong></p>${list(product.jobs)}<p><strong>Market opportunity:</strong> ${product.opportunity}</p><p><strong>Product vision:</strong> ${product.vision}</p></section>
      <section class="detail-section"><span class="section-index">02 / DISCOVERY</span><h2>Hypotheses before features</h2>${list(product.hypotheses)}<div class="decision-note"><strong>Value proposition</strong><p>${product.value}</p><strong>Why AI is justified</strong><p>${product.whyAI}</p></div></section>
      <section class="detail-section"><span class="section-index">03 / PRODUCT EXPERIENCE</span><h2>Major features and interaction model</h2>${list(product.features)}</section>
      <section class="detail-section"><h2>Target workflow</h2><div class="flow">${product.workflow.map(x=>`<div class="flow-item">${x}</div>`).join('')}</div></section>
      <section class="detail-section"><span class="section-index">04 / SYSTEM DESIGN</span><h2>Architecture and model strategy</h2><div class="architecture-map">${product.architecture.map((x,i)=>`<div><span>${String(i+1).padStart(2,'0')}</span><b>${x}</b></div>`).join('')}</div><details><summary>Model and tool-calling strategy</summary><p>${product.modelStrategy}</p></details><details><summary>Latency, reliability, privacy, and security</summary>${list(product.nonFunctional)}${list(product.security)}</details></section>
      <section class="detail-section"><span class="section-index">05 / PROOF</span><h2>Metrics, evaluation, and release evidence</h2><div class="finding-grid"><div class="finding"><small>Product metrics</small>${list(product.metrics)}</div><div class="finding"><small>Evaluation plan</small>${list(product.evaluation)}</div></div></section>
      <section class="detail-section"><span class="section-index">06 / VIABILITY</span><h2>MVP, economics, and build-versus-buy</h2><p><strong>Proposed MVP:</strong> ${product.mvp}</p><p><strong>Cost structure:</strong> ${product.cost}</p><details open><summary>Build versus buy</summary><p>${product.buildBuy}</p></details><details><summary>Monetization and go to market</summary><p>${product.commercial}</p></details></section>
      <section class="detail-section"><span class="section-index">07 / RISK + ROADMAP</span><h2>Failure modes and controlled expansion</h2><div class="finding-grid"><div class="finding"><small>Primary risks</small>${list(product.risks)}</div><div class="finding"><small>Controls</small>${list(product.security)}</div></div><div class="roadmap">${product.roadmap.map((x,i)=>`<div><span>${String(i+1).padStart(2,'0')}</span><p>${x}</p></div>`).join('')}</div></section>
      <section class="detail-section"><span class="section-index">08 / DELIVERY TRUTH</span><h2>Credible delivery today</h2><div class="disclosure">${product.today}</div>${product.demo ? `<p><a class="button" href="${product.demo}">Open working prototype →</a></p>` : ''}</section>
    </article><aside class="detail-aside"><div class="aside-card"><h3>Likely buyer</h3><p>${product.buyer}</p></div><div class="aside-card"><h3>Success measures</h3>${list(product.metrics)}</div><div class="aside-card"><h3>Framework map</h3>${techList(product.frameworks)}<p style="margin-top:12px"><a href="#/frameworks">Inspect framework choices →</a></p></div><div class="aside-card"><h3>Delivery status</h3><p>${product.status}. Status reflects the independent artifact shown here, not prior employer work.</p></div><nav class="aside-card case-nav" aria-label="Case study sections"><h3>Case study</h3><a href="#/products/${product.slug}">Interactive lab</a><span>Buyer + opportunity</span><span>Architecture + controls</span><span>Metrics + evaluation</span><span>Economics + roadmap</span></nav></aside></div>
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
  return `<div class="page"><section class="page-hero"><div><div class="crumbs"><a href="#/">Lab</a> / Verified builds / Evaluation Workbench</div><span class="eyebrow">Browser review + tested local Python pipeline</span><h1 class="page-title">AI Evaluation Workbench</h1><p>Inspect transcript evidence, tune rubric scores, and export a backlog in the browser. Then inspect the reproducible Python execution that evaluates correctness, policy, tool permission, and recovery with CI-ready evidence.</p></div><span class="status working">Locally Runnable Real System</span></section>
    <div class="dashboard"><div class="metric"><strong>${m.passRate}%</strong><span>scenario pass rate</span></div><div class="metric"><strong>${m.avg}%</strong><span>weighted rubric score</span></div><div class="metric"><strong>${m.critical}</strong><span>critical failures</span></div><div class="metric"><strong>${m.backlog}</strong><span>open backlog items</span></div></div>
    <div class="console-shell"><div class="console-top"><span class="console-title">SYNTHETIC SUPPORT EVALUATION / v1.0</span><div class="console-actions"><button class="button ghost small" id="reset-qa">Reset</button><button class="button ghost small" id="export-csv">CSV</button><button class="button small" id="export-json">JSON report</button></div></div><div class="console-body"><aside class="case-list"><div class="console-filters"><input class="input" id="case-search" aria-label="Search test cases" placeholder="Search cases…"/><select class="input" id="severity-filter" aria-label="Filter by severity"><option>All severities</option><option>Critical</option><option>High</option><option>Low</option></select></div><div class="case-scroll" id="case-rows"></div></aside><section class="case-detail" id="case-detail"></section></div></div>
    <section class="section"><div class="section-head"><div><span class="kicker">Prioritized backlog</span><h2>Failures ordered by impact.</h2></div><p>Priority combines severity with the current rubric deficit. Critical safety or unauthorized-action failures stay above average-score optimizations.</p></div><div class="backlog" id="backlog-table"></div></section>
    <section class="section"><div class="section-head"><div><span class="kicker">Execution evidence</span><h2>The local pipeline actually ran.</h2></div><p>The checked-in report records 8 synthetic cases: 5 passed, 3 intentionally failed, with a 0.75 average score. Seven automated tests cover positive, negative, malformed-input, duplicate-ID, report-output, and failing-gate paths.</p></div><div class="portal-grid"><a class="portal-card" href="/evidence/evaluation-workbench-report.json" target="_blank"><span>JSON / REPORT</span><strong>Inspect machine-readable results</strong><p>Every check includes a score, pass/fail state, and evidence string.</p></a><a class="portal-card" href="/evidence/evaluation-workbench-junit.xml" target="_blank"><span>XML / CI</span><strong>Inspect the JUnit artifact</strong><p>Failed cases can appear directly in a CI test report.</p></a><a class="portal-card" href="https://github.com/rpandey94-creator/ai-product-studio/tree/prelaunch-interactive-lab/apps/evaluation-workbench" target="_blank" rel="noreferrer"><span>GITHUB / SOURCE</span><strong>Read and run the package</strong><p>Includes architecture, Windows commands, exercises, and debugging guidance.</p></a></div></section>
    <div class="disclosure" style="margin-top:28px">The browser console and Python pipeline use synthetic conversations. Deterministic evaluation is real; Phoenix trace ingestion, model judges, multi-reviewer calibration, persistence, and authentication remain planned extensions.</div></div>`;
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

const evidenceById = id => registry.evidence.find(item => item.id === id);

function catalogCards(items) {
  return items.map(item => `<article class="catalog-card"><div class="catalog-card-top"><span class="mono">${String(item.index).padStart(2,'0')} · ${item.category}</span><span class="status ${item.status.includes('Runnable') || item.status.includes('Working') ? 'working' : 'plan'}">${item.status}</span></div><h3>${item.name}</h3><p>${item.businessProblem}</p><div class="catalog-facts"><span><b>Industry</b>${item.industry}</span><span><b>Buyer</b>${item.buyerPersona}</span><span><b>Modality</b>${item.modality}</span><span><b>Complexity</b>${item.complexity}/5</span></div>${techList(item.frameworks)}<details><summary>Architecture, evidence, and acceptance criteria</summary><p><strong>Architecture:</strong> ${item.architecture}</p><p><strong>Market signal:</strong> ${item.evidenceSignal}</p>${list(item.evaluation)}<div class="source-links">${item.evidenceIds.map(id=>{const source=evidenceById(id);return source?`<a href="${source.url}" target="_blank" rel="noreferrer">${source.title} ↗</a>`:''}).join('')}</div></details></article>`).join('');
}

function catalogPage() {
  const categories=[...new Set(registry.catalog.map(item=>item.category))].sort();
  const industries=[...new Set(registry.catalog.map(item=>item.industry))].sort();
  const frameworkNames=[...new Set(registry.catalog.flatMap(item=>item.frameworks))].sort();
  const statuses=[...new Set(registry.catalog.map(item=>item.status))].sort();
  return `<div class="page"><section class="page-hero"><div><div class="crumbs"><a href="#/">Lab</a> / Research catalog</div><span class="eyebrow">Expandable product-discovery registry</span><h1 class="page-title">${registry.catalog.length} differentiated AI product candidates.</h1><p>This is a research roadmap, not a gallery of completed claims. Each record connects a buyer problem, market signal, architecture, frameworks, acceptance criteria, zero-card path, and implementation state.</p></div><span class="status prototype">Research repository</span></section><div class="catalog-controls"><input class="input" id="catalog-search" placeholder="Search problem, buyer, framework, or product…" aria-label="Search research catalog"/><select class="input" id="catalog-category"><option>All categories</option>${categories.map(x=>`<option>${x}</option>`).join('')}</select><select class="input" id="catalog-industry"><option>All industries</option>${industries.map(x=>`<option>${x}</option>`).join('')}</select><select class="input" id="catalog-framework"><option>All frameworks</option>${frameworkNames.map(x=>`<option>${x}</option>`).join('')}</select><select class="input" id="catalog-status"><option>All statuses</option>${statuses.map(x=>`<option>${x}</option>`).join('')}</select></div><div class="catalog-result-line"><strong id="catalog-count">${registry.catalog.length}</strong><span>matching candidates · sorted by opportunity score</span></div><div class="catalog-grid" id="catalog-grid">${catalogCards(registry.catalog)}</div></div>`;
}

function bindCatalog() {
  const update=()=>{const q=document.querySelector('#catalog-search').value.toLowerCase();const category=document.querySelector('#catalog-category').value;const industry=document.querySelector('#catalog-industry').value;const framework=document.querySelector('#catalog-framework').value;const status=document.querySelector('#catalog-status').value;const matches=registry.catalog.filter(item=>Object.values(item).flat().join(' ').toLowerCase().includes(q)&&(category==='All categories'||item.category===category)&&(industry==='All industries'||item.industry===industry)&&(framework==='All frameworks'||item.frameworks.includes(framework))&&(status==='All statuses'||item.status===status));document.querySelector('#catalog-count').textContent=matches.length;document.querySelector('#catalog-grid').innerHTML=matches.length?catalogCards(matches):'<div class="empty">No candidate matches every selected filter.</div>';};
  ['#catalog-search','#catalog-category','#catalog-industry','#catalog-framework','#catalog-status'].forEach(selector=>{document.querySelector(selector)?.addEventListener(selector==='#catalog-search'?'input':'change',update)});
}

function opportunitiesPage() {
  return `<div class="page"><section class="page-hero"><div><div class="crumbs"><a href="#/">Lab</a> / 2027 opportunity map</div><span class="eyebrow">Dated evidence + explicit inference</span><h1 class="page-title">Where demand is visible—and where 2027 remains a bet.</h1><p>Marketplace reports and briefs show direct buyer demand. Job descriptions reveal implementation expectations. Surveys show adoption and barriers. Strategic opportunities are labeled as inference rather than disguised as proven demand.</p></div><span class="status prototype">${registry.evidence.length} source records</span></section><div class="opportunity-grid">${registry.opportunityMap.map((item,index)=>`<article class="opportunity-card"><div><span class="mono">${String(index+1).padStart(2,'0')}</span><span class="status ${item.signal.includes('Strategic')?'plan':'working'}">${item.signal}</span></div><h3>${item.name}</h3><div class="score-track"><span style="width:${item.score}%"></span></div><strong>${item.score} / 100 priority signal</strong><p>${item.why}</p><div class="source-links">${item.evidenceIds.map(id=>{const source=evidenceById(id);return source?`<a href="#source-${source.id}">${source.title}</a>`:''}).join('')}</div></article>`).join('')}</div><section class="section"><div class="section-head"><div><span class="kicker">Evidence ledger</span><h2>Sources behind the map.</h2></div><p>Popularity alone is not buyer demand. Every source is tagged by evidence type, date, and the narrow finding it supports.</p></div><div class="evidence-list">${registry.evidence.map(source=>`<article id="source-${source.id}"><div><span class="mono">${source.date}</span><span class="status prototype">${source.type}</span></div><h3>${source.title}</h3><strong>${source.signal}</strong><p>${source.finding}</p><a href="${source.url}" target="_blank" rel="noreferrer">Open source ↗</a></article>`).join('')}</div></section></div>`;
}

function roadmapPage() {
  return `<div class="page"><section class="page-hero"><div><div class="crumbs"><a href="#/">Lab</a> / Engineering roadmap</div><span class="eyebrow">One verified vertical slice at a time</span><h1 class="page-title">Six starting builds—not a new ceiling.</h1><p>Each application earns “implemented” only after its real framework code executes, positive/negative/edge tests pass, evidence is preserved, and the learning guide can be reproduced locally.</p></div><span class="status working">Build 1 executed</span></section><div class="build-sequence">${registry.buildSequence.map(([number,name,status,proof])=>`<article><span class="sequence-number">${number}</span><div><span class="status ${status.includes('Runnable')||status.includes('Working')?'working':'plan'}">${status}</span><h3>${name}</h3><p>${proof}</p></div></article>`).join('')}</div><section class="section"><div class="section-head"><div><span class="kicker">Completion gate</span><h2>What “built” means here.</h2></div><p>A polished interface is necessary but insufficient. Completion requires runtime proof, tests, truthful status, source, architecture, and material that lets the owner learn the code.</p></div><div class="portal-grid"><div class="portal-card"><span>A / PUBLIC LIVE</span><strong>Endpoint behavior verified</strong><p>Public URL, source, and runtime behavior must all match the claim.</p></div><div class="portal-card"><span>B–C / REAL INFERENCE</span><strong>Browser or local execution</strong><p>Actual model/framework code runs with reproducible evidence.</p></div><div class="portal-card"><span>D–E / DEMO OR SIMULATION</span><strong>Never mislabeled</strong><p>Recorded executions and scripted simulations retain explicit boundaries.</p></div></div></section></div>`;
}

function frameworksPage() {
  const families=[...new Set(frameworks.map(item=>item.family))].sort();
  const sourceClasses=[...new Set(frameworks.map(item=>item.sourceClass))].sort();
  const verified=frameworks.filter(item=>item.metadata && !item.metadata.error).length;
  return `<div class="page"><section class="page-hero"><div><div class="crumbs"><a href="#/">Lab</a> / Framework & SDK atlas</div><span class="eyebrow">Official sources + repository metadata</span><h1 class="page-title">Frameworks are architectural choices, not credentials.</h1><p>The atlas maps function, layer, license class, commercial conditions, deployment, dependencies, alternatives, enabled products, and genuine implementation status. Repository activity was checked through GitHub on 22 October 2026.</p></div><span class="status working">${verified}/${frameworks.length} repositories verified</span></section><div class="atlas-controls"><input class="input" id="framework-search" placeholder="Search technology, layer, or product…" aria-label="Search framework atlas"/><select class="input" id="family-filter"><option>All families</option>${families.map(x=>`<option>${x}</option>`).join('')}</select><select class="input" id="source-filter"><option>All source classes</option>${sourceClasses.map(x=>`<option>${x}</option>`).join('')}</select></div><div class="atlas-grid" id="atlas-grid">${frameworkCards(frameworks)}</div><div class="disclosure" style="margin-top:28px">License classifications are research guidance, not legal advice. Source-available, custom, mixed-codec, model-weight, connector, and hosted-service terms require project-specific review. Re-check the exact version before commercial adoption.</div></div>`;
}

function frameworkCards(items) { return items.map(item=>{const meta=item.metadata;const activity=meta?.error?'Metadata check incomplete':meta?.archived?'Archived repository':`Active · pushed ${new Date(meta.pushedAt).toLocaleDateString('en-GB',{year:'numeric',month:'short',day:'numeric'})}`;return `<article class="framework-card"><div class="framework-card-top"><span class="status ${item.sourceClass==='Open source'?'working':'prototype'}">${item.license}</span><span class="framework-role">${item.family}</span></div><h3>${item.name}</h3><p>${item.layer}</p><div class="framework-meta"><div><span>Source class</span><span>${item.sourceClass}</span></div><div><span>Activity</span><span>${activity}</span></div><div><span>Latest release</span><span>${meta?.latestRelease||'Check upstream releases'}</span></div><div><span>Deploy</span><span>${item.deployment}</span></div><div><span>Dependencies / cost</span><span>${item.dependencies}</span></div><div><span>Commercial note</span><span>${item.commercial}</span></div><div><span>Alternatives</span><span>${item.alternatives}</span></div><div><span>Enables</span><span>${item.enables}</span></div><div><span>Implemented here</span><span>${item.implemented}</span></div></div><div class="framework-links"><a class="button ghost small" href="${item.docs}" target="_blank" rel="noreferrer">Official docs ↗</a><a class="button ghost small" href="${item.repo}" target="_blank" rel="noreferrer">Repository ↗</a></div></article>`}).join(''); }

function bindFrameworks() {
  const update=()=>{const q=document.querySelector('#framework-search').value.toLowerCase();const family=document.querySelector('#family-filter').value;const source=document.querySelector('#source-filter').value;const matches=frameworks.filter(item=>Object.values(item).join(' ').toLowerCase().includes(q)&&(family==='All families'||item.family===family)&&(source==='All source classes'||item.sourceClass===source));document.querySelector('#atlas-grid').innerHTML=matches.length?frameworkCards(matches):'<div class="empty">No technology matches every selected filter.</div>';};
  document.querySelector('#framework-search')?.addEventListener('input',update);document.querySelector('#family-filter')?.addEventListener('change',update);document.querySelector('#source-filter')?.addEventListener('change',update);
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
  document.title='Rishav — AI Product Engineering Lab';
  let html, bind=()=>{};
  if(path==='/') { html=homePage(); bind=()=>bindFilters('#home-filters','#home-product-grid','status'); }
  else if(path==='/products') { html=productsPage(); bind=()=>bindFilters('#product-filters','#all-product-grid','category'); }
  else if(path.startsWith('/products/')) { const product=products.find(p=>p.slug===path.split('/')[2]); html=productPage(product); bind=()=>product&&window.STUDIO_LABS.bind(product); }
  else if(path==='/catalog') { html=catalogPage(); bind=bindCatalog; }
  else if(path==='/opportunities') html=opportunitiesPage();
  else if(path==='/roadmap') html=roadmapPage();
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
