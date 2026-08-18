'use client';

import { motion } from 'framer-motion';
import { experienceData, siteConfig } from '@/data/portfolio';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="py-24 md:py-36 px-6 lg:px-12 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/10 gap-6">
        <div>
          <span className="font-mono text-xs text-white/40 tracking-widest uppercase block mb-2">
            INDEX 03 / CAREER &amp; LEADERSHIP
          </span>
          <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-light tracking-tight text-white leading-[1.08]">
            Professional <span className="serif-italic font-normal">Trajectory</span>
          </h2>
          <p className="mt-3 text-base text-white/70 max-w-xl">
            Over a decade orchestrating creative departments, luxury real estate campaign launches, and AI production systems.
          </p>
        </div>

        <a
          href={siteConfig.cvPath}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-white/20 hover:border-white/30 bg-[#0a0a0a] px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white transition-colors shrink-0 shadow-xs"
        >
          <span>Download Verified Resume</span>
          <span>↓</span>
        </a>
      </div>

      {/* Timeline Rows */}
      <div className="divide-y divide-black/[0.08]">
        {experienceData.map((exp, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="py-12 grid lg:grid-cols-12 gap-8 items-start"
          >
            {/* Period & Status */}
            <div className="lg:col-span-3">
              <span className="font-mono text-xs text-white/40 block mb-2">
                {exp.period}
              </span>
              {exp.current && (
                <span className="inline-block text-[11px] font-mono font-bold tracking-wider uppercase text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  ● ACTIVE POSITION
                </span>
              )}
            </div>

            {/* Role & Organization */}
            <div className="lg:col-span-4">
              <h3 className="text-2xl font-light tracking-tight text-white">
                {exp.role}
              </h3>
              <p className="text-sm font-semibold text-white mt-1">
                {exp.company}
              </p>
              <p className="text-xs text-white/40 mt-0.5">
                {exp.companyType} · {exp.location}
              </p>
            </div>

            {/* Achievements */}
            <div className="lg:col-span-5">
              <ul className="space-y-3">
                {exp.achievements.map((ach, idx) => (
                  <li key={idx} className="text-sm text-white/70 leading-relaxed flex items-start gap-3">
                    <span className="text-white/40 font-mono text-xs mt-0.5">—</span>
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
