'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/data/portfolio';

export default function ContactStudio() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-24 md:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl bg-[#0a0a0c] text-white p-8 sm:p-14 lg:p-20 overflow-hidden shadow-2xl">
        {/* Background Ambient Spheres */}
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-bl from-[#7c3aed]/25 via-[#06b6d4]/15 to-transparent rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-gradient-to-tr from-[#6366f1]/20 to-transparent rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#06b6d4] uppercase tracking-widest bg-white/[0.08] px-3.5 py-1 rounded-full mb-6 border border-white/[0.1]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Direct Studio Inquiry</span>
          </div>

          <h2 className="text-[clamp(2.25rem,5.5vw,4.25rem)] font-bold tracking-tight text-white leading-[1.08]">
            Let&apos;s architect your next <span className="gradient-text-purple">vision</span> together.
          </h2>

          <p className="mt-6 text-base sm:text-lg text-[#a1a1aa] leading-relaxed max-w-xl font-normal">
            Available for Senior / Lead Creative AI roles, agency leadership, enterprise generative workflow consulting, and high-end visual campaigns.
          </p>

          {/* Quick Action Matrix */}
          <div className="mt-10 flex flex-wrap gap-4 items-center">
            <a
              href={`mailto:${siteConfig.email}?subject=Collaboration%20Inquiry%20-%20Creative%20AI`}
              className="inline-flex items-center gap-2.5 bg-white text-[#0a0a0c] hover:bg-[#e4e4e7] text-[15px] font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-98"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
              </svg>
              <span>Send Direct Email</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/[0.12] text-[14px] font-medium px-6 py-4 rounded-full transition-all duration-200 cursor-pointer"
            >
              <svg className="w-4 h-4 text-[#a1a1aa]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
              </svg>
              <span>{copied ? '✓ Email Copied to Clipboard!' : siteConfig.email}</span>
            </button>
          </div>

          {/* Contact Details Cards */}
          <div className="mt-14 pt-10 border-t border-white/[0.1] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-xs font-mono font-bold text-[#71717a] uppercase tracking-wider">Phone / WhatsApp</p>
              <a
                href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                className="text-[15px] font-semibold text-white hover:text-[#06b6d4] transition-colors mt-1 block"
              >
                {siteConfig.phone}
              </a>
            </div>

            <div>
              <p className="text-xs font-mono font-bold text-[#71717a] uppercase tracking-wider">Behance Portfolio</p>
              <a
                href={siteConfig.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] font-semibold text-white hover:text-[#0057ff] transition-colors mt-1 block"
              >
                behance.net/Vedvish0987 ↗
              </a>
            </div>

            <div>
              <p className="text-xs font-mono font-bold text-[#71717a] uppercase tracking-wider">LinkedIn Network</p>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] font-semibold text-white hover:text-[#06b6d4] transition-colors mt-1 block"
              >
                in/vedprakash-vishwakarma ↗
              </a>
            </div>

            <div>
              <p className="text-xs font-mono font-bold text-[#71717a] uppercase tracking-wider">Drive Asset Vault</p>
              <a
                href={siteConfig.portfolioDrive}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] font-semibold text-white hover:text-[#7c3aed] transition-colors mt-1 block"
              >
                Drive Folder (50+ Items) ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
