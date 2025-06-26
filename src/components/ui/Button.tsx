"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "gradient" | "glass";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  href,
  target,
  rel,
  className = "",
  disabled = false,
}: ButtonProps) {
  const baseClasses =
    "font-bold transition-all duration-300 rounded-lg flex items-center justify-center gap-2 relative overflow-hidden";

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    primary:
      "bg-neon-blue text-white hover:bg-neon-blue/80 hover:scale-105 hover:animate-glow",
    secondary:
      "bg-neon-purple text-white hover:bg-neon-purple/80 hover:scale-105 hover:animate-glow",
    gradient: "gradient-border hover:scale-105",
    glass: "glass-effect hover:bg-neon-blue/20 hover:animate-glow",
  };

  const classes = `${baseClasses} ${sizeClasses[size]} ${
    variantClasses[variant]
  } ${className} ${
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
  }`;

  const buttonContent = (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={classes}
      onClick={disabled ? undefined : onClick}>
      {variant === "gradient" && (
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      )}
      {variant !== "gradient" && children}

      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/0 via-neon-purple/20 to-neon-pink/0 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className="inline-block">
        {buttonContent}
      </a>
    );
  }

  return buttonContent;
}
