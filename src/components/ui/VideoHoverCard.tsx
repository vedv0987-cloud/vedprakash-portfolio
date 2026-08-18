'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { toolLinks } from '@/data/portfolio';

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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsModalOpen(true)}
        className="group relative rounded-3xl overflow-hidden bg-[#ffffff] border border-black/[0.08] hover:border-black/[0.16] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
      >
        {/* Video / Poster Canvas */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[#000000]">
          <Image
            src={project.posterImage}
            alt={project.title}
            fill
            className={`object-cover transition-all duration-500 ${
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
              preload="auto"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
            <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-full border border-white/20">
              {project.category}
            </span>
            <span className="bg-white/90 backdrop-blur-md text-[#1d1d1f] text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md shadow-xs">
              {project.duration}
            </span>
          </div>

          {/* Bottom Overlay Info */}
          <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-white pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[11px] font-mono text-white/90 font-medium">
                {isHovered ? 'STREAMING PREVIEW' : 'HOVER TO PLAY'}
              </span>
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-white bg-[#0071e3] px-3 py-1 rounded-full shadow-xs">
              Play Film ↗
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 flex-1 flex flex-col justify-between bg-white">
          <div>
            <span className="text-xs font-mono text-[#86868b] uppercase tracking-wider block">
              {project.client}
            </span>
            <h3 className="text-xl font-semibold tracking-tight text-[#1d1d1f] mt-1 group-hover:text-[#0071e3] transition-colors leading-snug">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-[#6e6e73] leading-relaxed line-clamp-2 font-normal">
              {project.description}
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-black/[0.06] flex items-center justify-between">
            {/* Clickable Tool Tags */}
            <div className="flex flex-wrap gap-1.5" onClick={(e) => e.stopPropagation()}>
              {project.modelTags.slice(0, 2).map((m) => {
                const url = toolLinks[m] || 'https://google.com';
                return (
                  <a
                    key={m}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-[#f5f5f7] hover:bg-[#0071e3] text-[#1d1d1f] hover:text-white border border-black/[0.06] transition-colors"
                  >
                    {m} ↗
                  </a>
                );
              })}
            </div>
            <span className="text-xs font-semibold text-[#0071e3] group-hover:underline">
              Full Screen ↗
            </span>
          </div>
        </div>
      </div>

      {/* ── In-Website Apple Cinema Modal ── */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-xl p-4 sm:p-6 md:p-10 flex items-center justify-center"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[92vh] rounded-3xl overflow-hidden bg-[#161617] border border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.5)] flex flex-col text-white"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 bg-[#1d1d1f] border-b border-white/10 flex items-center justify-between shrink-0">
                <div>
                  <span className="text-xs font-mono text-[#2997ff] uppercase tracking-wider">
                    {project.client} · {project.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-white mt-0.5">
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
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Video Player Container */}
              <div className="relative flex-1 min-h-[50vh] max-h-[70vh] w-full bg-[#000000] flex items-center justify-center p-2 sm:p-4 overflow-hidden">
                {project.videoSrc ? (
                  <video
                    src={project.videoSrc}
                    controls
                    autoPlay
                    playsInline
                    preload="auto"
                    className="max-h-[66vh] w-auto max-w-full h-auto object-contain rounded-xl shadow-2xl mx-auto"
                  />
                ) : (
                  <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-6">
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

              {/* Modal Footer */}
              <div className="px-6 py-3.5 bg-[#1d1d1f] border-t border-white/10 flex flex-wrap items-center justify-between text-xs font-mono shrink-0 gap-2">
                <span className="text-white/60">
                  STACK: <strong className="text-white">{project.modelTags.join(' · ')}</strong>
                </span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  PLAYING IN-BROWSER 4K MASTER
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
