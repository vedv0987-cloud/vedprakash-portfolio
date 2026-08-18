'use client';

import { useState } from 'react';
import { siteConfig } from '@/data/portfolio';

export default function ContactStudio() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-28 md:py-44 px-6 lg:px-12 max-w-[1400px] mx-auto bg-[#111111] text-white rounded-3xl my-12">
      <div className="max-w-4xl">
        <span className="font-mono text-xs text-[#8e8e93] tracking-widest uppercase block mb-4">
          INDEX 04 / DIRECT INQUIRY &amp; COMMISSION
        </span>

        <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-light tracking-tight text-white leading-[1.05]">
          Let&apos;s direct your next <span className="serif-italic font-normal text-white">landmark visual</span> production.
        </h2>

        <p className="mt-8 text-lg text-[#8e8e93] max-w-2xl font-normal leading-relaxed">
          Open to Creative AI Lead roles, executive art direction, enterprise generative pipeline architecture, and high-budget luxury campaigns.
        </p>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-wrap gap-4 items-center">
          <a
            href={`mailto:${siteConfig.email}?subject=Production%20Inquiry%20-%20Creative%20AI%20Lead`}
            className="inline-flex items-center gap-2.5 bg-white text-[#111111] hover:bg-[#e5e5e0] px-8 py-4 rounded-full text-sm font-semibold transition-all duration-200 hover:shadow-2xl hover:scale-[1.02] active:scale-98"
          >
            <span>Send Direct Email</span>
            <span>↗</span>
          </a>

          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/[0.16] px-6 py-4 rounded-full text-sm font-medium transition-colors cursor-pointer"
          >
            <span>{copied ? '✓ Email Copied' : siteConfig.email}</span>
          </button>
        </div>

        {/* Contact Matrix */}
        <div className="mt-20 pt-12 border-t border-white/[0.12] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
              className="text-base font-medium text-white hover:text-[#d1d1cf] transition-colors mt-2 block"
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
            <span className="font-mono text-xs text-[#8e8e93] uppercase block">Drive Asset Vault</span>
            <a
              href={siteConfig.portfolioDrive}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-medium text-white hover:text-[#d1d1cf] transition-colors mt-2 block"
            >
              50+ Full Campaign Decks ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
