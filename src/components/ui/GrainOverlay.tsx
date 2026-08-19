'use client';

import { useId } from 'react';

export default function GrainOverlay() {
  const id = useId();

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9990] opacity-[0.02] mix-blend-multiply"
      aria-hidden="true"
    >
      <svg className="w-full h-full">
        <filter id={`grainNoise-${id}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grainNoise-${id})`} />
      </svg>
    </div>
  );
}
