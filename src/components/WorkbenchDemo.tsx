import { useState } from 'react';

type Check = { name: string; score: number; passed: boolean; evidence: string };
type Result = { case_id: string; intent: string; severity: string; passed: boolean; score: number; checks: Check[]; failure_codes: string[]; response: string };
type Report = { disclosure: string; summary: { total: number; passed: number; failed: number; pass_rate: number; average_score: number }; results: Result[] };

export default function WorkbenchDemo({ report }: { report: Report }) {
  const [selected, setSelected] = useState(0);
  const current = report.results[selected];
  return <>
    <div className="metric-rail" aria-label="Evaluation summary">
      <div className="metric"><strong>{report.summary.total}</strong><span>Synthetic fixtures</span></div>
      <div className="metric"><strong>{report.summary.passed}</strong><span>Passing cases</span></div>
      <div className="metric"><strong>{report.summary.failed}</strong><span>Intentional failures</span></div>
      <div className="metric"><strong>{Math.round(report.summary.average_score * 100)}</strong><span>Mean score / 100</span></div>
    </div>
    <div className="workbench-grid">
      <aside className="case-list" aria-label="Evaluation fixtures">{report.results.map((item, index) => <button key={item.case_id} className={selected === index ? 'active' : ''} onClick={() => setSelected(index)} aria-pressed={selected === index}><strong>{item.case_id} · {item.intent}</strong><span>{item.passed ? 'Pass' : 'Fail'} · {item.severity}</span></button>)}</aside>
      <article className="workbench-detail">
        <span className={`tag ${current.passed ? 'working' : 'roadmap'}`}>{current.passed ? 'Gate passed' : 'Gate failed'}</span>
        <h2>{current.intent}</h2><p className="lead">Deterministic score: {Math.round(current.score * 100)} / 100</p>
        <div className="score-grid">{current.checks.map((check) => <div className="score" key={check.name}><strong>{Math.round(check.score * 100)}</strong><span>{check.name.replace('_',' ')}</span></div>)}</div>
        <h3>Evaluated response</h3><div className="transcript"><p><strong>Assistant:</strong> {current.response}</p></div>
        <div className="detail-grid"><section><h2>Evaluator evidence</h2><ul>{current.checks.map((check) => <li key={check.name}>{check.name}: {check.evidence}</li>)}</ul></section><section><h2>Failure codes</h2>{current.failure_codes.length ? <ul>{current.failure_codes.map((code) => <li key={code}>{code}</li>)}</ul> : <p>No failure codes emitted.</p>}<p className="mono">{report.disclosure}</p></section></div>
      </article>
    </div>
  </>;
}
