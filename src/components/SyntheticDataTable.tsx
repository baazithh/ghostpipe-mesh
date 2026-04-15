'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from './GlassCard';
import { Ghost, ShieldCheck, Activity, Search } from 'lucide-react';

type SyntheticRecord = {
  id: string;
  age: number;
  conditionCode: string;
  treatmentLatency: number;
  privacyScore: number;
  status: 'streaming' | 'cached' | 'syncing';
};

const DUMMY_DATA: SyntheticRecord[] = [
  { id: 'GP-84x9A', age: 45, conditionCode: 'ICD10-E11', treatmentLatency: 14, privacyScore: 98, status: 'streaming' },
  { id: 'GP-22m4B', age: 62, conditionCode: 'ICD10-I10', treatmentLatency: 3, privacyScore: 99, status: 'cached' },
  { id: 'GP-91p7C', age: 34, conditionCode: 'ICD10-J45', treatmentLatency: 28, privacyScore: 97, status: 'streaming' },
  { id: 'GP-44z2D', age: 51, conditionCode: 'ICD10-M54', treatmentLatency: 7, privacyScore: 99, status: 'syncing' },
  { id: 'GP-19k8E', age: 78, conditionCode: 'ICD10-N18', treatmentLatency: 45, privacyScore: 96, status: 'streaming' },
];

export default function SyntheticDataTable() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <GlassCard className="mt-6 border-t border-ghost-border/50 shadow-ghost-glow/5">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Ghost className="w-5 h-5 text-purple-400" />
            <h3 className="text-xl font-bold text-slate-100">Synthetic Twins Engine</h3>
          </div>
          <p className="text-sm text-slate-400 font-medium">Statistically identical cohorts generated with ε-Differential Privacy.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Filter by hash..." 
              className="bg-slate-900/50 border border-ghost-border rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all w-64"
            />
          </div>
          <div className="px-4 py-2 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-xl border border-blue-500/20 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            K-ANONYMITY: 5
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-ghost-border/50 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
              <th className="pb-4 px-4">Ghost Signature</th>
              <th className="pb-4 px-4 text-center">Privacy Score</th>
              <th className="pb-4 px-4">Condition Node</th>
              <th className="pb-4 px-4">Latency</th>
              <th className="pb-4 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {loading ? (
                <motion.tr
                  key="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <td colSpan={5} className="py-8">
                    <div className="space-y-6">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex gap-4 items-center shimmer h-12 w-full rounded-xl" />
                      ))}
                    </div>
                  </td>
                </motion.tr>
              ) : (
                DUMMY_DATA.map((row, index) => (
                  <motion.tr 
                    key={row.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-ghost-border/20 hover:bg-white/[0.02] transition-colors group cursor-pointer"
                  >
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="text-purple-400 font-mono text-xs font-bold group-hover:text-purple-300 transition-colors">{row.id}</span>
                        <span className="text-[10px] text-slate-500 font-medium">Age Proxy: {row.age}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col items-center">
                        <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${row.privacyScore}%` }}
                            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                            className={`h-full ${row.privacyScore > 97 ? 'bg-emerald-500' : 'bg-blue-500'}`}
                          />
                        </div>
                        <span className="text-[10px] text-slate-400 mt-1 font-bold">{row.privacyScore}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-slate-900/80 text-slate-300 rounded-lg text-xs border border-white/5 font-mono">
                        {row.conditionCode}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-300 font-medium">
                      <div className="flex items-center gap-2">
                        <Activity className="w-3 h-3 text-blue-400" />
                        {row.treatmentLatency}d
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          row.status === 'streaming' ? 'bg-emerald-500 animate-pulse' : 
                          row.status === 'syncing' ? 'bg-blue-500' : 'bg-slate-500'
                        }`} />
                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{row.status}</span>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}
