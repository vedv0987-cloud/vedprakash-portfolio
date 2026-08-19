'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
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
  const [activeSection, setActiveSection] = useState('hero');
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
    const sections = ['hero', 'work', 'films', 'pipeline', 'stack', 'experience', 'contact'];
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
        const focusable = mobileNavRef.current.querySelectorAll<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])'
        );
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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'pt-3 pb-3' : 'pt-5 pb-5'
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo / Name */}
          <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="flex items-center gap-3 group">
            <span className="w-8 h-8 rounded-full bg-text-main text-bg flex items-center justify-center font-mono text-[11px] font-bold group-hover:scale-105 transition-transform shadow-xs">
              VP
            </span>
            <div className="hidden sm:flex flex-col">
              <span className="font-semibold text-[13px] text-text-main tracking-tight leading-none">
                Vedprakash Vishwakarma
              </span>
              <span className="text-[10px] tracking-wider text-text-subtle uppercase font-mono mt-0.5">
                Creative AI Lead · Mumbai
              </span>
            </div>
          </a>

          {/* Desktop Floating Dock */}
          <nav
            aria-label="Primary navigation"
            className={`hidden lg:flex items-center transition-all duration-500 ${
              isScrolled
                ? 'bg-bg-card/90 backdrop-blur-xl border border-border rounded-full px-2 py-1.5 shadow-md'
                : 'bg-transparent px-0 py-0'
            }`}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-4 py-2 rounded-full text-[11px] font-medium tracking-wide transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'text-text-main'
                      : 'text-text-muted hover:text-text-main'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 bg-bg-secondary rounded-full"
                      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={siteConfig.behance}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-medium text-text-main hover:text-accent transition-colors px-3 py-1.5 rounded-full hover:bg-accent/5"
            >
              Behance ↗
            </a>
            <a
              href={siteConfig.portfolioDrive}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-semibold bg-accent text-white hover:bg-accent-hover transition-all px-4 py-2 rounded-full shadow-xs hover:shadow-sm"
            >
              Drive Vault ↗
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            ref={menuButtonRef}
            onClick={() => setIsMobileOpen((p) => !p)}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-navigation"
            aria-label={isMobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden text-text-main font-medium text-xs px-4 py-2 rounded-full bg-bg-secondary border border-border"
          >
            {isMobileOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

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
            className="fixed inset-0 z-40 bg-background text-text-main pt-28 px-8 flex flex-col justify-between pb-12 lg:hidden"
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
                  className="text-3xl font-display font-medium text-text-main hover:text-accent flex items-center gap-4 py-3 border-b border-border"
                >
                  <span className="font-mono text-xs text-text-subtle">0{i + 1}</span>
                  <span>{item.label}</span>
                </motion.a>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-6 border-t border-border">
              <a
                href={siteConfig.portfolioDrive}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3.5 rounded-full bg-accent text-white font-medium text-sm"
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
