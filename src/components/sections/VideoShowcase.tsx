'use client';

import { motion } from 'framer-motion';
import { videoProjects, siteConfig } from '@/data/portfolio';
import VideoHoverCard from '@/components/ui/VideoHoverCard';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function VideoShowcase() {
  return (
    <section id="videos" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#06b6d4] uppercase tracking-widest bg-[#06b6d4]/10 px-3.5 py-1 rounded-full mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] animate-pulse" />
            <span>Motion Cinema & Video Reels</span>
          </div>
          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold tracking-tight text-[#0a0a0c]">
            Interactive Video Showcase
          </h2>
          <p className="mt-2 text-base sm:text-lg text-[#52525b] max-w-2xl">
            Hover over any production reel to start instant playback. Click any card to launch the fullscreen 4K Cinema mode.
          </p>
        </div>

        <a
          href={siteConfig.portfolioDrive}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white hover:opacity-95 px-6 py-3 rounded-full text-[14px] font-medium transition-all duration-200 hover:shadow-lg hover:scale-102 active:scale-98 shrink-0"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          <span>Stream All Master Videos (Drive)</span>
        </a>
      </div>

      {/* Grid of 3 Video Hover Cards */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
      >
        {videoProjects.map((vid) => (
          <VideoHoverCard key={vid.id} project={vid} />
        ))}
      </motion.div>
    </section>
  );
}
