'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { bentoProjects, siteConfig } from '@/data/portfolio';
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function BentoShowcase() {
  const featured = bentoProjects[0];
  const secondary = bentoProjects.slice(1);

  return (
    <section id="work" className="py-24 md:py-36 px-6 lg:px-12 max-w-[1400px] mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/10 gap-6">
        <div>
          <span className="font-mono text-xs text-white/40 tracking-widest uppercase block mb-2">
            INDEX 01 / SELECTED COMMISSIONS
          </span>
          <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-light tracking-tight text-white leading-[1.08]">
            Curated Visual <span className="serif-italic font-normal">Productions</span>
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={siteConfig.behance}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold uppercase tracking-wider text-white hover:underline"
          >
            Behance Index ↗
          </a>
          <span className="text-[#d1d1cf]">/</span>
          <a
            href={siteConfig.portfolioDrive}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold uppercase tracking-wider text-white hover:underline"
          >
            Google Drive Vault (50+ Items) ↗
          </a>
        </div>
      </div>

      {/* Featured Primary Project: Realatte Luxury Real Estate */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="mb-20 pb-20 border-b border-white/10"
      >
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

          {/* Editorial Project Breakdown */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-white/40 mb-4">
                <span>01 / REALATTE CREATIVE</span>
                <span>2025 – PRESENT</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-light tracking-tight text-white leading-tight">
                {featured.title}
              </h3>

              <p className="mt-5 text-base text-white/70 leading-relaxed font-normal">
                {featured.description}
              </p>

              {/* Verified Impact */}
              <div className="mt-8 py-4 border-y border-white/10 flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wider uppercase text-white/70">
                  Production Efficiency
                </span>
                <span className="text-2xl font-light text-white font-mono">
                  {featured.stats.metric} Speedup
                </span>
              </div>

              {/* Technical Stack */}
              <div className="mt-6 flex flex-wrap gap-2">
                {featured.models.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs font-medium px-3 py-1 rounded-full bg-black/[0.04] text-white/70"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <a
                href={siteConfig.portfolioDrive}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:opacity-70 transition-opacity"
              >
                <span>Access Full Real Estate Campaign Deck on Drive</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Secondary Project Gallery Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {secondary.map((project, i) => (
          <motion.div
            key={project.id}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="group flex flex-col"
          >
            {/* Visual Canvas */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#e5e5e0] mb-6">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>

            {/* Content Breakdown */}
            <div className="flex flex-col flex-1 justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-white/40 mb-2">
                  <span>0{i + 2} / {project.client.toUpperCase()}</span>
                  <span>{project.stats.metric}</span>
                </div>

                <h4 className="text-xl sm:text-2xl font-light tracking-tight text-white group-hover:text-white transition-colors">
                  {project.title}
                </h4>

                <p className="mt-3 text-sm text-white/70 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {project.models.slice(0, 2).map((m) => (
                    <span key={m} className="text-[11px] font-mono text-white/40">
                      {m}
                    </span>
                  ))}
                </div>

                <a
                  href={siteConfig.portfolioDrive}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-white group-hover:underline"
                >
                  View ↗
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
