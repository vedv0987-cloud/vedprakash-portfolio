'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pipelineWorkflow } from '@/data/portfolio';
import { gsap } from '@/hooks/useGSAP';

export default function PipelineFlow() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const detailRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(headerRef.current, { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 88%', toggleActions: 'play none none none' },
        });
      }

      if (navRef.current) {
        gsap.fromTo(navRef.current, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: navRef.current, start: 'top 88%', toggleActions: 'play none none none' },
        });
      }

      if (detailRef.current) {
        gsap.fromTo(detailRef.current, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: detailRef.current, start: 'top 88%', toggleActions: 'play none none none' },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="pipeline" className="py-28 md:py-40 px-6 lg:px-12 max-w-[1400px] mx-auto">
      {/* Header */}
      <div ref={headerRef} className="mb-20 pb-8 border-b border-white/[0.08] opacity-0">
        <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase block mb-3">
          METHODOLOGY / PRODUCTION ARCHITECTURE
        </span>
        <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-light tracking-[-0.02em] text-white leading-[1.08] max-w-4xl">
          Five-Stage <span className="serif-italic font-normal">Generative Production</span> Pipeline
        </h2>
        <p className="mt-4 text-base text-white/45 max-w-2xl font-light">
          How artistic judgment, mathematical prompt architecture, and high-end 3D finishing integrate to deliver commercial visual assets.
        </p>
      </div>

      {/* Step Navigation */}
      <div ref={navRef} className="grid grid-cols-1 sm:grid-cols-5 gap-px bg-white/[0.04] border border-white/[0.08] rounded-2xl overflow-hidden mb-12 opacity-0">
        {pipelineWorkflow.map((item, index) => {
          const isSelected = activeStep === index;
          return (
            <button
              key={item.step}
              onClick={() => setActiveStep(index)}
              className={`p-6 text-left transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'bg-white text-[#050505]'
                  : 'bg-[#0a0a0c] text-white hover:bg-white/[0.06]'
              }`}
            >
              <span className={`font-mono text-[10px] block mb-3 tracking-widest ${isSelected ? 'text-[#050505]/50' : 'text-white/30'}`}>
                PHASE {item.step}
              </span>
              <p className="text-sm font-semibold tracking-tight leading-snug">
                {item.phase}
              </p>
            </button>
          );
        })}
      </div>

      {/* Detail Panel */}
      <div ref={detailRef} className="bg-[#0a0a0c] rounded-3xl p-8 sm:p-12 border border-white/[0.08] opacity-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-white/[0.08]">
              <div>
                <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                  Stage 0{activeStep + 1} Protocol
                </span>
                <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-white mt-1">
                  {pipelineWorkflow[activeStep].phase}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-white/30 font-mono uppercase tracking-widest">Stack:</span>
                <div className="flex flex-wrap gap-2">
                  {pipelineWorkflow[activeStep].tools.map((t) => (
                    <span key={t} className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/70">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-8 text-lg text-white/50 leading-relaxed max-w-3xl font-light">
              {pipelineWorkflow[activeStep].detail}
            </p>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/[0.06]">
              <div>
                <span className="text-[10px] font-mono text-white/25 uppercase tracking-widest block">Output Integrity</span>
                <p className="text-sm font-medium text-white mt-1.5">Lossless Master Asset</p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-white/25 uppercase tracking-widest block">Quality Control</span>
                <p className="text-sm font-medium text-white mt-1.5">Seed & Character Locked</p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-white/25 uppercase tracking-widest block">Efficiency</span>
                <p className="text-sm font-medium text-white mt-1.5">40–60% Timeline Compression</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
