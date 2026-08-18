'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export interface VideoProject {
  id: string;
  title: string;
  category: string;
  client: string;
  duration: string;
  posterImage: string;
  videoSrc?: string;
  driveLink?: string;
  aspectRatio?: string;
  modelTags: string[];
  description: string;
}

export default function VideoHoverCard({ project }: { project: VideoProject }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <>
      <div
        data-cursor="video"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsModalOpen(true)}
        className="group relative rounded-3xl overflow-hidden bg-[#0a0a0a] border border-white/10 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col"
      >
        {/* Video / Poster Canvas */}
        <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-[#050505]">
          <Image
            src={project.posterImage}
            alt={project.title}
            fill
            className={`object-cover transition-all duration-700 ${
              isHovered && project.videoSrc ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
            }`}
            sizes="(max-width: 1024px) 100vw, 33vw"
          />

          {project.videoSrc && (
            <video
              ref={videoRef}
              src={project.videoSrc}
              muted
              loop
              playsInline
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          {/* Top Badges */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
            <span className="bg-black/70 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full border border-white/20">
              {project.category}
            </span>
            <span className="bg-white/90 backdrop-blur-md text-black text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md">
              {project.duration}
            </span>
          </div>

          {/* Bottom Telemetry */}
          <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[11px] font-mono text-white/90 font-medium drop-shadow-md">
                {isHovered ? 'PLAYING PREVIEW' : 'HOVER TO PLAY'}
              </span>
            </div>
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/15">
              WATCH REEL ↗
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono text-white/40 uppercase tracking-wider block">
              {project.client}
            </span>
            <h3 className="text-xl font-light tracking-tight text-white mt-1 group-hover:text-[#06b6d4] transition-colors">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-white/70 leading-relaxed line-clamp-2">
              {project.description}
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {project.modelTags.slice(0, 2).map((m) => (
                <span
                  key={m}
                  className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/5 text-white/60"
                >
                  {m}
                </span>
              ))}
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-white group-hover:underline">
              Play Inside ↗
            </span>
          </div>
        </div>
      </div>

      {/* ── In-Website Cinema Modal ── */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-[#050505]/95 backdrop-blur-2xl p-4 sm:p-6 md:p-8 flex items-center justify-center"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[92vh] rounded-3xl overflow-hidden bg-[#0a0a0a] border border-white/10 shadow-2xl flex flex-col"
            >
              <div className="px-6 py-4 bg-[#111] border-b border-white/10 flex items-center justify-between text-white shrink-0">
                <div>
                  <span className="text-xs font-mono text-[#06b6d4] uppercase tracking-wider">
                    {project.client} · {project.category}
                  </span>
                  <h3 className="text-base sm:text-xl font-light tracking-tight mt-0.5">
                    {project.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  {project.driveLink && (
                    <a
                      href={project.driveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono tracking-wider uppercase border border-white/20 transition-colors"
                    >
                      Drive Archive ↗
                    </a>
                  )}
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer text-sm"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="relative flex-1 min-h-[50vh] max-h-[72vh] w-full bg-[#050505] flex items-center justify-center p-2 sm:p-4 overflow-hidden">
                {project.videoSrc ? (
                  <video
                    src={project.videoSrc}
                    controls
                    autoPlay
                    playsInline
                    className="max-h-[68vh] w-auto max-w-full h-auto object-contain rounded-xl shadow-2xl mx-auto"
                  />
                ) : (
                  <div className="relative w-full h-full flex flex-col items-center justify-center text-center text-white p-6">
                    <Image
                      src={project.posterImage}
                      alt={project.title}
                      fill
                      className="object-contain"
                      sizes="1000px"
                    />
                  </div>
                )}
              </div>

              <div className="px-6 py-3 bg-[#111] border-t border-white/10 flex flex-wrap items-center justify-between text-white text-xs font-mono shrink-0 gap-2">
                <span className="text-white/50">
                  STACK: <strong className="text-white">{project.modelTags.join(' · ')}</strong>
                </span>
                <span className="text-emerald-400">
                  ● PLAYING DIRECTLY IN WEBSITE (HD 60FPS)
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
