'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let current = 0;
    let rafId: number;
    let startTime = performance.now();

    const duration = 1800;

    const animate = (now: number) => {
      if (cancelled) return;
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      current = Math.floor(t * 100);
      setProgress(current);

      if (t < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        setIsComplete(true);
        setTimeout(() => {
          if (!cancelled) setIsHidden(true);
        }, 600);
      }
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isHidden && (
        <motion.div
          initial={{ clipPath: 'circle(100% at 50% 50%)' }}
          exit={{
            clipPath: 'circle(0% at 50% 50%)',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[99999] bg-background flex flex-col items-center justify-center"
        >
          {/* VP Monogram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10"
          >
            <span className="w-14 h-14 rounded-full bg-text-main text-bg flex items-center justify-center font-mono text-sm font-bold shadow-md">
              VP
            </span>
          </motion.div>

          {/* Counter */}
          <div className="relative">
            <motion.span
              initial={{ opacity: 0 }}
              animate={isComplete ? { opacity: 0, y: -10 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="font-display text-7xl md:text-8xl font-semibold tracking-tighter text-text-main tabular-nums"
            >
              {progress}
            </motion.span>
          </div>

          {/* Loading bar */}
          <div className="mt-8 w-48 h-[2px] bg-border overflow-hidden rounded-full">
            <motion.div
              className="h-full bg-accent rounded-full origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: progress / 100 }}
              transition={{ duration: 0.05 }}
            />
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={isComplete ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: isComplete ? 0.1 : 0 }}
            className="mt-5 text-[11px] font-mono uppercase tracking-[0.2em] text-text-subtle"
          >
            Vedprakash Vishwakarma · Creative AI Lead
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
