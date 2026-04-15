'use client';

import React from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  useNodesState, 
  useEdgesState
} from 'reactflow';
import 'reactflow/dist/style.css';
import GlassCard from './GlassCard';
import { motion } from 'framer-motion';
import { nodeTypes, edgeTypes, initialNodes, initialEdges } from './FlowConstants';

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
