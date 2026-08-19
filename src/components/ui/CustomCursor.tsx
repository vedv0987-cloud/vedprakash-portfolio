'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export type CursorState = 'default' | 'pointer' | 'video' | 'drag' | 'view';

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  );
  const isVisibleRef = useRef(false);
  const cursorStateRef = useRef<CursorState>('default');

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 20, stiffness: 280, mass: 0.8 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (isTouch) return;

    document.body.style.cursor = 'none';
    const style = document.createElement('style');
    style.textContent =
      'a, button, [role="button"], input, textarea, select, [data-cursor] { cursor: none !important; }';
    document.head.appendChild(style);

    const updateCursorState = (nextState: CursorState) => {
      if (cursorStateRef.current === nextState) return;
      cursorStateRef.current = nextState;
      setCursorState(nextState);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const type = cursorTarget.getAttribute('data-cursor') as CursorState;
        updateCursorState(type || 'pointer');
      } else if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        updateCursorState('pointer');
      } else {
        updateCursorState('default');
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };
    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.style.cursor = '';
      style.remove();
    };
  }, [isTouch, mouseX, mouseY]);

  if (isTouch) return null;

  const ringSize = cursorState === 'pointer' ? 56 : cursorState === 'video' ? 64 : 40;
  const dotSize = cursorState === 'pointer' ? 6 : cursorState === 'video' ? 0 : 4;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        opacity: isVisible ? 1 : 0,
      }}
    >
      {/* Outer ring */}
      <motion.div
        className="rounded-full border border-white/60 flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
        animate={{
          width: ringSize,
          height: ringSize,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        {/* Inner dot */}
        {dotSize > 0 && (
          <motion.div
            className="rounded-full bg-white"
            animate={{
              width: dotSize,
              height: dotSize,
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          />
        )}

        {/* Video state: PLAY label */}
        {cursorState === 'video' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute text-[9px] font-mono font-semibold tracking-wider text-white uppercase"
          >
            PLAY
          </motion.span>
        )}

        {/* Drag state: DRAG label */}
        {cursorState === 'drag' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute text-[9px] font-mono font-semibold tracking-wider text-white uppercase"
          >
            DRAG
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}
