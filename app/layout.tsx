import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  variable: "--font-inter", 
  subsets: ["latin"] 
});

export const metadata: Metadata = {
  title: "Relay | AI Dashboard Demo",
  description: "Access 23+ AI models through a unified dashboard. Demo platform for AI inference and generation.",
  
  metadataBase: new URL("https://relay-dashboard.vercel.app"),
  
  icons: {
    icon: "/favicon.ico",
  },
  
  openGraph: {
    title: "Relay | AI Dashboard Demo",
    description: "Access 23+ AI models through a unified dashboard",
    siteName: "Relay",
  },
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