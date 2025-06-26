'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Share2, Twitter, MessageCircle, Copy, ExternalLink } from "lucide-react";

interface FloatingActionButtonProps {
  contractAddress: string;
}

export default function FloatingActionButton({ contractAddress }: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const copyContract = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };
  
  const shareActions = [
    {
      icon: Twitter,
      label: "Twitter",
      color: "text-neon-blue",
      href: "https://twitter.com/watchdog_meme",
      action: () => window.open("https://twitter.com/watchdog_meme", "_blank")
    },
    {
      icon: MessageCircle,
      label: "Telegram",
      color: "text-neon-green",
      href: "https://t.me/watchdog_meme",
      action: () => window.open("https://t.me/watchdog_meme", "_blank")
    },
    {
      icon: ExternalLink,
      label: "Pump.fun",
      color: "text-neon-purple",
      href: "https://pump.fun/coin/7z7rjKhwZh7TkCPSpiJqC95AVFaMkbLAkKBbYiJQpump",
      action: () => window.open("https://pump.fun/coin/7z7rjKhwZh7TkCPSpiJqC95AVFaMkbLAkKBbYiJQpump", "_blank")
    },
    {
      icon: Copy,
      label: copied ? "Copied!" : "Copy CA",
      color: copied ? "text-neon-green" : "text-neon-yellow",
      action: copyContract
    }
  ];
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-16 right-0 space-y-3"
          >
            {shareActions.map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                onClick={action.action}
                className="flex items-center gap-3 glass-effect px-4 py-3 rounded-lg hover:bg-neon-blue/20 transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <action.icon size={20} className={`${action.color} group-hover:scale-110 transition-transform`} />
                <span className="text-sm font-medium whitespace-nowrap">{action.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main FAB */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        <Share2 size={24} className="text-white" />
      </motion.button>
      
      {/* Pulsing ring effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-neon-blue/50"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}
