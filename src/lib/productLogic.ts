export type VoiceState = 'idle'|'listening'|'thinking'|'speaking'|'interrupted'|'confirming'|'completed';
export type VoiceAction = 'start'|'finish_speaking'|'respond'|'interrupt'|'resume'|'request_tool'|'confirm'|'reset';

const voiceTransitions: Record<VoiceState, Partial<Record<VoiceAction, VoiceState>>> = {
  idle:{start:'listening'}, listening:{finish_speaking:'thinking'}, thinking:{respond:'speaking'},
  speaking:{interrupt:'interrupted',request_tool:'confirming'}, interrupted:{resume:'listening'},
  confirming:{confirm:'completed'}, completed:{reset:'idle'},
};

export function transitionVoice(state: VoiceState, action: VoiceAction): VoiceState {
  const next = voiceTransitions[state][action];
  if (!next) throw new Error(`Invalid voice transition: ${state} -> ${action}`);
  return next;
}

export function calculateEconomics(slug: string, values: number[]): number {
  const [a=0,b=0,c=0,d=0] = values;
  if (['customer-feedback-intelligence','ai-job-application-copilot','ai-product-manager-copilot','document-intelligence-approval','agentic-intake-resolution','permission-aware-knowledge-assistant'].includes(slug)) return (a*b/60*c)-d;
  if (slug==='intelligent-inventory-forecasting') return (a*b)-(c*d);
  if (slug==='local-ai-model-performance-lab') return (a*b)-c-d;
  if (slug==='ai-reliability-observability-studio') return ((a*b)/3)+(c*1500)-d;
  if (slug==='model-fine-tuning-evaluation-lab') return a*b*(c/100)-d;
  if (slug==='real-time-multimodal-assistant') return (a*b)-(a*c)-d;
  if (slug==='ai-data-onboarding-pipeline') return a*b*c-d;
  if (slug==='operational-ai-command-center') return a*b-c-d;
  throw new Error(`No economics formula for ${slug}`);
}

export function documentExceptions(fields: Array<{confidence:number;valid:boolean}>, threshold:number) {
  return fields.filter((field)=>field.confidence<threshold||!field.valid);
}
