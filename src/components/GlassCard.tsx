'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function GlassCard({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={`glass-panel relative overflow-hidden group ${className.includes('p-') ? '' : 'p-6'} ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
}
