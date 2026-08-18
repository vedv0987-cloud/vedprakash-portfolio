'use client';

import { useRef, useEffect } from 'react';
import { videoProjects, siteConfig } from '@/data/portfolio';
import VideoHoverCard from '@/components/ui/VideoHoverCard';
import { gsap } from '@/hooks/useGSAP';

export default function VideoShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.video-reveal',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="films"
      className="py-24 md:py-36 px-6 lg:px-12 max-w-[1360px] mx-auto bg-[#ffffff]"
    >
      {/* Section Header */}
      <div className="video-reveal flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-black/[0.08] gap-6">
        <div>
          <span className="font-mono text-[11px] text-[#86868b] tracking-wider uppercase block mb-2 font-medium">
            02 / CINEMATOGRAPHY &amp; MOTION
          </span>
          <h2 className="text-[clamp(2.25rem,5vw,3.75rem)] font-semibold tracking-[-0.03em] text-[#1d1d1f] leading-[1.08]">
            Motion <span className="serif-italic font-normal text-[#0071e3]">&amp; Cinematic</span> Reels
          </h2>
          <p className="mt-3 text-base text-[#6e6e73] max-w-xl font-normal">
            Hover over any project reel to initiate instant preview. Click to launch the 4K Cinema Master player.
          </p>
        </div>

        <a
          href={siteConfig.portfolioDrive}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#0071e3] text-white hover:bg-[#0077ed] px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-xs shrink-0"
        >
          <span>Stream All Master Reels on Drive</span>
          <span>↗</span>
        </a>
      </div>

      {/* Grid of Video Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videoProjects.map((vid) => (
          <div key={vid.id} className="video-reveal">
            <VideoHoverCard project={vid} />
          </div>
        ))}
      </div>
    </section>
  );
}
