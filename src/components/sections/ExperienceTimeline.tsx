'use client';

import { useRef, useEffect } from 'react';
import { experienceData, siteConfig } from '@/data/portfolio';
import { gsap } from '@/hooks/useGSAP';

export default function ExperienceTimeline() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.exp-reveal',
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
      id="experience"
      className="py-24 md:py-36 px-6 lg:px-12 max-w-[1360px] mx-auto bg-[#ffffff]"
    >
      {/* Header */}
      <div className="exp-reveal flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-black/[0.08] gap-6">
        <div>
          <span className="font-mono text-[11px] text-[#86868b] tracking-wider uppercase block mb-2 font-medium">
            03 / CAREER &amp; LEADERSHIP
          </span>
          <h2 className="text-[clamp(2.25rem,5vw,3.75rem)] font-semibold tracking-[-0.03em] text-[#1d1d1f] leading-[1.08]">
            Professional <span className="serif-italic font-normal text-[#0071e3]">Trajectory</span>
          </h2>
          <p className="mt-3 text-base text-[#6e6e73] max-w-xl font-normal">
            Over a decade orchestrating creative departments, luxury campaigns, and enterprise AI production systems.
          </p>
        </div>

        <a
          href={siteConfig.cvPath}
          download="Vedprakash_Vishwakarma_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-black/[0.12] hover:border-black/[0.25] bg-[#f5f5f7] hover:bg-[#e8e8ed] px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-[#1d1d1f] transition-colors shrink-0 shadow-2xs"
        >
          <span>Download Verified Resume</span>
          <span>↓</span>
        </a>
      </div>

      {/* Timeline Rows */}
      <div className="divide-y divide-black/[0.08]">
        {experienceData.map((exp, i) => (
          <div key={i} className="exp-reveal py-12 grid lg:grid-cols-12 gap-8 items-start">
            {/* Period & Status */}
            <div className="lg:col-span-3">
              <span className="font-mono text-xs text-[#86868b] block mb-2 font-medium">
                {exp.period}
              </span>
              {exp.current && (
                <span className="inline-block text-[11px] font-mono font-bold tracking-wider uppercase text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  ● ACTIVE POSITION
                </span>
              )}
            </div>

            {/* Role & Organization */}
            <div className="lg:col-span-4">
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#1d1d1f]">
                {exp.role}
              </h3>
              <p className="text-sm font-medium text-[#1d1d1f] mt-1">
                {exp.company}
              </p>
              <p className="text-xs text-[#86868b] mt-0.5 font-medium">
                {exp.companyType} · {exp.location}
              </p>
            </div>

            {/* Achievements */}
            <div className="lg:col-span-5">
              <ul className="space-y-3">
                {exp.achievements.map((ach, idx) => (
                  <li key={idx} className="text-sm text-[#48484a] leading-relaxed flex items-start gap-3">
                    <span className="text-[#0071e3] font-mono text-xs mt-0.5">—</span>
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
