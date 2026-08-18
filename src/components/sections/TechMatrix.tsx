'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { techMatrix } from '@/data/portfolio';
import { gsap } from '@/hooks/useGSAP';
import { SiAutodesk, SiDavinciresolve, SiGooglegemini, SiAnthropic, SiPython, SiHtml5, SiJavascript } from 'react-icons/si';

function AdobePs() { return <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><rect width="24" height="24" rx="4" fill="#31A8FF"/><text x="12" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial">Ps</text></svg>; }
function AdobeAi() { return <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><rect width="24" height="24" rx="4" fill="#FF9A00"/><text x="12" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial">Ai</text></svg>; }
function AdobeId() { return <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><rect width="24" height="24" rx="4" fill="#FF3366"/><text x="12" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial">Id</text></svg>; }
function AdobePr() { return <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><rect width="24" height="24" rx="4" fill="#9999FF"/><text x="12" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial">Pr</text></svg>; }
function AdobeAe() { return <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><rect width="24" height="24" rx="4" fill="#9999FF"/><text x="12" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial">Ae</text></svg>; }
function AdobeLr() { return <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><rect width="24" height="24" rx="4" fill="#31A8FF"/><text x="12" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial">Lr</text></svg>; }
function OpenAiIcon() { return <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#10a37f"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" /></svg>; }

const iconLookup: Record<string, React.ReactNode> = {
  'Midjourney v6': <span className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center font-bold text-[10px]">MJ</span>,
  'Runway Gen-3 / 4.5': <span className="w-5 h-5 rounded-full bg-[#00D4AA] text-black flex items-center justify-center font-bold text-[10px]">RW</span>,
  'Kling AI': <span className="w-5 h-5 rounded-full bg-[#FF6B35] text-white flex items-center justify-center font-bold text-[10px]">KL</span>,
  'OpenAI GPT-4o & Sora': <OpenAiIcon />,
  'Anthropic Claude': <SiAnthropic className="w-5 h-5 text-[#D97706]" />,
  'Google Gemini & Veo': <SiGooglegemini className="w-5 h-5 text-[#4285F4]" />,
  'ElevenLabs': <span className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center font-bold text-[10px]">11</span>,
  'Nano Banana Pro': <span className="w-5 h-5 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold text-[10px]">NB</span>,
  'Higgsfield Cinema': <span className="w-5 h-5 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-[10px]">HF</span>,
  'Leonardo AI & Firefly': <span className="w-5 h-5 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center font-bold text-[10px]">LE</span>,
  'Photoshop': <AdobePs />,
  'Illustrator': <AdobeAi />,
  'After Effects': <AdobeAe />,
  'Premiere Pro': <AdobePr />,
  'InDesign': <AdobeId />,
  'Lightroom': <AdobeLr />,
  'Autodesk 3ds Max': <SiAutodesk className="w-5 h-5 text-[#0696D7]" />,
  'DaVinci Resolve': <SiDavinciresolve className="w-5 h-5 text-[#E44C65]" />,
  'Final Cut Pro': <span className="w-5 h-5 rounded-full bg-[#6B4DE8] text-white flex items-center justify-center font-bold text-[10px]">FC</span>,
  'Python': <SiPython className="w-5 h-5 text-[#3776AB]" />,
  'HTML5 & CSS3': <SiHtml5 className="w-5 h-5 text-[#E34F26]" />,
  'JavaScript & JSON': <SiJavascript className="w-5 h-5 text-[#F7DF1E]" />,
  'REST APIs': <span className="w-5 h-5 rounded-full bg-[#06b6d4] text-white flex items-center justify-center font-bold text-[10px]">AP</span>,
};

export default function TechMatrix() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(headerRef.current, { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 88%', toggleActions: 'play none none none' },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="stack" className="py-28 md:py-40 px-6 lg:px-12 max-w-[1400px] mx-auto">
      <div ref={headerRef} className="mb-16 pb-8 border-b border-white/[0.08] opacity-0">
        <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase block mb-3">
          TOOL ECOSYSTEM &amp; MASTERY
        </span>
        <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-light tracking-[-0.02em] text-white leading-[1.08]">
          Technical &amp; Creative <span className="serif-italic font-normal">Proficiency</span>
        </h2>
        <p className="mt-4 text-base text-white/45 max-w-2xl font-light">
          12+ years of professional post-production and vector mastery fused with state-of-the-art generative diffusion systems.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-12">
        {techMatrix.map((cat, idx) => (
          <button
            key={cat.category}
            onClick={() => setActiveTab(idx)}
            className={`px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeTab === idx
                ? 'bg-white text-[#050505] font-bold'
                : 'bg-white/[0.04] text-white/50 hover:text-white hover:bg-white/[0.08] border border-white/[0.08]'
            }`}
          >
            {cat.category} ({cat.items.length})
          </button>
        ))}
      </div>

      {/* Tool Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {techMatrix[activeTab].items.map((tool, i) => (
          <motion.div
            key={tool.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] as const }}
            className="p-5 rounded-2xl bg-[#0a0a0c] border border-white/[0.06] flex items-center justify-between hover:border-white/[0.14] transition-all duration-300 group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#111113] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:border-white/[0.15] transition-colors">
                {iconLookup[tool.name] || <span className="w-2 h-2 rounded-full bg-white/30" />}
              </div>
              <div>
                <h4 className="text-sm font-medium text-white">{tool.name}</h4>
                <p className="text-[11px] text-white/30 font-light">{tool.type}</p>
              </div>
            </div>

            <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
              {tool.level}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
