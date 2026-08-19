'use client';

import { motion } from 'framer-motion';

interface MarqueeProps {
  items: string[];
  speed?: number;
  className?: string;
}

export default function Marquee({ items, speed = 35, className = '' }: MarqueeProps) {
  const duplicated = [...items, ...items];

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="custom-marquee"
        style={{ animationDuration: `${speed}s` }}
      >
        {duplicated.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-6 whitespace-nowrap px-6 font-display text-2xl md:text-4xl font-semibold text-[var(--text-main)] opacity-20"
          >
            <span>{item}</span>
            <span className="text-[var(--accent)]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
