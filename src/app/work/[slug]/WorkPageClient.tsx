'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { siteConfig, toolLinks } from '@/data/portfolio';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

interface Project {
  id: string;
  title: string;
  category: string;
  filterCategory: string;
  client: string;
  period: string;
  description: string;
  image: string;
  models: string[];
  stats: { metric: string; label: string };
  featured: boolean;
}

interface Narrative {
  brief: string;
  direction: string;
  delivery: string;
}

interface WorkPageClientProps {
  project: Project;
  narrative: Narrative;
  prevProject: Project | null;
  nextProject: Project | null;
}

function HeroParallax({ image }: { image: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <div ref={ref} className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <Image src={image} alt="" fill priority className="object-cover" sizes="100vw" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-transparent to-[var(--bg)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)]/60 via-transparent to-[var(--bg)]/60" />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, var(--bg) 100%)' }} />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ background: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 3px)' }} />
    </div>
  );
}

export default function WorkPageClient({ project, narrative, prevProject, nextProject }: WorkPageClientProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const meta = [
    { label: 'Client', value: project.client },
    { label: 'Period', value: project.period },
    { label: 'Outcome', value: `${project.stats.metric} ${project.stats.label}`, accent: true },
    { label: 'Status', value: 'Completed', green: true },
  ];

  const narrativeCards = [
    { label: 'Brief', copy: narrative.brief, icon: '◎' },
    { label: 'Creative Direction', copy: narrative.direction, icon: '◈' },
    { label: 'Delivery', copy: narrative.delivery, icon: '▲' },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-main)]">
      <Navbar />

      <main>
        <HeroParallax image={project.image} />

        <div className="relative z-10 -mt-32 md:-mt-40">
          {/* Header */}
          <section className="max-w-[1360px] mx-auto px-6 lg:px-12">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Link href="/#work" data-cursor="link" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors mb-8">
                <span>←</span><span>Selected Work</span>
              </Link>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-8 lg:gap-14">
              <div className="lg:col-span-8">
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-subtle)] mb-4">
                  {project.category}
                </motion.p>
                <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.94] tracking-[-0.055em] font-semibold text-[var(--text-main)]">
                  {project.title}
                </motion.h1>
              </div>

              <motion.dl initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="lg:col-span-4 self-end grid grid-cols-2 gap-x-6 gap-y-6 text-sm border-t lg:border-t-0 border-white/[0.08] pt-6 lg:pt-0">
                {meta.map((m) => (
                  <div key={m.label}>
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">{m.label}</dt>
                    <dd className={`mt-1 font-medium ${m.accent ? 'text-[var(--accent)]' : m.green ? 'text-emerald-400' : 'text-[var(--text-main)]'}`}>{m.value}</dd>
                  </div>
                ))}
              </motion.dl>
            </div>
          </section>

          {/* Metrics Bar */}
          <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="max-w-[1360px] mx-auto px-6 lg:px-12 mt-16">
            <div className="glass-panel rounded-2xl p-6 md:p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {[
                  { value: project.stats.metric, label: project.stats.label, accent: true },
                  { value: String(project.models.length), label: 'Tools Integrated' },
                  { value: project.client.split(' ').length > 1 ? 'Enterprise' : 'Studio', label: 'Client Scale' },
                  { value: '8K', label: 'Master Output', accent: true },
                ].map((s) => (
                  <div key={s.label} className="text-center md:text-left">
                    <span className={`font-display text-3xl md:text-4xl font-bold ${s.accent ? 'text-[var(--accent)] text-glow-mint' : 'text-[var(--text-main)]'}`}>{s.value}</span>
                    <p className="font-mono text-[11px] text-[var(--text-subtle)] uppercase tracking-wider mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Description */}
          <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="max-w-[1360px] mx-auto px-6 lg:px-12 mt-20">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
              <div className="lg:col-span-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-subtle)] block">The Project</span>
              </div>
              <div className="lg:col-span-8">
                <p className="text-xl sm:text-2xl md:text-3xl leading-relaxed tracking-[-0.02em] font-light text-[var(--text-main)]">{project.description}</p>
              </div>
            </div>
          </motion.section>

          {/* Full-Width Image */}
          <motion.section initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2, duration: 0.8 }} className="max-w-[1360px] mx-auto px-6 lg:px-12 mt-20">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/[0.06]">
              <Image src={project.image} alt={project.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 1360px" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/40 via-transparent to-transparent" />
            </div>
          </motion.section>

          {/* Brief / Direction / Delivery */}
          <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }} className="max-w-[1360px] mx-auto px-6 lg:px-12 mt-20">
            <div className="grid md:grid-cols-3 gap-6">
              {narrativeCards.map((item, i) => (
                <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 + i * 0.1 }} className="glass-panel rounded-2xl p-8 group">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-[var(--accent)] text-lg">{item.icon}</span>
                    <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-subtle)]">{item.label}</h2>
                  </div>
                  <p className="text-base leading-relaxed text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition-colors duration-300">{item.copy}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Production Tools */}
          <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 }} className="max-w-[1360px] mx-auto px-6 lg:px-12 mt-20">
            <div className="glass-panel rounded-2xl p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                <div className="md:w-1/3">
                  <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-[var(--text-main)]">Production Tools</h2>
                  <p className="mt-2 text-sm text-[var(--text-muted)]">Integrated toolchain for this project</p>
                </div>
                <div className="md:w-2/3 flex flex-wrap gap-3">
                  {project.models.map((tool) => {
                    const url = toolLinks[tool] ?? 'https://www.google.com';
                    return (
                      <a key={tool} href={url} target="_blank" rel="noopener noreferrer" data-cursor="link" className="font-mono text-sm font-medium px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-[var(--text-main)] hover:bg-[var(--accent)] hover:text-black hover:border-[var(--accent)] transition-all duration-200 flex items-center gap-1.5">
                        <span>{tool}</span><span className="text-[10px] opacity-60">↗</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Navigation */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.0 }} className="max-w-[1360px] mx-auto px-6 lg:px-12 mt-20 pt-8 border-t border-white/[0.06]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <Link href="/#work" className="text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors">← Return to selected work</Link>
              <a href={siteConfig.portfolioDrive} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[var(--text-main)] hover:text-[var(--accent)] transition-colors">Request campaign material ↗</a>
            </div>

            {/* Prev / Next */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevProject && (
                <Link href={`/work/${prevProject.id}`} data-cursor="link" className="glass-panel rounded-xl p-6 group">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">← Previous</span>
                  <p className="mt-2 font-display text-lg font-semibold text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors">{prevProject.title}</p>
                </Link>
              )}
              {nextProject && (
                <Link href={`/work/${nextProject.id}`} data-cursor="link" className="glass-panel rounded-xl p-6 group text-right sm:col-start-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Next →</span>
                  <p className="mt-2 font-display text-lg font-semibold text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors">{nextProject.title}</p>
                </Link>
              )}
            </div>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
