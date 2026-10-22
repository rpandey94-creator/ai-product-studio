import { useCallback, useState } from 'react';
import { Background, Controls, Handle, Position, ReactFlow, type Edge, type Node, type NodeProps } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

type Architecture = { name: string; status: string; nodes: Array<{ id: string; label: string; detail: string; kind: string; x: number; y: number }>; edges: string[][] };

function SystemNode({ data }: NodeProps<Node<{ label: string; detail: string; kind: string }>>) {
  return <div className="architecture-node" data-kind={data.kind}>
    <Handle type="target" position={Position.Left} />
    <strong>{data.label}</strong><small>{data.detail}</small>
    <Handle type="source" position={Position.Right} />
  </div>;
}

const nodeTypes = { system: SystemNode };

export default function ArchitectureExplorer({ architectures }: { architectures: Architecture[] }) {
  const [active, setActive] = useState(0);
  const chosen = architectures[active];
  const nodes: Node[] = chosen.nodes.map((node) => ({ id: node.id, type: 'system', position: { x: node.x, y: node.y }, data: node }));
  const edges: Edge[] = chosen.edges.map((parts, index) => ({ id: `e${index}`, source: parts[0], target: parts[1], label: parts[2], animated: false, style: { stroke: '#70edbe' }, labelStyle: { fill: '#9dac9f', fontSize: 10 } }));
  const onInit = useCallback((instance: { fitView: (options?: object) => void }) => instance.fitView({ padding: .18 }), []);

  return <>
    <div className="architecture-toolbar" role="tablist" aria-label="Architecture to explore">
      {architectures.map((item, index) => <button key={item.name} className={active === index ? 'active' : ''} onClick={() => setActive(index)} role="tab" aria-selected={active === index}>{item.name}</button>)}
    </div>
    <p className="lede-small"><span className="tag roadmap">{chosen.status}</span> Drag the canvas, zoom, and inspect the boundaries. This is an explorable design model, not a claim that every node is implemented.</p>
    <div className="architecture-shell" aria-label={`${chosen.name} explorable system architecture`}>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} onInit={onInit} fitView minZoom={.45} maxZoom={1.6} nodesDraggable={false} nodesConnectable={false} elementsSelectable>
        <Background color="#31594b" gap={28} size={1} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
    <details><summary>Accessible text map</summary><ol className="architecture-fallback">{chosen.nodes.map((node) => <li key={node.id}><strong>{node.label}</strong><br />{node.detail}</li>)}</ol></details>
  </>;
}
