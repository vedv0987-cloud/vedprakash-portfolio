'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { bentoProjects, siteConfig, toolLinks } from '@/data/portfolio';
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';
import TextReveal from '@/components/ui/TextReveal';
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
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
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
      className="py-20 md:py-32 px-6 lg:px-12 max-w-[1360px] mx-auto"
    >
      {/* Section Header */}
      <div className="bento-reveal flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-border gap-6">
        <div>
          <span className="font-mono text-[11px] text-text-subtle tracking-wider uppercase block mb-3 font-medium">
            01 / SELECTED COMMISSIONS
          </span>
          <h2 className="text-display font-display font-semibold tracking-tight text-text-main leading-[1.0]">
            Curated Visual <span className="serif-italic font-normal text-accent">Productions</span>
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={siteConfig.behance}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-semibold uppercase tracking-wider text-accent hover:underline font-mono"
          >
            Behance Index ↗
          </a>
          <span className="text-border-strong">·</span>
          <a
            href={siteConfig.portfolioDrive}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-semibold uppercase tracking-wider text-accent hover:underline font-mono"
          >
            Drive Vault (50+ Items) ↗
          </a>
        </div>
      </div>

      {/* Featured Project */}
      <div className="bento-reveal mb-20 p-8 lg:p-12 rounded-3xl bg-bg-secondary border border-border">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <BeforeAfterSlider
              beforeImage="/images/luxury-realestate.jpg"
              afterImage="/images/realestate-cinema.jpg"
              beforeLabel="RAW SYNTHESIS PASS"
              afterLabel="FINAL 8K BROADCAST MASTER"
              aspectRatio="aspect-[16/10]"
            />
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono text-text-subtle mb-4">
                <span>01 / REALATTE CREATIVE</span>
                <span>2025 – PRESENT</span>
              </div>

              <h3 className="text-h3 font-display font-semibold tracking-tight text-text-main leading-snug">
                {featured.title}
              </h3>

              <p className="mt-4 text-body text-text-muted leading-relaxed font-normal">
                {featured.description}
              </p>

              {/* Dynamic Metric Card */}
              <div className="mt-6 p-4 rounded-2xl bg-bg-card border border-border overflow-hidden">
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
                        <span className="text-[11px] font-mono uppercase tracking-wider text-text-subtle font-medium">
                          {currentMetric.label}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent/10 text-accent font-semibold">
                          {currentMetric.badge}
                        </span>
                      </div>
                      <div className="mt-0.5">
                        <span className="text-2xl font-display font-bold text-text-main tabular-nums">
                          {currentMetric.value}
                        </span>{' '}
                        <span className="text-xs text-accent font-semibold">
                          {currentMetric.suffix}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex items-center gap-1">
                    {dynamicMetrics.map((_, idx) => (
                      <span
                        key={idx}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          metricIndex === idx ? 'w-4 bg-accent' : 'w-1 bg-border-strong'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Tool Tags */}
              <div className="mt-6">
                <span className="text-[11px] font-mono text-text-subtle uppercase tracking-wider block mb-2">
                  Integrated Toolchain:
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
                        className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-bg-card hover:bg-accent text-text-main hover:text-white border border-border transition-all duration-200 shadow-xs flex items-center gap-1.5 font-mono"
                      >
                        <span>{tool}</span>
                        <span className="text-[10px] opacity-60">↗</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border flex items-center gap-6">
              <a
                href={siteConfig.portfolioDrive}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-accent hover:underline"
              >
                Access Full Campaign Deck ↗
              </a>
              <Link
                href={`/work/${featured.id}`}
                className="text-sm font-semibold text-text-main hover:text-accent transition-colors"
              >
                Read case study →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bento-reveal mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2 p-1.5 bg-bg-secondary border border-border rounded-2xl">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 rounded-xl text-[11px] font-semibold tracking-wide transition-all duration-200 cursor-pointer font-mono ${
                selectedFilter === cat
                  ? 'bg-accent text-white shadow-xs'
                  : 'bg-transparent text-text-muted hover:text-text-main hover:bg-bg-card/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => handleScroll('left')}
            className="w-10 h-10 rounded-full bg-bg-secondary hover:bg-bg-card text-text-main border border-border flex items-center justify-center font-bold text-sm transition-all hover:scale-105 cursor-pointer shadow-xs"
            title="Scroll Left"
          >
            ←
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="w-10 h-10 rounded-full bg-bg-secondary hover:bg-bg-card text-text-main border border-border flex items-center justify-center font-bold text-sm transition-all hover:scale-105 cursor-pointer shadow-xs"
            title="Scroll Right"
          >
            →
          </button>
        </div>
      </div>

      {/* Project Cards Carousel */}
      <div
        ref={scrollContainerRef}
        className="bento-reveal flex gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {filteredProjects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            className="min-w-[340px] sm:min-w-[380px] max-w-[380px] snap-start p-6 rounded-3xl bg-bg-secondary border border-border hover:border-border-strong transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div
                onClick={() => window.open(project.image, '_blank', 'noopener,noreferrer')}
                className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-bg-card mb-5 border border-border cursor-pointer group-hover:shadow-md transition-shadow"
                title="Click to view full high-resolution image"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 380px"
                />
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="px-2.5 py-1 rounded-full bg-bg-card/90 backdrop-blur-md text-text-main text-[10px] font-mono font-bold shadow-xs">
                    View High-Res ↗
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-text-subtle mb-1.5">
                <span>{String(i + 2).padStart(2, '0')} / {project.client.toUpperCase()}</span>
                <span className="font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-full text-[10px]">
                  {project.stats.metric}
                </span>
              </div>

              <h4 className="text-lg font-display font-semibold tracking-tight text-text-main leading-snug group-hover:text-accent transition-colors">
                {project.title}
              </h4>

              <p className="mt-2.5 text-xs text-text-muted leading-relaxed line-clamp-3">
                {project.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex flex-wrap gap-1.5 mb-3.5">
                {project.models.map((m) => {
                  const url = toolLinks[m] || 'https://google.com';
                  return (
                    <a
                      key={m}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-bg-card hover:bg-accent text-text-main hover:text-white border border-border transition-colors flex items-center gap-1 shadow-xs"
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
                  className="text-xs font-semibold text-accent hover:underline flex items-center gap-1"
                >
                  <span>Read case study</span>
                  <span>→</span>
                </Link>
                <span className="text-[10px] font-mono text-text-subtle">
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
