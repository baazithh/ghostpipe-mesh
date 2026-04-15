'use client';

import React, { useEffect, useState } from 'react';
import { Card, ProgressCircle, Text, Metric, Flex, BadgeDelta, Tracker } from '@tremor/react';

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
    // Simulate real-time decay
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
  
  return (
    <Card className="bg-ghost-panel backdrop-blur-md border border-ghost-border p-6 !rounded-xl ring-0 shadow-lg">
      <Flex alignItems="start">
        <div className="truncate">
          <Text className="text-slate-400 font-medium">Global Privacy Budget</Text>
          <Metric className="truncate text-slate-50">ε = {epsilon.toFixed(3)}</Metric>
        </div>
        <BadgeDelta deltaType={epsilon > 4 ? "moderateDecrease" : "moderateIncrease"} size="sm">
          {epsilon > 4 ? "Critical" : "Stable"}
        </BadgeDelta>
      </Flex>
      <Flex className="mt-6">
        <ProgressCircle 
          value={percentage} 
          size="lg" 
          color={percentage > 80 ? 'rose' : percentage > 60 ? 'yellow' : 'emerald'}
        >
          <span className="text-sm text-slate-300 font-semibold">{percentage}%</span>
        </ProgressCircle>
        <div className="ml-6 flex-1 space-y-4">
          <div>
            <Flex justifyContent="between">
              <Text className="text-slate-400">Total Queries</Text>
              <Text className="text-slate-200">14,293</Text>
            </Flex>
            <Flex justifyContent="between" className="mt-1">
              <Text className="text-slate-400">Synthetic Twins Generated</Text>
              <Text className="text-slate-200">2,045</Text>
            </Flex>
          </div>
          <div>
            <Text className="text-slate-400 mb-2">Recent Handshake Health</Text>
            <Tracker data={decayData} className="mt-2 w-full" />
          </div>
        </div>
      </Flex>
    </Card>
  );
}
