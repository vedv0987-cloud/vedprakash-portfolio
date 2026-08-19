'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap, ScrollTrigger } from '@/hooks/useGSAP';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  className?: string;
  split?: 'lines' | 'words' | 'chars';
  delay?: number;
  stagger?: number;
  duration?: number;
  ease?: string;
  scrollTrigger?: boolean;
  onComplete?: () => void;
}

export default function TextReveal({
  children,
  as: Tag = 'h2',
  className = '',
  split = 'lines',
  delay = 0,
  stagger = 0.04,
  duration = 1,
  ease = 'power4.out',
  scrollTrigger = true,
  onComplete,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  const setupSplit = useCallback(() => {
    const el = containerRef.current;
    if (!el || hasAnimated.current) return;

    const text = el.textContent || '';
    el.setAttribute('aria-label', text);

    if (split === 'lines') {
      const words = text.split(' ').filter(Boolean);
      el.innerHTML = words
        .map(
          (word) =>
            `<span class="split-line"><span class="split-line-inner">${word}</span></span>`
        )
        .join(' ');

      const innerSpans = el.querySelectorAll('.split-line-inner');

      const ctx = gsap.context(() => {
        gsap.to(innerSpans, {
          y: 0,
          duration,
          stagger,
          ease,
          delay,
          ...(scrollTrigger
            ? {
                scrollTrigger: {
                  trigger: el,
                  start: 'top 88%',
                  toggleActions: 'play none none none',
                },
              }
            : {}),
          onComplete,
        });
      });

      hasAnimated.current = true;
      return () => ctx.revert();
    }

    if (split === 'chars') {
      const chars = text.split('');
      el.innerHTML = chars
        .map((char) =>
          char === ' '
            ? ' '
            : `<span class="split-line"><span class="split-line-inner">${char}</span></span>`
        )
        .join('');

      const innerSpans = el.querySelectorAll('.split-line-inner');

      const ctx = gsap.context(() => {
        gsap.to(innerSpans, {
          y: 0,
          duration,
          stagger: stagger * 0.5,
          ease,
          delay,
          ...(scrollTrigger
            ? {
                scrollTrigger: {
                  trigger: el,
                  start: 'top 88%',
                  toggleActions: 'play none none none',
                },
              }
            : {}),
          onComplete,
        });
      });

      hasAnimated.current = true;
      return () => ctx.revert();
    }
  }, [split, delay, stagger, duration, ease, scrollTrigger, onComplete]);

  useEffect(() => {
    const cleanup = setupSplit();
    return () => {
      cleanup?.();
    };
  }, [setupSplit]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={containerRef as any} className={className}>
      {children}
    </Tag>
  );
}
