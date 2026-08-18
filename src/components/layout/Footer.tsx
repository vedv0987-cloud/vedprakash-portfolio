'use client';

import { siteConfig } from '@/data/portfolio';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-black/[0.06] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#7c3aed] to-[#06b6d4] flex items-center justify-center text-white font-bold text-[10px]">
              VP
            </span>
            <span className="font-semibold text-[14px] text-[#0a0a0c]">
              {siteConfig.name}
            </span>
          </div>
          <span className="hidden sm:inline text-[#d4d4d8]">|</span>
          <p className="text-[13px] text-[#71717a]">
            {siteConfig.tagline}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-[13px] text-[#71717a]">
          <a
            href={siteConfig.behance}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#0057ff] font-medium transition-colors"
          >
            Behance ↗
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#0a0a0c] font-medium transition-colors"
          >
            LinkedIn ↗
          </a>
          <a
            href={siteConfig.portfolioDrive}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#7c3aed] font-medium transition-colors"
          >
            Drive ↗
          </a>
          <span>© {new Date().getFullYear()}</span>
          <button
            onClick={scrollToTop}
            className="text-[#0a0a0c] font-semibold hover:text-[#7c3aed] transition-colors cursor-pointer flex items-center gap-1 ml-2"
          >
            <span>Top</span>
            <span>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
