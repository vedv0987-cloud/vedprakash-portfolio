'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { siteConfig, keyStats } from '@/data/portfolio';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Hero() {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const current = Math.floor(video.currentTime);
      const mins = Math.floor(current / 60);
      const secs = current % 60;
      setCurrentTime(`${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`);
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col justify-between pt-36 pb-16 px-6 lg:px-12 max-w-[1400px] mx-auto">
      {/* ── Top Editorial Manifesto Strip ── */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/[0.08]"
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold tracking-wider uppercase text-[#111111]">
            Executive Creative AI Lead &amp; Visual Director
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs text-[#666664] font-mono">
          <span>MUMBAI · GLOBAL COMMISSIONS</span>
          <span>·</span>
          <span>EST. 2013</span>
        </div>
      </motion.div>

      {/* ── Massive Editorial Statement ── */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
        }}
        className="py-10 md:py-16"
      >
        <motion.h1
          variants={fadeUp}
          className="text-[clamp(2.5rem,6.5vw,5.5rem)] font-light tracking-tight text-[#111111] leading-[1.05] max-w-5xl"
        >
          Directing <span className="serif-italic font-normal">photorealistic environments</span>, luxury architectural cinema, and generative commercial campaigns.
        </motion.h1>

        <motion.div variants={fadeUp} className="mt-6 max-w-2xl">
          <p className="text-base sm:text-lg text-[#666664] font-normal leading-relaxed">
            {siteConfig.shortBio}
          </p>
        </motion.div>

        {/* ── Magnetic Action Buttons Cluster ── */}
        <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3.5 items-center">
          <a
            href="#work"
            className="inline-flex items-center gap-2.5 bg-[#111111] text-white hover:bg-black px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-98"
          >
            <span>Explore Selected Work</span>
            <span>↓</span>
          </a>

          <a
            href="#films"
            className="inline-flex items-center gap-2 bg-white text-[#111111] border border-black/[0.16] hover:border-black px-7 py-4 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:shadow-xs hover:scale-[1.02] active:scale-98"
          >
            <span className="w-2 h-2 rounded-full bg-[#06b6d4]" />
            <span>Watch Film Reels</span>
          </a>

          <a
            href={siteConfig.behance}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-[#111111] border border-black/[0.16] hover:border-black px-6 py-4 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:shadow-xs hover:scale-[1.02] active:scale-98"
          >
            <span>Behance ↗</span>
          </a>

          <a
            href={siteConfig.portfolioDrive}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-[#111111] border border-black/[0.16] hover:border-black px-6 py-4 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:shadow-xs hover:scale-[1.02] active:scale-98"
          >
            <span>Drive Archive (50+) ↗</span>
          </a>
        </motion.div>
      </motion.div>

      {/* ── Full-Bleed 4K Video Showreel Hero Canvas ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
        className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-3xl overflow-hidden shadow-2xl border border-black/[0.08] bg-[#0a0a0c]"
      >
        <video
          ref={videoRef}
          src="/videos/real-estate-01.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />

        {/* Ambient Dark Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        {/* Top Video Header HUD */}
        <div className="absolute top-5 left-6 right-6 flex items-center justify-between text-white text-xs font-mono">
          <div className="flex items-center gap-2.5 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>4K CINEMATIC SHOWREEL</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md hover:bg-black/80 border border-white/15 transition-colors cursor-pointer"
            >
              {isPlaying ? 'PAUSE' : 'PLAY'}
            </button>
            <button
              onClick={toggleMute}
              className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md hover:bg-black/80 border border-white/15 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>{isMuted ? 'UNMUTE SOUND 🔈' : 'MUTE 🔊'}</span>
            </button>
          </div>
        </div>

        {/* Bottom Video Telemetry & Direct Drive Action */}
        <div className="absolute bottom-5 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono text-white/70 mb-1">
              <span>01 / REALATTE LUXURY REAL ESTATE</span>
              <span>·</span>
              <span>{currentTime} / 00:45 · 60FPS</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
              Cinematic Waterfront Villa · Volumetric Camera Directing
            </h3>
          </div>

          {/* Progress Bar & Open Drive Link */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block w-32 h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
            <a
              href={siteConfig.portfolioDrive}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-white text-[#111111] hover:bg-[#e5e5e0] text-xs font-semibold tracking-wider uppercase transition-colors shrink-0 text-center"
            >
              Open Full Drive Vault ↗
            </a>
          </div>
        </div>
      </motion.div>

      {/* ── Verified Metrics Strip ── */}
      <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t border-black/[0.08]">
        {keyStats.map((stat, i) => (
          <div key={i} className="flex flex-col">
            <span className="text-4xl md:text-5xl font-light tracking-tight text-[#111111]">
              {stat.value}
              <span className="serif-italic font-normal">{stat.suffix}</span>
            </span>
            <span className="text-sm font-semibold text-[#111111] mt-2">{stat.label}</span>
            <span className="text-xs text-[#666664] mt-0.5">{stat.sublabel}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
