'use client';

import { useRef, useState, type ReactNode, type MouseEvent as ReactMouseEvent } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

export default function SpotlightCard({
  children,
  className,
  spotlightColor,
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="hover"
      className={cn(
        'glass-panel relative overflow-hidden rounded-2xl',
        className
      )}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Spotlight gradient */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(
            600px circle at ${position.x}px ${position.y}px,
            ${spotlightColor || 'rgba(var(--theme-mint-rgb), 0.08)'},
            transparent 40%
          )`,
        }}
      />

      {/* Top border glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(
            400px circle at ${position.x}px ${position.y}px,
            ${spotlightColor || 'rgba(var(--theme-mint-rgb), 0.15)'},
            transparent 40%
          )`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          paddingBottom: '1px',
        }}
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
