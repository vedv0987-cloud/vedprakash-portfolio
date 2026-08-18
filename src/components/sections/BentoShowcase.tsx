'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { bentoProjects, siteConfig } from '@/data/portfolio';
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';
import { gsap, ScrollTrigger } from '@/hooks/useGSAP';

export default function BentoShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const featuredRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const featured = bentoProjects[0];
  const secondary = bentoProjects.slice(1);

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

      // Featured project: slide in from left
      if (featuredRef.current) {
        gsap.fromTo(featuredRef.current, { opacity: 0, y: 60 }, {
          opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: featuredRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        });
      }

      // Secondary cards: staggered cascade
      if (gridRef.current) {
        gsap.fromTo(gridRef.current.children, { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, stagger: 0.15, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        });
      }

      // Image parallax inside cards
      const imageContainers = sectionRef.current?.querySelectorAll('[data-parallax-image]');
      imageContainers?.forEach((container) => {
        const img = container.querySelector('img');
        if (img) {
          gsap.fromTo(img, { yPercent: -8 }, {
            yPercent: 8, ease: 'none',
            scrollTrigger: { trigger: container, start: 'top bottom', end: 'bottom top', scrub: true },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="py-28 md:py-40 px-6 lg:px-12 max-w-[1400px] mx-auto">
      {/* Section Header */}
      <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-20 pb-8 border-b border-white/[0.08] gap-6 opacity-0">
        <div>
          <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase block mb-3">
            01 / SELECTED COMMISSIONS
          </span>
          <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-light tracking-[-0.02em] text-white leading-[1.08]">
            Curated Visual <span className="serif-italic font-normal">Productions</span>
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <a href={siteConfig.behance} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold uppercase tracking-wider text-white/60 hover:text-white transition-colors">
            Behance ↗
          </a>
          <span className="text-white/15">·</span>
          <a href={siteConfig.portfolioDrive} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold uppercase tracking-wider text-white/60 hover:text-white transition-colors">
            Drive Vault ↗
          </a>
        </div>
      </div>

      {/* Featured Primary Project */}
      <div ref={featuredRef} className="mb-24 pb-24 border-b border-white/[0.06] opacity-0">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Interactive Before/After */}
          <div className="lg:col-span-7">
            <BeforeAfterSlider
              beforeImage="/images/luxury-realestate.jpg"
              afterImage="/images/realestate-cinema.jpg"
              beforeLabel="RAW SYNTHESIS PASS"
              afterLabel="FINAL 8K BROADCAST MASTER"
              aspectRatio="aspect-[16/10]"
            />
          </div>

          {/* Project Breakdown */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono text-white/30 mb-5 uppercase tracking-widest">
                <span>01 / REALATTE CREATIVE</span>
                <span>2025 – PRESENT</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-light tracking-tight text-white leading-snug">
                {featured.title}
              </h3>

              <p className="mt-6 text-base text-white/50 leading-relaxed font-light">
                {featured.description}
              </p>

              {/* Impact Metric */}
              <div className="mt-10 py-5 border-y border-white/[0.08] flex items-center justify-between">
                <span className="text-[10px] font-mono font-semibold tracking-widest uppercase text-white/40">
                  Production Efficiency
                </span>
                <span className="text-2xl font-light text-white tabular-nums">
                  {featured.stats.metric} <span className="text-sm text-white/40">Speedup</span>
                </span>
              </div>

              {/* Stack Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {featured.models.map((tool) => (
                  <span key={tool} className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/60">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <a href={siteConfig.portfolioDrive} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-light text-white/70 hover:text-white transition-colors group">
                <span>Full Campaign Deck</span>
                <span className="group-hover:translate-x-1 transition-transform">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Projects with Image Parallax */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {secondary.map((project, i) => (
          <div key={project.id} className="group flex flex-col opacity-0">
            {/* Image with Parallax */}
            <div data-parallax-image className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#111113] mb-6">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03] will-change-transform"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 justify-between">
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-white/25 mb-2 uppercase tracking-widest">
                  <span>0{i + 2} / {project.client.toUpperCase()}</span>
                  <span>{project.stats.metric}</span>
                </div>

                <h4 className="text-xl sm:text-2xl font-light tracking-tight text-white group-hover:text-white/90 transition-colors">
                  {project.title}
                </h4>

                <p className="mt-3 text-sm text-white/45 leading-relaxed line-clamp-3 font-light">
                  {project.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {project.models.slice(0, 2).map((m) => (
                    <span key={m} className="text-[10px] font-mono text-white/30">
                      {m}
                    </span>
                  ))}
                </div>

                <a href={siteConfig.portfolioDrive} target="_blank" rel="noopener noreferrer" className="text-xs font-light text-white/50 group-hover:text-white transition-colors">
                  View ↗
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
