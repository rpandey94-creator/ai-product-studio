import { useMemo, useState } from 'react';

type CatalogItem = {
  id: string; name: string; category: string; industry: string; businessProblem: string;
  status: string; complexity: number; frameworks: string[]; priority: number;
};

const tone = (status: string) => status.includes('Real') ? 'working' : status.includes('Simulation') ? 'simulation' : 'roadmap';

export default function CatalogExplorer({ items }: { items: CatalogItem[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const categories = useMemo(() => ['All', ...new Set(items.map((item) => item.category))], [items]);
  const statuses = useMemo(() => ['All', ...new Set(items.map((item) => item.status))], [items]);
  const filtered = useMemo(() => items.filter((item) => {
    const haystack = `${item.name} ${item.category} ${item.industry} ${item.businessProblem} ${item.frameworks.join(' ')}`.toLowerCase();
    return haystack.includes(query.toLowerCase()) && (category === 'All' || item.category === category) && (status === 'All' || item.status === status);
  }), [items, query, category, status]);

  return <>
    <div className="control-bar" aria-label="Catalog filters">
      <label><span>Search the field</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="MCP, voice, retail…" /></label>
      <label><span>System family</span><select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((value) => <option key={value}>{value}</option>)}</select></label>
      <label><span>Evidence status</span><select value={status} onChange={(event) => setStatus(event.target.value)}>{statuses.map((value) => <option key={value}>{value}</option>)}</select></label>
    </div>
    <p className="eyebrow" aria-live="polite">Showing {filtered.length} of {items.length} research candidates</p>
    {filtered.length ? <div className="catalog-grid">
      {filtered.map((item) => <article className="catalog-card" key={item.id}>
        <div><span className={`tag ${tone(item.status)}`}>{item.status}</span></div>
        <h3><a href={`/products/${item.id}/`}>{item.name}</a></h3>
        <p>{item.businessProblem}</p>
        <footer><span>{item.category}</span><span>Complexity {item.complexity}/5</span></footer>
      </article>)}
    </div> : <div className="empty-state">No candidates match those filters. Try a broader system family or clear the search.</div>}
  </>;
}
