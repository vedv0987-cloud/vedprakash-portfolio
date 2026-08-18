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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <div
        data-cursor="video"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsModalOpen(true)}
        className="group relative rounded-3xl overflow-hidden glass-panel border border-black/[0.08] shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col bg-white"
      >
        {/* Video / Poster Canvas */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0a0c]">
          {/* Poster Image */}
          <Image
            src={project.posterImage}
            alt={project.title}
            fill
            className={`object-cover transition-all duration-700 ${
              isHovered ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
            }`}
            sizes="(max-width: 1024px) 100vw, 33vw"
          />

          {/* Video Layer (Autoplays on Hover) */}
          {project.videoSrc ? (
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
          ) : (
            /* Animated Canvas Simulation fallback for Drive Links */
            <div
              className={`absolute inset-0 bg-gradient-to-tr from-[#7c3aed]/40 via-[#06b6d4]/30 to-black/80 flex items-center justify-center transition-opacity duration-500 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="flex flex-col items-center gap-2 text-white">
                <span className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 animate-pulse">
                  <svg className="w-6 h-6 fill-current text-white ml-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <span className="text-[11px] font-mono tracking-wider">CLICK TO STREAM 4K</span>
              </div>
            </div>
          )}

          {/* Ambient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent pointer-events-none" />

          {/* Top Badges */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
            <span className="bg-black/65 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full border border-white/20">
              {project.category}
            </span>
            <span className="bg-white/90 backdrop-blur-md text-[#0a0a0c] text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md">
              {project.duration}
            </span>
          </div>

          {/* Live Play Status Indicator at Bottom */}
          <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#06b6d4] animate-ping" />
              <span className="text-[11px] font-mono text-white/90 font-medium">
                {isHovered ? 'PREVIEW STREAMING' : 'HOVER TO PLAY'}
              </span>
            </div>
            <span className="text-[12px] font-bold text-white/80 group-hover:text-white transition-colors">
              REEL ↗
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <span className="text-[12px] font-semibold text-[#7c3aed] uppercase tracking-wider">
              {project.client}
            </span>
            <h3 className="text-xl font-bold tracking-tight text-[#0a0a0c] mt-1 group-hover:text-[#7c3aed] transition-colors">
              {project.title}
            </h3>
            <p className="mt-2 text-[14px] text-[#52525b] leading-relaxed line-clamp-2">
              {project.description}
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-black/[0.06] flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {project.modelTags.map((m) => (
                <span
                  key={m}
                  className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-[#fafafa] text-[#71717a] border border-black/[0.06]"
                >
                  {m}
                </span>
              ))}
            </div>
            <span className="text-[13px] font-bold text-[#0a0a0c] group-hover:translate-x-1 transition-transform">
              →
            </span>
          </div>
        </div>
      </div>

      {/* Fullscreen Cinema Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-2xl p-4 sm:p-8 md:p-12 flex items-center justify-center"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl rounded-3xl overflow-hidden bg-[#0e0e12] border border-white/15 shadow-2xl flex flex-col"
            >
              {/* Modal Top Bar */}
              <div className="p-4 sm:p-6 bg-[#16161d] border-b border-white/10 flex items-center justify-between text-white">
                <div>
                  <span className="text-xs font-mono text-[#06b6d4] uppercase tracking-wider">
                    {project.client} · {project.category}
                  </span>
                  <h3 className="text-lg sm:text-2xl font-bold tracking-tight mt-0.5">
                    {project.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  {project.driveLink && (
                    <a
                      href={project.driveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-[13px] font-medium border border-white/20 transition-colors"
                    >
                      Open in Drive ↗
                    </a>
                  )}
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Large Viewport Canvas */}
              <div className="relative aspect-[16/9] w-full bg-black">
                {project.videoSrc ? (
                  <video
                    src={project.videoSrc}
                    controls
                    autoPlay
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={project.posterImage}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="1200px"
                    />
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-6 text-center text-white">
                      <span className="w-16 h-16 rounded-full bg-[#7c3aed] flex items-center justify-center shadow-2xl mb-4 animate-bounce">
                        <svg className="w-8 h-8 fill-current ml-1" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                      <h4 className="text-xl sm:text-2xl font-bold">Direct Drive Cinema Master</h4>
                      <p className="mt-2 text-sm text-[#a1a1aa] max-w-md">
                        This cinematic 4K production is hosted on the verified portfolio drive vault.
                      </p>
                      {project.driveLink && (
                        <a
                          href={project.driveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-6 px-7 py-3 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white font-semibold text-sm shadow-xl hover:scale-105 transition-transform"
                        >
                          Stream Full Master on Google Drive ↗
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Production Metadata Footer */}
              <div className="p-6 bg-[#16161d] border-t border-white/10 grid sm:grid-cols-3 gap-4 text-white text-[13px]">
                <div>
                  <span className="text-[11px] font-mono text-[#71717a] uppercase block">AI & Production Stack</span>
                  <span className="font-semibold">{project.modelTags.join(' · ')}</span>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-[#71717a] uppercase block">Master Quality</span>
                  <span className="font-semibold">4K UHD Cinema / 60 FPS Lossless</span>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-[#71717a] uppercase block">Production Turnaround</span>
                  <span className="font-semibold">60% Timeline Compression</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
