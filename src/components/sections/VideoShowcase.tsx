'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { videoProjects, siteConfig } from '@/data/portfolio';
import VideoHoverCard, { VideoProject } from '@/components/ui/VideoHoverCard';
import { gsap } from '@/hooks/useGSAP';

export default function VideoShowcase() {
  const [selectedVideo, setSelectedVideo] = useState<VideoProject | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleClose = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current = null;
    }
    setSelectedVideo(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClose]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll('.video-reveal'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="films"
      className="py-16 md:py-24 px-6 lg:px-12 max-w-[1360px] mx-auto bg-[#ffffff]"
    >
      {/* Section Header */}
      <div className="video-reveal flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-black/[0.08] gap-6">
        <div>
          <span className="font-mono text-[11px] text-[#86868b] tracking-wider uppercase block mb-2 font-medium">
            02 / CINEMATOGRAPHY &amp; MOTION
          </span>
          <h2 className="text-[clamp(2.25rem,5vw,3.75rem)] font-semibold tracking-[-0.03em] text-[#1d1d1f] leading-[1.08]">
            Motion <span className="serif-italic font-normal text-[#0071e3]">&amp; Cinematic</span> Reels
          </h2>
          <p className="mt-3 text-base text-[#6e6e73] max-w-xl font-normal">
            Hover over any project reel to preview. Click to open the video in a clear, centered popup window.
          </p>
        </div>

        <a
          href={siteConfig.portfolioDrive}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#0071e3] text-white hover:bg-[#0077ed] px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-xs shrink-0"
        >
          <span>Stream All Master Reels on Drive</span>
          <span>↗</span>
        </a>
      </div>

      {/* Grid of Video Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videoProjects.map((vid) => (
          <div key={vid.id} className="video-reveal">
            <VideoHoverCard
              project={vid}
              onPlayClick={(p) => setSelectedVideo(p)}
            />
          </div>
        ))}
      </div>

      {/* Single Clean Centered Popup Window */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99998] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 md:p-10"
            role="dialog"
            aria-modal="true"
            aria-label={`Playing ${selectedVideo.title}`}
            onClick={handleClose}
          >
            {/* Top-Right Floating Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center text-xl font-bold backdrop-blur-md transition-all cursor-pointer shadow-lg hover:scale-105"
              title="Close (ESC)"
              aria-label="Close video player"
            >
              ✕
            </button>

            {/* Video Window */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[88vh] max-w-[92vw] aspect-[9/16] sm:aspect-[9/16] rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.8)] bg-black border border-white/15 flex items-center justify-center"
            >
              {selectedVideo.videoSrc ? (
                <video
                  ref={videoRef}
                  src={selectedVideo.videoSrc}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-contain rounded-3xl"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white">
                  <span>Video loading...</span>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
