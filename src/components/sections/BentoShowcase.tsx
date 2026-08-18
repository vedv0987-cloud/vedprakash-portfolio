'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { bentoProjects, siteConfig, toolLinks } from '@/data/portfolio';
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';
import { gsap } from '@/hooks/useGSAP';

export default function BentoShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const featured = bentoProjects[0];
  const secondary = bentoProjects.slice(1);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.bento-reveal',
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
      id="work"
      className="py-16 md:py-24 px-6 lg:px-12 max-w-[1360px] mx-auto bg-[#ffffff]"
    >
      {/* Section Header */}
      <div className="bento-reveal flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-black/[0.08] gap-6">
        <div>
          <span className="font-mono text-[11px] text-[#86868b] tracking-wider uppercase block mb-2 font-medium">
            01 / SELECTED COMMISSIONS
          </span>
          <h2 className="text-[clamp(2.25rem,5vw,3.75rem)] font-semibold tracking-[-0.03em] text-[#1d1d1f] leading-[1.08]">
            Curated Visual <span className="serif-italic font-normal text-[#0071e3]">Productions</span>
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={siteConfig.behance}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold uppercase tracking-wider text-[#0071e3] hover:underline"
          >
            Behance Index ↗
          </a>
          <span className="text-[#d2d2d7]">·</span>
          <a
            href={siteConfig.portfolioDrive}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold uppercase tracking-wider text-[#0071e3] hover:underline"
          >
            Drive Vault (50+ Items) ↗
          </a>
        </div>
      </div>

      {/* Featured Primary Project: Realatte Luxury Real Estate */}
      <div className="bento-reveal mb-16 p-8 lg:p-12 rounded-3xl bg-[#f5f5f7] border border-black/[0.06] shadow-sm">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Interactive Before/After Visual Canvas */}
          <div className="lg:col-span-7">
            <BeforeAfterSlider
              beforeImage="/images/luxury-realestate.jpg"
              afterImage="/images/realestate-cinema.jpg"
              beforeLabel="RAW SYNTHESIS PASS"
              afterLabel="FINAL 8K BROADCAST MASTER"
              aspectRatio="aspect-[16/10]"
            />
          </div>

          {/* Project Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[#86868b] mb-4">
                <span>01 / REALATTE CREATIVE</span>
                <span>2025 – PRESENT</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1d1d1f] leading-snug">
                {featured.title}
              </h3>

              <p className="mt-4 text-base text-[#6e6e73] leading-relaxed font-normal">
                {featured.description}
              </p>

              {/* Verified Impact Pill */}
              <div className="mt-6 py-3.5 px-4 rounded-xl bg-white border border-black/[0.06] flex items-center justify-between shadow-2xs">
                <span className="text-xs font-medium uppercase tracking-wider text-[#86868b]">
                  Production Efficiency
                </span>
                <span className="text-xl font-bold text-[#1d1d1f] font-mono">
                  {featured.stats.metric} <span className="text-xs text-[#0071e3] font-sans">Speedup</span>
                </span>
              </div>

              {/* Clickable Tool Tags */}
              <div className="mt-6">
                <span className="text-[11px] font-mono text-[#86868b] uppercase tracking-wider block mb-2">
                  Integrated Toolchain (Click to View):
                </span>
                <div className="flex flex-wrap gap-2">
                  {featured.models.map((tool) => {
                    const url = toolLinks[tool] || 'https://google.com';
                    return (
                      <a
                        key={tool}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium px-3 py-1.5 rounded-full bg-white hover:bg-[#0071e3] text-[#1d1d1f] hover:text-white border border-black/[0.08] transition-all duration-200 shadow-2xs hover:shadow-xs flex items-center gap-1.5"
                      >
                        <span>{tool}</span>
                        <span className="text-[10px] opacity-60">↗</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-black/[0.06]">
              <a
                href={siteConfig.portfolioDrive}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0071e3] hover:underline"
              >
                <span>Access Full Real Estate Campaign Deck on Drive</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {secondary.map((project, i) => (
          <div
            key={project.id}
            className="bento-reveal p-6 rounded-3xl bg-[#f5f5f7] border border-black/[0.06] hover:border-black/[0.14] transition-all duration-300 flex flex-col justify-between shadow-2xs hover:shadow-md"
          >
            <div>
              {/* Visual Thumbnail */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white mb-6 border border-black/[0.04]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-[#86868b] mb-2">
                <span>0{i + 2} / {project.client.toUpperCase()}</span>
                <span className="font-semibold text-[#1d1d1f]">{project.stats.metric}</span>
              </div>

              <h4 className="text-xl font-semibold tracking-tight text-[#1d1d1f] leading-snug">
                {project.title}
              </h4>

              <p className="mt-3 text-sm text-[#6e6e73] leading-relaxed line-clamp-3">
                {project.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-black/[0.06]">
              {/* Clickable Tool Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.models.slice(0, 3).map((m) => {
                  const url = toolLinks[m] || 'https://google.com';
                  return (
                    <a
                      key={m}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white hover:bg-[#0071e3] text-[#1d1d1f] hover:text-white border border-black/[0.06] transition-colors flex items-center gap-1 shadow-2xs"
                    >
                      <span>{m}</span>
                      <span className="opacity-50">↗</span>
                    </a>
                  );
                })}
              </div>

              <div className="flex items-center justify-between">
                <a
                  href={siteConfig.portfolioDrive}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#0071e3] hover:underline flex items-center gap-1"
                >
                  <span>View Case Deck</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
