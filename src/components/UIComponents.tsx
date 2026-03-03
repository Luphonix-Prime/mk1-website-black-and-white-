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
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 shadow-2xl hover:border-white/20 transition-colors duration-500",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const NeonButton: React.FC<{
  children: React.ReactNode;
  variant?: 'white' | 'dark' | 'outline' | 'ghost';
  className?: string;
  onClick?: () => void;
}> = ({ children, variant = 'white', className, onClick }) => {
  const variants = {
    white: "bg-white text-black hover:bg-white/90",
    dark: "bg-[#1A1A1A] text-white hover:bg-[#2A2A2A] border border-white/10",
    outline: "bg-white/5 text-white border border-white/10 hover:bg-white/10 backdrop-blur-md",
    ghost: "bg-transparent text-white hover:bg-white/5",
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "px-8 py-3 rounded-xl transition-all duration-300 font-bold tracking-widest text-[11px] uppercase flex items-center justify-center gap-2",
        variants[variant],
        className
      )}
    >
      {children}
    </button>
  );
};
