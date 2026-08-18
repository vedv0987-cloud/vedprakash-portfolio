'use client';

import { motion } from 'framer-motion';
import { siteConfig, keyStats } from '@/data/portfolio';
import Image from 'next/image';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Hero() {
  return (
    <section id="hero" className="pt-36 pb-20 md:pt-48 md:pb-28 px-6 lg:px-12 max-w-[1400px] mx-auto">
      {/* Top Editorial Subtitle */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-black/[0.08]"
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-semibold tracking-wider uppercase text-[#111111]">
            Available for Senior / Lead AI Roles & Creative Direction
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs text-[#666664] font-medium">
          <span>BASED IN MUMBAI, INDIA</span>
          <span>·</span>
          <span>GLOBAL PRODUCTION DIRECTING</span>
        </div>
      </motion.div>

      {/* Main Massive Typographic Statement */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
        }}
        className="py-12 md:py-20"
      >
        <motion.h1
          variants={fadeUp}
          className="text-[clamp(2.5rem,6.5vw,5.5rem)] font-light tracking-tight text-[#111111] leading-[1.06] max-w-5xl"
        >
          Creative AI Lead <span className="serif-italic font-normal">&amp; Visual Content Architect</span> directing
          photorealistic environments, luxury campaigns, and commercial cinematic motion.
        </motion.h1>

        <motion.div variants={fadeUp} className="mt-8 max-w-2xl">
          <p className="text-lg md:text-xl text-[#666664] font-normal leading-relaxed">
            {siteConfig.shortBio}
          </p>
        </motion.div>

        {/* Action Links */}
        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4 items-center">
          <a
            href="#work"
            className="inline-flex items-center gap-2.5 bg-[#111111] text-white hover:bg-black px-8 py-4 rounded-full text-sm font-semibold transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-98"
          >
            <span>Explore Curated Index</span>
            <span>↓</span>
          </a>

          <a
            href={siteConfig.behance}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-[#111111] border border-black/[0.16] hover:border-black px-7 py-4 rounded-full text-sm font-semibold transition-all duration-200 hover:shadow-xs hover:scale-[1.02] active:scale-98"
          >
            <span>Behance Portfolio</span>
            <span>↗</span>
          </a>

          <a
            href={siteConfig.portfolioDrive}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-[#111111] border border-black/[0.16] hover:border-black px-7 py-4 rounded-full text-sm font-semibold transition-all duration-200 hover:shadow-xs hover:scale-[1.02] active:scale-98"
          >
            <span>Google Drive Archive (50+)</span>
            <span>↗</span>
          </a>

          <a
            href={siteConfig.cvPath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#666664] hover:text-[#111111] px-5 py-4 transition-colors"
          >
            <span>Download CV (PDF)</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Full-Bleed Cinematic Showcase Hero Canvas */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
        className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-3xl overflow-hidden shadow-2xl border border-black/[0.08]"
      >
        <Image
          src="/images/realestate-cinema.jpg"
          alt="Luxury Waterfront Villa Architectural Visualization by Vedprakash Vishwakarma"
          fill
          priority
          className="object-cover"
          sizes="1400px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Ambient Film Tag */}
        <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
          <div>
            <span className="text-xs font-mono tracking-widest uppercase text-white/70">
              01 / KEY PRODUCTION SPOTLIGHT
            </span>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mt-0.5">
              Luxury Coastal Villa · Architectural Renders &amp; AI Camera Direction
            </h3>
          </div>

          <a
            href={siteConfig.portfolioDrive}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/35 border border-white/30 text-xs font-semibold tracking-wider uppercase transition-colors shrink-0 text-center"
          >
            Open Full Master Reel ↗
          </a>
        </div>
      </motion.div>

      {/* Verified Metrics Strip */}
      <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-black/[0.08]">
        {keyStats.map((stat, i) => (
          <div key={i} className="flex flex-col">
            <span className="text-4xl md:text-5xl font-light tracking-tight text-[#111111]">
              {stat.value}
              <span className="serif-italic font-normal">{stat.suffix}</span>
            </span>
            <span className="text-sm font-semibold text-[#111111] mt-2">{stat.label}</span>
            <span className="text-xs text-[#666664] mt-0.5">{stat.sublabel}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
