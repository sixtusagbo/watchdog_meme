import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Watchdog Meme - The Ultimate Web3 Meme Platform",
    template: "%s | Watchdog Meme",
  },
  description:
    "The ultimate destination for Watchdog memes with cutting-edge web3 design, dynamic galleries, and cyberpunk aesthetics. Stay vigilant, stay memeing!",
  keywords: [
    "watchdog",
    "meme",
    "web3",
    "crypto",
    "cyberpunk",
    "neon",
    "gallery",
    "blockchain",
    "vigilant",
    "community",
  ],
  authors: [{ name: "Watchdog Community" }],
  creator: "Watchdog Community",
  publisher: "Watchdog Meme",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://thewatchdog.xyz"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Watchdog Meme - The Ultimate Web3 Meme Platform",
    description:
      "The ultimate destination for Watchdog memes with cutting-edge web3 design, dynamic galleries, and cyberpunk aesthetics. Stay vigilant, stay memeing!",
    url: "https://thewatchdog.xyz",
    siteName: "Watchdog Meme",
    images: [
      {
        url: "/images/watchdog/1.jpeg",
        width: 1200,
        height: 630,
        alt: "Watchdog Meme - Stay Vigilant",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Watchdog Meme - The Ultimate Web3 Meme Platform",
    description:
      "The ultimate destination for Watchdog memes with cutting-edge web3 design, dynamic galleries, and cyberpunk aesthetics. Stay vigilant, stay memeing!",
    images: ["/images/watchdog/1.jpeg"],
    creator: "@watchdog_meme",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Watchdog Meme",
    description:
      "The ultimate destination for Watchdog memes with cutting-edge web3 design, dynamic galleries, and cyberpunk aesthetics. Stay vigilant, stay memeing!",
    url: "https://thewatchdog.xyz",
    image: "https://thewatchdog.xyz/images/watchdog/1.jpeg",
    author: {
      "@type": "Organization",
      name: "Watchdog Community",
    },
    publisher: {
      "@type": "Organization",
      name: "Watchdog Meme",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://thewatchdog.xyz/gallery",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
