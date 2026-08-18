'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig, heroRoles, keyStats } from '@/data/portfolio';
import Image from 'next/image';
import AINeuralBackground from '@/components/ui/AINeuralBackground';
import { SiBehance } from 'react-icons/si';

const promptPresets = [
  {
    category: 'Luxury Real Estate',
    prompt: '/imagine prompt: ultra-luxury waterfront penthouse in Mumbai, golden twilight reflection on infinity pool, volumetric lighting, architectural digest 8k --v 6.1 --ar 16:9',
    model: 'Midjourney v6.1 + Nano Banana Pro',
    status: 'Synthesized 100%',
    image: '/images/realestate-cinema.jpg',
  },
  {
    category: 'Motion Cinema',
    prompt: 'Cinematic orbit around architectural glass structure, warm interior caustics, twilight ambient volumetrics, photorealistic 8K',
    model: 'Runway Gen-3 Alpha',
    status: 'Video Generated (60 FPS)',
    image: '/images/luxury-realestate.jpg',
  },
  {
    category: 'Product Direction',
    prompt: 'Haute joaillerie diamond necklace floating in studio darkness, dramatic rim lighting, refraction caustics, raytraced photorealism',
    model: 'Leonardo AI + 3ds Max',
    status: 'Render Master Complete',
    image: '/images/jewelry-luxury.jpg',
  },
];

