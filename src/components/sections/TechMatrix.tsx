'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { techMatrix } from '@/data/portfolio';
import { SiAutodesk, SiDavinciresolve, SiGooglegemini, SiAnthropic, SiPython, SiHtml5, SiJavascript } from 'react-icons/si';

/* Real brand SVG badges */
function AdobePs() { return <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><rect width="24" height="24" rx="4" fill="#31A8FF"/><text x="12" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial">Ps</text></svg>; }
function AdobeAi() { return <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><rect width="24" height="24" rx="4" fill="#FF9A00"/><text x="12" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial">Ai</text></svg>; }
function AdobeId() { return <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><rect width="24" height="24" rx="4" fill="#FF3366"/><text x="12" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial">Id</text></svg>; }
function AdobePr() { return <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><rect width="24" height="24" rx="4" fill="#9999FF"/><text x="12" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial">Pr</text></svg>; }
function AdobeAe() { return <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><rect width="24" height="24" rx="4" fill="#9999FF"/><text x="12" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial">Ae</text></svg>; }
function AdobeLr() { return <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><rect width="24" height="24" rx="4" fill="#31A8FF"/><text x="12" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial">Lr</text></svg>; }
function OpenAiIcon() { return <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#10a37f"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" /></svg>; }

const iconLookup: Record<string, React.ReactNode> = {
  'Midjourney v6': <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center font-bold text-[10px]">MJ</span>,
  'Runway Gen-3 / 4.5': <span className="w-5 h-5 rounded-full bg-[#00D4AA] text-black flex items-center justify-center font-bold text-[10px]">RW</span>,
  'Kling AI': <span className="w-5 h-5 rounded-full bg-[#FF6B35] text-white flex items-center justify-center font-bold text-[10px]">KL</span>,
  'OpenAI GPT-4o & Sora': <OpenAiIcon />,
  'Anthropic Claude': <SiAnthropic className="w-5 h-5 text-[#D97706]" />,
  'Google Gemini & Veo': <SiGooglegemini className="w-5 h-5 text-[#4285F4]" />,
  'ElevenLabs': <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center font-bold text-[10px]">11</span>,
  'Nano Banana Pro': <span className="w-5 h-5 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold text-[10px]">NB</span>,
  'Higgsfield Cinema': <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-[10px]">HF</span>,
  'Leonardo AI & Firefly': <span className="w-5 h-5 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center font-bold text-[10px]">LE</span>,
  'Photoshop': <AdobePs />,
  'Illustrator': <AdobeAi />,
  'After Effects': <AdobeAe />,
  'Premiere Pro': <AdobePr />,
  'InDesign': <AdobeId />,
  'Lightroom': <AdobeLr />,
  'Autodesk 3ds Max': <SiAutodesk className="w-5 h-5 text-[#0696D7]" />,
  'DaVinci Resolve': <SiDavinciresolve className="w-5 h-5 text-[#233A51]" />,
  'Final Cut Pro': <span className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-[10px]">FC</span>,
  'Python': <SiPython className="w-5 h-5 text-[#3776AB]" />,
  'HTML5 & CSS3': <SiHtml5 className="w-5 h-5 text-[#E34F26]" />,
  'JavaScript & JSON': <SiJavascript className="w-5 h-5 text-[#F7DF1E]" />,
  'REST APIs': <span className="w-5 h-5 rounded-full bg-[#06b6d4] text-white flex items-center justify-center font-bold text-[10px]">API</span>,
};

export default function TechMatrix() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="stack" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#7c3aed] uppercase tracking-widest bg-[#7c3aed]/10 px-3.5 py-1 rounded-full mb-3">
            <span>Tools & Ecosystem</span>
          </div>
          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold tracking-tight text-[#0a0a0c]">
            Technical Stack & Competencies
          </h2>
          <p className="mt-2 text-base sm:text-lg text-[#52525b] max-w-2xl">
            12+ years of professional software mastery fused with the most modern frontier generative AI platforms.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2.5 mb-10 pb-2 border-b border-black/[0.06]">
        {techMatrix.map((cat, idx) => (
          <button
            key={cat.category}
            onClick={() => setActiveTab(idx)}
            className={`px-5 py-2.5 rounded-full text-[14px] font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === idx
                ? 'bg-[#0a0a0c] text-white shadow-md'
                : 'bg-black/[0.04] text-[#52525b] hover:bg-black/[0.08]'
            }`}
          >
            {cat.category} ({cat.items.length})
          </button>
        ))}
      </div>

      {/* Grid of Tools for Active Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {techMatrix[activeTab].items.map((tool, i) => (
          <motion.div
            key={tool.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] as const }}
            className="p-5 rounded-3xl bg-white border border-black/[0.07] hover:border-black/[0.18] hover:shadow-lg hover:shadow-black/[0.03] transition-all duration-300 flex items-center justify-between"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#fafafa] border border-black/[0.06] flex items-center justify-center shrink-0">
                {iconLookup[tool.name] || <span className="w-2.5 h-2.5 rounded-full bg-black" />}
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-[#0a0a0c]">{tool.name}</h4>
                <p className="text-[12px] text-[#71717a]">{tool.type}</p>
              </div>
            </div>

            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-black/[0.04] text-[#0a0a0c] border border-black/[0.04]">
              {tool.level}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
