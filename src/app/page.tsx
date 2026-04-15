'use client';

import BudgetGauge from '@/components/BudgetGauge';
import NodeMap from '@/components/NodeMap';
import SyntheticDataTable from '@/components/SyntheticDataTable';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Zap } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Home() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 max-w-7xl mx-auto pb-20"
    >
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <motion.div variants={item}>
          <div className="flex items-center gap-3 mb-2">
            <div className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded text-[10px] font-bold text-blue-400 uppercase tracking-widest">
              Live Environment
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
              <ShieldCheck className="w-3 h-3" />
              SMPC Verified
            </div>
          </div>
          <h2 className="text-4xl font-black text-slate-100 tracking-tight leading-tight">
            Security & <span className="text-gradient">Mesh Analytics</span>
          </h2>
          <p className="text-slate-400 mt-2 font-medium max-w-xl">
            Real-time observability of federated query patterns, privacy budget consumption, and automated synthetic twin generation.
          </p>
        </motion.div>

        <motion.div variants={item} className="flex gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Avg Latency</span>
            <span className="text-xl font-mono font-bold text-slate-200">24.5ms</span>
          </div>
          <div className="w-[1px] h-10 bg-ghost-border" />
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Throughput</span>
            <span className="text-xl font-mono font-bold text-slate-200">1.2k/s</span>
          </div>
        </motion.div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div variants={item} className="lg:col-span-1">
          <BudgetGauge />
        </motion.div>

        <motion.div variants={item} className="lg:col-span-2">
          <NodeMap />
        </motion.div>
      </div>

      <motion.div variants={item} className="w-full pt-4">
        <SyntheticDataTable />
      </motion.div>
    </motion.div>
  );
}
