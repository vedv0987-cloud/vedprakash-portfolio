'use client';

import { useRef, useEffect } from 'react';
import { videoProjects, siteConfig } from '@/data/portfolio';
import VideoHoverCard from '@/components/ui/VideoHoverCard';
import { gsap } from '@/hooks/useGSAP';

export default function VideoShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header reveal
      if (headerRef.current) {
        gsap.fromTo(headerRef.current, { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 88%', toggleActions: 'play none none none' },
        });
      }

      // Video cards staggered cascade
      if (gridRef.current) {
        gsap.fromTo(gridRef.current.children, { opacity: 0, y: 60 }, {
          opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="films" className="py-28 md:py-40 px-6 lg:px-12 max-w-[1400px] mx-auto">
      {/* Section Header */}
      <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-20 pb-8 border-b border-white/[0.08] gap-6 opacity-0">
        <div>
          <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase block mb-3">
            02 / CINEMATOGRAPHY &amp; MOTION
          </span>
          <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-light tracking-[-0.02em] text-white leading-[1.08]">
            Motion <span className="serif-italic font-normal">&amp; Cinematic</span> Reels
          </h2>
          <p className="mt-3 text-base text-white/45 max-w-xl font-light">
            Hover to preview. Click to launch the in-website cinema player.
          </p>
        </div>

        <a
          href={siteConfig.portfolioDrive}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-white px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider font-bold transition-all duration-300 shrink-0"
        >
          <span>All Reels on Drive</span>
          <span>↗</span>
        </a>
      </div>

      {/* Video Cards Grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {videoProjects.map((vid) => (
          <div key={vid.id} className="opacity-0">
            <VideoHoverCard project={vid} />
          </div>
        ))}
      </div>
    </section>
  );
}
