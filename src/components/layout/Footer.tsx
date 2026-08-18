'use client';

import { useState, useRef, useEffect } from 'react';
import { siteConfig } from '@/data/portfolio';
import { scrollToSection } from '@/lib/scroll';
import { gsap, ScrollTrigger } from '@/hooks/useGSAP';
import MagneticButton from '@/components/ui/MagneticButton';

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const footerRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // GSAP: Reveal headline words with stagger
  useEffect(() => {
    if (!footerRef.current || !headlineRef.current) return;

    const ctx = gsap.context(() => {
      // Animate the CTA headline
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Stagger contact items
      const contactItems = footerRef.current?.querySelectorAll('[data-footer-item]');
      if (contactItems) {
        gsap.fromTo(
          contactItems,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contactItems[0],
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} id="contact" className="relative w-full bg-[#050505] text-white pt-32 pb-12 mt-0">
      {/* Gradient merge from previous section */}
      <div className="absolute -top-32 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#050505] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* ── Grand CTA Headline ── */}
        <div className="pb-16 border-b border-white/[0.08]">
          <span className="font-mono text-xs text-white/30 tracking-widest uppercase block mb-8">
            04 / INQUIRIES & COMMISSIONS
          </span>

          <h2
            ref={headlineRef}
            className="text-[clamp(2.75rem,8vw,7rem)] font-light tracking-[-0.04em] text-white leading-[1] max-w-5xl"
          >
            Let&apos;s direct your next{' '}
            <span className="serif-italic font-normal">landmark visual</span>{' '}
            production.
          </h2>

          <p className="mt-8 text-base sm:text-lg text-white/50 max-w-2xl font-light leading-relaxed">
            Open to Senior / Lead Creative AI roles, agency leadership, enterprise generative workflow consulting,
            and high-budget luxury campaigns.
          </p>

          {/* CTAs */}
          <div className="mt-12 flex flex-wrap gap-4 items-center" data-footer-item>
            <MagneticButton
              href={`mailto:${siteConfig.email}?subject=Production%20Inquiry%20-%20Creative%20AI%20Lead`}
              className="inline-flex items-center gap-2.5 bg-white text-[#050505] hover:bg-white/90 px-8 py-4 rounded-full text-xs font-mono uppercase tracking-wider font-bold transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.12)]"
            >
              <span>Send Direct Email</span>
              <span>↗</span>
            </MagneticButton>

            <MagneticButton
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/[0.1] hover:border-white/[0.2] px-6 py-4 rounded-full text-xs font-mono uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer"
            >
              <span>{copied ? '✓ Copied' : `${siteConfig.email}`}</span>
            </MagneticButton>
          </div>
        </div>

        {/* ── Contact Channels Grid ── */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div data-footer-item>
            <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest block mb-3">Phone / WhatsApp</span>
            <a
              href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
              className="text-base font-light text-white hover:text-white/70 transition-colors block"
            >
              {siteConfig.phone}
            </a>
          </div>

          <div data-footer-item>
            <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest block mb-3">Behance Portfolio</span>
            <a
              href={siteConfig.behance}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-light text-white hover:text-[#06b6d4] transition-colors block"
            >
              behance.net/Vedvish0987 ↗
            </a>
          </div>

          <div data-footer-item>
            <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest block mb-3">LinkedIn</span>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-light text-white hover:text-white/70 transition-colors block"
            >
              in/vedprakash-vishwakarma ↗
            </a>
          </div>

          <div data-footer-item>
            <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest block mb-3">Campaign Archives</span>
            <a
              href={siteConfig.portfolioDrive}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-light text-white hover:text-[#7c3aed] transition-colors block"
            >
              50+ Decks on Drive ↗
            </a>
          </div>
        </div>

        {/* ── Bottom Copyright ── */}
        <div className="mt-24 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] text-white/25 font-mono uppercase tracking-wider">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <span className="text-white/50 font-bold">
              {siteConfig.name}
            </span>
            <span className="hidden sm:inline text-white/15">·</span>
            <span>Creative AI Lead · Visual Content Architect</span>
          </div>

          <div className="flex items-center gap-8">
            <span>© {new Date().getFullYear()}</span>
            <MagneticButton
              onClick={() => scrollToSection('hero')}
              className="text-white/50 font-bold hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
              strength={0.4}
            >
              <span>Back to top</span>
              <span>↑</span>
            </MagneticButton>
          </div>
        </div>
      </div>
    </footer>
  );
}
