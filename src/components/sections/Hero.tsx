'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig, keyStats, heroRoles } from '@/data/portfolio';
import { scrollToSection } from '@/lib/scroll';
import { gsap } from '@/hooks/useGSAP';

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % heroRoles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Subtle entrance
      gsap.fromTo(
        '.hero-reveal',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out' }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[92vh] w-full flex flex-col justify-between pt-32 pb-16 px-6 lg:px-12 overflow-hidden bg-[#ffffff] text-[#1d1d1f]"
    >
      {/* ── Background Subtle Ambient Gradient ── */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,113,227,0.06),rgba(255,255,255,0))]" />

      {/* ── Main Content Container ── */}
      <div className="max-w-[1360px] w-full mx-auto flex-1 flex flex-col justify-center z-10 my-auto">
        <div className="max-w-4xl">
          {/* Eyebrow Status Pill */}
          <div className="hero-reveal flex flex-wrap items-center gap-3 mb-8">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#f5f5f7] border border-black/[0.08] text-[#1d1d1f] text-[11px] font-mono font-medium uppercase tracking-wider shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Creative Leadership</span>
            </div>
            <span className="text-[11px] font-mono text-[#86868b] uppercase tracking-widest">
              Mumbai · 12+ Yrs Exp
            </span>
          </div>

          {/* Super Headline */}
          <h1 className="hero-reveal text-[clamp(2.5rem,6vw,5.5rem)] font-semibold tracking-[-0.035em] text-[#1d1d1f] leading-[1.06]">
            Directing{' '}
            <span className="inline-block relative min-h-[1.15em] overflow-hidden align-bottom">
              <AnimatePresence mode="wait">
                <motion.span
                  key={heroRoles[roleIndex]}
                  initial={{ y: 45, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -45, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] as const }}
                  className="serif-italic font-normal text-[#0071e3] inline-block border-b-2 border-[#0071e3]/30 pb-0.5"
                >
                  {heroRoles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            <br />
            and commercial cinematic pipelines.
          </h1>

          {/* Subtitle */}
          <p className="hero-reveal mt-7 text-lg sm:text-xl text-[#86868b] max-w-2xl leading-relaxed font-normal">
            {siteConfig.shortBio}
          </p>

          {/* Apple-Style Action Buttons */}
          <div className="hero-reveal mt-10 flex flex-wrap gap-4 items-center">
            <button
              onClick={() => scrollToSection('work')}
              className="inline-flex items-center gap-2 bg-[#0071e3] text-white hover:bg-[#0077ed] px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] shadow-xs active:scale-98 cursor-pointer"
            >
              Explore Selected Work ↓
            </button>

            <button
              onClick={() => scrollToSection('films')}
              className="inline-flex items-center gap-2 bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] border border-black/[0.08] px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] active:scale-98 cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-[#0071e3]" />
              Watch Film Reels
            </button>
          </div>
        </div>

        {/* ── Featured 16:9 Cinema Preview Canvas ── */}
        <div className="hero-reveal mt-14 relative w-full aspect-[21/9] sm:aspect-[2.4/1] rounded-3xl overflow-hidden bg-[#000000] border border-black/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
          <video
            ref={videoRef}
            src="/videos/hero-background.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white text-xs font-mono">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              CINEMATIC AI REEL (4K 60FPS)
            </span>
            <button
              onClick={() => scrollToSection('films')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition-colors cursor-pointer"
            >
              Stream Full Reel ↓
            </button>
          </div>
        </div>
      </div>

      {/* ── Bottom Key Metrics Bar ── */}
      <div className="max-w-[1360px] w-full mx-auto mt-16 pt-8 border-t border-black/[0.08] flex flex-wrap items-center justify-between gap-6 z-10">
        <div className="flex items-center gap-8 md:gap-16">
          {keyStats.slice(0, 3).map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-2xl md:text-3xl font-semibold text-[#1d1d1f] tabular-nums">
                {stat.value}
                <span className="serif-italic font-normal text-[#0071e3]">{stat.suffix}</span>
              </span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#86868b] mt-0.5">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <a
          href={siteConfig.cvPath}
          download="Vedprakash_Vishwakarma_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] font-semibold text-[#0071e3] hover:underline flex items-center gap-1.5"
        >
          Download Verified Resume <span>↓</span>
        </a>
      </div>
    </section>
  );
}
