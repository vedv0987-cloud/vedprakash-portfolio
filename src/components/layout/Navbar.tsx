'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { navLinks, siteConfig } from '@/data/portfolio';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [currentTime, setCurrentTime] = useState('');
  const lastScrollY = useRef(0);

  // Live Mumbai Time
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
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    setIsScrolled(currentY > 40);
    setIsHidden(currentY > lastScrollY.current && currentY > 120);
    lastScrollY.current = currentY;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Section Tracking
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-30% 0px -50% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.getElementById(href.replace('#', ''));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileOpen(false);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: isHidden && !isMobileOpen ? -100 : 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] as const }}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 pb-2 flex justify-center pointer-events-none"
      >
        <div
          className={`pointer-events-auto flex items-center justify-between w-full max-w-6xl h-14 px-4 sm:px-6 rounded-full transition-all duration-400 ${
            isScrolled
              ? 'bg-white/85 backdrop-blur-2xl border border-black/[0.08] shadow-lg shadow-black/[0.03]'
              : 'bg-white/50 backdrop-blur-md border border-black/[0.04]'
          }`}
        >
          {/* Logo & Mumbai Live Indicator */}
          <div className="flex items-center gap-3">
            <Link href="#hero" onClick={(e) => scrollTo(e, '#hero')} className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#7c3aed] to-[#06b6d4] flex items-center justify-center text-white font-bold text-xs shadow-xs">
                VP
              </span>
              <span className="font-semibold text-[14px] tracking-tight text-[#0a0a0c]">
                Vedprakash
              </span>
            </Link>

            {currentTime && (
              <span className="hidden lg:inline-flex items-center gap-1.5 text-[11px] font-medium text-[#71717a] border-l border-black/[0.08] pl-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                MUMBAI · {currentTime}
              </span>
            )}
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-black/[0.03] p-1 rounded-full border border-black/[0.04]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  className={`relative px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 ${
                    isActive ? 'text-[#0a0a0c]' : 'text-[#71717a] hover:text-[#0a0a0c]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavTab"
                      className="absolute inset-0 rounded-full bg-white shadow-xs border border-black/[0.06]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons: Behance & Drive Portfolio */}
          <div className="flex items-center gap-2">
            <a
              href={siteConfig.behance}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#0057ff] text-white hover:bg-[#0047d6] rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all duration-200 hover:shadow-md hover:shadow-[#0057ff]/20 hover:scale-[1.02] active:scale-98"
            >
              <span>Behance</span>
              <span>↗</span>
            </a>

            <a
              href={siteConfig.portfolioDrive}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 bg-[#0a0a0c] text-white hover:bg-black rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all duration-200 hover:shadow-md hover:shadow-black/10 hover:scale-[1.02] active:scale-98"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              <span>Drive</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileOpen((p) => !p)}
              className="md:hidden p-2 rounded-full text-[#0a0a0c] hover:bg-black/[0.05] transition-colors"
              aria-label={isMobileOpen ? 'Close Menu' : 'Open Menu'}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                {isMobileOpen ? (
                  <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
                ) : (
                  <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
            className="fixed inset-x-4 top-20 z-40 bg-white/95 backdrop-blur-3xl p-6 rounded-3xl border border-black/[0.08] shadow-2xl md:hidden flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => scrollTo(e, link.href)}
                    className={`px-4 py-3 rounded-2xl text-[15px] font-medium transition-colors ${
                      isActive ? 'bg-[#0a0a0c] text-white' : 'text-[#71717a] hover:bg-black/[0.04]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="pt-2 border-t border-black/[0.06] flex flex-col gap-2">
              <a
                href={siteConfig.portfolioDrive}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-2xl bg-[#7c3aed] text-white text-center text-[14px] font-medium shadow-md shadow-[#7c3aed]/20"
              >
                Open Google Drive Portfolio ↗
              </a>
              <a
                href={siteConfig.cvPath}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-2xl border border-black/[0.1] text-[#0a0a0c] text-center text-[14px] font-medium"
              >
                Download Official CV (PDF)
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
