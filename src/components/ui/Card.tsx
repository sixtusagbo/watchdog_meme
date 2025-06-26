'use client';

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  variant?: 'glass' | 'gradient' | 'neon';
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Card({
  children,
  variant = 'glass',
  hover = true,
  className = '',
  onClick
}: CardProps) {
  const baseClasses = "rounded-xl transition-all duration-300 relative overflow-hidden";
  
  const variantClasses = {
    glass: "glass-effect",
    gradient: "gradient-border p-[2px]",
    neon: "border border-neon-blue/50 bg-crypto-dark/80 backdrop-blur-sm"
  };
  
  const hoverClasses = hover ? "hover:scale-105 hover:shadow-2xl cursor-pointer" : "";
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`;
  
  if (variant === 'gradient') {
    return (
      <motion.div
        whileHover={hover ? { scale: 1.02, y: -5 } : {}}
        className={classes}
        onClick={onClick}
      >
        <div className="bg-crypto-dark rounded-xl p-6 h-full">
          {children}
        </div>
        {/* Animated border effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink opacity-0 hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      className={classes}
      onClick={onClick}
    >
      {children}
      
      {/* Hover glow effect */}
      {hover && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-neon-blue/0 via-neon-purple/10 to-neon-pink/0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      )}
    </motion.div>
  );
}
