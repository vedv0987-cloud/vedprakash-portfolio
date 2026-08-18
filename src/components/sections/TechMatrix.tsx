'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { techMatrix, toolLinks } from '@/data/portfolio';
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
  'Midjourney v6': <span className="w-6 h-6 rounded-full bg-[#1d1d1f] text-white flex items-center justify-center font-bold text-[10px]">MJ</span>,
  'Runway Gen-3 / 4.5': <span className="w-6 h-6 rounded-full bg-[#00D4AA] text-black flex items-center justify-center font-bold text-[10px]">RW</span>,
  'Kling AI': <span className="w-6 h-6 rounded-full bg-[#FF6B35] text-white flex items-center justify-center font-bold text-[10px]">KL</span>,
  'OpenAI GPT-4o & Sora': <OpenAiIcon />,
  'Anthropic Claude': <SiAnthropic className="w-6 h-6 text-[#D97706]" />,
  'Google Gemini & Veo': <SiGooglegemini className="w-6 h-6 text-[#4285F4]" />,
  'ElevenLabs': <span className="w-6 h-6 rounded-full bg-[#1d1d1f] text-white flex items-center justify-center font-bold text-[10px]">11</span>,
  'Nano Banana Pro': <span className="w-6 h-6 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold text-[10px]">NB</span>,
  'Higgsfield Cinema': <span className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-[10px]">HF</span>,
  'Leonardo AI & Firefly': <span className="w-6 h-6 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center font-bold text-[10px]">LE</span>,
  'Photoshop': <AdobePs />,
  'Illustrator': <AdobeAi />,
  'After Effects': <AdobeAe />,
  'Premiere Pro': <AdobePr />,
  'InDesign': <AdobeId />,
  'Lightroom': <AdobeLr />,
  'Autodesk 3ds Max': <SiAutodesk className="w-6 h-6 text-[#0696D7]" />,
  'DaVinci Resolve': <SiDavinciresolve className="w-6 h-6 text-[#233A51]" />,
  'Final Cut Pro': <span className="w-6 h-6 rounded-full bg-[#5856D6] text-white flex items-center justify-center font-bold text-[10px]">FC</span>,
  'Python': <SiPython className="w-6 h-6 text-[#3776AB]" />,
  'HTML5 & CSS3': <SiHtml5 className="w-6 h-6 text-[#E34F26]" />,
  'JavaScript & JSON': <SiJavascript className="w-6 h-6 text-[#F7DF1E]" />,
  'REST APIs': <span className="w-6 h-6 rounded-full bg-[#1d1d1f] text-white flex items-center justify-center font-bold text-[10px]">API</span>,
};

export default function TechMatrix() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.tech-reveal',
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
      id="stack"
      className="py-16 md:py-24 px-6 lg:px-12 max-w-[1360px] mx-auto bg-[#ffffff]"
    >
      <div className="tech-reveal mb-16 pb-6 border-b border-black/[0.08]">
        <span className="font-mono text-[11px] text-[#86868b] tracking-wider uppercase block mb-2 font-medium">
          TOOL ECOSYSTEM &amp; MASTERY
        </span>
        <h2 className="text-[clamp(2.25rem,5vw,3.75rem)] font-semibold tracking-[-0.03em] text-[#1d1d1f] leading-[1.08]">
          Technical &amp; Creative <span className="serif-italic font-normal text-[#0071e3]">Proficiency</span>
        </h2>
        <p className="mt-3 text-base text-[#6e6e73] max-w-2xl font-normal">
          12+ years of professional post-production and vector mastery fused with state-of-the-art generative diffusion systems. (Click any tool to launch official portal)
        </p>
      </div>

      {/* Category Tabs */}
      <div className="tech-reveal flex flex-wrap gap-x-6 gap-y-2 mb-10 border-b border-black/[0.12]">
        {techMatrix.map((cat, idx) => (
          <button
            key={cat.category}
            onClick={() => setActiveTab(idx)}
            className={`py-3 text-xs font-semibold uppercase tracking-wider transition-all duration-200 border-b-2 cursor-pointer ${
              activeTab === idx
                ? 'border-[#0071e3] text-[#1d1d1f]'
                : 'border-transparent text-[#6e6e73] hover:text-[#1d1d1f]'
            }`}
          >
            {cat.category} ({cat.items.length})
          </button>
        ))}
      </div>

      {/* Grid of Tools (Clickable Links) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8">
        {techMatrix[activeTab].items.map((tool, i) => {
          const url = tool.url || toolLinks[tool.name] || 'https://google.com';
          return (
            <motion.a
              key={tool.name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] as const }}
              className="py-5 border-t border-black/[0.12] hover:border-[#0071e3] flex items-center justify-between transition-colors duration-200 group cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  {iconLookup[tool.name] || <span className="w-2.5 h-2.5 rounded-full bg-[#0071e3]" />}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors flex items-center gap-1.5">
                    <span>{tool.name}</span>
                    <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                  </h4>
                  <p className="text-xs text-[#86868b] font-normal">{tool.type}</p>
                </div>
              </div>

              <span className="text-[11px] font-mono font-medium text-[#6e6e73]">
                {tool.level}
              </span>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
