import { useCallback, useMemo, useState } from 'react';
import { Background, Controls, Handle, Position, ReactFlow, type Edge, type Node, type NodeProps } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

type ComponentNode = { id: string; label: string; detail: string; kind: string; x: number; y: number; role?: string; technology?: string; reason?: string; alternatives?: string[]; inputs?: string[]; outputs?: string[]; dependencies?: string[]; failureModes?: string[]; cost?: string; status?: string };
type Architecture = { name: string; status: string; nodes: ComponentNode[]; edges: string[][] };

function SystemNode({ data }: NodeProps<Node<ComponentNode>>) {
  return <div className="architecture-node" data-kind={data.kind}>
    <Handle type="target" position={Position.Left} />
    <strong>{data.label}</strong><small>{data.technology ?? data.detail}</small><span className="node-status">{data.status ?? 'Proposed'}</span>
    <Handle type="source" position={Position.Right} />
  </div>;
}

const nodeTypes = { system: SystemNode };

export default function ArchitectureExplorer({ architectures }: { architectures: Architecture[] }) {
  const [active, setActive] = useState(0);
  const chosen = architectures[active];
  const [selectedId, setSelectedId] = useState(chosen.nodes[0]?.id ?? '');
  const selected = chosen.nodes.find((node) => node.id === selectedId) ?? chosen.nodes[0];
  const nodes: Node<ComponentNode>[] = useMemo(() => chosen.nodes.map((node) => ({ id: node.id, type: 'system', position: { x: node.x, y: node.y }, data: node, selected: node.id === selected?.id })), [chosen, selected?.id]);
  const edges: Edge[] = useMemo(() => chosen.edges.map((parts, index) => ({ id: `e${index}`, source: parts[0], target: parts[1], label: parts[2], style: { stroke: '#70edbe' }, labelStyle: { fill: '#9dac9f', fontSize: 10 } })), [chosen]);
  const onInit = useCallback((instance: { fitView: (options?: object) => void }) => instance.fitView({ padding: .18 }), []);

  return <div className="architecture-workbench">
    <div className="architecture-toolbar" role="tablist" aria-label="Architecture to explore">
      {architectures.map((item, index) => <button key={item.name} className={active === index ? 'active' : ''} onClick={() => { setActive(index); setSelectedId(item.nodes[0]?.id ?? ''); }} role="tab" aria-selected={active === index}>{item.name}</button>)}
    </div>
    <p className="lede-small"><span className="tag roadmap">{chosen.status}</span> Select a node to inspect its decision record. Shipped prototype layers and proposed system components are labeled separately.</p>
    <div className="architecture-layout">
      <div className="architecture-shell" aria-label={`${chosen.name} explorable system architecture`}><ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} onNodeClick={(_, node) => setSelectedId(node.id)} onInit={onInit} fitView minZoom={.45} maxZoom={1.6} nodesDraggable={false} nodesConnectable={false} elementsSelectable><Background color="#31594b" gap={28} size={1} /><Controls showInteractive={false} /></ReactFlow></div>
      {selected && <aside className="component-inspector" aria-live="polite"><p className="eyebrow">Selected component</p><h3>{selected.label}</h3><span className="stack-status">{selected.status}</span><dl><div><dt>Role</dt><dd>{selected.role ?? selected.detail}</dd></div><div><dt>Technology</dt><dd>{selected.technology ?? 'To be selected'}</dd></div><div><dt>Why</dt><dd>{selected.reason ?? selected.detail}</dd></div><div><dt>Inputs</dt><dd>{selected.inputs?.join(' · ') ?? 'Not specified'}</dd></div><div><dt>Outputs</dt><dd>{selected.outputs?.join(' · ') ?? 'Not specified'}</dd></div><div><dt>Dependencies</dt><dd>{selected.dependencies?.join(' · ') ?? 'None declared'}</dd></div><div><dt>Failure modes</dt><dd>{selected.failureModes?.join(' · ') ?? 'Not specified'}</dd></div><div><dt>Alternatives considered</dt><dd>{selected.alternatives?.join(' · ') ?? 'Not documented'}</dd></div><div><dt>Cost posture</dt><dd>{selected.cost ?? 'Not estimated'}</dd></div></dl></aside>}
    </div>
    <details><summary>Keyboard-accessible component list</summary><div className="architecture-fallback">{chosen.nodes.map((node) => <button key={node.id} onClick={() => setSelectedId(node.id)}><strong>{node.label}</strong><span>{node.role ?? node.detail}</span></button>)}</div></details>
  </div>;
}
