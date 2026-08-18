'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig, keyStats, heroRoles } from '@/data/portfolio';
import { scrollToSection } from '@/lib/scroll';
import HeroImageStack from '@/components/ui/HeroImageStack';
import { gsap } from '@/hooks/useGSAP';

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % heroRoles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-reveal',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out' }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full pt-28 pb-12 px-6 lg:px-12 overflow-hidden bg-[#f7f5f0] text-[#1d1d1f]"
    >
      {/* ── Main Two-Column Container (Left: Content | Right: Dynamic Image Stack) ── */}
      <div className="max-w-[1360px] w-full mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column (Copy & CTAs) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Status Pill */}
            <div className="hero-reveal flex flex-wrap items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#f5f5f7] border border-black/[0.08] text-[#1d1d1f] text-[11px] font-mono font-medium uppercase tracking-wider shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available for Creative Leadership</span>
              </div>
              <span className="text-[11px] font-mono text-[#86868b] uppercase tracking-widest">
                Mumbai · 12+ Yrs Exp
              </span>
            </div>

            {/* Super Headline */}
            <h1 className="hero-reveal text-[clamp(2.25rem,5.2vw,4.75rem)] font-semibold tracking-[-0.035em] text-[#1d1d1f] leading-[1.06]">
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
            <p className="hero-reveal mt-6 text-base sm:text-lg text-[#6e6e73] max-w-xl leading-relaxed font-normal">
              {siteConfig.shortBio}
            </p>

            {/* Apple-Style Action Buttons */}
            <div className="hero-reveal mt-8 flex flex-wrap gap-4 items-center">
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

          {/* Right Column (Dynamic Rotating Image Stack) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end hero-reveal">
            <HeroImageStack />
          </div>
        </div>

        {/* ── Key Metrics Bar (Compact & Perfectly Spaced) ── */}
        <div className="mt-14 pt-8 border-t border-black/[0.08] flex flex-wrap items-center justify-between gap-6 hero-reveal">
          <div className="flex items-center gap-8 md:gap-14">
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
      </div>
    </section>
  );
}
