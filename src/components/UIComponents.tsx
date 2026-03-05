import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/src/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={cn(
        "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const NeonButton: React.FC<{
  children: React.ReactNode;
  variant?: 'blue' | 'purple' | 'green';
  className?: string;
  onClick?: () => void;
}> = ({ children, variant = 'blue', className, onClick }) => {
  const variants = {
    blue: "border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.3)]",
    purple: "border-purple-500/50 text-purple-400 hover:bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.3)]",
    green: "border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.3)]",
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "px-8 py-3 rounded-full border transition-all duration-300 font-medium tracking-wide uppercase text-sm",
        variants[variant],
        className
      )}
    >
      {children}
    </button>
  );
};
