'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const SPRING = { damping: 20, stiffness: 280, mass: 0.5 };
const INNER_SPRING = { damping: 25, stiffness: 400, mass: 0.2 };

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ix = useMotionValue(0);
  const iy = useMotionValue(0);

  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);
  const springIX = useSpring(ix, INNER_SPRING);
  const springIY = useSpring(iy, INNER_SPRING);

  const hoverScale = useRef(false);
  const scrollGrab = useRef(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      ix.set(e.clientX);
      iy.set(e.clientY);
    },
    [x, y, ix, iy]
  );

  useEffect(() => {
    const isTouchDevice =
      typeof navigator !== 'undefined' &&
      ('ontouchstart' in navigator || navigator.maxTouchPoints > 0);
    if (isTouchDevice) return;

    const handleMove = (e: MouseEvent) => {
      handleMouseMove(e);
      document.body.classList.remove('show-native-cursor');
    };

    const handleEnter = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor]');
      if (!target) return;
      const type = target.getAttribute('data-cursor');
      if (type === 'hover' || type === 'link') {
        hoverScale.current = true;
      }
    };

    const handleLeave = () => {
      hoverScale.current = false;
    };

    const handleDown = () => {
      scrollGrab.current = true;
    };

    const handleUp = () => {
      scrollGrab.current = false;
    };

    const handleLeaveWindow = () => {
      document.body.classList.add('show-native-cursor');
    };
    const handleEnterWindow = () => {
      document.body.classList.remove('show-native-cursor');
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseenter', handleEnterWindow);
    window.addEventListener('mouseleave', handleLeaveWindow);
    document.addEventListener('mouseenter', handleEnter);
    document.addEventListener('mouseleave', handleLeave, true);
    document.addEventListener('mousedown', handleDown);
    document.addEventListener('mouseup', handleUp);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseenter', handleEnterWindow);
      window.removeEventListener('mouseleave', handleLeaveWindow);
      document.removeEventListener('mouseenter', handleEnter);
      document.removeEventListener('mouseleave', handleLeave, true);
      document.removeEventListener('mousedown', handleDown);
      document.removeEventListener('mouseup', handleUp);
      document.body.classList.remove('show-native-cursor');
    };
  }, [handleMouseMove]);

  // Poll hover state for Framer Motion scale animation
  const scaleOuter = useMotionValue(1);
  useEffect(() => {
    let raf: number;
    const poll = () => {
      const target = hoverScale.current ? 1.8 : scrollGrab.current ? 0.8 : 1;
      const current = scaleOuter.get();
      const next = current + (target - current) * 0.15;
      scaleOuter.set(next);
      raf = requestAnimationFrame(poll);
    };
    raf = requestAnimationFrame(poll);
    return () => cancelAnimationFrame(raf);
  }, [scaleOuter]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9998]" style={{ contain: 'layout' }}>
      {/* Outer ring */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 flex h-10 w-10 items-center justify-center"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          scale: scaleOuter,
        }}
      >
        <div
          className="h-full w-full rounded-full border-[1.5px] border-[var(--accent)] transition-[border-color] duration-300"
          style={{
            boxShadow: '0 0 12px rgba(143, 255, 209, 0.2)',
          }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        ref={innerRef}
        className="fixed top-0 left-0 z-10"
        style={{
          x: springIX,
          y: springIY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
      </motion.div>
    </div>
  );
}
