import React from 'react';
import { 
  Activity, 
  Database, 
  Network, 
  Shield, 
  Settings 
} from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 glass-panel border-l-0 border-y-0 rounded-none z-50 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gradient flex items-center gap-2">
          <Database className="w-6 h-6 text-blue-500" />
          GhostPipe
        </h1>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">Federated Mesh</p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20 transition-all font-medium">
          <Activity className="w-5 h-5" />
          Observability
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-lg transition-all">
          <Network className="w-5 h-5" />
          Node Topology
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-lg transition-all">
          <Shield className="w-5 h-5" />
          Privacy Models
        </a>
      </nav>

      <div className="p-4 border-t border-ghost-border mt-auto">
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-lg transition-all">
          <Settings className="w-5 h-5" />
          System Config
        </a>
      </div>
    </aside>
  );
}
