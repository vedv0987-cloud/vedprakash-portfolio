'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/data/portfolio';
import { scrollToSection } from '@/lib/scroll';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Films', href: '#films' },
  { label: 'Pipeline', href: '#pipeline' },
  { label: 'Stack', href: '#stack' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const lastScrollY = useRef(0);

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    setIsScrolled(currentY > 60);
    setIsHidden(currentY > lastScrollY.current && currentY > 200);
    lastScrollY.current = currentY;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href);
    setIsMobileOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#f8f8f6]/95 backdrop-blur-md border-b border-black/[0.08] py-3.5 shadow-xs text-[#111111]'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5 text-white'
        }`}
        style={{
          transform: isHidden && !isMobileOpen ? 'translateY(-100%)' : 'translateY(0)',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo & Identity */}
          <Link
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-3 group"
          >
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-[10px] font-bold group-hover:scale-105 transition-transform ${
                isScrolled ? 'bg-[#111111] text-white' : 'bg-white text-black'
              }`}
            >
              VP
            </span>
            <div className="flex flex-col">
              <span
                className={`font-bold text-[13px] sm:text-[14px] tracking-tight uppercase leading-none transition-colors ${
                  isScrolled ? 'text-[#111111]' : 'text-white'
                }`}
              >
                Vedprakash Vishwakarma
              </span>
              <span
                className={`text-[10px] tracking-widest uppercase font-mono mt-0.5 transition-colors ${
                  isScrolled ? 'text-[#8e8e93]' : 'text-white/70'
                }`}
              >
                Creative AI Lead · Mumbai
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav
            className={`hidden lg:flex items-center gap-7 text-[12px] font-mono uppercase tracking-widest transition-colors ${
              isScrolled ? 'text-[#666664]' : 'text-white/80'
            }`}
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`transition-colors py-1 cursor-pointer ${
                  isScrolled ? 'hover:text-[#111111]' : 'hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* External Action Links & Live Clock */}
          <div className="hidden sm:flex items-center gap-3">
            {currentTime && (
              <span
                className={`hidden xl:inline-flex items-center gap-1.5 text-[11px] font-mono pr-2 transition-colors ${
                  isScrolled ? 'text-[#8e8e93]' : 'text-white/70'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                MUMBAI · {currentTime} IST
              </span>
            )}

            <a
              href={siteConfig.behance}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[12px] font-mono uppercase tracking-wider font-semibold transition-colors px-3.5 py-1.5 rounded-full ${
                isScrolled
                  ? 'text-[#111111] hover:bg-black/[0.05] border border-black/[0.15]'
                  : 'text-white hover:bg-white/15 border border-white/25 backdrop-blur-md'
              }`}
            >
              Behance ↗
            </a>

            <a
              href={siteConfig.portfolioDrive}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[12px] font-mono uppercase tracking-wider font-semibold px-4 py-1.5 rounded-full shadow-xs transition-colors ${
                isScrolled
                  ? 'bg-[#111111] text-white hover:bg-black'
                  : 'bg-white text-black hover:bg-[#e5e5e0]'
              }`}
            >
              Drive Vault ↗
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileOpen((p) => !p)}
            className={`lg:hidden p-2 cursor-pointer transition-colors ${
              isScrolled ? 'text-[#111111]' : 'text-white'
            }`}
            aria-label="Toggle Menu"
          >
            <span className="text-xs font-mono font-bold tracking-widest uppercase">
              {isMobileOpen ? '✕ CLOSE' : '☰ MENU'}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 bg-[#0c0c0e] text-white pt-28 px-8 flex flex-col justify-between pb-12 lg:hidden"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item, i) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-3xl font-light tracking-tight text-white hover:italic transition-all flex items-baseline gap-4 cursor-pointer"
                >
                  <span className="font-mono text-xs text-[#8e8e93]">0{i + 1}</span>
                  <span>{item.label}</span>
                </a>
              ))}
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col gap-4">
              <div className="flex gap-4">
                <a
                  href={siteConfig.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 text-center rounded-full bg-white text-black text-xs font-mono uppercase tracking-wider font-semibold"
                >
                  Behance ↗
                </a>
                <a
                  href={siteConfig.portfolioDrive}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 text-center rounded-full border border-white/20 text-white text-xs font-mono uppercase tracking-wider font-semibold"
                >
                  Drive Archive ↗
                </a>
              </div>
              <p className="text-xs font-mono text-[#8e8e93] text-center">
                MUMBAI · {currentTime} IST · AVAILABLE FOR COMMISSIONS
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
