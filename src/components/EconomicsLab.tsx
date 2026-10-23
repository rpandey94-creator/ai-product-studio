import { useMemo, useState } from 'react';
import { calculateEconomics } from '../lib/productLogic';
type Assumption = { label: string; value: number; unit: string; note: string };
type Economics = { formula: string; unit: string; assumptions: Assumption[]; interpretation: string };

export default function EconomicsLab({ economics, slug }: { economics: Economics; slug: string }) {
  const [values, setValues] = useState(economics.assumptions.map((item) => item.value));
  const output = useMemo(() => calculateEconomics(slug,values), [values,slug]);
  return <div className="economics-lab"><div className="economics-controls">{economics.assumptions.map((item,index)=><label key={item.label}><span>{item.label}<small>{item.note}</small></span><input aria-label={item.label} type="number" min="0" step="1" value={values[index]} onChange={(event)=>setValues(current=>current.map((value,i)=>i===index?Number(event.target.value):value))}/><em>{item.unit}</em></label>)}</div><div className="economics-output"><p className="eyebrow">Modeled scenario—not a measured result</p><strong>{new Intl.NumberFormat('en-IN',{maximumFractionDigits:0}).format(output)}</strong><span>{economics.unit}</span><code>{economics.formula}</code><p>{economics.interpretation}</p></div></div>;
}
