"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Share2, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";

interface MemeData {
  id: number;
  src: string;
  alt: string;
  filename: string;
}

export default function Gallery() {
  const [memeData, setMemeData] = useState<MemeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMeme, setSelectedMeme] = useState<MemeData | null>(null);

  // Fetch memes from API
  const fetchMemes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/memes");
      if (!response.ok) {
        throw new Error("Failed to fetch memes");
      }
      const data = await response.json();
      setMemeData(data.memes);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load memes");
    } finally {
      setLoading(false);
    }
  };

  // Load memes on component mount
  useEffect(() => {
    fetchMemes();
  }, []);

  const downloadImage = async (src: string, filename: string) => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const shareImage = async (meme: MemeData) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Watchdog Meme #${meme.id}`,
          text: "Check out this Watchdog meme from the complete collection!",
          url: window.location.href,
        });
      } catch (error) {
        console.error("Share failed:", error);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-crypto-dark cyber-grid relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-neon-purple/20 rounded-full blur-xl animate-pulse-slow"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-neon-pink/20 rounded-full blur-xl animate-bounce-slow"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-neon-green/20 rounded-full blur-xl animate-float"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-neon-blue hover:text-neon-purple transition-colors">
            <ArrowLeft size={24} />
            <span className="text-xl font-bold">Back to Home</span>
          </Link>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl font-bold neon-text text-neon-pink">
            MEME GALLERY
          </motion.div>
        </div>
      </nav>

      {/* Gallery Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12">
          <h1 className="text-5xl lg:text-7xl font-black neon-text text-transparent bg-clip-text bg-neon-gradient animate-gradient mb-4">
            LEGENDARY MEMES
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            The complete collection of Watchdog memes. Download, share, and
            spread the watch!
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12">
            <RefreshCw
              size={48}
              className="animate-spin mx-auto mb-4 text-neon-blue"
            />
            <p className="text-xl text-gray-300">Loading memes...</p>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12">
            <div className="glass-effect p-8 rounded-xl max-w-md mx-auto">
              <p className="text-xl text-red-400 mb-4">⚠️ {error}</p>
              <button
                onClick={fetchMemes}
                className="px-6 py-3 bg-neon-blue/20 hover:bg-neon-blue/30 rounded-lg transition-colors">
                Try Again
              </button>
            </div>
          </motion.div>
        )}

        {/* Meme Grid */}
        {!loading && !error && memeData.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {memeData.map((meme, index) => (
              <motion.div
                key={meme.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="glass-effect rounded-xl overflow-hidden hover:bg-neon-blue/10 transition-all duration-300 group cursor-pointer"
                onClick={() => setSelectedMeme(meme)}>
                <div className="relative overflow-hidden">
                  <Image
                    src={meme.src}
                    alt={meme.alt}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadImage(meme.src, meme.filename);
                        }}
                        className="p-2 bg-neon-blue/80 rounded-lg hover:bg-neon-blue transition-colors"
                        title="Download">
                        <Download size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          shareImage(meme);
                        }}
                        className="p-2 bg-neon-purple/80 rounded-lg hover:bg-neon-purple transition-colors"
                        title="Share">
                        <Share2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && !error && memeData.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12">
            <div className="glass-effect p-8 rounded-xl max-w-md mx-auto">
              <p className="text-xl text-gray-300 mb-4">No memes found</p>
              <p className="text-gray-400 mb-4">
                Add some images to the public/images/watchdog directory
              </p>
              <button
                onClick={fetchMemes}
                className="px-6 py-3 bg-neon-blue/20 hover:bg-neon-blue/30 rounded-lg transition-colors">
                Refresh
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Modal for selected meme */}
      {selectedMeme && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMeme(null)}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="glass-effect rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <Image
                src={selectedMeme.src}
                alt={selectedMeme.alt}
                width={800}
                height={600}
                className="w-full h-auto rounded-t-xl"
              />
              <button
                onClick={() => setSelectedMeme(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors">
                ✕
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-neon-yellow mb-4 text-center">
                Watchdog Meme #{selectedMeme.id}
              </h3>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() =>
                    downloadImage(selectedMeme.src, selectedMeme.filename)
                  }
                  className="gradient-border px-6 py-3 rounded-lg font-bold flex items-center gap-2 relative">
                  <span className="relative z-10">Download</span>
                  <Download size={20} className="relative z-10" />
                </button>
                <button
                  onClick={() => shareImage(selectedMeme)}
                  className="glass-effect px-6 py-3 rounded-lg font-bold hover:bg-neon-purple/20 transition-all duration-300 flex items-center gap-2">
                  Share
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
