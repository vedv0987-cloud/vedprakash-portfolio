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
    setIsScrolled(window.scrollY > 20);
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
            ? 'bg-white/80 backdrop-blur-2xl border-b border-black/[0.08] py-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]'
            : 'bg-white/60 backdrop-blur-lg border-b border-black/[0.04] py-4'
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo / Name */}
          <Link href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="flex items-center gap-3 group">
            <span className="w-8 h-8 rounded-full bg-[#1d1d1f] text-white flex items-center justify-center font-mono text-[11px] font-bold group-hover:scale-105 transition-transform shadow-xs">
              VP
            </span>
            <div className="flex flex-col">
              <span className="font-semibold text-[13px] sm:text-[14px] text-[#1d1d1f] tracking-tight leading-none">
                Vedprakash Vishwakarma
              </span>
              <span className="text-[10px] tracking-wider text-[#86868b] uppercase font-mono mt-0.5">
                Creative AI Lead · Mumbai
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7 text-[12px] font-medium text-[#6e6e73]">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="hover:text-[#0071e3] transition-colors py-1.5 cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {currentTime && (
              <span className="hidden xl:flex items-center gap-1.5 text-[11px] font-mono text-[#86868b] pr-3 border-r border-black/[0.08]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                BOM · {currentTime}
              </span>
            )}
            <a
              href={siteConfig.behance}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-medium text-[#1d1d1f] hover:text-[#0071e3] transition-colors px-3 py-1.5 rounded-full hover:bg-black/[0.04]"
            >
              Behance ↗
            </a>
            <a
              href={siteConfig.portfolioDrive}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-semibold bg-[#0071e3] text-white hover:bg-[#0077ed] transition-all px-4 py-2 rounded-full shadow-xs hover:shadow-sm"
            >
              Drive Vault ↗
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileOpen((p) => !p)}
            className="lg:hidden text-[#1d1d1f] font-medium text-xs px-3 py-1.5 rounded-full bg-black/[0.05]"
          >
            {isMobileOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl text-[#1d1d1f] pt-28 px-8 flex flex-col justify-between pb-12 lg:hidden"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item, i) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-2xl font-light text-[#1d1d1f] hover:text-[#0071e3] flex items-baseline gap-4 py-2 border-b border-black/[0.04]"
                >
                  <span className="font-mono text-xs text-[#86868b]">0{i + 1}</span>
                  <span>{item.label}</span>
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-6 border-t border-black/[0.08]">
              <a
                href={siteConfig.portfolioDrive}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3.5 rounded-full bg-[#0071e3] text-white font-medium text-sm"
              >
                Access Google Drive Vault ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
