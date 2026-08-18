'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Animate elements as they enter viewport with staggered reveal.
 * Add `data-animate` attribute to elements you want to animate.
 * Supports: data-animate="fade-up" | "fade-in" | "slide-left" | "slide-right"
 */
export function useScrollReveal(containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Fade-up reveals
      gsap.utils.toArray<HTMLElement>('[data-animate="fade-up"]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Staggered children reveals
      gsap.utils.toArray<HTMLElement>('[data-animate="stagger"]').forEach((container) => {
        const children = container.children;
        gsap.fromTo(
          children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);
}

/**
 * Create a parallax effect on an element.
 * The element moves at a different speed than the scroll.
 */
export function useParallax(
  elementRef: React.RefObject<HTMLElement | null>,
  speed: number = 0.3
) {
  useEffect(() => {
    if (!elementRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(elementRef.current, {
        yPercent: -speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [elementRef, speed]);
}

/**
 * Split text into lines/words and animate them in with clipped reveal.
 */
export function useTextReveal(elementRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!elementRef.current) return;
    const el = elementRef.current;

    // Wrap each word in a span for animation
    const text = el.textContent || '';
    const words = text.split(' ');
    el.innerHTML = words
      .map(
        (word) =>
          `<span style="display:inline-block;overflow:hidden;vertical-align:top;"><span style="display:inline-block;transform:translateY(100%)">${word}</span></span>`
      )
      .join(' ');

    const innerSpans = el.querySelectorAll('span > span');

    const ctx = gsap.context(() => {
      gsap.to(innerSpans, {
        y: 0,
        duration: 0.9,
        stagger: 0.04,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, [elementRef]);
}

export { gsap, ScrollTrigger };
