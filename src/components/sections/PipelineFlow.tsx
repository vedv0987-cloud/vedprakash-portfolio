'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pipelineWorkflow, toolLinks } from '@/data/portfolio';
import { gsap } from '@/hooks/useGSAP';

export default function PipelineFlow() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pipeline-reveal',
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
      id="pipeline"
      className="py-16 md:py-24 px-6 lg:px-12 max-w-[1360px] mx-auto bg-[#ffffff]"
    >
      {/* Header */}
      <div className="pipeline-reveal mb-16 pb-6 border-b border-black/[0.08]">
        <span className="font-mono text-[11px] text-[#86868b] tracking-wider uppercase block mb-2 font-medium">
          METHODOLOGY / PRODUCTION ARCHITECTURE
        </span>
        <h2 className="text-[clamp(2.25rem,5vw,3.75rem)] font-semibold tracking-[-0.03em] text-[#1d1d1f] leading-[1.08] max-w-4xl">
          Five-Stage <span className="serif-italic font-normal text-[#0071e3]">Generative Production</span> Pipeline
        </h2>
        <p className="mt-3 text-base text-[#6e6e73] max-w-2xl font-normal">
          How artistic judgment, mathematical prompt architecture, and high-end 3D finishing integrate to deliver commercial visual assets.
        </p>
      </div>

      {/* Step Navigation Headers */}
      <div className="pipeline-reveal grid grid-cols-1 sm:grid-cols-5 gap-x-6 gap-y-2 mb-12 border-y border-black/[0.12]">
        {pipelineWorkflow.map((item, index) => {
          const isSelected = activeStep === index;
          return (
            <button
              key={item.step}
              onClick={() => setActiveStep(index)}
              className={`py-5 text-left transition-all duration-200 border-b-2 cursor-pointer ${
                isSelected
                  ? 'border-[#0071e3] text-[#1d1d1f] font-semibold'
                  : 'border-transparent text-[#6e6e73] hover:text-[#1d1d1f]'
              }`}
            >
              <span className={`font-mono text-[10px] block mb-2 tracking-wider ${isSelected ? 'text-[#0071e3]' : 'text-[#86868b]'}`}>
                PHASE {item.step}
              </span>
              <p className="text-sm tracking-tight leading-snug">
                {item.phase}
              </p>
            </button>
          );
        })}
      </div>

      {/* Detailed Stage Blueprint */}
      <div className="pipeline-reveal py-2 sm:py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-black/[0.08]">
              <div>
                <span className="font-mono text-xs text-[#86868b] uppercase tracking-wider">
                  Stage 0{activeStep + 1} Architecture Protocol
                </span>
                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1d1d1f] mt-1">
                  {pipelineWorkflow[activeStep].phase}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#86868b] font-mono uppercase">Verified Tools:</span>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {pipelineWorkflow[activeStep].tools.map((t) => {
                    const url = toolLinks[t] || 'https://google.com';
                    return (
                      <a
                        key={t}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-[#1d1d1f] hover:text-[#0071e3] transition-colors flex items-center gap-1.5 underline decoration-black/20 underline-offset-4"
                      >
                        <span>{t}</span>
                        <span className="text-[10px] opacity-60">↗</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            <p className="mt-8 text-lg text-[#1d1d1f] leading-relaxed max-w-3xl font-normal">
              {pipelineWorkflow[activeStep].detail}
            </p>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-black/[0.10]">
              <div>
                <span className="text-xs font-mono text-[#86868b] uppercase block">Output Integrity</span>
                <p className="text-base font-semibold text-[#1d1d1f] mt-1">Lossless Master Asset (8K Master)</p>
              </div>
              <div>
                <span className="text-xs font-mono text-[#86868b] uppercase block">Visual Quality Control</span>
                <p className="text-base font-semibold text-[#1d1d1f] mt-1">Seed & Character Persistence Locked</p>
              </div>
              <div>
                <span className="text-xs font-mono text-[#86868b] uppercase block">Efficiency Metric</span>
                <p className="text-base font-semibold text-[#0071e3] mt-1">40–60% Production Compression</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
