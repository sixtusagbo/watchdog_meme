'use client';

import { motion } from "framer-motion";
import { ReactNode, useRef, useState } from "react";

interface HologramCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export default function HologramCard({ 
  children, 
  className = '',
  intensity = 0.5
}: HologramCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${(mousePosition.y - 150) * intensity * 0.1}deg) rotateY(${(mousePosition.x - 150) * intensity * 0.1}deg)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        transition: 'transform 0.1s ease-out'
      }}
    >
      {/* Hologram scanning lines */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-blue/20 to-transparent"
          animate={{
            y: ['-100%', '100%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            height: '20%',
            filter: 'blur(1px)'
          }}
        />
      </div>

      {/* Hologram interference */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 212, 255, 0.1) 2px,
              rgba(0, 212, 255, 0.1) 4px
            )
          `
        }}
      />

      {/* Hologram glow effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none border border-neon-blue/30 rounded-lg"
        animate={{
          boxShadow: [
            '0 0 20px rgba(0, 212, 255, 0.3)',
            '0 0 40px rgba(0, 212, 255, 0.6)',
            '0 0 20px rgba(0, 212, 255, 0.3)'
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Mouse follow light */}
      {isHovered && (
        <motion.div
          className="absolute pointer-events-none rounded-full"
          style={{
            left: mousePosition.x - 50,
            top: mousePosition.y - 50,
            width: 100,
            height: 100,
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%)',
            filter: 'blur(20px)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Content with hologram effect */}
      <motion.div
        className="relative z-10"
        animate={{
          filter: [
            'hue-rotate(0deg) brightness(1)',
            'hue-rotate(5deg) brightness(1.1)',
            'hue-rotate(0deg) brightness(1)'
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {children}
      </motion.div>

      {/* Corner accents */}
      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-neon-blue/60"></div>
      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-neon-blue/60"></div>
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-neon-blue/60"></div>
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-neon-blue/60"></div>
    </motion.div>
  );
}
