"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Copy, ExternalLink, Twitter, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [copied, setCopied] = useState(false);

  const contractAddress = "7z7rjKhwZh7TkCPSpiJqC95AVFaMkbLAkKBbYiJQpump";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="min-h-screen bg-crypto-dark cyber-grid relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-neon-blue/20 rounded-full blur-xl animate-pulse-slow"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-neon-purple/20 rounded-full blur-xl animate-bounce-slow"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-neon-pink/20 rounded-full blur-xl animate-float"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl font-bold neon-text text-neon-blue">
            WATCHDOG
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex gap-4">
            <Link
              href="/gallery"
              className="glass-effect px-6 py-2 rounded-lg hover:bg-neon-blue/20 transition-all duration-300 hover:animate-glow">
              Gallery
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8">
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-6xl lg:text-8xl font-black neon-text text-transparent bg-clip-text bg-neon-gradient animate-gradient">
                THE
                <br />
                WATCHDOG
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-xl lg:text-2xl text-gray-300 max-w-lg">
                The meme that watches over your crypto portfolio.
                <span className="text-neon-blue">
                  {" "}
                  Always vigilant, always watching.
                </span>
              </motion.p>
            </div>

            {/* Contract Address */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="glass-effect p-4 rounded-lg space-y-2">
              <p className="text-sm text-gray-400">Contract Address:</p>
              <div className="flex items-center gap-2">
                <code className="text-neon-green font-mono text-sm break-all">
                  {contractAddress}
                </code>
                <button
                  onClick={copyToClipboard}
                  className="p-2 hover:bg-neon-blue/20 rounded transition-colors"
                  title="Copy to clipboard">
                  <Copy
                    size={16}
                    className={copied ? "text-neon-green" : "text-gray-400"}
                  />
                </button>
              </div>
              {copied && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-neon-green text-sm">
                  Copied to clipboard!
                </motion.p>
              )}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="flex flex-wrap gap-4">
              <a
                href="https://pump.fun/coin/7z7rjKhwZh7TkCPSpiJqC95AVFaMkbLAkKBbYiJQpump"
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-border px-8 py-4 rounded-lg font-bold text-lg hover:scale-105 transition-transform duration-300 flex items-center gap-2 relative z-10">
                <span className="relative z-10">Buy on Pump.fun</span>
                <ExternalLink size={20} className="relative z-10" />
              </a>
              <Link
                href="/gallery"
                className="glass-effect px-8 py-4 rounded-lg font-bold text-lg hover:bg-neon-purple/20 transition-all duration-300 hover:animate-glow">
                View Memes
              </Link>
            </motion.div>
          </motion.div>

          {/* Right side - Main meme image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-neon-blue/30 rounded-full blur-2xl animate-pulse-slow"></div>
              <Image
                src="/dog-images/dog-main.jpeg"
                alt="Watchdog Meme"
                width={500}
                height={500}
                className="relative z-10 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500 animate-float"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Social Links Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-8 neon-text text-neon-purple">
            Join the Pack
          </h2>
          <div className="flex justify-center gap-8 flex-wrap">
            <a
              href="https://twitter.com/watchdog_meme"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-effect p-6 rounded-xl hover:bg-neon-blue/20 transition-all duration-300 hover:animate-glow group">
              <Twitter
                size={32}
                className="text-neon-blue group-hover:scale-110 transition-transform"
              />
              <p className="mt-2 text-sm">Twitter</p>
            </a>
            <a
              href="https://t.me/watchdog_meme"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-effect p-6 rounded-xl hover:bg-neon-green/20 transition-all duration-300 hover:animate-glow group">
              <MessageCircle
                size={32}
                className="text-neon-green group-hover:scale-110 transition-transform"
              />
              <p className="mt-2 text-sm">Telegram</p>
            </a>
          </div>
        </motion.div>

        {/* Meme Examples Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-20">
          <h2 className="text-4xl font-bold text-center mb-12 neon-text text-neon-pink">
            Legendary Memes
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="glass-effect p-6 rounded-xl hover:bg-neon-purple/10 transition-all duration-300">
              <div className="relative mb-4">
                <Image
                  src="/dog-images/1.jpeg"
                  alt="Watchdog Meme 1"
                  width={400}
                  height={300}
                  className="rounded-lg w-full object-cover"
                />
              </div>
              <div className="space-y-2">
                <p className="text-neon-yellow font-bold">
                  Garri looking at you after money finish
                </p>
                <p className="text-gray-300 italic">
                  "By 9 we go on Gen make e last"
                </p>
              </div>
            </div>
            <div className="glass-effect p-6 rounded-xl hover:bg-neon-purple/10 transition-all duration-300">
              <div className="relative mb-4">
                <Image
                  src="/dog-images/2.jpeg"
                  alt="Watchdog Meme 2"
                  width={400}
                  height={300}
                  className="rounded-lg w-full object-cover"
                />
              </div>
              <div className="space-y-2">
                <p className="text-neon-yellow font-bold">
                  Mosquito watching you sleep naked because of heat
                </p>
                <p className="text-gray-300 italic">
                  Your landlord watching you carrying different babes when your
                  rent go soon expire
                </p>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link
              href="/gallery"
              className="gradient-border px-8 py-4 rounded-lg font-bold text-lg hover:scale-105 transition-transform duration-300 inline-flex items-center gap-2 relative">
              <span className="relative z-10">View All Memes</span>
              <ExternalLink size={20} className="relative z-10" />
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-20 border-t border-neon-blue/20 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2024 The Watchdog Meme. Always watching, always memeing.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Visit us at{" "}
            <a
              href="https://thewatchdog.xyz"
              className="text-neon-blue hover:text-neon-purple transition-colors"
              target="_blank"
              rel="noopener noreferrer">
              thewatchdog.xyz
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
