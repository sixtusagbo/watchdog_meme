'use client';

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface NeonTextProps {
  children: ReactNode;
  color?: 'blue' | 'purple' | 'pink' | 'green' | 'yellow';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  animate?: boolean;
  className?: string;
}

export default function NeonText({
  children,
  color = 'blue',
  size = 'md',
  animate = true,
  className = ''
}: NeonTextProps) {
  const colorClasses = {
    blue: 'text-neon-blue',
    purple: 'text-neon-purple',
    pink: 'text-neon-pink',
    green: 'text-neon-green',
    yellow: 'text-neon-yellow'
  };
  
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl'
  };
  
  const classes = `neon-text font-bold ${colorClasses[color]} ${sizeClasses[size]} ${className}`;
  
  if (animate) {
    return (
      <motion.span
        className={classes}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ 
          scale: 1.05,
          textShadow: [
            "0 0 5px currentColor",
            "0 0 10px currentColor, 0 0 20px currentColor",
            "0 0 5px currentColor"
          ]
        }}
      >
        {children}
      </motion.span>
    );
  }
  
  return (
    <span className={classes}>
      {children}
    </span>
  );
}
