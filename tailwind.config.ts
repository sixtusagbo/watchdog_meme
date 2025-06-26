import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Web3 themed colors
        neon: {
          blue: "#00D4FF",
          purple: "#8B5CF6",
          pink: "#F472B6",
          green: "#10B981",
          yellow: "#F59E0B",
        },
        crypto: {
          gold: "#FFD700",
          silver: "#C0C0C0",
          dark: "#0F0F23",
          darker: "#050505",
        }
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'gradient': 'gradient 3s ease infinite',
      },
      keyframes: {
        glow: {
          '0%': { 
            boxShadow: '0 0 5px #00D4FF, 0 0 10px #00D4FF, 0 0 15px #00D4FF',
          },
          '100%': { 
            boxShadow: '0 0 10px #00D4FF, 0 0 20px #00D4FF, 0 0 30px #00D4FF',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)',
        'neon-gradient': 'linear-gradient(45deg, #00D4FF, #8B5CF6, #F472B6, #10B981)',
      },
      backdropBlur: {
        xs: '2px',
      },
      fontFamily: {
        'cyber': ['Orbitron', 'monospace'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
