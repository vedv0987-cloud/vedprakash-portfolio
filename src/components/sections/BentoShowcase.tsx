'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { bentoProjects, siteConfig, toolLinks } from '@/data/portfolio';
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';
import { gsap } from '@/hooks/useGSAP';

const dynamicMetrics = [
  { label: 'Production Efficiency', value: '5x', suffix: 'Speedup', badge: 'AI Automation' },
  { label: 'Render Fidelity', value: '8K', suffix: 'Broadcast Master', badge: 'Lossless CGI' },
  { label: 'Timeline Compression', value: '60%', suffix: 'Faster Delivery', badge: 'Zero Latency' },
  { label: 'Prompt Architecture', value: '99.4%', suffix: 'Accuracy', badge: 'Seed Locked' },
  { label: 'Campaign Impact', value: '3x', suffix: 'Engagement Lift', badge: 'Luxury Real Estate' },
  { label: 'Cost Optimization', value: '40%', suffix: 'Budget Saved', badge: 'Scalable Pipeline' },
  { label: 'Visual Consistency', value: '100%', suffix: 'Persistence', badge: 'Multi-Model' },
  { label: 'Camera Direction', value: '60 FPS', suffix: 'Cinema Flow', badge: 'Volumetric Flight' },
  { label: 'Audio Spatial Design', value: 'Lossless', suffix: 'Studio SFX', badge: 'ElevenLabs Voice' },
];

const filterCategories = [
  'All Works',
  'Creative AI & Python',
  '3D & Luxury Horology',
  'Medical & Healthcare',
  'Cinematic CGI',
  'Luxury Real Estate',
];

export default function BentoShowcase() {
  const [metricIndex, setMetricIndex] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('All Works');
  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const featured = bentoProjects[0];
  const secondaryProjects = bentoProjects.slice(1);

  const filteredProjects = selectedFilter === 'All Works'
    ? secondaryProjects
    : secondaryProjects.filter((p) => p.filterCategory === selectedFilter);

  // Auto-cycle dynamic metrics every 2.6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMetricIndex((prev) => (prev + 1) % dynamicMetrics.length);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll('.bento-reveal'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
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

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 420;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const currentMetric = dynamicMetrics[metricIndex];

  return (
    <section
      ref={sectionRef}
      id="work"
      className="py-16 md:py-24 px-6 lg:px-12 max-w-[1360px] mx-auto bg-[#ffffff]"
    >
      {/* Section Header */}
      <div className="bento-reveal flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-black/[0.08] gap-6">
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

              {/* Dynamic Cycling Impact Pill */}
              <div className="mt-6 p-4 rounded-2xl bg-white border border-black/[0.08] shadow-sm overflow-hidden">
                <div className="flex items-center justify-between min-h-[44px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentMetric.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
                      className="flex flex-col"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#86868b] font-medium">
                          {currentMetric.label}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#0071e3]/10 text-[#0071e3] font-semibold">
                          {currentMetric.badge}
                        </span>
                      </div>
                      <div className="mt-0.5">
                        <span className="text-2xl font-bold text-[#1d1d1f] font-mono tabular-nums">
                          {currentMetric.value}
                        </span>{' '}
                        <span className="text-xs text-[#0071e3] font-semibold">
                          {currentMetric.suffix}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Dot step indicator */}
                  <div className="flex items-center gap-1">
                    {dynamicMetrics.map((_, idx) => (
                      <span
                        key={idx}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          metricIndex === idx ? 'w-4 bg-[#0071e3]' : 'w-1.5 bg-black/15'
                        }`}
                      />
                    ))}
                  </div>
                </div>
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
              <Link
                href={`/work/${featured.id}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#1d1d1f] hover:text-[#0071e3] transition-colors"
              >
                Read case study <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Specialized Showcase Header & Filter Tabs ── */}
      <div className="bento-reveal mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-[#f5f5f7] border border-black/[0.06] rounded-2xl">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                selectedFilter === cat
                  ? 'bg-[#0071e3] text-white shadow-xs'
                  : 'bg-transparent text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-white/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => handleScroll('left')}
            className="w-10 h-10 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] border border-black/[0.08] flex items-center justify-center font-bold text-sm transition-all hover:scale-105 cursor-pointer shadow-2xs"
            title="Scroll Left"
          >
            ←
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="w-10 h-10 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] border border-black/[0.08] flex items-center justify-center font-bold text-sm transition-all hover:scale-105 cursor-pointer shadow-2xs"
            title="Scroll Right"
          >
            →
          </button>
        </div>
      </div>

      {/* ── Horizontal Scrollable Showcase Gallery (8+ Projects) ── */}
      <div
        ref={scrollContainerRef}
        className="bento-reveal flex gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {filteredProjects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="min-w-[340px] sm:min-w-[380px] max-w-[380px] snap-start p-6 rounded-3xl bg-[#f5f5f7] border border-black/[0.06] hover:border-black/[0.14] transition-all duration-300 flex flex-col justify-between shadow-2xs hover:shadow-xl group"
          >
            <div>
              {/* Visual Thumbnail (Click to open full high-res) */}
              <div
                onClick={() => window.open(project.image, '_blank', 'noopener,noreferrer')}
                className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-white mb-5 border border-black/[0.06] cursor-pointer shadow-2xs group-hover:shadow-md transition-shadow"
                title="Click to view full high-resolution image in new tab"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 380px"
                />
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1d1d1f] text-[10px] font-mono font-bold shadow-xs">
                    View High-Res ↗
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-[#86868b] mb-1.5">
                <span>{String(i + 2).padStart(2, '0')} / {project.client.toUpperCase()}</span>
                <span className="font-semibold text-[#0071e3] bg-[#0071e3]/10 px-2 py-0.5 rounded-full text-[10px]">
                  {project.stats.metric}
                </span>
              </div>

              <h4 className="text-lg font-semibold tracking-tight text-[#1d1d1f] leading-snug group-hover:text-[#0071e3] transition-colors">
                {project.title}
              </h4>

              <p className="mt-2.5 text-xs text-[#6e6e73] leading-relaxed line-clamp-3">
                {project.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-black/[0.06]">
              {/* Clickable Tool Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3.5">
                {project.models.map((m) => {
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

              <div className="flex items-center justify-between pt-1">
                <Link
                  href={`/work/${project.id}`}
                  className="text-xs font-semibold text-[#0071e3] hover:underline flex items-center gap-1"
                >
                  <span>Read case study</span>
                  <span>→</span>
                </Link>

                <span className="text-[10px] font-mono text-[#86868b]">
                  {project.period}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
