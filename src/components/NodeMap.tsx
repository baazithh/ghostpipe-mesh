'use client';

import React, { useMemo } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  useNodesState, 
  useEdgesState,
  Node,
  Edge,
  Handle,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import GlassCard from './GlassCard';
import { Database, Server, Shield, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

// Custom Node Component
const MeshNode = ({ data, selected }: any) => {
  const Icon = data.icon || Database;
  return (
    <div className={`px-4 py-3 rounded-xl border transition-all duration-500 ${selected ? 'border-blue-400 bg-blue-500/20 shadow-ghost-glow scale-105' : 'border-ghost-border bg-slate-900/80'} backdrop-blur-md min-w-[180px]`}>
      <Handle type="target" position={Position.Top} className="!bg-blue-400 !border-none !w-2 !h-2" />
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${data.type === 'aggregator' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'}`}>
          <Icon size={18} />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{data.category || 'Node'}</span>
          <span className="text-sm font-semibold text-slate-100">{data.label}</span>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-blue-400 !border-none !w-2 !h-2" />
      
      {data.status === 'encrypted' && (
        <div className="absolute -top-2 -right-2 bg-emerald-500/20 border border-emerald-500/40 rounded-full p-1">
          <Lock size={10} className="text-emerald-400" />
        </div>
      )}
    </div>
  );
};

const nodeTypes = {
  meshNode: MeshNode,
};

const edgeTypes = {};

const initialNodes: Node[] = [
  { 
    id: '1', 
    type: 'meshNode',
    position: { x: 250, y: 50 }, 
    data: { label: 'SMPC Aggregator', icon: Shield, type: 'aggregator', category: 'Security Layer', status: 'encrypted' },
  },
  { 
    id: '2', 
    type: 'meshNode',
    position: { x: 100, y: 200 }, 
    data: { label: 'Regional Hospital A', icon: Database, category: 'Data Provider', status: 'encrypted' },
  },
  { 
    id: '3', 
    type: 'meshNode',
    position: { x: 400, y: 200 }, 
    data: { label: 'Private Clinic B', icon: Database, category: 'Data Provider', status: 'encrypted' },
  },
  { 
    id: '4', 
    type: 'meshNode',
    position: { x: 250, y: 350 }, 
    data: { label: 'Synthetic Generator', icon: Server, category: 'Engine', status: 'encrypted' },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '2', target: '1', animated: true, style: { stroke: '#60a5fa', strokeWidth: 2, filter: 'drop-shadow(0 0 5px rgba(96, 165, 250, 0.4))' } },
  { id: 'e1-3', source: '3', target: '1', animated: true, style: { stroke: '#60a5fa', strokeWidth: 2, filter: 'drop-shadow(0 0 5px rgba(96, 165, 250, 0.4))' } },
  { id: 'e2-4', source: '1', target: '4', animated: true, style: { stroke: '#c084fc', strokeWidth: 2, strokeDasharray: '5 5' }, label: 'DP-Tuned Stream' },
];

export default function NodeMap() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <GlassCard className="h-[400px] flex flex-col p-0 overflow-hidden relative group">
      <div className="absolute top-6 left-8 z-10">
        <div className="flex items-center gap-2">
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }} 
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-emerald-500" 
          />
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-widest">Mesh Topology</h3>
        </div>
        <p className="text-xs text-slate-500 font-medium">Live Cryptographic Handshakes</p>
      </div>
      
      <div className="absolute top-6 right-8 z-10 flex gap-2">
        <div className="px-3 py-1 bg-slate-900/60 border border-ghost-border rounded-full text-[10px] font-bold text-slate-400">
          NODES: 4
        </div>
        <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-bold text-emerald-400">
          HEALTH: 100%
        </div>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        className="bg-transparent h-full w-full"
      >
        <Background color="rgba(255,255,255,0.03)" gap={20} size={1} />
        <Controls className="!bg-slate-900/80 !border-ghost-border !fill-slate-400 !rounded-lg !m-4" />
      </ReactFlow>

      {/* Decorative Gradient Overlays */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/40 to-transparent pointer-events-none" />
    </GlassCard>
  );
}
