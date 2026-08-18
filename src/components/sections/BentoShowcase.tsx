'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { bentoProjects, siteConfig } from '@/data/portfolio';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function BentoShowcase() {
  const featured = bentoProjects[0];
  const secondary = bentoProjects.slice(1);

  return (
    <section id="work" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#7c3aed] uppercase tracking-widest bg-[#7c3aed]/10 px-3.5 py-1 rounded-full mb-3">
            <span>Commercial Portfolio</span>
          </div>
          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold tracking-tight text-[#0a0a0c]">
            Selected Works & Productions
          </h2>
          <p className="mt-2 text-base sm:text-lg text-[#52525b] max-w-2xl">
            High-impact visual productions blending generative AI pipelines, 3D architectural rendering, and commercial art direction.
          </p>
        </div>

        <a
          href={siteConfig.portfolioDrive}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#0a0a0c] text-white hover:bg-black px-6 py-3 rounded-full text-[14px] font-medium transition-all duration-200 hover:shadow-lg shrink-0"
        >
          <span>View All 50+ Assets on Drive</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </a>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ── Featured Large Card (Realatte Luxury Real Estate) ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="lg:col-span-12 group relative rounded-3xl overflow-hidden glass-panel border border-black/[0.08] shadow-lg grid lg:grid-cols-12"
        >
          {/* Visual Canvas Half */}
          <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[480px] overflow-hidden bg-black/[0.04]">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-black/70 backdrop-blur-md text-white text-[12px] font-semibold px-3 py-1 rounded-full border border-white/20">
                ⭐ FEATURED PRODUCTION
              </span>
              <span className="bg-white/90 backdrop-blur-md text-[#0a0a0c] text-[12px] font-semibold px-3 py-1 rounded-full">
                {featured.period}
              </span>
            </div>
          </div>

          {/* Description & Metadata Half */}
          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between bg-white/95">
            <div>
              <div className="flex items-center justify-between text-[13px] text-[#71717a] font-medium mb-3">
                <span className="text-[#7c3aed] font-semibold">{featured.category}</span>
                <span>{featured.client}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0a0a0c] leading-snug">
                {featured.title}
              </h3>

              <p className="mt-4 text-[15px] text-[#52525b] leading-relaxed">
                {featured.description}
              </p>

              {/* Impact Metric */}
              <div className="mt-6 p-4 rounded-2xl bg-[#fafafa] border border-black/[0.06] flex items-center gap-4">
                <span className="text-3xl font-bold gradient-text">{featured.stats.metric}</span>
                <span className="text-[13px] font-medium text-[#52525b]">{featured.stats.label}</span>
              </div>

              {/* Models / Tools Used */}
              <div className="mt-6 flex flex-wrap gap-2">
                {featured.models.map((tool) => (
                  <span
                    key={tool}
                    className="text-[12px] font-medium px-3 py-1 rounded-full bg-black/[0.04] text-[#52525b] border border-black/[0.04]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-black/[0.06] flex items-center justify-between">
              <a
                href={siteConfig.portfolioDrive}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#0a0a0c] hover:text-[#7c3aed] transition-colors"
              >
                <span>View Full Campaign Deck</span>
                <span className="text-base">↗</span>
              </a>
              <span className="text-[12px] text-[#a1a1aa] font-mono">ID: RE-2025-V1</span>
            </div>
          </div>
        </motion.div>

        {/* ── 3 Secondary Bento Cards ── */}
        {secondary.map((project, i) => (
          <motion.div
            key={project.id}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="lg:col-span-4 group relative rounded-3xl overflow-hidden glass-panel border border-black/[0.08] shadow-md flex flex-col justify-between bg-white"
          >
            {/* Visual Header */}
            <div className="relative aspect-[16/10] overflow-hidden bg-black/[0.04]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-106"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
              <div className="absolute top-3.5 left-3.5">
                <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-full border border-white/20">
                  {project.category}
                </span>
              </div>
              <div className="absolute bottom-3 right-3 text-right">
                <span className="bg-white/90 backdrop-blur-md text-[#0a0a0c] text-[12px] font-bold px-2.5 py-0.5 rounded-md">
                  {project.stats.metric}
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-[12px] font-medium text-[#71717a]">{project.client}</p>
                <h3 className="text-xl font-bold tracking-tight text-[#0a0a0c] mt-1 group-hover:text-[#7c3aed] transition-colors">
                  {project.title}
                </h3>
                <p className="mt-2.5 text-[14px] text-[#52525b] leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-black/[0.06]">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.models.slice(0, 3).map((m) => (
                    <span
                      key={m}
                      className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#fafafa] text-[#71717a] border border-black/[0.06]"
                    >
                      {m}
                    </span>
                  ))}
                </div>

                <a
                  href={siteConfig.portfolioDrive}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0a0a0c] hover:text-[#7c3aed] transition-colors"
                >
                  <span>Open in Drive</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
