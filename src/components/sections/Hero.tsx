'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig, keyStats, heroRoles } from '@/data/portfolio';
import { scrollToSection } from '@/lib/scroll';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % heroRoles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen w-full flex flex-col justify-center pt-32 pb-16 px-6 lg:px-12 overflow-hidden text-white bg-[#050505]">
      {/* ── Background Video ── */}
      <div className="absolute inset-0 w-full h-full -z-20">
        <video
          ref={videoRef}
          src="/videos/hero-background.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* ── Heavy Cinematic Dark Overlay (Guarantees Text Readability) ── */}
      <div className="absolute inset-0 -z-10 bg-black/60" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/80 via-transparent to-transparent" />

      {/* ── Main Content Container (No Box, Direct Text) ── */}
      <div className="relative max-w-[1400px] w-full mx-auto flex-1 flex flex-col justify-center z-10 mt-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
          }}
          className="max-w-5xl"
        >
          {/* Status Pill */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mb-8">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-[11px] font-mono uppercase tracking-wider shadow-xl">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Global Commissions</span>
            </div>
            <span className="text-[11px] font-mono text-white/50 uppercase tracking-widest drop-shadow-md">
              Mumbai · 12+ Yrs Exp
            </span>
          </motion.div>

          {/* Title */}
          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <h1 className="text-[clamp(2.5rem,6.5vw,6rem)] font-light tracking-tight text-white leading-[1.05] drop-shadow-2xl">
              Directing{' '}
              <span className="inline-block relative min-h-[1.15em] overflow-hidden align-bottom">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={heroRoles[roleIndex]}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                    className="serif-italic font-normal text-white inline-block border-b-2 border-white/30 pb-1"
                  >
                    {heroRoles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <br />
              and commercial cinematic pipelines.
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p variants={fadeUp} className="mt-8 text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed font-light drop-shadow-md">
            {siteConfig.shortBio}
          </motion.p>

          {/* Action Buttons */}
          <motion.div variants={fadeUp} className="mt-12 flex flex-wrap gap-4 items-center">
            <button
               onClick={() => scrollToSection('work')}
               className="inline-flex items-center gap-2 bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-full text-xs font-mono uppercase tracking-wider font-bold transition-transform hover:scale-105 shadow-2xl cursor-pointer"
            >
              Explore Selected Work ↓
            </button>

            <button
               onClick={() => scrollToSection('films')}
               className="inline-flex items-center gap-2 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full text-xs font-mono uppercase tracking-wider font-bold transition-transform hover:scale-105 shadow-2xl cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-[#06b6d4]" />
              Watch Film Reels
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Stats Line */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="absolute bottom-0 left-0 right-0 p-6 lg:p-12 flex flex-wrap items-end justify-between gap-6 z-10 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none"
      >
        <div className="flex items-center gap-8 md:gap-16 pointer-events-auto">
          {keyStats.slice(0, 3).map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-2xl md:text-3xl font-light text-white drop-shadow-md">
                {stat.value}<span className="serif-italic text-white/50">{stat.suffix}</span>
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 mt-1">
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
          className="text-[11px] font-mono uppercase tracking-widest text-white hover:text-[#06b6d4] transition-colors flex items-center gap-2 pointer-events-auto"
        >
          Download Resume <span>↓</span>
        </a>
      </motion.div>
    </section>
  );
}
