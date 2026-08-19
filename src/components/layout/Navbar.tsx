'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { siteConfig } from '@/data/portfolio';
import { scrollToSection } from '@/lib/scroll';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';

const navItems = [
  { label: 'Home', href: '#hero', icon: '◈' },
  { label: 'Work', href: '#work', icon: '▲' },
  { label: 'Films', href: '#films', icon: '▶' },
  { label: 'Pipeline', href: '#pipeline', icon: '◆' },
  { label: 'Stack', href: '#stack', icon: '●' },
  { label: 'Experience', href: '#experience', icon: '■' },
  { label: 'Contact', href: '#contact', icon: '◎' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const sections = navItems.map((item) => item.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href);
    setIsMobileOpen(false);
  };

  useEffect(() => {
    if (!isMobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (e.key === 'Tab' && mobileNavRef.current) {
        const focusable = mobileNavRef.current.querySelectorAll<HTMLElement>('a, button, [tabindex]:not([tabindex="-1"])');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    mobileNavRef.current?.querySelector<HTMLElement>('a')?.focus();
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileOpen]);

  return (
    <>
      {/* Top bar — Logo + ThemeSwitcher + CTA */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'pt-3 pb-3' : 'pt-5 pb-5'
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            data-cursor="link"
            className="flex items-center gap-3 group"
          >
            <span className="w-8 h-8 rounded-full bg-[var(--accent)] text-black flex items-center justify-center font-mono text-[11px] font-bold group-hover:scale-105 transition-transform">
              VP
            </span>
            <div className="hidden sm:flex flex-col">
              <span className="font-semibold text-[13px] text-[var(--text-main)] tracking-tight leading-none">
                Vedprakash Vishwakarma
              </span>
              <span className="font-mono text-[10px] tracking-wider text-[var(--text-subtle)] uppercase mt-0.5">
                Creative AI Lead
              </span>
            </div>
          </a>

          {/* Right side: ThemeSwitcher + Drive Vault CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={siteConfig.portfolioDrive}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="font-mono text-[12px] font-semibold bg-[var(--accent)] text-black hover:shadow-[0_0_20px_rgba(var(--theme-mint-rgb),0.3)] transition-all px-4 py-2 rounded-full"
            >
              Drive Vault ↗
            </a>
            <ThemeSwitcher />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            ref={menuButtonRef}
            onClick={() => setIsMobileOpen((p) => !p)}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-navigation"
            aria-label={isMobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden text-[var(--text-main)] font-medium text-xs px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
          >
            {isMobileOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      {/* Bottom Dock Nav — Desktop only */}
      <nav
        aria-label="Primary navigation"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 hidden lg:flex items-center gap-1 rounded-full border border-white/10 bg-[#0a0a0a]/80 px-2 py-2 backdrop-blur-xl"
      >
        {navItems.map((item, i) => {
          const isActive = activeSection === item.href.replace('#', '');
          return (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              data-cursor="hover"
              className="relative flex flex-col items-center gap-1 px-4 py-2"
            >
              {isActive && (
                <motion.span
                  layoutId="dock-active"
                  className="absolute inset-0 rounded-full bg-white/10"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
              <span
                className={`relative z-10 text-sm transition-all duration-200 ${
                  isActive ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'
                }`}
              >
                {item.icon}
              </span>
              <span
                className={`relative z-10 font-mono text-[9px] uppercase tracking-wider transition-all duration-200 ${
                  isActive ? 'text-[var(--text-main)]' : 'text-[var(--text-subtle)]'
                }`}
              >
                {item.label}
              </span>

              {/* Tooltip on hover */}
              <AnimatePresence>
                {hoveredIdx === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute -top-10 whitespace-nowrap rounded-lg bg-[var(--accent)] px-3 py-1.5 font-mono text-[10px] font-medium text-black shadow-lg"
                  >
                    {item.label}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 bg-[var(--accent)]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </a>
          );
        })}
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            ref={mobileNavRef}
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 48px) 48px)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 48px) 48px)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 48px) 48px)' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-0 z-40 bg-[var(--bg)] text-[var(--text-main)] pt-28 px-8 flex flex-col justify-between pb-12 lg:hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="text-3xl font-display font-medium text-[var(--text-main)] hover:text-[var(--accent)] flex items-center gap-4 py-3 border-b border-white/5"
                >
                  <span className="font-mono text-xs text-[var(--text-subtle)]">0{i + 1}</span>
                  <span>{item.label}</span>
                </motion.a>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-6 border-t border-white/5">
              <div className="flex items-center justify-center gap-4 mb-2">
                <ThemeSwitcher />
              </div>
              <a
                href={siteConfig.portfolioDrive}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3.5 rounded-full bg-[var(--accent)] text-black font-medium text-sm"
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
