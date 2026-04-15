'use client';

import React, { useEffect, useState } from 'react';
import { Card, ProgressCircle, Text, Metric, Flex, BadgeDelta, Tracker } from '@tremor/react';
import { motion, AnimatePresence } from 'framer-motion';

const decayData = [
  { color: 'emerald', tooltip: 'Safe Margin' },
  { color: 'emerald', tooltip: 'Safe Margin' },
  { color: 'emerald', tooltip: 'Safe Margin' },
  { color: 'emerald', tooltip: 'Safe Margin' },
  { color: 'yellow', tooltip: 'Warning Threshold' },
  { color: 'yellow', tooltip: 'Warning Threshold' },
  { color: 'rose', tooltip: 'High Usage' },
];

export default function BudgetGauge() {
  const [epsilon, setEpsilon] = useState(2.8);
  const maxEpsilon = 5.0;

  useEffect(() => {
    const interval = setInterval(() => {
      setEpsilon((prev) => {
        const decay = Math.random() * 0.05;
        const next = prev + decay;
        return next > maxEpsilon ? 2.8 : parseFloat(next.toFixed(3));
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const percentage = Math.round((epsilon / maxEpsilon) * 100);
  const isCritical = percentage > 80;
  
  return (
    <Card className="bg-ghost-panel backdrop-blur-xl border border-ghost-border p-8 !rounded-2xl ring-0 shadow-2xl relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px] transition-opacity duration-700 group-hover:opacity-100 opacity-50`} />
      
      <Flex alignItems="start">
        <div className="truncate">
          <Text className="text-slate-400 font-semibold tracking-wide uppercase text-[10px]">Differential Privacy Budget</Text>
          <AnimatePresence mode="wait">
            <motion.div
              key={epsilon}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-baseline gap-1 mt-1"
            >
              <span className="text-3xl font-bold text-slate-50 font-mono">ε = {epsilon.toFixed(3)}</span>
              <span className="text-slate-500 text-xs font-medium">/ {maxEpsilon}</span>
            </motion.div>
          </AnimatePresence>
        </div>
        <BadgeDelta 
          deltaType={isCritical ? "moderateDecrease" : "moderateIncrease"} 
          className={`rounded-full px-3 py-1 ${isCritical ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}
        >
          {isCritical ? "Critical" : "Secure"}
        </BadgeDelta>
      </Flex>

      <div className="mt-10 flex items-center gap-10">
        <div className="relative">
          <ProgressCircle 
            value={percentage} 
            size="xl" 
            color={isCritical ? 'rose' : percentage > 60 ? 'yellow' : 'emerald'}
            className="drop-shadow-glow transition-all duration-1000"
          >
            <div className="flex flex-col items-center">
              <span className="text-lg text-slate-50 font-bold">{percentage}%</span>
              <span className="text-[10px] text-slate-500 uppercase font-bold">Limit</span>
            </div>
          </ProgressCircle>
          {isCritical && (
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-rose-500/20 blur-xl"
            />
          )}
        </div>

        <div className="flex-1 space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center group/item">
              <Text className="text-slate-400 font-medium group-hover/item:text-slate-300 transition-colors">Federated Queries</Text>
              <Text className="text-slate-100 font-mono font-bold">14,293</Text>
            </div>
            <div className="w-full h-[1px] bg-gradient-to-r from-ghost-border to-transparent" />
            <div className="flex justify-between items-center group/item">
              <Text className="text-slate-400 font-medium group-hover/item:text-slate-300 transition-colors">Synthetic Drifts</Text>
              <Text className="text-slate-100 font-mono font-bold">2,045</Text>
            </div>
          </div>
          
          <div className="pt-2">
            <Flex justifyContent="between" alignItems="center" className="mb-3">
              <Text className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Handshake Health (Last 24h)</Text>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </Flex>
            <Tracker data={decayData} className="w-full h-3" />
          </div>
        </div>
      </div>
    </Card>
  );
}
