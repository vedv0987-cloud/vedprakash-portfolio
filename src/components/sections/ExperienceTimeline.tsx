'use client';

import { motion } from 'framer-motion';
import { experienceData, siteConfig } from '@/data/portfolio';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#7c3aed] uppercase tracking-widest bg-[#7c3aed]/10 px-3.5 py-1 rounded-full mb-3">
            <span>Career Progression</span>
          </div>
          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold tracking-tight text-[#0a0a0c]">
            Leadership Experience & Impact
          </h2>
          <p className="mt-2 text-base sm:text-lg text-[#52525b] max-w-2xl">
            A 12-year trajectory leading creative teams, building commercial visual identities, and orchestrating generative AI production pipelines.
          </p>
        </div>

        <a
          href={siteConfig.cvPath}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-black/[0.12] hover:border-black bg-white px-6 py-3 rounded-full text-[14px] font-medium text-[#0a0a0c] transition-all duration-200 shrink-0 shadow-xs"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Download Verified Resume</span>
        </a>
      </div>

      {/* Timeline Cards */}
      <div className="space-y-6">
        {experienceData.map((exp, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="p-8 sm:p-10 rounded-3xl bg-white border border-black/[0.08] shadow-sm hover:shadow-xl hover:border-black/[0.18] transition-all duration-300 grid lg:grid-cols-12 gap-8"
          >
            {/* Left Column: Role & Period */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-[#71717a] bg-black/[0.04] px-3 py-1 rounded-full">
                    {exp.period}
                  </span>
                  {exp.current && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      ACTIVE
                    </span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0a0a0c] mt-3">
                  {exp.role}
                </h3>
                <p className="text-[15px] font-semibold text-[#7c3aed] mt-1">
                  {exp.company}
                </p>
                <p className="text-[13px] text-[#71717a] mt-0.5">
                  {exp.companyType} · {exp.location}
                </p>
              </div>
            </div>

            {/* Right Column: Key Achievements */}
            <div className="lg:col-span-8 lg:border-l lg:border-black/[0.06] lg:pl-8 flex flex-col justify-center">
              <ul className="space-y-3">
                {exp.achievements.map((ach, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[14px] sm:text-[15px] text-[#52525b] leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] mt-2 shrink-0" />
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
