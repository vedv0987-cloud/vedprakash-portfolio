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
      className={`relative w-full ${aspectRatio} rounded-3xl overflow-hidden select-none cursor-ew-resize border border-white/[0.1] shadow-lg group`}
    >
      {/* ── After Image (Full Master) ── */}
      <Image
        src={afterImage}
        alt="Final Master Render"
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 60vw"
      />

      {/* ── After Label ── */}
      <div className="absolute top-4 right-4 z-10 pointer-events-none">
        <span className="px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-white text-[11px] font-mono font-bold tracking-wider border border-white/20">
          {afterLabel}
        </span>
      </div>

      {/* ── Before Image (Full Size, Clipped via clip-path) ── */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
        }}
      >
        <Image
          src={beforeImage}
          alt="Raw Generative Synthesis Pass"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 60vw"
        />

        {/* ── Before Label ── */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#111111] text-[11px] font-mono font-bold tracking-wider border border-black/10">
            {beforeLabel}
          </span>
        </div>
      </div>

      {/* ── Divider Line & Interactive Handle ── */}
      <div
        className="absolute top-0 bottom-0 z-30 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)] pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-[#111111] shadow-2xl flex items-center justify-center border border-black/10 font-bold text-xs">
          ↔
        </div>
      </div>
    </div>
  );
}
