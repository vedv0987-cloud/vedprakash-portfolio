'use client';

import { useState, useEffect, useCallback } from 'react';
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
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

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
    setIsScrolled(window.scrollY > 40);
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
            ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-white/10 py-4 shadow-2xl'
            : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent py-6'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="flex items-center gap-3 group">
            <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-mono text-[11px] font-bold group-hover:scale-105 transition-transform">
              VP
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-[13px] sm:text-[14px] text-white tracking-tight uppercase leading-none">
                Vedprakash Vishwakarma
              </span>
              <span className="text-[10px] tracking-widest text-white/50 uppercase font-mono mt-1">
                Creative AI Lead · Mumbai
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-[11px] font-mono uppercase tracking-widest text-white/60">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="hover:text-white transition-colors py-2 cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden sm:flex items-center gap-4">
            {currentTime && (
              <span className="hidden xl:flex items-center gap-2 text-[10px] font-mono text-white/40 pr-4 border-r border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                BOM · {currentTime}
              </span>
            )}
            <a href={siteConfig.behance} target="_blank" rel="noopener noreferrer" className="text-[11px] font-mono uppercase tracking-widest text-white hover:text-[#06b6d4] transition-colors font-bold px-2">
              Behance ↗
            </a>
            <a href={siteConfig.portfolioDrive} target="_blank" rel="noopener noreferrer" className="text-[11px] font-mono uppercase tracking-widest bg-white text-black hover:bg-gray-200 transition-colors font-bold px-5 py-2.5 rounded-full">
              Drive Vault ↗
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMobileOpen((p) => !p)} className="lg:hidden text-white font-mono text-xs tracking-widest uppercase p-2">
            {isMobileOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#050505] text-white pt-28 px-8 flex flex-col justify-between pb-12 lg:hidden"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item, i) => (
                <a key={item.href} href={item.href} onClick={(e) => handleNavClick(e, item.href)} className="text-3xl font-light text-white flex items-baseline gap-4">
                  <span className="font-mono text-xs text-white/40">0{i + 1}</span>
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
