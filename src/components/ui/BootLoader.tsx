'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOG_LINES: string[] = [
  '> Initializing system kernel...',
  '> Mounting display drivers...',
  '> Loading creative modules...',
  '> Syncing neural interface...',
  '> Establishing secure connection...',
  '> Calibrating visual cortex...',
  '> Accessing portfolio data...',
  '> ACCESS GRANTED',
];

const BOOT_COMPLETE_KEY = 'vsk_boot_done';

export default function BootLoader({ onComplete }: { onComplete?: () => void }) {
  const [visible, setVisible] = useState(true);
  const [logLines, setLogLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const finish = useCallback(() => {
    setTimeout(() => {
      setVisible(false);
      setTimeout(() => onComplete?.(), 600);
    }, 600);
  }, [onComplete]);

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem(BOOT_COMPLETE_KEY)) {
      setVisible(false);
      onComplete?.();
      return;
    }
  }, [onComplete]);

  useEffect(() => {
    if (!visible) return;

    const lineDelay = 220;
    const lineTimers = LOG_LINES.map((line, i) =>
      setTimeout(() => {
        setLogLines(prev => [...prev, line]);
        setProgress(((i + 1) / LOG_LINES.length) * 100);
        if (i === LOG_LINES.length - 1) {
          setTimeout(() => {
            sessionStorage.setItem(BOOT_COMPLETE_KEY, '1');
            finish();
          }, 300);
        }
      }, i * lineDelay)
    );

    return () => lineTimers.forEach(clearTimeout);
  }, [visible, finish]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a]"
          exit={{ opacity: 0, filter: 'brightness(2)' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Scan line overlay */}
          <div
            className="pointer-events-none absolute inset-0 z-10 opacity-[0.03]"
            style={{
              background: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 3px)',
            }}
          />

          <div className="relative z-20 w-full max-w-[520px] px-6">
            {/* Terminal window */}
            <div className="glass-panel rounded-xl overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-[11px] font-mono text-[var(--text-muted)]">
                  vsk@portfolio:~
                </span>
              </div>

              {/* Log output */}
              <div className="p-5 font-mono text-[13px] leading-relaxed">
                {logLines.map((line, i) => (
                  <div
                    key={i}
                    className={
                      i === LOG_LINES.length - 1
                        ? 'text-[var(--accent)] font-semibold text-glow-mint'
                        : 'text-[var(--text-muted)]'
                    }
                  >
                    {line}
                  </div>
                ))}

                {/* Blinking cursor */}
                <span className="inline-block h-4 w-2 animate-pulse bg-[var(--accent)]" />
              </div>

              {/* Progress bar */}
              <div className="border-t border-white/5 px-5 pb-5 pt-2">
                <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    className="h-full rounded-full bg-[var(--accent)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    style={{ boxShadow: '0 0 10px rgba(143, 255, 209, 0.5)' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
