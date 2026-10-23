import { useMemo, useState } from 'react';

const themes = [
  { name: 'Login friction', trend: '+38%', volume: 42, severity: 4, evidence: ['Reset link returns to sign-in', 'Invite flow loses the session', 'SSO error has no recovery path'] },
  { name: 'Reporting gaps', trend: '+12%', volume: 31, severity: 3, evidence: ['CSV export omits filters', 'Weekly report lacks comparison', 'Scheduled report arrived empty'] },
  { name: 'Mobile setup', trend: '-6%', volume: 18, severity: 2, evidence: ['QR step is unclear', 'Keyboard hides continue button', 'Setup copy is too technical'] },
];

export default function FeedbackLab() {
  const [active, setActive] = useState(0);
  const theme = themes[active];
  const score = useMemo(() => Math.round((theme.volume * theme.severity) / 2.1), [theme]);
  return <div className="prototype-shell feedback-lab">
    <aside><p className="eyebrow">Synthetic insight queue</p><p className="prototype-disclosure">3 illustrative themes · 9 written excerpts. Volumes and trends are scenario values, not a dataset measurement.</p>{themes.map((item,index)=><button key={item.name} className={active===index?'active':''} onClick={()=>setActive(index)}><span>{item.name}</span><strong>{item.trend}</strong><small>{item.volume} illustrative items</small></button>)}</aside>
    <section><div className="prototype-heading"><div><p className="eyebrow">Decision workspace</p><h3>{theme.name}</h3></div><span className="priority-score">{score}<small>priority</small></span></div><div className="decision-grid"><div><small>Frequency</small><strong>{theme.volume}</strong></div><div><small>Severity</small><strong>{theme.severity}/5</strong></div><div><small>Trend</small><strong>{theme.trend}</strong></div></div><h4>Evidence excerpts</h4><ul className="evidence-list">{theme.evidence.map((item,index)=><li key={item}><span>0{index+1}</span>{item}</li>)}</ul><div className="prototype-note"><strong>Product decision</strong><p>{active===0?'Prioritize recovery-state redesign before acquisition experiments.':'Keep in discovery until the affected cohort and business cost are validated.'}</p></div></section>
  </div>;
}

