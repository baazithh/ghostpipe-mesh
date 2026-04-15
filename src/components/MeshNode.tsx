import React from 'react';
import { Handle, Position } from 'reactflow';
import { Database, Lock } from 'lucide-react';

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

export default MeshNode;
