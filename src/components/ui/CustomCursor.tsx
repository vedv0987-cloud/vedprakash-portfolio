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
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

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
          <span className="w-2.5 h-2.5 rounded-full bg-[#1d1d1f] shadow-xs" />
          <span className="absolute w-8 h-8 rounded-full border border-black/15" />
        </motion.div>
      )}

      {/* ── Interactive Pointer State ── */}
      {cursorState === 'pointer' && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="w-10 h-10 rounded-full bg-[#0071e3]/10 border border-[#0071e3]/30 backdrop-blur-2xs flex items-center justify-center"
        >
          <span className="w-2 h-2 rounded-full bg-[#0071e3]" />
        </motion.div>
      )}

      {/* ── Video Hover State: Frosted PLAY Pill ── */}
      {cursorState === 'video' && (
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          className="px-4 py-2 rounded-full bg-[#1d1d1f]/90 backdrop-blur-md text-white flex items-center gap-2 shadow-xl"
        >
          <svg className="w-3 h-3 fill-current text-[#0071e3]" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          <span className="text-[11px] font-semibold tracking-wider uppercase">PLAY REEL</span>
        </motion.div>
      )}

      {/* ── Draggable Slider State ── */}
      {cursorState === 'drag' && (
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          className="px-3.5 py-1.5 rounded-full bg-[#1d1d1f]/90 backdrop-blur-md text-white flex items-center gap-1.5 shadow-xl"
        >
          <span className="text-[11px] font-semibold tracking-wider uppercase">↔ DRAG</span>
        </motion.div>
      )}
    </motion.div>
  );
}
