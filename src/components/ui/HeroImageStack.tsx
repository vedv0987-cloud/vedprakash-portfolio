'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export interface DynamicShowcaseItem {
  id: string;
  image: string;
  title: string;
  category: string;
  tools: string;
}

const showcaseItems: DynamicShowcaseItem[] = [
  {
    id: '1',
    image: '/images/hero-stack/freepik__-prompt-scene-arnold-son-perpetual-moon-year-of-th__12267.jpg',
    title: 'Haute Horlogerie Celestial Tourbillon',
    category: '3D CGI & Raytracing',
    tools: '3ds Max · Leonardo AI',
  },
  {
    id: '2',
    image: '/images/hero-stack/freepik__-prompt-scene-extreme-macro-closeup-of-a-luxury-me__70212.jpg',
    title: 'Precision Chronograph Macro Detailing',
    category: 'Commercial Luxury Product',
    tools: 'Midjourney v6 · Photoshop',
  },
  {
    id: '3',
    image: '/images/hero-stack/Gemini_Generated_Image_gd2677gd2677gd26.jpg',
    title: 'Parametric Architectural Atmosphere',
    category: 'Spatial Environment Design',
    tools: 'Runway Gen-3 · Nano Banana Pro',
  },
  {
    id: '4',
    image: '/images/hero-stack/freepik__-prompt-scene-closeup-lifestyle-editorial-portrait__26637.jpg',
    title: 'Cinematic High-Fashion Editorial',
    category: 'Character Consistency',
    tools: 'Higgsfield Cinema · Lightroom',
  },
  {
    id: '5',
    image: '/images/hero-stack/freepik__-prompt-scene-a-lange-shne-zeitwerk-striking-time-__70213.jpg',
    title: 'Mechanical Horology Timepiece',
    category: 'Photorealistic Caustics',
    tools: 'DaVinci Resolve · Midjourney',
  },
  {
    id: '6',
    image: '/images/hero-stack/Gemini_Generated_Image_qmjuheqmjuheqmju.jpg',
    title: 'Volumetric Twilight Penthouse',
    category: 'Luxury Real Estate CGI',
    tools: 'ElevenLabs · Runway · Photoshop',
  },
];

export default function HeroImageStack() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % showcaseItems.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isPaused]);

  const currentItem = showcaseItems[currentIndex];
  const nextItem = showcaseItems[(currentIndex + 1) % showcaseItems.length];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full max-w-[480px] mx-auto lg:mx-0 flex flex-col items-center select-none"
    >
      {/* ── Background Card Depth Layer (Preview of Next) ── */}
      <div className="absolute inset-0 translate-y-3 translate-x-2 scale-[0.96] rounded-3xl bg-[#e5e5ea] border border-black/[0.06] -z-10 opacity-70 blur-[0.5px]" />
      <div className="absolute inset-0 translate-y-6 translate-x-4 scale-[0.92] rounded-3xl bg-[#d2d2d7] border border-black/[0.04] -z-20 opacity-40 blur-xs" />

      {/* ── Main Active Card Container ── */}
      <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-[#1d1d1f] border border-black/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.12)] group">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={currentItem.image}
              alt={currentItem.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 500px"
              priority
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono uppercase tracking-wider border border-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{currentItem.category}</span>
          </span>

          <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1d1d1f] text-[11px] font-mono font-bold shadow-xs">
            0{currentIndex + 1} / 0{showcaseItems.length}
          </span>
        </div>

        {/* Bottom Details Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white">
          <div className="flex items-center justify-between mb-1 text-[11px] font-mono text-white/70">
            <span>PIPELINE: {currentItem.tools}</span>
            <span className="text-emerald-400">● 2.8S FLOW</span>
          </div>

          <h3 className="text-lg font-semibold tracking-tight text-white line-clamp-1">
            {currentItem.title}
          </h3>

          {/* Progress Indicators */}
          <div className="mt-3 flex items-center gap-1.5">
            {showcaseItems.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === i ? 'w-8 bg-white' : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
                title={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Interactive Next Arrow Button */}
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % showcaseItems.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#1d1d1f] shadow-lg flex items-center justify-center font-bold text-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 cursor-pointer"
          title="Next Image"
        >
          →
        </button>
      </div>

      {/* Caption Below Card */}
      <div className="mt-3 flex items-center justify-between w-full px-2 text-xs font-mono text-[#86868b]">
        <span>✦ DYNAMIC GENERATIVE SUITE</span>
        <span className="text-[#0071e3] font-medium">AUTO-CYCLING</span>
      </div>
    </div>
  );
}
