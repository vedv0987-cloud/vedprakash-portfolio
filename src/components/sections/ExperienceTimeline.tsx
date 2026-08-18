'use client';

import { useRef, useEffect } from 'react';
import { experienceData, siteConfig } from '@/data/portfolio';
import { gsap } from '@/hooks/useGSAP';
import MagneticButton from '@/components/ui/MagneticButton';

export default function ExperienceTimeline() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const rowsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(headerRef.current, { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 88%', toggleActions: 'play none none none' },
        });
      }

      if (rowsRef.current) {
        gsap.fromTo(rowsRef.current.children, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: rowsRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="py-28 md:py-40 px-6 lg:px-12 max-w-[1400px] mx-auto">
      {/* Header */}
      <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-20 pb-8 border-b border-white/[0.08] gap-6 opacity-0">
        <div>
          <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase block mb-3">
            03 / CAREER &amp; LEADERSHIP
          </span>
          <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-light tracking-[-0.02em] text-white leading-[1.08]">
            Professional <span className="serif-italic font-normal">Trajectory</span>
          </h2>
          <p className="mt-3 text-base text-white/45 max-w-xl font-light">
            Over a decade orchestrating creative departments, luxury campaigns, and AI production systems.
          </p>
        </div>

        <MagneticButton
          href={siteConfig.cvPath}
          target="_blank"
          rel="noopener noreferrer"
          download="Vedprakash_Vishwakarma_CV.pdf"
          className="inline-flex items-center gap-2 border border-white/[0.12] hover:border-white/[0.2] bg-white/[0.04] hover:bg-white/[0.08] px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider text-white font-bold transition-all duration-300 shrink-0"
        >
          <span>Download Resume</span>
          <span>↓</span>
        </MagneticButton>
      </div>

      {/* Timeline Rows */}
      <div ref={rowsRef} className="divide-y divide-white/[0.06]">
        {experienceData.map((exp, i) => (
          <div key={i} className="py-12 lg:py-14 grid lg:grid-cols-12 gap-8 items-start opacity-0">
            {/* Period & Status */}
            <div className="lg:col-span-3">
              <span className="font-mono text-[10px] text-white/25 block mb-2 uppercase tracking-widest">
                {exp.period}
              </span>
              {exp.current && (
                <span className="inline-block text-[10px] font-mono font-bold tracking-wider uppercase text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/15">
                  ● ACTIVE
                </span>
              )}
            </div>

            {/* Role */}
            <div className="lg:col-span-4">
              <h3 className="text-xl sm:text-2xl font-light tracking-tight text-white">
                {exp.role}
              </h3>
              <p className="text-sm font-medium text-white/60 mt-1.5">
                {exp.company}
              </p>
              <p className="text-[11px] text-white/30 mt-1 font-mono uppercase tracking-wider">
                {exp.companyType} · {exp.location}
              </p>
            </div>

            {/* Achievements */}
            <div className="lg:col-span-5">
              <ul className="space-y-3">
                {exp.achievements.map((ach, idx) => (
                  <li key={idx} className="text-sm text-white/50 leading-relaxed flex items-start gap-3 font-light">
                    <span className="text-white/20 font-mono text-xs mt-0.5 shrink-0">—</span>
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
