'use client';

import { useState, useEffect, useRef } from 'react';
import { siteConfig } from '@/data/portfolio';
import { scrollToSection } from '@/lib/scroll';
import TextReveal from '@/components/ui/TextReveal';

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = `mailto:${siteConfig.email}`;
    }
  };

  return (
    <footer id="contact" className="w-full bg-background text-text-main">
      {/* Contact CTA Section */}
      <div className="max-w-[1360px] mx-auto px-6 lg:px-12 pt-24 md:pt-32 pb-16">
        <div className="max-w-5xl">
          <TextReveal as="h2" split="lines" className="font-display text-[clamp(2.5rem,7vw,6rem)] font-semibold tracking-[-0.035em] text-text-main leading-[0.95]">
            Let&apos;s direct your next landmark visual production.
          </TextReveal>

          <p className="mt-8 text-body-lg text-text-muted max-w-2xl font-normal leading-relaxed">
            Open to Senior / Lead Creative AI roles, agency creative leadership, enterprise generative workflow consulting, and high-budget luxury campaigns.
          </p>

          {/* Action CTAs */}
          <div className="mt-12 flex flex-wrap gap-4 items-center">
            <a
              href={`mailto:${siteConfig.email}?subject=Production%20Inquiry%20-%20Creative%20AI%20Lead`}
              className="magnetic-btn inline-flex items-center gap-2 bg-accent text-white hover:bg-accent-hover px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] shadow-sm active:scale-95"
            >
              <span>Send Direct Email</span>
              <span>↗</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="magnetic-btn inline-flex items-center gap-2 bg-bg-card hover:bg-bg-secondary text-text-main border border-border px-6 py-4 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-xs min-w-[200px]"
            >
              <span>{copied ? '✓ Email Copied' : `${siteConfig.email} (Click to Copy)`}</span>
            </button>
          </div>

          {/* Contact Grid */}
          <div className="mt-20 pt-12 border-t border-border grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <span className="font-mono text-[11px] text-text-subtle uppercase block font-semibold tracking-wider">Phone / WhatsApp</span>
              <a
                href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                className="text-base font-semibold text-text-main hover:text-accent transition-colors mt-2 block"
              >
                {siteConfig.phone}
              </a>
            </div>

            <div>
              <span className="font-mono text-[11px] text-text-subtle uppercase block font-semibold tracking-wider">Behance Portfolio</span>
              <a
                href={siteConfig.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-semibold text-text-main hover:text-accent transition-colors mt-2 block"
              >
                behance.net/Vedvish0987 ↗
              </a>
            </div>

            <div>
              <span className="font-mono text-[11px] text-text-subtle uppercase block font-semibold tracking-wider">LinkedIn Network</span>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-semibold text-text-main hover:text-accent transition-colors mt-2 block"
              >
                in/vedprakash-vishwakarma ↗
              </a>
            </div>

            <div>
              <span className="font-mono text-[11px] text-text-subtle uppercase block font-semibold tracking-wider">Raw Asset Vault</span>
              <a
                href={siteConfig.portfolioDrive}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-semibold text-accent hover:underline transition-colors mt-2 block"
              >
                50+ Campaign Decks on Drive ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <span className="font-display font-bold text-text-main text-sm uppercase tracking-wider">
              {siteConfig.name}
            </span>
            <span className="hidden sm:inline text-border-strong">/</span>
            <span className="text-[11px] font-mono text-text-subtle tracking-wide">{siteConfig.tagline}</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[11px] font-mono text-text-subtle">© {new Date().getFullYear()}</span>
            <button
              onClick={() => scrollToSection('hero')}
              className="text-text-main font-semibold text-[11px] font-mono uppercase tracking-wider hover:text-accent transition-colors cursor-pointer flex items-center gap-1.5"
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
