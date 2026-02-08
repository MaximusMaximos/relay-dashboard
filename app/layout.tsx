import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  variable: "--font-inter", 
  subsets: ["latin"] 
});

export const metadata: Metadata = {
  title: "OGPU | A Datacenter Without Walls",
  description:
    "OGPU routes AI workloads across global GPU capacity pools without splitting tasks. Faster, cheaper and more reliable compute for inference, training, RAG and agents.",

  // ★ MAIN DOMAIN
  metadataBase: new URL("https://ogpunetwork.com"),
  alternates: { canonical: "https://ogpunetwork.com" },

  // FAVICONS
  icons: {
    icon: [
      { url: "/favicon/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon/favicon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/favicon/favicon.png", sizes: "180x180" }],
    shortcut: "/favicon/favicon.png",
  },

  // OG + TWITTER SHARE RICH PREVIEW
  openGraph: {
    title: "OGPU | A Datacenter Without Walls",
    description:
      "The routing layer for AI compute. Execute workloads across clouds, data centers and independent GPU operators with automatic failover and job integrity.",
    url: "https://ogpunetwork.com",
    siteName: "OGPU Network",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },

  twitter: {
    card: "summary_large_image",
    title: "OGPU | A Datacenter Without Walls",
    description: "Run AI workloads globally with automatic routing and 60–80% lower cost.",
    images: ["/og-image.jpg"],
  },

  // 🔍 SEO + Relevancy Signals
  keywords: [
    "OGPU",
    "OpenGPU",
    "GPU compute network",
    "AI compute routing",
    "Decentralized GPUs",
    "GPU cloud alternative",
    "RAG compute",
    "H100 compute",
    "A100 compute",
    "global AI workload routing",
    "distributed inference",
    "LLM hosting GPUs",
    "AI model runtime",
    "AI training GPUs",
    "multi-region GPU compute",
    "agent compute infrastructure"
  ],

  // 🟢 GOOGLE + STANDARD ROBOTS DIRECTIVES (PATCHED)
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,

    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}