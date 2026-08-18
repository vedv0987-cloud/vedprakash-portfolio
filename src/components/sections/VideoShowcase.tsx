'use client';

import { motion } from 'framer-motion';
import { videoProjects, siteConfig } from '@/data/portfolio';
import VideoHoverCard from '@/components/ui/VideoHoverCard';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function VideoShowcase() {
  return (
    <section id="films" className="py-24 md:py-36 px-6 lg:px-12 max-w-[1400px] mx-auto bg-[#ffffff] border-y border-black/[0.08]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-black/[0.08] gap-6">
        <div>
          <span className="font-mono text-xs text-[#8e8e93] tracking-widest uppercase block mb-2">
            INDEX 02 / CINEMATOGRAPHY &amp; MOTION
          </span>
          <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-light tracking-tight text-[#111111] leading-[1.08]">
            Motion <span className="serif-italic font-normal">&amp; Cinematic</span> Reels
          </h2>
          <p className="mt-3 text-base text-[#666664] max-w-xl">
            Hover over any project reel to initiate smooth playback. Click to launch the 4K Cinema Master player.
          </p>
        </div>

        <a
          href={siteConfig.portfolioDrive}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#111111] text-white hover:bg-black px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shrink-0"
        >
          <span>Stream All Master Reels on Drive</span>
          <span>↗</span>
        </a>
      </div>

      {/* Grid of Video Cards */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {videoProjects.map((vid) => (
          <VideoHoverCard key={vid.id} project={vid} />
        ))}
      </motion.div>
    </section>
  );
}
