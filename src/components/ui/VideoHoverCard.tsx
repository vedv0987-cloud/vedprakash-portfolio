'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export interface VideoProject {
  id: string;
  title: string;
  category: string;
  client: string;
  duration: string;
  posterImage: string;
  driveLink?: string;
  aspectRatio?: string;
  modelTags: string[];
  description: string;
}

export default function VideoHoverCard({ project }: { project: VideoProject }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        data-cursor="video"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
        className="group relative rounded-3xl overflow-hidden bg-white border border-black/[0.08] shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col"
      >
        {/* Video / Poster Canvas (Ultra-Fast Lightweight Loading) */}
        <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-[#0a0a0c]">
          {/* Poster Image with Next.js Auto-Optimization */}
          <Image
            src={project.posterImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />

          {/* Dynamic Play Overlay */}
          <div
            className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl scale-95 group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6 fill-current ml-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Ambient Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          {/* Top Badges */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
            <span className="bg-black/70 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full border border-white/20">
              {project.category}
            </span>
            <span className="bg-white/90 backdrop-blur-md text-[#111111] text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md">
              {project.duration}
            </span>
          </div>

          {/* Bottom Telemetry */}
          <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono text-white/90 font-medium">
                4K MASTER REEL
              </span>
            </div>
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/15">
              STREAM ↗
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono text-[#8e8e93] uppercase tracking-wider block">
              {project.client}
            </span>
            <h3 className="text-xl font-light tracking-tight text-[#111111] mt-1 group-hover:text-black transition-colors">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-[#666664] leading-relaxed line-clamp-2">
              {project.description}
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-black/[0.08] flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {project.modelTags.slice(0, 2).map((m) => (
                <span
                  key={m}
                  className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-black/[0.04] text-[#666664]"
                >
                  {m}
                </span>
              ))}
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#111111] group-hover:underline">
              Launch Stream ↗
            </span>
          </div>
        </div>
      </div>

      {/* ── Fullscreen Cinema Master Modal (Direct Google Drive Stream) ── */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-2xl p-4 sm:p-6 md:p-8 flex items-center justify-center"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl rounded-3xl overflow-hidden bg-[#0e0e12] border border-white/15 shadow-2xl flex flex-col"
            >
              {/* Modal Top Bar */}
              <div className="px-6 py-4 bg-[#16161d] border-b border-white/10 flex items-center justify-between text-white shrink-0">
                <div>
                  <span className="text-xs font-mono text-[#06b6d4] uppercase tracking-wider">
                    {project.client} · {project.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-light tracking-tight mt-0.5">
                    {project.title}
                  </h3>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer text-sm"
                >
                  ✕
                </button>
              </div>

              {/* Viewport Canvas */}
              <div className="relative aspect-[16/10] w-full bg-black flex items-center justify-center overflow-hidden">
                <Image
                  src={project.posterImage}
                  alt={project.title}
                  fill
                  className="object-cover opacity-60"
                  sizes="900px"
                />

                <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white">
                  <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl mb-4 hover:scale-105 transition-transform">
                    <svg className="w-7 h-7 fill-current ml-0.5" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>

                  <h4 className="text-2xl font-light tracking-tight">Direct Drive 4K Master Video</h4>
                  <p className="mt-2 text-sm text-[#a1a1aa] max-w-md">
                    Stream the uncompressed 60FPS master reel directly from the verified client portfolio vault.
                  </p>

                  {project.driveLink && (
                    <a
                      href={project.driveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 px-8 py-3.5 rounded-full bg-white text-black font-semibold text-xs font-mono uppercase tracking-wider shadow-2xl hover:bg-[#e5e5e0] transition-colors"
                    >
                      Stream Full 4K Master on Google Drive ↗
                    </a>
                  )}
                </div>
              </div>

              {/* Modal Footer Metadata */}
              <div className="px-6 py-4 bg-[#16161d] border-t border-white/10 flex flex-wrap items-center justify-between text-white text-xs font-mono shrink-0 gap-2">
                <span className="text-white/70">
                  STACK: <strong className="text-white">{project.modelTags.join(' · ')}</strong>
                </span>
                <span className="text-emerald-400">
                  ● HIGH-SPEED GOOGLE CLOUD STREAMING
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
