'use client';

import { usePathname } from 'next/navigation';
import { User } from 'lucide-react';

interface NavbarProps {
  balance: string;
}

export default function Navbar({ balance }: NavbarProps) {
  const pathname = usePathname();
  
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-[#111727]/80 border-b border-white/[0.08]">
      <div className="px-8 py-3.5">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="https://ogpu-site.vercel.app/Images/relay-white.png" 
              alt="Relay"
              style={{ height: '32px', width: 'auto' }}
              className="object-contain opacity-90"
            />
          </div>
          
          {/* Main Navigation - Centered */}
          <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
            <a 
              href="/" 
              className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 transition-all ${
                pathname === '/' 
                  ? 'text-white bg-white/[0.08]' 
                  : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <span className="text-base">✨</span>
              Playground
            </a>
            <a 
              href="/Profilespage" 
              className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 transition-all ${
                pathname === '/Profilespage' 
                  ? 'text-white bg-white/[0.08]' 
                  : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <span className="text-base">👤</span>
              Profile
            </a>
            <a 
              href="/Keyspage" 
              className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 transition-all ${
                pathname === '/Keyspage' 
                  ? 'text-white bg-white/[0.08]' 
                  : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <span className="text-base">🔑</span>
              Keys
            </a>
            <a 
              href="/Usagepage" 
              className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 transition-all ${
                pathname === '/Usagepage' 
                  ? 'text-white bg-white/[0.08]' 
                  : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <span className="text-base">📊</span>
              Usage
            </a>
            <a 
              href="/Creditspage" 
              className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 transition-all ${
                pathname === '/Creditspage' 
                  ? 'text-white bg-white/[0.08]' 
                  : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <span className="text-base">💳</span>
              Credits
            </a>
            <a 
              href="https://opengpu-network.gitbook.io/relay/" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white hover:bg-white/[0.05] rounded-lg transition-all flex items-center gap-2"
            >
              <span className="text-base">📚</span>
              Docs
            </a>
            <a 
              href="/Contactpage" 
              className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 transition-all ${
                pathname === '/Contactpage' 
                  ? 'text-white bg-white/[0.08]' 
                  : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <span className="text-base">💬</span>
              Contact
            </a>
          </div>

          {/* Right side - Balance & User */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#4ade7d]/10 backdrop-blur-xl border border-[#4ade7d]/20 rounded-lg">
              <div className="w-1.5 h-1.5 rounded-full bg-[#4ade7d] animate-pulse" />
              <span className="text-sm font-semibold text-[#4ade7d] tracking-tight">{balance}</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#ffbc36] to-[#ff9d36] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-lg shadow-[#ffbc36]/20">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}