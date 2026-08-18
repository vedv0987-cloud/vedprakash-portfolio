'use client';

import { useState } from 'react';
import { siteConfig } from '@/data/portfolio';
import { scrollToSection } from '@/lib/scroll';

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = `mailto:${siteConfig.email}`;
    }
  };

  return (
    <footer id="contact" className="w-full bg-[#f5f5f7] text-[#1d1d1f] pt-16 pb-12 mt-10 border-t border-black/[0.08]">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-12">
        {/* ── Top Inquiry Manifesto ── */}
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs text-[#86868b] tracking-wider uppercase font-semibold">
              INDEX 04 / DIRECT INQUIRY &amp; COMMISSIONS
            </span>
          </div>

          <h2 className="text-[clamp(2.5rem,6vw,4.75rem)] font-semibold tracking-[-0.035em] text-[#1d1d1f] leading-[1.05]">
            Let&apos;s direct your next <span className="serif-italic font-normal text-[#0071e3]">landmark visual</span> production.
          </h2>

          <p className="mt-6 text-base sm:text-lg text-[#6e6e73] max-w-2xl font-normal leading-relaxed">
            Open to Senior / Lead Creative AI roles, agency creative leadership, enterprise generative workflow consulting, and high-budget luxury campaigns.
          </p>

          {/* Action CTAs Cluster */}
          <div className="mt-10 flex flex-wrap gap-4 items-center">
            <a
              href={`mailto:${siteConfig.email}?subject=Production%20Inquiry%20-%20Creative%20AI%20Lead`}
              className="inline-flex items-center gap-2 bg-[#0071e3] text-white hover:bg-[#0077ed] px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] shadow-xs active:scale-98"
            >
              <span>Send Direct Email</span>
              <span>↗</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 bg-white hover:bg-[#e8e8ed] text-[#1d1d1f] border border-black/[0.12] px-6 py-4 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-2xs"
            >
              <span>{copied ? '✓ Email Copied to Clipboard' : `${siteConfig.email} (Click to Copy)`}</span>
            </button>
          </div>

          {/* Contact Direct Channels Grid */}
          <div className="mt-16 pt-12 border-t border-black/[0.08] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <span className="font-mono text-xs text-[#86868b] uppercase block font-semibold">Phone / WhatsApp</span>
              <a
                href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                className="text-base font-semibold text-[#1d1d1f] hover:text-[#0071e3] transition-colors mt-2 block"
              >
                {siteConfig.phone}
              </a>
            </div>

            <div>
              <span className="font-mono text-xs text-[#86868b] uppercase block font-semibold">Behance Portfolio</span>
              <a
                href={siteConfig.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-semibold text-[#1d1d1f] hover:text-[#0071e3] transition-colors mt-2 block"
              >
                behance.net/Vedvish0987 ↗
              </a>
            </div>

            <div>
              <span className="font-mono text-xs text-[#86868b] uppercase block font-semibold">LinkedIn Network</span>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-semibold text-[#1d1d1f] hover:text-[#0071e3] transition-colors mt-2 block"
              >
                in/vedprakash-vishwakarma ↗
              </a>
            </div>

            <div>
              <span className="font-mono text-xs text-[#86868b] uppercase block font-semibold">Raw Asset Vault</span>
              <a
                href={siteConfig.portfolioDrive}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-semibold text-[#0071e3] hover:underline transition-colors mt-2 block"
              >
                50+ Campaign Decks on Drive ↗
              </a>
            </div>
          </div>
        </div>

        {/* ── Bottom Copyright Bar & Working Top Button ── */}
        <div className="mt-20 pt-8 border-t border-black/[0.08] flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#86868b] font-mono">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <span className="font-bold text-[#1d1d1f] uppercase tracking-wider">
              {siteConfig.name}
            </span>
            <span className="hidden sm:inline text-black/20">/</span>
            <span>{siteConfig.tagline}</span>
          </div>

          <div className="flex items-center gap-6">
            <span>© {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
            <button
              onClick={() => scrollToSection('hero')}
              className="text-[#1d1d1f] font-bold hover:text-[#0071e3] transition-colors cursor-pointer flex items-center gap-1.5 uppercase tracking-wider"
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