export default function Hero() {
  const [activeRole, setActiveRole] = useState(0);
  const [selectedPrompt, setSelectedPrompt] = useState(0);
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  // Role cycling
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveRole((prev) => (prev + 1) % heroRoles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const handlePromptSelect = (index: number) => {
    if (index === selectedPrompt) return;
    setIsSynthesizing(true);
    setTimeout(() => {
      setSelectedPrompt(index);
      setIsSynthesizing(false);
    }, 400);
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* ── High-Tech AI Neural Synapse & Latent Wave Background ── */}
      <AINeuralBackground />

      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[600px] bg-gradient-to-tr from-[#7c3aed]/[0.09] via-[#06b6d4]/[0.07] to-transparent rounded-full blur-[150px] pointer-events-none" />

      {/* Main Grid: Editorial Typography + AI Studio Engine Preview */}
      <div className="relative z-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
        {/* Left Column: Bold Editorial Pitch */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex flex-col items-start"
        >
          {/* Live Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-black/[0.08] shadow-xs mb-6 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[12px] font-semibold text-[#0a0a0c] tracking-tight">
              Open for Senior / Lead AI Roles & Creative Direction
            </span>
          </div>

          {/* Name & Dynamic Creative Title */}
          <h1 className="text-[clamp(2.75rem,5.8vw,5rem)] font-bold tracking-tight text-[#0a0a0c] leading-[1.04]">
            {siteConfig.name}
          </h1>

          <div className="h-12 mt-2 flex items-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeRole}
                initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -18, filter: 'blur(4px)' }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] as const }}
                className="text-xl sm:text-2xl md:text-3xl font-semibold gradient-text-purple tracking-tight"
              >
                {heroRoles[activeRole]}
              </motion.p>
            </AnimatePresence>
          </div>

          <p className="mt-4 text-base sm:text-lg text-[#52525b] leading-relaxed max-w-xl font-normal">
            {siteConfig.shortBio}
          </p>

          {/* Action CTAs Cluster */}
          <div className="mt-8 flex flex-wrap gap-3 items-center">
            {/* Explore Work */}
            <a
              href="#work"
              className="inline-flex items-center gap-2 bg-[#0a0a0c] text-white hover:bg-black text-[14px] font-semibold rounded-full px-6 py-3.5 transition-all duration-200 hover:shadow-lg hover:shadow-black/10 hover:scale-[1.02] active:scale-98"
            >
              <span>Explore Work</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>

            {/* Behance Link */}
            <a
              href={siteConfig.behance}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0057ff] text-white hover:bg-[#0047d6] text-[14px] font-semibold rounded-full px-5 py-3.5 transition-all duration-200 hover:shadow-lg hover:shadow-[#0057ff]/25 hover:scale-[1.02] active:scale-98"
            >
              <SiBehance className="w-4 h-4" />
              <span>Behance Portfolio</span>
            </a>

            {/* Drive Link */}
            <a
              href={siteConfig.portfolioDrive}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#0a0a0c] border border-black/[0.1] hover:border-black/[0.25] text-[14px] font-semibold rounded-full px-5 py-3.5 transition-all duration-200 hover:shadow-xs hover:scale-[1.02] active:scale-98"
            >
              <svg className="w-4 h-4 text-[#7c3aed]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              <span>Drive Assets</span>
            </a>

            {/* CV Download */}
            <a
              href={siteConfig.cvPath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#71717a] hover:text-[#0a0a0c] px-3.5 py-3.5 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Resume</span>
            </a>
          </div>
        </motion.div>

        {/* Right Column: Interactive AI Studio HUD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
          className="relative glass-panel rounded-3xl p-5 sm:p-6 border border-black/[0.08] shadow-xl overflow-hidden"
        >
          {/* Header of HUD */}
          <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="text-[12px] font-mono font-semibold text-[#52525b] ml-2">
                VEDPRAKASH_AI_SYNTHESIZER.v2
              </span>
            </div>
            <span className="text-[11px] font-mono text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              ● GPU READY
            </span>
          </div>

          {/* Interactive Preset Chips */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
            {promptPresets.map((preset, idx) => (
              <button
                key={preset.category}
                onClick={() => handlePromptSelect(idx)}
                className={`text-[12px] font-medium px-3.5 py-1.5 rounded-full transition-all duration-200 shrink-0 cursor-pointer ${
                  selectedPrompt === idx
                    ? 'bg-[#0a0a0c] text-white shadow-xs'
                    : 'bg-black/[0.04] text-[#52525b] hover:bg-black/[0.08]'
                }`}
              >
                {preset.category}
              </button>
            ))}
          </div>

          {/* Prompt Terminal View */}
          <div className="mt-4 p-3.5 rounded-2xl bg-[#0e0e12] text-white font-mono text-[12px] leading-relaxed relative">
            <div className="flex items-center justify-between text-[11px] text-[#a1a1aa] mb-1.5 pb-1 border-b border-white/[0.1]">
              <span className="text-[#06b6d4]">ENGINE: {promptPresets[selectedPrompt].model}</span>
              <span className="text-emerald-400">{promptPresets[selectedPrompt].status}</span>
            </div>
            <p className="text-[#e4e4e7] line-clamp-2 select-all">
              {promptPresets[selectedPrompt].prompt}
            </p>
          </div>

          {/* Live Render Output Canvas */}
          <div className="mt-4 relative aspect-[16/10] rounded-2xl overflow-hidden bg-black/[0.05] border border-black/[0.08]">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPrompt}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                className="relative w-full h-full"
              >
                <Image
                  src={promptPresets[selectedPrompt].image}
                  alt={promptPresets[selectedPrompt].category}
                  fill
                  priority
                  className={`object-cover transition-all duration-700 ${
                    isSynthesizing ? 'blur-sm grayscale' : 'blur-0'
                  }`}
                  sizes="600px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[12px]">
                  <span className="font-medium bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20">
                    {promptPresets[selectedPrompt].category}
                  </span>
                  <span className="font-mono text-[11px] text-white/80">8K ULTRA RES</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Floating Key Metrics Ribbon */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, delay: 0.2 }}
        className="mt-16 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {keyStats.map((stat, i) => (
          <div
            key={i}
            className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-black/[0.07] hover:border-black/[0.18] hover:shadow-md transition-all duration-300"
          >
            <p className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0a0a0c]">
              {stat.value}
              <span className="text-[#7c3aed]">{stat.suffix}</span>
            </p>
            <p className="text-[14px] font-semibold text-[#0a0a0c] mt-1.5">{stat.label}</p>
            <p className="text-[12px] text-[#71717a] mt-0.5">{stat.sublabel}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
