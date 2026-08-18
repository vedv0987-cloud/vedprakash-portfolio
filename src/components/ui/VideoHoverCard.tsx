'use client';

import { useState } from 'react';
import Image from 'next/image';
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

export default function VideoHoverCard({
  project,
  onPlayClick,
}: {
  project: VideoProject;
  onPlayClick: (project: VideoProject) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onPlayClick(project)}
      className="group relative overflow-hidden bg-transparent border-t border-black/[0.12] hover:border-[#0071e3] transition-colors duration-300 cursor-pointer flex flex-col justify-between"
    >
      {/* Video / Poster Canvas */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#000000] mt-5">
        <Image
          src={project.posterImage}
          alt={project.title}
          fill
          className={`object-cover transition-all duration-500 ${
            isHovered && project.videoSrc ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
          }`}
          sizes="(max-width: 1024px) 100vw, 33vw"
        />

        {isHovered && project.videoSrc && (
          <video
            src={project.videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
          <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-full border border-white/20">
            {project.category}
          </span>
          <span className="bg-white/90 backdrop-blur-md text-[#1d1d1f] text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md shadow-xs">
            {project.duration}
          </span>
        </div>

        {/* Center Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-13 h-13 rounded-full bg-white/90 text-[#1d1d1f] shadow-lg flex items-center justify-center pl-1 group-hover:scale-110 group-hover:bg-[#0071e3] group-hover:text-white transition-all duration-300">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[11px] font-mono text-white font-medium drop-shadow-xs">
              {isHovered ? 'PREVIEWING' : 'CLICK TO PLAY'}
            </span>
          </div>
          <span className="text-xs font-semibold text-white/90">
            Open Popup ↗
          </span>
        </div>
      </div>

      {/* Content Details */}
      <div className="py-5 flex-1 flex flex-col justify-between bg-transparent">
        <div>
          <span className="text-xs font-mono text-[#86868b] uppercase tracking-wider block">
            {project.client}
          </span>
          <h3 className="text-lg font-semibold tracking-tight text-[#1d1d1f] mt-1 group-hover:text-[#0071e3] transition-colors leading-snug">
            {project.title}
          </h3>
          <p className="mt-2 text-xs text-[#6e6e73] leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        <div className="mt-4 pt-3.5 border-t border-black/[0.06] flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5" onClick={(e) => e.stopPropagation()}>
            {project.modelTags.slice(0, 2).map((m) => {
              const url = toolLinks[m] || 'https://google.com';
              return (
                <a
                  key={m}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#f5f5f7] hover:bg-[#0071e3] text-[#1d1d1f] hover:text-white border border-black/[0.06] transition-colors"
                >
                  {m} ↗
                </a>
              );
            })}
          </div>
          <span className="text-xs font-semibold text-[#0071e3] group-hover:underline">
            Watch Full Reel ↗
          </span>
        </div>
      </div>
    </div>
  );
}
