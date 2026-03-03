import React from 'react';
import { cn } from '../lib/utils';

export const PhoenixLogo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
      >
        <defs>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <path
          d="M12 2L9 7L4 9L9 11L12 16L15 11L20 9L15 7L12 2Z"
          fill="url(#logo-gradient)"
          className="animate-pulse"
        />
        <path
          d="M12 18C12 18 10 20 8 20C6 20 5 19 5 18C5 17 6 16 8 16C10 16 12 18 12 18ZM12 18C12 18 14 20 16 20C18 20 19 19 19 18C19 17 18 16 16 16C14 16 12 18 12 18Z"
          stroke="url(#logo-gradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M2 12C2 12 4 10 6 10M22 12C22 12 20 10 18 10"
          stroke="url(#logo-gradient)"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
