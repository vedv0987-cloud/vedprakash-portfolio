'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig, keyStats, heroRoles } from '@/data/portfolio';
import { scrollToSection } from '@/lib/scroll';
import { gsap, ScrollTrigger } from '@/hooks/useGSAP';

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);

  // Rotating roles
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % heroRoles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // GSAP parallax: video scrolls slower, content scrolls faster — creates cinematic depth
  useEffect(() => {
    if (!sectionRef.current || !videoRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // Video parallax (moves up at 30% of scroll speed)
      gsap.to(videoRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Content fades out and moves up as you scroll past
      gsap.to(contentRef.current, {
        yPercent: -15,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'center center',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Stats bar reveal
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.6,
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-center pt-32 pb-16 px-6 lg:px-12 overflow-hidden text-white bg-[#050505]"
    >
      {/* ── Background Video with Parallax ── */}
      <div className="absolute inset-0 w-full h-full -z-20 overflow-hidden">
        <video
          ref={videoRef}
          src="/videos/hero-background.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-[120%] object-cover will-change-transform"
        />
      </div>

      {/* ── Cinematic Overlays ── */}
      <div className="absolute inset-0 -z-10 bg-black/55" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-transparent to-transparent" />

      {/* ── Main Content ── */}
      <div
        ref={contentRef}
        className="relative max-w-[1400px] w-full mx-auto flex-1 flex flex-col justify-center z-10 mt-12 will-change-transform"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
          }}
          className="max-w-5xl"
        >
          {/* Status Pill */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}
            className="flex flex-wrap items-center gap-4 mb-10"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.07] backdrop-blur-md border border-white/[0.1] text-white text-[11px] font-mono uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Global Commissions</span>
            </div>
            <span className="text-[11px] font-mono text-white/40 uppercase tracking-widest">
              Mumbai · 12+ Yrs
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } }}
            className="text-[clamp(2.5rem,6.5vw,5.5rem)] font-light tracking-[-0.03em] text-white leading-[1.06]"
          >
            Directing{' '}
            <span className="inline-block relative min-h-[1.15em] overflow-hidden align-bottom">
              <AnimatePresence mode="wait">
                <motion.span
                  key={heroRoles[roleIndex]}
                  initial={{ y: 45, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -45, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                  className="serif-italic font-normal text-white inline-block border-b-2 border-white/25 pb-1"
                >
                  {heroRoles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            <br />
            and commercial cinematic pipelines.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
            className="mt-8 text-lg sm:text-xl text-white/60 max-w-2xl leading-relaxed font-light"
          >
            {siteConfig.shortBio}
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}
            className="mt-12 flex flex-wrap gap-4 items-center"
          >
            <button
              onClick={() => scrollToSection('work')}
              className="group inline-flex items-center gap-2.5 bg-white text-[#050505] hover:bg-white/90 px-8 py-4 rounded-full text-xs font-mono uppercase tracking-wider font-bold transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] cursor-pointer"
            >
              Explore Selected Work
              <span className="group-hover:translate-y-0.5 transition-transform">↓</span>
            </button>

            <button
              onClick={() => scrollToSection('films')}
              className="inline-flex items-center gap-2.5 bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-md text-white border border-white/[0.12] hover:border-white/[0.2] px-8 py-4 rounded-full text-xs font-mono uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-[#06b6d4]" />
              Watch Film Reels
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Bottom Stats ── */}
      <div
        ref={statsRef}
        className="absolute bottom-0 left-0 right-0 px-6 lg:px-12 py-8 flex flex-wrap items-end justify-between gap-6 z-10 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"
      >
        <div className="flex items-center gap-10 md:gap-16">
          {keyStats.slice(0, 3).map((stat, i) => (
            <div key={i} className="flex flex-col opacity-0">
              <span className="text-2xl md:text-3xl font-light text-white tabular-nums">
                {stat.value}
                <span className="serif-italic text-white/40">{stat.suffix}</span>
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 mt-1">
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
          className="text-[11px] font-mono uppercase tracking-widest text-white/50 hover:text-white transition-colors flex items-center gap-2 opacity-0"
        >
          Download Resume <span>↓</span>
        </a>
      </div>
    </section>
  );
}
