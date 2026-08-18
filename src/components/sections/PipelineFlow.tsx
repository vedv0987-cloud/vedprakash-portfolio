'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pipelineWorkflow } from '@/data/portfolio';

export default function PipelineFlow() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="pipeline" className="py-24 md:py-36 px-6 lg:px-12 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-16 pb-8 border-b border-white/10">
        <span className="font-mono text-xs text-white/40 tracking-widest uppercase block mb-2">
          METHODOLOGY / PRODUCTION ARCHITECTURE
        </span>
        <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-light tracking-tight text-white leading-[1.08] max-w-4xl">
          Five-Stage <span className="serif-italic font-normal">Generative Production</span> Pipeline
        </h2>
        <p className="mt-3 text-base text-white/70 max-w-2xl font-normal">
          How artistic judgment, mathematical prompt architecture, and high-end 3D finishing integrate to deliver commercial visual assets.
        </p>
      </div>

      {/* Step Navigation Headers */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-px bg-black/[0.08] border border-white/10 rounded-2xl overflow-hidden mb-12">
        {pipelineWorkflow.map((item, index) => {
          const isSelected = activeStep === index;
          return (
            <button
              key={item.step}
              onClick={() => setActiveStep(index)}
              className={`p-6 text-left transition-colors cursor-pointer ${
                isSelected ? 'bg-[#111111] text-white' : 'bg-[#0a0a0a] text-white hover:bg-[#fafaf8]'
              }`}
            >
              <span className={`font-mono text-xs block mb-3 ${isSelected ? 'text-white/40' : 'text-white/40'}`}>
                PHASE {item.step}
              </span>
              <p className="text-sm font-semibold tracking-tight leading-snug">
                {item.phase}
              </p>
            </button>
          );
        })}
      </div>

      {/* Detailed Stage Blueprint */}
      <div className="bg-[#0a0a0a] rounded-3xl p-8 sm:p-12 border border-white/10 shadow-xs">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-white/10">
              <div>
                <span className="font-mono text-xs text-white/40 uppercase tracking-wider">
                  Stage 0{activeStep + 1} Architecture Protocol
                </span>
                <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-white mt-1">
                  {pipelineWorkflow[activeStep].phase}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-white/40 font-mono uppercase">Tools:</span>
                <div className="flex flex-wrap gap-2">
                  {pipelineWorkflow[activeStep].tools.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-semibold px-3 py-1 rounded-full bg-[#111111] text-white"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-8 text-lg text-white/70 leading-relaxed max-w-3xl font-normal">
              {pipelineWorkflow[activeStep].detail}
            </p>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div>
                <span className="text-xs font-mono text-white/40 uppercase block">Output Integrity</span>
                <p className="text-sm font-semibold text-white mt-1">Lossless Master Asset</p>
              </div>
              <div>
                <span className="text-xs font-mono text-white/40 uppercase block">Visual Quality Control</span>
                <p className="text-sm font-semibold text-white mt-1">Seed & Character Locked</p>
              </div>
              <div>
                <span className="text-xs font-mono text-white/40 uppercase block">Efficiency Metric</span>
                <p className="text-sm font-semibold text-white mt-1">40–60% Timeline Compression</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
