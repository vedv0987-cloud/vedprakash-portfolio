'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let current = 0;
    let timeoutIds: ReturnType<typeof setTimeout>[] = [];

    const increment = () => {
      if (cancelled) return;
      const remaining = 100 - current;
      const step = Math.max(1, Math.floor(remaining * 0.1));
      current = Math.min(100, current + step);
      setProgress(current);

      if (current < 100) {
        const delay = current < 30 ? 60 : current < 70 ? 30 : 15;
        timeoutIds.push(setTimeout(increment, delay));
      } else {
        timeoutIds.push(setTimeout(() => { if (!cancelled) setIsComplete(true); }, 200));
        timeoutIds.push(setTimeout(() => { if (!cancelled) setIsHidden(true); }, 800));
      }
    };

    timeoutIds.push(setTimeout(increment, 100));

    return () => {
      cancelled = true;
      timeoutIds.forEach(clearTimeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isHidden && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[99999] bg-[#ffffff] flex flex-col items-center justify-center text-[#1d1d1f]"
        >
          {/* VP Monogram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <span className="w-14 h-14 rounded-full bg-[#1d1d1f] text-white flex items-center justify-center font-mono text-lg font-bold shadow-md">
              VP
            </span>
          </motion.div>

          {/* Counter */}
          <div className="relative">
            <motion.span
              initial={{ opacity: 0 }}
              animate={isComplete ? { opacity: 0, y: -10 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-6xl md:text-7xl font-semibold tracking-tighter text-[#1d1d1f] tabular-nums"
            >
              {progress}
            </motion.span>
          </div>

          {/* Loading bar */}
          <div className="mt-6 w-40 h-1 bg-[#f5f5f7] overflow-hidden rounded-full border border-black/[0.04]">
            <motion.div
              className="h-full bg-[#0071e3] rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={isComplete ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 text-xs font-mono uppercase tracking-[0.2em] text-[#86868b]"
          >
            Vedprakash Vishwakarma · Creative AI Lead
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
