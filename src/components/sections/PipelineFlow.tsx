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
        sectionRef.current!.querySelectorAll('.pipeline-reveal'),
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
      id="pipeline"
      className="py-20 md:py-32 px-6 lg:px-12 max-w-[1360px] mx-auto"
    >
      {/* Header */}
      <div className="pipeline-reveal mb-16 pb-6 border-b border-border">
        <span className="font-mono text-[11px] text-text-subtle tracking-wider uppercase block mb-3 font-medium">
          METHODOLOGY / PRODUCTION ARCHITECTURE
        </span>
        <h2 className="text-display font-display font-semibold tracking-tight text-text-main leading-[1.0] max-w-4xl">
          Five-Stage <span className="serif-italic font-normal text-accent">Generative Production</span> Pipeline
        </h2>
        <p className="mt-4 text-body text-text-muted max-w-2xl font-normal">
          How artistic judgment, mathematical prompt architecture, and high-end 3D finishing integrate to deliver commercial visual assets.
        </p>
      </div>

      {/* Step Navigation */}
      <div className="pipeline-reveal grid grid-cols-1 sm:grid-cols-5 gap-x-6 gap-y-2 mb-12 border-y border-border">
        {pipelineWorkflow.map((item, index) => {
          const isSelected = activeStep === index;
          return (
            <button
              key={item.step}
              onClick={() => setActiveStep(index)}
              className={`py-5 text-left transition-all duration-200 border-b-2 cursor-pointer ${
                isSelected
                  ? 'border-accent text-text-main font-semibold'
                  : 'border-transparent text-text-muted hover:text-text-main'
              }`}
            >
              <span className={`font-mono text-[10px] block mb-2 tracking-wider ${isSelected ? 'text-accent' : 'text-text-subtle'}`}>
                PHASE {item.step}
              </span>
              <p className="text-sm tracking-tight leading-snug font-display">
                {item.phase}
              </p>
            </button>
          );
        })}
      </div>

      {/* Detailed Stage */}
      <div className="pipeline-reveal py-2 sm:py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-border">
              <div>
                <span className="font-mono text-[11px] text-text-subtle uppercase tracking-wider">
                  Stage 0{activeStep + 1} Architecture Protocol
                </span>
                <h3 className="text-h3 font-display font-semibold tracking-tight text-text-main mt-1">
                  {pipelineWorkflow[activeStep].phase}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-text-subtle font-mono uppercase">Verified Tools:</span>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {pipelineWorkflow[activeStep].tools.map((t) => {
                    const url = toolLinks[t] || 'https://google.com';
                    return (
                      <a
                        key={t}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-text-main hover:text-accent transition-colors flex items-center gap-1.5 underline decoration-border-strong underline-offset-4"
                      >
                        <span>{t}</span>
                        <span className="text-[10px] opacity-60">↗</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            <p className="mt-8 text-body-lg text-text-main leading-relaxed max-w-3xl font-normal">
              {pipelineWorkflow[activeStep].detail}
            </p>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <span className="text-[11px] font-mono text-text-subtle uppercase block tracking-wider">Output Integrity</span>
                <p className="text-body font-semibold text-text-main mt-1">Lossless Master Asset (8K)</p>
              </div>
              <div>
                <span className="text-[11px] font-mono text-text-subtle uppercase block tracking-wider">Quality Control</span>
                <p className="text-body font-semibold text-text-main mt-1">Seed & Character Persistence Locked</p>
              </div>
              <div>
                <span className="text-[11px] font-mono text-text-subtle uppercase block tracking-wider">Efficiency Metric</span>
                <p className="text-body font-semibold text-accent mt-1">40–60% Production Compression</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
