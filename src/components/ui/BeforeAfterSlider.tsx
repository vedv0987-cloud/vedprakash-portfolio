'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'RAW AI SYNTHESIS PASS',
  afterLabel = 'FINAL COMMERCIAL MASTER',
  aspectRatio = 'aspect-[16/10]',
}: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging || e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  return (
    <div
      ref={containerRef}
      data-cursor="drag"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      className={`relative w-full ${aspectRatio} rounded-3xl overflow-hidden select-none cursor-ew-resize border border-black/[0.08] shadow-lg group`}
    >
      {/* ── After Image (Full Background) ── */}
      <Image
        src={afterImage}
        alt="Final Master Render"
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 60vw"
      />

      {/* ── After Label ── */}
      <div className="absolute top-4 right-4 z-10">
        <span className="px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-white text-[11px] font-mono font-bold tracking-wider border border-white/20">
          {afterLabel}
        </span>
      </div>

      {/* ── Before Image (Clipped Left Layer) ── */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <div className="relative w-full h-full min-w-full">
          <Image
            src={beforeImage}
            alt="Raw AI Pass"
            fill
            className="object-cover grayscale contrast-125 filter"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        </div>
      </div>

      {/* ── Before Label ── */}
      <div className="absolute top-4 left-4 z-10">
        <span className="px-3 py-1.5 rounded-full bg-[#7c3aed]/85 backdrop-blur-md text-white text-[11px] font-mono font-bold tracking-wider border border-white/20">
          {beforeLabel}
        </span>
      </div>

      {/* ── Draggable Splitter Handle Line ── */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.6)] z-20"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md border border-black/15 shadow-xl flex items-center justify-center text-[#0a0a0c] transition-transform duration-150 group-hover:scale-110">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M8.5 7l-5 5 5 5v-10zm7 0v10l5-5-5-5z" />
          </svg>
        </div>
      </div>

      {/* Subtle Hint Bar at Bottom */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 px-4 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/90 text-[11px] font-medium pointer-events-none">
        ↔ Drag splitter to compare transformation
      </div>
    </div>
  );
}
