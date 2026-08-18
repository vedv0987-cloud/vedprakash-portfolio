'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/data/portfolio';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'Selected Work', href: '#work' },
  { label: 'Cinematic Films', href: '#films' },
  { label: 'AI Pipeline', href: '#pipeline' },
  { label: 'Stack & Tools', href: '#stack' },
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
    setIsScrolled(currentY > 30);
    setIsHidden(currentY > lastScrollY.current && currentY > 120);
    lastScrollY.current = currentY;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#f8f8f6]/90 backdrop-blur-md border-b border-black/[0.06] py-3.5'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo & Identity */}
          <Link href="#hero" onClick={(e) => scrollTo(e, '#hero')} className="flex flex-col group">
            <span className="font-bold text-[14px] sm:text-[15px] tracking-tight uppercase text-[#111111] group-hover:opacity-70 transition-opacity">
              Vedprakash Vishwakarma
            </span>
            <span className="text-[11px] text-[#666664] tracking-wider uppercase font-medium">
              Creative AI Lead · Mumbai
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] font-medium text-[#666664]">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="hover:text-[#111111] transition-colors relative py-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* External Action Links */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={siteConfig.behance}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-semibold text-[#111111] hover:opacity-70 transition-opacity px-3.5 py-1.5 rounded-full border border-black/[0.12]"
            >
              Behance ↗
            </a>
            <a
              href={siteConfig.portfolioDrive}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-semibold bg-[#111111] text-white hover:bg-black transition-colors px-4 py-1.5 rounded-full shadow-xs"
            >
              Drive Vault ↗
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileOpen((p) => !p)}
            className="lg:hidden p-2 text-[#111111]"
            aria-label="Toggle Menu"
          >
            <span className="text-xs font-mono font-bold tracking-widest uppercase">
              {isMobileOpen ? 'CLOSE' : 'MENU'}
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
            className="fixed inset-0 z-40 bg-[#f8f8f6] pt-28 px-8 flex flex-col justify-between pb-12 lg:hidden"
          >
            <div className="flex flex-col gap-6">
              {links.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  className="text-3xl font-light tracking-tight text-[#111111] hover:italic transition-all"
                >
                  <span className="font-mono text-xs text-[#8e8e93] mr-3">0{i + 1}</span>
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-8 border-t border-black/[0.08] flex flex-col gap-4">
              <div className="flex gap-4">
                <a
                  href={siteConfig.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 text-center rounded-full bg-[#111111] text-white text-sm font-semibold"
                >
                  Behance ↗
                </a>
                <a
                  href={siteConfig.portfolioDrive}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 text-center rounded-full border border-black/20 text-[#111111] text-sm font-semibold"
                >
                  Drive Archive ↗
                </a>
              </div>
              <p className="text-xs text-[#8e8e93] text-center">
                MUMBAI · {currentTime} · AVAILABLE WORLDWIDE
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
