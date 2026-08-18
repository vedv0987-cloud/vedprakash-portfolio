'use client';

import { motion } from 'framer-motion';

export default function FluidMeshBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {/* Orb 1: Violet/Indigo */}
      <motion.div
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-[15%] left-[10%] w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#7c3aed]/10 via-[#a78bfa]/10 to-transparent blur-[120px]"
      />

      {/* Orb 2: Cyan/Sky */}
      <motion.div
        animate={{
          x: [0, -40, 60, 0],
          y: [0, 50, -30, 0],
          scale: [1, 0.9, 1.2, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute top-[35%] right-[5%] w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[#06b6d4]/10 via-[#38bdf8]/08 to-transparent blur-[130px]"
      />

      {/* Orb 3: Soft Emerald / Azure accent */}
      <motion.div
        animate={{
          x: [0, 40, -40, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
        className="absolute bottom-[5%] left-[20%] w-[600px] h-[600px] rounded-full bg-gradient-to-r from-[#6366f1]/08 via-[#06b6d4]/06 to-transparent blur-[140px]"
      />
    </div>
  );
}
