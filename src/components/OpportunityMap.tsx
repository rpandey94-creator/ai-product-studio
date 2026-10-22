import { scaleLinear, scaleOrdinal, extent } from 'd3';

type Opportunity = { name: string; score: number; signal: string; why: string };

export default function OpportunityMap({ items }: { items: Opportunity[] }) {
  const width = 1060, height = 580;
  const scoreExtent = extent(items, (item) => item.score) as [number, number];
  const x = scaleLinear().domain(scoreExtent).range([80, width - 80]);
  const radius = scaleLinear().domain(scoreExtent).range([18, 46]);
  const colors = scaleOrdinal<string, string>().domain([...new Set(items.map((item) => item.signal))]).range(['#c5f46d','#70edbe','#86e3ef','#f4b860']);
  return <div className="viz-surface">
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-labelledby="opportunity-title opportunity-desc">
      <title id="opportunity-title">Market opportunity evidence map</title>
      <desc id="opportunity-desc">Ten opportunity themes arranged by evidence score. Larger circles represent stronger current signals.</desc>
      <line x1="70" y1={height - 55} x2={width - 55} y2={height - 55} stroke="#31594b" />
      <text x="70" y={height - 25} className="viz-caption">EARLY SIGNAL</text><text x={width - 170} y={height - 25} className="viz-caption">STRONG SIGNAL</text>
      {items.map((item, index) => {
        const column = index % 2;
        const cy = 58 + Math.floor(index / 2) * 96 + column * 18;
        const cx = x(item.score);
        return <g key={item.name}>
          <circle cx={cx} cy={cy} r={radius(item.score)} fill={colors(item.signal)} fillOpacity=".18" stroke={colors(item.signal)} />
          <text x={cx} y={cy + 4} textAnchor="middle" className="viz-label">{item.score}</text>
          <text x={cx + radius(item.score) + 12} y={cy - 4} className="viz-label">{item.name}</text>
          <text x={cx + radius(item.score) + 12} y={cy + 14} className="viz-caption">{item.signal}</text>
        </g>;
      })}
    </svg>
  </div>;
}
