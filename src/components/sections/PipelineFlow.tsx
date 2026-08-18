'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pipelineWorkflow } from '@/data/portfolio';

export default function PipelineFlow() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="pipeline" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#fafafa] rounded-3xl border border-black/[0.06] my-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#06b6d4] uppercase tracking-widest bg-[#06b6d4]/10 px-3.5 py-1 rounded-full mb-3">
          <span>Proprietary Methodology</span>
        </div>
        <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold tracking-tight text-[#0a0a0c]">
          Enterprise AI Production Pipeline
        </h2>
        <p className="mt-3 text-base sm:text-lg text-[#52525b]">
          A structured 5-stage synthesis framework turning conceptual brand briefs into broadcast-ready visual assets with mathematical consistency.
        </p>
      </div>

      {/* Step Navigation Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-5xl mx-auto mb-12">
        {pipelineWorkflow.map((item, index) => {
          const isSelected = activeStep === index;
          return (
            <button
              key={item.step}
              onClick={() => setActiveStep(index)}
              className={`relative p-4 rounded-2xl text-left transition-all duration-300 cursor-pointer border ${
                isSelected
                  ? 'bg-white border-[#7c3aed]/40 shadow-lg shadow-[#7c3aed]/10 -translate-y-1'
                  : 'bg-white/60 border-black/[0.06] hover:bg-white hover:border-black/[0.15]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-mono font-bold ${isSelected ? 'text-[#7c3aed]' : 'text-[#a1a1aa]'}`}>
                  PHASE {item.step}
                </span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-[#7c3aed] animate-ping" />
                )}
              </div>
              <p className="text-[13px] font-semibold text-[#0a0a0c] line-clamp-1">
                {item.phase.split('&')[0]}
              </p>
            </button>
          );
        })}
      </div>

      {/* Interactive Detail Stage Display */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-black/[0.08] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#7c3aed]/10 via-[#06b6d4]/05 to-transparent rounded-full blur-3xl pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-black/[0.06]">
              <div>
                <span className="text-xs font-mono font-bold text-[#7c3aed] tracking-wider uppercase">
                  Stage {pipelineWorkflow[activeStep].step} Architecture
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0a0a0c] mt-1">
                  {pipelineWorkflow[activeStep].phase}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#71717a] font-medium">Core Stack:</span>
                <div className="flex flex-wrap gap-1.5">
                  {pipelineWorkflow[activeStep].tools.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-semibold px-3 py-1 rounded-full bg-[#0a0a0c] text-white"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-6 text-base sm:text-lg text-[#52525b] leading-relaxed">
              {pipelineWorkflow[activeStep].detail}
            </p>

            <div className="mt-8 grid sm:grid-cols-3 gap-4 pt-6 border-t border-black/[0.06]">
              <div className="p-4 rounded-2xl bg-[#fafafa] border border-black/[0.04]">
                <p className="text-xs font-semibold text-[#71717a] uppercase">Output Protocol</p>
                <p className="text-[14px] font-bold text-[#0a0a0c] mt-1">Lossless Master</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#fafafa] border border-black/[0.04]">
                <p className="text-xs font-semibold text-[#71717a] uppercase">Consistency Engine</p>
                <p className="text-[14px] font-bold text-[#0a0a0c] mt-1">Seed & Character Locked</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#fafafa] border border-black/[0.04]">
                <p className="text-xs font-semibold text-[#71717a] uppercase">Delivery Velocity</p>
                <p className="text-[14px] font-bold text-[#0a0a0c] mt-1">40–60% Speedup</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
