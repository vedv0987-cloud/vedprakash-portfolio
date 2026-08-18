'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig, keyStats, heroRoles } from '@/data/portfolio';
import { scrollToSection } from '@/lib/scroll';

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % heroRoles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen w-full flex flex-col justify-between pt-32 pb-16 px-6 lg:px-12 overflow-hidden text-white">
      {/* ── 1. Full-Bleed Background Video (Clearly Visible & Autoplaying) ── */}
      <div className="absolute inset-0 w-full h-full -z-20 overflow-hidden bg-black">
        <video
          ref={videoRef}
          src="/videos/hero-background.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-90 scale-102"
        />
      </div>

      {/* ── 2. Subtle Cinematic Gradient (Preserves Full Video Visibility) ── */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 via-black/20 to-black/70 pointer-events-none" />

      {/* ── Main Content Container with Luxury Frosted Glass ── */}
      <div className="relative max-w-[1400px] w-full mx-auto flex-1 flex flex-col justify-between z-10">
        {/* Top Editorial Status Pill */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/20"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/25 text-white text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="tracking-wider uppercase font-semibold">
              Available for Lead AI Roles &amp; Global Commissions
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-white/90 font-mono font-medium drop-shadow-md">
            <span>MUMBAI · GLOBAL DIRECTING</span>
            <span>·</span>
            <span>12+ YRS EXPERIENCE</span>
          </div>
        </motion.div>

        {/* Center Frosted Glass Editorial Canvas */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
          }}
          className="my-auto py-10 md:py-14"
        >
          {/* Frosted Glass Card - Clearly Translucent to Show Video in Motion */}
          <div className="p-8 sm:p-12 md:p-14 rounded-3xl bg-black/35 backdrop-blur-xl border border-white/25 shadow-2xl max-w-5xl">
            {/* Dynamic Kinetic Title with Changing Text */}
            <motion.div variants={fadeUp} className="flex flex-col gap-2">
              <span className="font-mono text-xs text-[#06b6d4] tracking-widest uppercase font-semibold drop-shadow-md">
                VEDPRAKASH VISHWAKARMA / PORTFOLIO
              </span>

              <h1 className="text-[clamp(2.25rem,5.5vw,4.75rem)] font-light tracking-tight text-white leading-[1.06] drop-shadow-lg">
                Directing{' '}
                <span className="inline-block relative min-h-[1.15em] overflow-hidden align-bottom">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={heroRoles[roleIndex]}
                      initial={{ y: 35, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -35, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] as const }}
                      className="serif-italic font-normal text-white inline-block underline decoration-white/40 underline-offset-8"
                    >
                      {heroRoles[roleIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <br />
                and commercial cinematic pipelines.
              </h1>
            </motion.div>

            <motion.p variants={fadeUp} className="mt-6 text-base sm:text-lg text-white/90 max-w-3xl leading-relaxed font-normal drop-shadow-md">
              {siteConfig.shortBio}
            </motion.p>

            {/* Action Buttons Cluster */}
            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3.5 items-center">
              <button
                onClick={() => scrollToSection('work')}
                className="inline-flex items-center gap-2 bg-white text-[#111111] hover:bg-[#e5e5e0] px-7 py-3.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-200 hover:shadow-2xl hover:scale-[1.02] active:scale-98 cursor-pointer"
              >
                <span>Explore Selected Work</span>
                <span>↓</span>
              </button>

              <button
                onClick={() => scrollToSection('films')}
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white border border-white/35 px-6 py-3.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-200 backdrop-blur-lg hover:scale-[1.02] active:scale-98 cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-[#06b6d4]" />
                <span>Watch Film Reels</span>
              </button>

              <a
                href={siteConfig.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/25 px-5 py-3.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-200 backdrop-blur-lg hover:scale-[1.02] active:scale-98"
              >
                <span>Behance ↗</span>
              </a>

              <a
                href={siteConfig.portfolioDrive}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/25 px-5 py-3.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-200 backdrop-blur-lg hover:scale-[1.02] active:scale-98"
              >
                <span>Drive Archive (50+) ↗</span>
              </a>

              <a
                href={siteConfig.cvPath}
                download="Vedprakash_Vishwakarma_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/90 hover:text-white px-4 py-3.5 transition-colors drop-shadow-md"
              >
                <span>Download CV ↓</span>
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Glass Metrics Strip */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/20 text-white"
        >
          {keyStats.map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-3xl md:text-4xl font-light tracking-tight text-white drop-shadow-md">
                {stat.value}
                <span className="serif-italic font-normal text-white/80">{stat.suffix}</span>
              </span>
              <span className="text-xs font-semibold text-white/90 mt-1 uppercase tracking-wider font-mono">
                {stat.label}
              </span>
              <span className="text-[11px] text-white/70 mt-0.5 font-mono">
                {stat.sublabel}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
