'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const counterRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    // Simulate asset loading with accelerating counter
    let current = 0;
    const increment = () => {
      // Accelerate: slow at start, fast at end
      const remaining = 100 - current;
      const step = Math.max(1, Math.floor(remaining * 0.08));
      current = Math.min(100, current + step);
      setProgress(current);

      if (current < 100) {
        const delay = current < 30 ? 80 : current < 70 ? 40 : 20;
        setTimeout(increment, delay);
      } else {
        setTimeout(() => setIsComplete(true), 300);
        setTimeout(() => setIsHidden(true), 1200);
      }
    };

    // Small initial delay for page to start rendering
    setTimeout(increment, 200);
  }, []);

  if (isHidden) return null;

  return (
    <AnimatePresence>
      {!isHidden && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] bg-[#050505] flex flex-col items-center justify-center"
        >
          {/* VP Monogram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <span className="w-16 h-16 rounded-full bg-white text-[#050505] flex items-center justify-center font-mono text-xl font-bold">
              VP
            </span>
          </motion.div>

          {/* Counter */}
          <div className="relative">
            <motion.span
              ref={counterRef}
              initial={{ opacity: 0 }}
              animate={isComplete ? { opacity: 0, y: -20 } : { opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-7xl md:text-8xl font-light tracking-tighter text-white tabular-nums"
            >
              {progress}
            </motion.span>
          </div>

          {/* Loading bar */}
          <div className="mt-8 w-48 h-px bg-white/10 overflow-hidden rounded-full">
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Name reveal at completion */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isComplete ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-xs font-mono uppercase tracking-[0.3em] text-white/50"
          >
            Vedprakash Vishwakarma
          </motion.p>

          {/* Exit curtain wipe */}
          {isComplete && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
              style={{ transformOrigin: 'bottom' }}
              className="absolute inset-0 bg-[#050505] z-10"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
