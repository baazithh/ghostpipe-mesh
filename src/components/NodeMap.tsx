'use client';

import React, { useCallback } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MarkerType, 
  useNodesState, 
  useEdgesState,
  Node,
  Edge
} from 'reactflow';
import 'reactflow/dist/style.css';
import GlassCard from './GlassCard';
import { Database, Server, Shield } from 'lucide-react';

const initialNodes: Node[] = [
  { 
    id: '1', 
    position: { x: 250, y: 50 }, 
    data: { label: <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-emerald-400"/> SMPC Aggregator</div> },
    style: { background: 'rgba(15, 23, 42, 0.9)', color: '#f8fafc', border: '1px solid #3b82f6', borderRadius: '8px', padding: '12px', boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)' }
  },
  { 
    id: '2', 
    position: { x: 100, y: 200 }, 
    data: { label: <div className="flex items-center gap-2"><Database className="w-4 h-4 text-blue-400"/> Regional Hospital A</div> },
    style: { background: 'rgba(15, 23, 42, 0.7)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }
  },
  { 
    id: '3', 
    position: { x: 400, y: 200 }, 
    data: { label: <div className="flex items-center gap-2"><Database className="w-4 h-4 text-blue-400"/> Private Clinic B</div> },
    style: { background: 'rgba(15, 23, 42, 0.7)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }
  },
  { 
    id: '4', 
    position: { x: 250, y: 350 }, 
    data: { label: <div className="flex items-center gap-2"><Server className="w-4 h-4 text-purple-400"/> Synthetic Generator</div> },
    style: { background: 'rgba(15, 23, 42, 0.7)', color: '#cbd5e1', border: '1px solid rgba(147, 51, 234, 0.4)', borderRadius: '8px' }
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '2', target: '1', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
  { id: 'e1-3', source: '3', target: '1', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
  { id: 'e2-4', source: '1', target: '4', animated: true, style: { stroke: '#9333ea', strokeWidth: 2, strokeDasharray: '5 5' }, label: 'Differential Privacy Add' },
];

export default function NodeMap() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <GlassCard className="h-[400px] flex flex-col p-0 overflow-hidden relative">
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-lg font-semibold text-slate-200">Mesh Topology Handshakes</h3>
        <p className="text-sm text-slate-400">Live cryptographic state</p>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        className="bg-transparent"
      >
        <Background color="rgba(255,255,255,0.05)" gap={16} />
        <Controls className="!bg-ghost-panel !border-ghost-border !text-slate-300" />
      </ReactFlow>
    </GlassCard>
  );
}
