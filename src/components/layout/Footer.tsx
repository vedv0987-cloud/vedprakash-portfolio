'use client';

import { siteConfig } from '@/data/portfolio';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-black/[0.08] bg-[#f8f8f6]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#666664]">
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <span className="font-bold text-[#111111] uppercase tracking-wider">
            {siteConfig.name}
          </span>
          <span className="hidden sm:inline text-[#d1d1cf]">/</span>
          <span>{siteConfig.tagline}</span>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <a
            href={siteConfig.behance}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#111111] transition-colors"
          >
            Behance
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#111111] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={siteConfig.portfolioDrive}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#111111] transition-colors"
          >
            Drive Vault
          </a>
          <span>© {new Date().getFullYear()}</span>
          <button
            onClick={scrollToTop}
            className="text-[#111111] font-semibold hover:opacity-70 transition-opacity cursor-pointer ml-2"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
