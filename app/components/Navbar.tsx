'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  balance: string;
}

export default function Navbar({ balance }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-[#111727]/80 border-b border-white/[0.08]">
        <div className="px-4 md:px-8 py-3.5">
          <div className="flex items-center justify-between w-full">
            {/* Logo */}
            <Link href="/" className="flex items-center" onClick={(e) => { if (window.innerWidth < 1024) { window.location.href = '/'; e.preventDefault(); } }}>
              <img 
                src="https://ogpu-site.vercel.app/Images/relay-white.png" 
                alt="Relay"
                style={{ height: '28px', width: 'auto' }}
                className="md:h-8 object-contain opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              <Link 
                href="/" 
                className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 transition-all ${
                  isActive('/') 
                    ? 'text-white bg-white/[0.08]' 
                    : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <span className="text-base">⚡</span>
                Playground
              </Link>
              
              <Link 
                href="/Profilespage" 
                className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 transition-all ${
                  isActive('/Profilespage') 
                    ? 'text-white bg-white/[0.08]' 
                    : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <span className="text-base">👤</span>
                Profile
              </Link>

              <Link 
                href="/Keyspage" 
                className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 transition-all ${
                  isActive('/Keyspage') 
                    ? 'text-white bg-white/[0.08]' 
                    : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <span className="text-base">🔑</span>
                Keys
              </Link>

              <Link 
                href="/Usagepage" 
                className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 transition-all ${
                  isActive('/Usagepage') 
                    ? 'text-white bg-white/[0.08]' 
                    : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <span className="text-base">📊</span>
                Usage
              </Link>

              <Link 
                href="/Creditspage" 
                className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 transition-all ${
                  isActive('/Creditspage') 
                    ? 'text-white bg-white/[0.08]' 
                    : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <span className="text-base">⚡</span>
                Credits
              </Link>

              <a 
                href="https://opengpu-network.gitbook.io/relay/" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white hover:bg-white/[0.05] rounded-lg transition-all flex items-center gap-2"
              >
                <span className="text-base">📚</span>
                Docs
              </a>
              
              <Link 
                href="/Contactpage" 
                className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 transition-all ${
                  isActive('/Contactpage') 
                    ? 'text-white bg-white/[0.08]' 
                    : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <span className="text-base">💬</span>
                Contact
              </Link>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {/* Balance - Desktop */}
              <div className="hidden md:block text-sm font-medium text-white/80">{balance}</div>
              
              {/* User Avatar - Desktop */}
              <div className="hidden md:flex w-9 h-9 rounded-full bg-gradient-to-br from-[#ffbc36] to-[#ff9d36] items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-white/60 hover:text-white transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="absolute right-0 top-[57px] bottom-0 w-80 max-w-[85vw] bg-[#0a0e1a] border-l border-white/[0.08] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 space-y-2">
              {/* User Info */}
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-white/[0.08]">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ffbc36] to-[#ff9d36] flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Account</div>
                  <div className="text-xs text-white/60">Balance: {balance}</div>
                </div>
              </div>

              {/* Navigation Links */}
              <Link 
                href="/" 
                className={`block px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                  isActive('/') 
                    ? 'text-white bg-white/[0.08]' 
                    : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">⚡</span>
                  <span>Playground</span>
                </div>
              </Link>
              
              <Link 
                href="/Profilespage" 
                className={`block px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                  isActive('/Profilespage') 
                    ? 'text-white bg-white/[0.08]' 
                    : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">👤</span>
                  <span>Profile</span>
                </div>
              </Link>

              <Link 
                href="/Keyspage" 
                className={`block px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                  isActive('/Keyspage') 
                    ? 'text-white bg-white/[0.08]' 
                    : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">🔑</span>
                  <span>API Keys</span>
                </div>
              </Link>

              <Link 
                href="/Usagepage" 
                className={`block px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                  isActive('/Usagepage') 
                    ? 'text-white bg-white/[0.08]' 
                    : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">📊</span>
                  <span>Usage</span>
                </div>
              </Link>

              <Link 
                href="/Creditspage" 
                className={`block px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                  isActive('/Creditspage') 
                    ? 'text-white bg-white/[0.08]' 
                    : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">⚡</span>
                  <span>Credits</span>
                </div>
              </Link>

              <a 
                href="https://opengpu-network.gitbook.io/relay/" 
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3 text-sm font-medium text-white/60 hover:text-white hover:bg-white/[0.05] rounded-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">📚</span>
                  <span>Documentation</span>
                </div>
              </a>
              
              <Link 
                href="/Contactpage" 
                className={`block px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                  isActive('/Contactpage') 
                    ? 'text-white bg-white/[0.08]' 
                    : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">💬</span>
                  <span>Contact Sales</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}