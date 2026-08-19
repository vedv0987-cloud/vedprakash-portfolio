'use client';

import { useRef, useEffect } from 'react';
import { experienceData, siteConfig } from '@/data/portfolio';
import TextReveal from '@/components/ui/TextReveal';
import { gsap } from '@/hooks/useGSAP';

export default function ExperienceTimeline() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll('.exp-reveal'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-20 md:py-32 px-6 lg:px-12 max-w-[1360px] mx-auto"
    >
      {/* Header */}
      <div className="exp-reveal flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-border gap-6">
        <div>
          <span className="font-mono text-[11px] text-text-subtle tracking-wider uppercase block mb-3 font-medium">
            03 / CAREER &amp; LEADERSHIP
          </span>
          <h2 className="text-display font-display font-semibold tracking-tight text-text-main leading-[1.0]">
            Professional <span className="serif-italic font-normal text-accent">Trajectory</span>
          </h2>
          <p className="mt-4 text-body text-text-muted max-w-xl font-normal">
            Over a decade orchestrating creative departments, luxury campaigns, and enterprise AI production systems.
          </p>
        </div>

        <a
          href={siteConfig.cvPath}
          download="Vedprakash_Vishwakarma_CV.pdf"
          className="magnetic-btn inline-flex items-center gap-2 border border-border hover:border-border-strong bg-bg-secondary hover:bg-bg-card px-6 py-3 rounded-full text-[11px] font-semibold uppercase tracking-wider text-text-main transition-colors shrink-0 shadow-xs font-mono"
        >
          <span>Download Resume</span>
          <span>↓</span>
        </a>
      </div>

      {/* Timeline */}
      <div className="divide-y divide-border">
        {experienceData.map((exp, i) => (
          <div key={i} className="exp-reveal py-12 grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-3">
              <span className="font-mono text-[11px] text-text-subtle block mb-2 font-medium tracking-wider">
                {exp.period}
              </span>
              {exp.current && (
                <span className="inline-block text-[10px] font-mono font-bold tracking-wider uppercase text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  ● ACTIVE
                </span>
              )}
            </div>

            <div className="lg:col-span-4">
              <h3 className="text-xl sm:text-2xl font-display font-semibold tracking-tight text-text-main">
                {exp.role}
              </h3>
              <p className="text-sm font-medium text-text-main mt-1">
                {exp.company}
              </p>
              <p className="text-[11px] text-text-subtle mt-0.5 font-mono tracking-wide">
                {exp.companyType} · {exp.location}
              </p>
            </div>

            <div className="lg:col-span-5">
              <ul className="space-y-3">
                {exp.achievements.map((ach, idx) => (
                  <li key={idx} className="text-sm text-text-muted leading-relaxed flex items-start gap-3">
                    <span className="text-accent font-mono text-xs mt-0.5">—</span>
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
