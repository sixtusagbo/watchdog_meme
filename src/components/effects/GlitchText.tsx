'use client';

import { motion } from "framer-motion";
import { ReactNode, useState, useEffect } from "react";

interface GlitchTextProps {
  children: ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  trigger?: 'hover' | 'auto' | 'none';
}

export default function GlitchText({ 
  children, 
  className = '', 
  intensity = 'medium',
  trigger = 'hover'
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  const intensitySettings = {
    low: {
      duration: 0.1,
      frequency: 3000,
      displacement: 1
    },
    medium: {
      duration: 0.2,
      frequency: 2000,
      displacement: 2
    },
    high: {
      duration: 0.3,
      frequency: 1000,
      displacement: 4
    }
  };

  const settings = intensitySettings[intensity];

  useEffect(() => {
    if (trigger === 'auto') {
      const interval = setInterval(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), settings.duration * 1000);
      }, settings.frequency);

      return () => clearInterval(interval);
    }
  }, [trigger, settings]);

  const glitchVariants = {
    normal: {
      x: 0,
      y: 0,
      textShadow: "0 0 0 transparent"
    },
    glitch: {
      x: [0, -settings.displacement, settings.displacement, 0],
      y: [0, settings.displacement, -settings.displacement, 0],
      textShadow: [
        "0 0 0 transparent",
        `${settings.displacement}px 0 #ff0000, -${settings.displacement}px 0 #00ffff`,
        `${-settings.displacement}px 0 #ff0000, ${settings.displacement}px 0 #00ffff`,
        "0 0 0 transparent"
      ],
      transition: {
        duration: settings.duration,
        times: [0, 0.3, 0.7, 1],
        ease: "easeInOut"
      }
    }
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      setIsGlitching(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      setIsGlitching(false);
    }
  };

  return (
    <motion.span
      className={`relative inline-block ${className}`}
      variants={glitchVariants}
      animate={isGlitching ? 'glitch' : 'normal'}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        filter: isGlitching ? 'hue-rotate(90deg) saturate(1.5)' : 'none'
      }}
    >
      {children}
      
      {/* Glitch overlay layers */}
      {isGlitching && (
        <>
          <motion.span
            className="absolute inset-0 text-red-500 opacity-70"
            animate={{
              x: [0, 2, -1, 1, 0],
              clipPath: [
                'inset(0 0 0 0)',
                'inset(20% 0 30% 0)',
                'inset(60% 0 10% 0)',
                'inset(40% 0 40% 0)',
                'inset(0 0 0 0)'
              ]
            }}
            transition={{ duration: settings.duration, ease: "easeInOut" }}
          >
            {children}
          </motion.span>
          
          <motion.span
            className="absolute inset-0 text-cyan-400 opacity-70"
            animate={{
              x: [0, -2, 1, -1, 0],
              clipPath: [
                'inset(0 0 0 0)',
                'inset(10% 0 50% 0)',
                'inset(70% 0 20% 0)',
                'inset(30% 0 50% 0)',
                'inset(0 0 0 0)'
              ]
            }}
            transition={{ duration: settings.duration, ease: "easeInOut", delay: 0.05 }}
          >
            {children}
          </motion.span>
        </>
      )}
    </motion.span>
  );
}
