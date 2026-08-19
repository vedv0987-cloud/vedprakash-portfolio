'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig, heroRoles, keyStats } from '@/data/portfolio';
import { scrollToSection } from '@/lib/scroll';

function Typewriter({ words, speed = 80, pause = 2000 }: { words: string[]; speed?: number; pause?: number }) {
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setCharIdx((c) => c + 1);
          if (charIdx + 1 === word.length) {
            setTimeout(() => setIsDeleting(true), pause);
          }
        } else {
          setCharIdx((c) => c - 1);
          if (charIdx - 1 === 0) {
            setIsDeleting(false);
            setWordIdx((w) => (w + 1) % words.length);
          }
        }
      },
      isDeleting ? speed / 2 : speed
    );
    return () => clearTimeout(timeout);
  }, [charIdx, isDeleting, wordIdx, words, speed, pause]);

  return (
    <span>
      {words[wordIdx].slice(0, charIdx)}
      <span className="animate-pulse">|</span>
    </span>
  );
}

function CornerBracket({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const posClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4 rotate-90',
    'bottom-left': 'bottom-4 left-4 -rotate-90',
    'bottom-right': 'bottom-4 right-4 rotate-180',
  };
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`absolute ${posClasses[position]}`}>
      <path d="M2 8V3C2 2.44772 2.44772 2 3 2H8" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function OrbitCircles() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
      {[300, 400, 500].map((size, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-white/[0.04]"
          style={{ width: size, height: size }}
          animate={{ rotate: 360 }}
          transition={{ duration: 30 + i * 15, repeat: Infinity, ease: 'linear' }}
        >
          <div
            className="absolute h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
            style={{ top: 0, left: '50%', transform: 'translate(-50%, -50%)' }}
          />
        </motion.div>
      ))}
    </div>
  );
}

function HudSocialRail() {
  const socials = [
    { icon: 'in', label: 'LinkedIn', href: siteConfig.linkedin },
    { icon: 'Be', label: 'Behance', href: siteConfig.behance },
    { icon: '@', label: 'Email', href: `mailto:${siteConfig.email}` },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
      className="pointer-events-auto absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4"
    >
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target={s.label !== 'Email' ? '_blank' : undefined}
          rel={s.label !== 'Email' ? 'noopener noreferrer' : undefined}
          data-cursor="link"
          className="group flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 font-mono text-[10px] text-[var(--text-muted)] backdrop-blur-md transition-all hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 hover:text-[var(--accent)]"
          title={s.label}
        >
          {s.icon}
        </a>
      ))}
    </motion.div>
  );
}

function HudInfoCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.8, duration: 0.6 }}
      className="pointer-events-auto absolute right-6 bottom-24 hidden lg:block"
    >
      <div className="glass-panel rounded-xl p-4 space-y-3 text-[11px] font-mono text-[var(--text-muted)]">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-emerald-400">Available for projects</span>
        </div>
        <div className="h-px bg-white/5" />
        <div className="flex items-center gap-2">
          <span className="text-[var(--accent)]">→</span>
          <span>{siteConfig.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[var(--accent)]">→</span>
          <span>12+ yrs experience</span>
        </div>
      </div>
    </motion.div>
  );
}

function HudScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2 }}
      className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="h-10 w-6 rounded-full border border-white/20 flex items-start justify-center pt-2"
      >
        <div className="h-2 w-0.5 rounded-full bg-[var(--accent)]" />
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-screen flex items-center overflow-hidden"
    >
      {/* Corner brackets */}
      <CornerBracket position="top-left" />
      <CornerBracket position="top-right" />
      <CornerBracket position="bottom-left" />
      <CornerBracket position="bottom-right" />

      {/* Orbit circles */}
      <OrbitCircles />

      {/* HUD panels */}
      <HudSocialRail />
      <HudInfoCard />
      <HudScrollIndicator />

      {/* Center content */}
      <div className="relative z-10 w-full max-w-[1360px] mx-auto px-6 lg:px-12 pt-32 pb-24">
        <div className="flex flex-col items-center text-center">
          {/* Status line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-wider">
              Available for Creative Leadership
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[var(--text-hero)] font-semibold leading-[0.95] tracking-[-0.04em] text-[var(--text-main)]"
          >
            Directing{' '}
            <span className="text-glow-mint text-[var(--accent)]">
              <Typewriter words={heroRoles} />
            </span>
            <br />
            and commercial cinematic pipelines.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="mt-8 max-w-xl text-[var(--text-body-lg)] text-[var(--text-muted)] leading-relaxed"
          >
            {siteConfig.shortBio}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="mt-10 flex flex-wrap gap-4 justify-center"
          >
            <button
              onClick={() => scrollToSection('work')}
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-8 py-4 text-xs font-semibold uppercase tracking-wider text-black transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(var(--theme-mint-rgb),0.3)] active:scale-95"
            >
              Explore Selected Work ↓
            </button>
            <button
              onClick={() => scrollToSection('films')}
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-main)] backdrop-blur-md transition-all duration-200 hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 active:scale-95"
            >
              <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
              Watch Film Reels
            </button>
          </motion.div>
        </div>

        {/* Key metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="mt-20 pt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-6"
        >
          <div className="flex items-center gap-10 md:gap-16">
            {keyStats.slice(0, 3).map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-display text-3xl md:text-4xl font-semibold text-[var(--text-main)] tabular-nums">
                  {stat.value}
                  <span className="font-serif-display italic font-normal text-[var(--accent)]">{stat.suffix}</span>
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-subtle)] mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
          <a
            href={siteConfig.cvPath}
            download="Vedprakash_Vishwakarma_CV.pdf"
            className="font-mono text-[12px] font-semibold text-[var(--accent)] hover:underline flex items-center gap-1.5"
          >
            Download Resume <span>↓</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
