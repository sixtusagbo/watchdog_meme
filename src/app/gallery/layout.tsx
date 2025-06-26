import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meme Gallery - Complete Collection of Watchdog Memes",
  description: "Explore the complete collection of Watchdog memes in our dynamic gallery. Download, share, and discover legendary memes with cyberpunk aesthetics.",
  openGraph: {
    title: "Meme Gallery - Complete Collection of Watchdog Memes",
    description: "Explore the complete collection of Watchdog memes in our dynamic gallery. Download, share, and discover legendary memes with cyberpunk aesthetics.",
    images: ["/images/watchdog/1.jpeg"],
  },
  twitter: {
    title: "Meme Gallery - Complete Collection of Watchdog Memes", 
    description: "Explore the complete collection of Watchdog memes in our dynamic gallery. Download, share, and discover legendary memes with cyberpunk aesthetics.",
    images: ["/images/watchdog/1.jpeg"],
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
