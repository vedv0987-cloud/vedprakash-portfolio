'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export interface DynamicShowcaseItem {
  id: string;
  image: string;
  title: string;
}

const showcaseItems: DynamicShowcaseItem[] = [
  {
    id: '1',
    image: '/images/hero-stack/freepik__-prompt-scene-arnold-son-perpetual-moon-year-of-th__12267.jpg',
    title: 'Haute Horlogerie Celestial Tourbillon',
  },
  {
    id: '2',
    image: '/images/hero-stack/freepik__-prompt-scene-extreme-macro-closeup-of-a-luxury-me__70212.jpg',
    title: 'Precision Chronograph Macro Detailing',
  },
  {
    id: '3',
    image: '/images/hero-stack/Gemini_Generated_Image_gd2677gd2677gd26.jpg',
    title: 'Parametric Architectural Atmosphere',
  },
  {
    id: '4',
    image: '/images/hero-stack/freepik__-prompt-scene-closeup-lifestyle-editorial-portrait__26637.jpg',
    title: 'Cinematic High-Fashion Editorial',
  },
  {
    id: '5',
    image: '/images/hero-stack/freepik__-prompt-scene-a-lange-shne-zeitwerk-striking-time-__70213.jpg',
    title: 'Mechanical Horology Timepiece',
  },
  {
    id: '6',
    image: '/images/hero-stack/Gemini_Generated_Image_qmjuheqmjuheqmju.jpg',
    title: 'Volumetric Twilight Penthouse',
  },
  {
    id: '7',
    image: '/images/hero-stack/freepik__-prompt-scene-affluent-european-man-in-his-mid50s-__47255.jpg',
    title: 'Luxury Editorial Portraiture',
  },
  {
    id: '8',
    image: '/images/hero-stack/Gemini_Generated_Image_vasj6wvasj6wvasj.jpg',
    title: 'Spatial CGI Rendering',
  },
];

export default function HeroImageStack() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = showcaseItems[currentIndex];

  const handleOpenHighRes = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(currentItem.image, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="relative w-full max-w-[460px] mx-auto lg:mx-0 flex flex-col items-center select-none"
    >
      {/* ── Background Card Depth Layers ── */}
      <div className="absolute inset-0 translate-y-3 translate-x-2 scale-[0.96] rounded-3xl bg-[#e5e5ea] border border-black/[0.06] -z-10 opacity-70" />
      <div className="absolute inset-0 translate-y-6 translate-x-4 scale-[0.92] rounded-3xl bg-[#d2d2d7] border border-black/[0.04] -z-20 opacity-40" />

      {/* ── Main Active Card (Click to open full high-res in new tab) ── */}
      <div
        onClick={handleOpenHighRes}
        className="group relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-[#1d1d1f] border border-black/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.12)] cursor-pointer hover:shadow-[0_25px_60px_rgba(0,0,0,0.2)] transition-shadow duration-300"
        title="Click to open full high-resolution image in new tab"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={currentItem.image}
              alt={currentItem.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 500px"
              priority={currentIndex === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Top Right High-Res Action Pill */}
        <div className="absolute top-4 right-4 z-20">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white text-[#1d1d1f] text-xs font-semibold backdrop-blur-md shadow-md group-hover:scale-105 transition-all">
            <span>View Full High-Res</span>
            <span>↗</span>
          </span>
        </div>

        {/* Bottom Slide Indicators */}
        <div className="absolute bottom-4 left-5 right-5 z-20 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 pointer-events-auto">
            {showcaseItems.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === i
                    ? 'w-7 bg-white shadow-xs'
                    : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                title={`Image ${i + 1}`}
              />
            ))}
          </div>

          <span className="text-[11px] font-mono font-bold text-white/90 bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded-full">
            0{currentIndex + 1} / 0{showcaseItems.length}
          </span>
        </div>

        {/* Next Arrow Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrentIndex((prev) => (prev + 1) % showcaseItems.length);
          }}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#1d1d1f] shadow-lg flex items-center justify-center font-bold text-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 cursor-pointer"
          title="Next Image"
        >
          →
        </button>
      </div>
    </div>
  );
}
