'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export type CursorState = 'default' | 'pointer' | 'video' | 'drag' | 'view';

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable on touch / mobile devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check context targets
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const type = cursorTarget.getAttribute('data-cursor') as CursorState;
        setCursorState(type || 'pointer');
      } else if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setCursorState('pointer');
      } else {
        setCursorState('default');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouch) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      style={{
        x: cursorX,
        y: cursorY,
        opacity: isVisible ? 1 : 0,
      }}
    >
      {/* ── Default State ── */}
      {cursorState === 'default' && (
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="relative flex items-center justify-center"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#0a0a0c] shadow-xs" />
          <span className="absolute w-8 h-8 rounded-full border border-black/20" />
        </motion.div>
      )}

      {/* ── Interactive Pointer State ── */}
      {cursorState === 'pointer' && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="w-11 h-11 rounded-full bg-[#7c3aed]/15 border border-[#7c3aed]/40 backdrop-blur-xs flex items-center justify-center shadow-md shadow-[#7c3aed]/10"
        >
          <span className="w-2 h-2 rounded-full bg-[#7c3aed]" />
        </motion.div>
      )}

      {/* ── Video Hover State: Frosted PLAY Pill ── */}
      {cursorState === 'video' && (
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          className="px-4 py-2 rounded-full bg-[#0a0a0c]/90 backdrop-blur-md border border-white/20 text-white flex items-center gap-2 shadow-xl shadow-black/25"
        >
          <svg className="w-3.5 h-3.5 fill-current text-[#06b6d4]" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          <span className="text-[11px] font-bold tracking-wider uppercase">PLAY</span>
          <div className="flex items-center gap-0.5 ml-1">
            <span className="w-0.5 h-2 bg-[#06b6d4] animate-pulse" />
            <span className="w-0.5 h-3.5 bg-[#7c3aed] animate-pulse" style={{ animationDelay: '0.15s' }} />
            <span className="w-0.5 h-2.5 bg-[#06b6d4] animate-pulse" style={{ animationDelay: '0.3s' }} />
          </div>
        </motion.div>
      )}

      {/* ── Draggable Slider State ── */}
      {cursorState === 'drag' && (
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          className="px-3.5 py-1.5 rounded-full bg-[#0a0a0c]/90 backdrop-blur-md border border-white/20 text-white flex items-center gap-1.5 shadow-xl shadow-black/25"
        >
          <span className="text-[11px] font-bold tracking-wider uppercase">↔ DRAG</span>
        </motion.div>
      )}

      {/* ── View Project State ── */}
      {cursorState === 'view' && (
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          className="px-4 py-2 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white flex items-center gap-1.5 shadow-xl shadow-[#7c3aed]/25"
        >
          <span className="text-[11px] font-bold tracking-wider uppercase">VIEW CASE</span>
          <span className="text-xs">↗</span>
        </motion.div>
      )}
    </motion.div>
  );
}
