import { useMemo, useState } from 'react';

const roles = ['Employee', 'Contractor', 'Finance'] as const;
const questions = ['Production access','Expense exception','Incident escalation'] as const;
const answers = {
  'Production access': {
    Employee: { result: 'Production access requires an owner, an expiry date, and a completed security review.', sources: ['Access policy v4.2', 'Security review checklist'], denied: [] },
    Contractor: { result: 'Request time-boxed access with a full-time employee as accountable owner.', sources: ['Contractor controls', 'Access policy v4.2'], denied: ['Finance exception register'] },
    Finance: { result: 'Finance can review cost-centre approval, but an engineering owner must initiate production access.', sources: ['Finance exception register', 'Access policy v4.2'], denied: ['Privileged operations runbook'] },
  },
  'Expense exception': {
    Employee: { result: 'Submit the receipt, business purpose, and manager approval through the expense portal.', sources: ['Expense policy v3.1'], denied: ['Finance exception register'] },
    Contractor: { result: 'Your sponsor must submit the expense exception; direct contractor submissions are not authorized.', sources: ['Contractor controls'], denied: ['Finance exception register'] },
    Finance: { result: 'Review the documented business purpose and approval chain before recording an exception decision.', sources: ['Finance exception register','Expense policy v3.1'], denied: [] },
  },
  'Incident escalation': {
    Employee: { result: 'Open a severity-tagged incident and notify the current on-call owner.', sources: ['Incident handbook'], denied: ['Security investigation notes'] },
    Contractor: { result: 'Notify your sponsor and the service owner; restricted investigation notes are not searched.', sources: ['Contractor controls','Incident handbook'], denied: ['Security investigation notes'] },
    Finance: { result: 'Use the incident hotline for payment-impacting events and attach the affected cost centre.', sources: ['Finance continuity guide','Incident handbook'], denied: ['Security investigation notes'] },
  },
};

export default function KnowledgeLab() {
  const [role,setRole] = useState<(typeof roles)[number]>('Contractor');
  const [question,setQuestion] = useState<(typeof questions)[number]>('Production access');
  const [asked,setAsked] = useState(true);
  const current = useMemo(()=>answers[question][role],[role,question]);
  return <div className="prototype-shell knowledge-lab">
    <header><label>Acting role<select value={role} onChange={(event)=>{setRole(event.target.value as (typeof roles)[number]);setAsked(false)}}>{roles.map(item=><option key={item}>{item}</option>)}</select></label><label>Question<select value={question} onChange={(event)=>{setQuestion(event.target.value as (typeof questions)[number]);setAsked(false)}}>{questions.map(item=><option key={item}>{item}</option>)}</select></label><div className="permission-chip">Scoped retrieval · {role}</div></header>
    <div className="knowledge-query"><span>{question}</span><button onClick={()=>setAsked(true)}>Run synthetic search</button></div>
    <div className="knowledge-result" aria-live="polite">{asked?<><p className="eyebrow">Synthetic grounded-answer scenario</p><h3>{current.result}</h3><div className="citation-list">{current.sources.map((item,index)=><span key={item}>[{index+1}] {item}</span>)}</div>{current.denied.length>0&&<div className="denied-note">Not searched: {current.denied.join(', ')} — outside this role’s permission scope.</div>}</>:<p>Run the synthetic search to apply the new role and question boundary.</p>}</div>
  </div>;
}
