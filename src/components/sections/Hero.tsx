'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig, keyStats, heroRoles } from '@/data/portfolio';
import { scrollToSection } from '@/lib/scroll';
import HeroImageStack from '@/components/ui/HeroImageStack';
import TextReveal from '@/components/ui/TextReveal';
import { gsap } from '@/hooks/useGSAP';

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const parallaxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % heroRoles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // Parallax depth effect on scroll
  useEffect(() => {
    if (!parallaxRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(parallaxRef.current!, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-screen flex items-center px-6 lg:px-12 overflow-hidden bg-background"
    >
      {/* Background depth layers */}
      <div ref={parallaxRef} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-accent/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-[1360px] w-full mx-auto pt-28 pb-16">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Status Pill */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-bg-secondary border border-border text-text-main text-[11px] font-mono font-medium uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available for Creative Leadership</span>
              </div>
              <span className="text-[11px] font-mono text-text-subtle uppercase tracking-widest">
                Mumbai · 12+ Yrs
              </span>
            </div>

            {/* Super Headline */}
            <h1 className="text-hero font-display font-semibold tracking-[-0.035em] text-text-main leading-[0.95]">
              <TextReveal as="span" split="lines" delay={0.3}>
                Directing
              </TextReveal>{' '}
              <span className="inline-block relative min-h-[1.1em] overflow-hidden align-bottom">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={heroRoles[roleIndex]}
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -60, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="serif-italic font-normal text-accent inline-block border-b-2 border-accent/20 pb-1"
                  >
                    {heroRoles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <br />
              <TextReveal as="span" split="lines" delay={0.5}>
                and commercial cinematic pipelines.
              </TextReveal>
            </h1>

            {/* Subtitle */}
            <p className="mt-8 text-body-lg text-text-muted max-w-xl leading-relaxed font-normal">
              {siteConfig.shortBio}
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap gap-4 items-center">
              <button
                onClick={() => scrollToSection('work')}
                className="magnetic-btn inline-flex items-center gap-2 bg-accent text-white hover:bg-accent-hover px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] shadow-sm active:scale-95 cursor-pointer"
              >
                Explore Selected Work ↓
              </button>

              <button
                onClick={() => scrollToSection('films')}
                className="magnetic-btn inline-flex items-center gap-2 bg-bg-secondary hover:bg-bg-card text-text-main border border-border px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-accent" />
                Watch Film Reels
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <HeroImageStack />
          </div>
        </div>

        {/* Key Metrics Bar */}
        <div className="mt-20 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-10 md:gap-16">
            {keyStats.slice(0, 3).map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-3xl md:text-4xl font-display font-semibold text-text-main tabular-nums">
                  {stat.value}
                  <span className="serif-italic font-normal text-accent">{stat.suffix}</span>
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-text-subtle mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <a
            href={siteConfig.cvPath}
            download="Vedprakash_Vishwakarma_CV.pdf"
            className="text-[12px] font-semibold text-accent hover:underline flex items-center gap-1.5 font-mono"
          >
            Download Resume <span>↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
