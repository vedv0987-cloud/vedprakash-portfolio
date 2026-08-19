'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

const THEMES = [
  { name: 'Mint', className: 'theme-mint', hex: '#8FFFD1' },
  { name: 'Pink', className: 'theme-pink', hex: '#FF6EB4' },
  { name: 'Cyan', className: 'theme-cyan', hex: '#46EFFF' },
  { name: 'Gold', className: 'theme-gold', hex: '#FFC640' },
] as const;

export default function ThemeSwitcher() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const applyTheme = useCallback((idx: number) => {
    const theme = THEMES[idx];
    const root = document.documentElement;
    root.classList.remove(...THEMES.map(t => t.className));
    root.classList.add(theme.className);

    // Update CSS variables based on theme
    const colors: Record<string, [string, string]> = {
      'Mint': ['#8FFFD1', '143, 255, 209'],
      'Pink': ['#FF6EB4', '255, 110, 180'],
      'Cyan': ['#46EFFF', '70, 239, 255'],
      'Gold': ['#FFC640', '255, 198, 64'],
    };
    const [hex, rgb] = colors[theme.name];
    root.style.setProperty('--theme-mint', hex);
    root.style.setProperty('--theme-mint-rgb', rgb);

    setActiveIdx(idx);
    try {
      localStorage.setItem('vsk-theme', theme.className);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('vsk-theme');
      if (stored) {
        const idx = THEMES.findIndex(t => t.className === stored);
        if (idx !== -1) applyTheme(idx);
      }
    } catch {}
  }, [applyTheme]);

  return (
    <div className="relative flex items-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        data-cursor="hover"
        className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-md transition-all hover:border-[var(--accent)] hover:bg-[var(--accent)]/10"
        aria-label="Change accent color"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-colors">
          <circle cx="8" cy="8" r="6" stroke={THEMES[activeIdx].hex} strokeWidth="1.5" fill="none" />
          <circle cx="8" cy="8" r="2" fill={THEMES[activeIdx].hex} />
        </svg>
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -4 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 top-12 z-50 flex gap-2 rounded-xl border border-white/10 bg-[#0a0a0a]/95 p-2 backdrop-blur-xl"
        >
          {THEMES.map((theme, i) => (
            <button
              key={theme.name}
              data-cursor="hover"
              onClick={() => {
                applyTheme(i);
                setIsOpen(false);
              }}
              className="group relative flex h-8 w-8 items-center justify-center rounded-lg transition-all hover:bg-white/10"
              title={theme.name}
            >
              <div
                className="h-4 w-4 rounded-full transition-transform group-hover:scale-125"
                style={{
                  backgroundColor: theme.hex,
                  boxShadow: i === activeIdx ? `0 0 10px ${theme.hex}` : 'none',
                }}
              />
              {i === activeIdx && (
                <motion.div
                  layoutId="theme-indicator"
                  className="absolute inset-0 rounded-lg border border-white/20"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
