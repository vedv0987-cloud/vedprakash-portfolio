'use client';

import { useState } from 'react';
import { siteConfig } from '@/data/portfolio';
import { scrollToSection } from '@/lib/scroll';

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer id="contact" className="w-full bg-[#0c0c0e] text-white pt-24 pb-12 mt-28 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* ── Top Inquiry Manifesto ── */}
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs text-[#8e8e93] tracking-widest uppercase">
              INDEX 04 / DIRECT INQUIRY &amp; COMMISSIONS
            </span>
          </div>

          <h2 className="text-[clamp(2.5rem,6vw,5.25rem)] font-light tracking-tight text-white leading-[1.04]">
            Let&apos;s direct your next <span className="serif-italic font-normal text-white">landmark visual</span> production.
          </h2>

          <p className="mt-8 text-base sm:text-lg text-[#a1a1aa] max-w-2xl font-normal leading-relaxed">
            Open to Senior / Lead Creative AI roles, agency leadership, enterprise generative workflow consulting, and high-budget luxury campaigns.
          </p>

          {/* Action CTAs Cluster */}
          <div className="mt-10 flex flex-wrap gap-4 items-center">
            <a
              href={`mailto:${siteConfig.email}?subject=Production%20Inquiry%20-%20Creative%20AI%20Lead`}
              className="inline-flex items-center gap-2.5 bg-white text-[#111111] hover:bg-[#e5e5e0] px-8 py-4 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-200 hover:shadow-2xl hover:scale-[1.02] active:scale-98"
            >
              <span>Send Direct Email</span>
              <span>↗</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/[0.16] px-6 py-4 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-colors cursor-pointer"
            >
              <span>{copied ? '✓ Email Copied to Clipboard' : `${siteConfig.email} (Click to Copy)`}</span>
            </button>
          </div>

          {/* Contact Direct Channels Grid */}
          <div className="mt-16 pt-12 border-t border-white/[0.12] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <span className="font-mono text-xs text-[#8e8e93] uppercase block">Phone / WhatsApp</span>
              <a
                href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                className="text-base font-medium text-white hover:text-[#d1d1cf] transition-colors mt-2 block"
              >
                {siteConfig.phone}
              </a>
            </div>

            <div>
              <span className="font-mono text-xs text-[#8e8e93] uppercase block">Behance Portfolio</span>
              <a
                href={siteConfig.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-medium text-white hover:text-[#0057ff] transition-colors mt-2 block"
              >
                behance.net/Vedvish0987 ↗
              </a>
            </div>

            <div>
              <span className="font-mono text-xs text-[#8e8e93] uppercase block">LinkedIn Network</span>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-medium text-white hover:text-[#d1d1cf] transition-colors mt-2 block"
              >
                in/vedprakash-vishwakarma ↗
              </a>
            </div>

            <div>
              <span className="font-mono text-xs text-[#8e8e93] uppercase block">Raw Asset Vault</span>
              <a
                href={siteConfig.portfolioDrive}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-medium text-white hover:text-[#7c3aed] transition-colors mt-2 block"
              >
                50+ Campaign Decks on Drive ↗
              </a>
            </div>
          </div>
        </div>

        {/* ── Bottom Copyright Bar & Working Top Button ── */}
        <div className="mt-20 pt-8 border-t border-white/[0.1] flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#8e8e93] font-mono">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <span className="font-bold text-white uppercase tracking-wider">
              {siteConfig.name}
            </span>
            <span className="hidden sm:inline text-white/30">/</span>
            <span>{siteConfig.tagline}</span>
          </div>

          <div className="flex items-center gap-6">
            <span>© {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
            <button
              onClick={() => scrollToSection('hero')}
              className="text-white font-bold hover:text-white/70 transition-colors cursor-pointer flex items-center gap-1.5 uppercase tracking-wider"
            >
              <span>Back to top</span>
              <span>↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
