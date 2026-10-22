import { useMemo, useState } from 'react';

type Framework = { name: string; family: string; layer: string; repo: string; enables: string; implemented: string; sourceClass: string };

export default function FrameworkExplorer({ items }: { items: Framework[] }) {
  const [family, setFamily] = useState('All');
  const [query, setQuery] = useState('');
  const families = useMemo(() => ['All', ...new Set(items.map((item) => item.family))], [items]);
  const filtered = items.filter((item) => (family === 'All' || item.family === family) && `${item.name} ${item.layer} ${item.enables}`.toLowerCase().includes(query.toLowerCase()));
  return <>
    <div className="control-bar">
      <label><span>Search frameworks</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="retrieval, tracing, voice…" /></label>
      <label><span>Family</span><select value={family} onChange={(event) => setFamily(event.target.value)}>{families.map((value) => <option key={value}>{value}</option>)}</select></label>
    </div>
    <p className="eyebrow">{filtered.length} of {items.length} framework records</p>
    <div className="framework-grid">{filtered.map((item) => <article className="framework-card" key={item.name}>
      <span className={`tag ${item.implemented.startsWith('Executed') ? 'working' : 'roadmap'}`}>{item.implemented.startsWith('Executed') ? 'Verified use' : 'Evaluated candidate'}</span>
      <h3>{item.name}</h3><p>{item.family} · {item.layer}</p><p>{item.enables}</p>
      <a href={item.repo}>Repository ↗</a>
    </article>)}</div>
  </>;
}
