'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
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
  beforeLabel = 'RAW SYNTHESIS PASS',
  afterLabel = 'FINAL 8K BROADCAST MASTER',
  aspectRatio = 'aspect-[16/10]',
}: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      updatePosition(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`relative w-full ${aspectRatio} rounded-3xl overflow-hidden select-none cursor-ew-resize border border-black/[0.08] shadow-md group touch-none`}
    >
      {/* ── After Image (Full Master) ── */}
      <Image
        src={afterImage}
        alt="Final Master Render"
        fill
        className="object-cover pointer-events-none"
        sizes="(max-width: 1024px) 100vw, 60vw"
        priority
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
          className="object-cover pointer-events-none"
          sizes="(max-width: 1024px) 100vw, 60vw"
          priority
        />

        {/* ── Before Label ── */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#1d1d1f] text-[11px] font-mono font-bold tracking-wider border border-black/10 shadow-xs">
            {beforeLabel}
          </span>
        </div>
      </div>

      {/* ── Divider Line & Interactive Handle ── */}
      <div
        className="absolute top-0 bottom-0 z-30 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.5)] pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-[#1d1d1f] shadow-2xl flex items-center justify-center border border-black/10 font-bold text-xs group-hover:scale-110 transition-transform">
          ↔
        </div>
      </div>

      {/* Helper instruction tooltip */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none opacity-80 group-hover:opacity-0 transition-opacity">
        <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono uppercase tracking-wider">
          Drag or click to compare
        </span>
      </div>
    </div>
  );
}
