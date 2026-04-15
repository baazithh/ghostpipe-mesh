'use client';

import React from 'react';
import { 
  Activity, 
  Database, 
  Network, 
  Shield, 
  Settings,
  ChevronRight
} from 'lucide-react';

const navItems = [
  { icon: Activity, label: 'Observability', active: true },
  { icon: Network, label: 'Node Topology', active: false },
  { icon: Shield, label: 'Privacy Models', active: false },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-950/40 backdrop-blur-xl border-r border-ghost-border z-50 flex flex-col">
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gradient flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shadow-ghost-glow">
            <Database className="w-6 h-6 text-blue-400" />
          </div>
          GhostPipe
        </h1>
        <div className="flex items-center gap-2 mt-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold">Mesh Network v0.1</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-1">
        {navItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={`flex items-center justify-between group px-4 py-3 rounded-xl transition-all duration-300 ${
              item.active 
                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-sm' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${item.active ? 'text-blue-400' : ''}`} />
              <span className="font-medium">{item.label}</span>
            </div>
            {item.active && <ChevronRight className="w-4 h-4" />}
          </a>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-ghost-border/50">
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-xl transition-all group">
          <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
          <span className="font-medium">System Config</span>
        </a>
      </div>
    </aside>
  );
}
