'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from './GlassCard';

type SyntheticRecord = {
  id: string;
  age: number;
  conditionCode: string;
  treatmentLatency: number;
};

const DUMMY_DATA: SyntheticRecord[] = [
  { id: 'T-84x9A', age: 45, conditionCode: 'ICD10-E11', treatmentLatency: 14 },
  { id: 'T-22m4B', age: 62, conditionCode: 'ICD10-I10', treatmentLatency: 3 },
  { id: 'T-91p7C', age: 34, conditionCode: 'ICD10-J45', treatmentLatency: 28 },
  { id: 'T-44z2D', age: 51, conditionCode: 'ICD10-M54', treatmentLatency: 7 },
  { id: 'T-19k8E', age: 78, conditionCode: 'ICD10-N18', treatmentLatency: 45 },
];

export default function SyntheticDataTable() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate generation delay
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <GlassCard className="mt-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold text-slate-200">Synthetic Twins</h3>
          <p className="text-sm text-slate-400">Statistically identical, purely generated.</p>
        </div>
        <div className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-semibold rounded-full border border-purple-500/30">
          K-Anonymity = 5
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-ghost-border/50 text-slate-400">
              <th className="pb-3 px-4 font-medium">Ghost ID</th>
              <th className="pb-3 px-4 font-medium">Synth Age (+/- Variance)</th>
              <th className="pb-3 px-4 font-medium">Condition Code</th>
              <th className="pb-3 px-4 font-medium">Treatment Latency (Days)</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="wait">
              {loading ? (
                // Shimmer Skeleton View
                <motion.tr
                  key="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full"
                >
                  <td colSpan={4} className="py-4">
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <motion.div 
                          key={i}
                          className="h-10 w-full bg-slate-800/50 rounded-md relative overflow-hidden"
                          initial={{ opacity: 0.5 }}
                          animate={{ opacity: 1 }}
                          transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
                        >
                          <motion.div
                            className="absolute inset-0 w-full h-full"
                            style={{
                              background: 'linear-gradient(90deg, transparent 0%, rgba(147, 51, 234, 0.1) 50%, transparent 100%)',
                            }}
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </td>
                </motion.tr>
              ) : (
                // Data View
                DUMMY_DATA.map((row, index) => (
                  <motion.tr 
                    key={row.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-ghost-border/30 hover:bg-slate-800/20 transition-colors"
                  >
                    <td className="py-3 px-4 text-purple-300 font-mono text-xs">{row.id}</td>
                    <td className="py-3 px-4 text-slate-300">{row.age}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-slate-800 text-slate-300 rounded text-xs border border-slate-700">
                        {row.conditionCode}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-300">{row.treatmentLatency}</td>
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
