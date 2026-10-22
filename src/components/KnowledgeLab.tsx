import { useMemo, useState } from 'react';

const roles = ['Employee', 'Contractor', 'Finance'];
const scenarios = {
  Employee: { result: 'Production access requires an owner, an expiry date, and a completed security review.', sources: ['Access policy v4.2', 'Security review checklist'], denied: [] },
  Contractor: { result: 'You can request time-boxed production access. A full-time employee must be the accountable owner.', sources: ['Contractor controls', 'Access policy v4.2'], denied: ['Finance exception register'] },
  Finance: { result: 'Finance approvers can review cost-centre exceptions after the access owner and security reviewer have signed.', sources: ['Finance exception register', 'Access policy v4.2'], denied: [] },
};

export default function KnowledgeLab() {
  const [role,setRole] = useState<keyof typeof scenarios>('Contractor');
  const [asked,setAsked] = useState(true);
  const current = useMemo(()=>scenarios[role],[role]);
  return <div className="prototype-shell knowledge-lab">
    <header><label>Acting role<select value={role} onChange={(event)=>{setRole(event.target.value as keyof typeof scenarios);setAsked(false)}}>{roles.map(item=><option key={item}>{item}</option>)}</select></label><div className="permission-chip">Scoped retrieval · {role}</div></header>
    <div className="knowledge-query"><span>How do I request production access?</span><button onClick={()=>setAsked(true)}>Search</button></div>
    <div className="knowledge-result" aria-live="polite">{asked?<><p className="eyebrow">Grounded answer</p><h3>{current.result}</h3><div className="citation-list">{current.sources.map((item,index)=><span key={item}>[{index+1}] {item}</span>)}</div>{current.denied.length>0&&<div className="denied-note">Not searched: {current.denied.join(', ')} — outside this role’s permission scope.</div>}</>:<p>Select Search to rerun the scenario with the new role boundary.</p>}</div>
  </div>;
}
