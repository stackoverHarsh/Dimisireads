'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '@/components/motion/reduced-motion';
import { cn } from '@/lib/utils';

interface FairyLightGarlandProps {
  bulbsCount?: number;
  className?: string;
  wireColor?: string;
  glowIntensity?: 'soft' | 'warm' | 'radiant';
}

export const FairyLightGarland: React.FC<FairyLightGarlandProps> = ({
  bulbsCount = 14,
  className = '',
  wireColor = '#3B241A',
  glowIntensity = 'warm',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bulbsRef = useRef<SVGCircleElement[]>([]);
  const prefersReduced = useReducedMotion();

  // Clear array before render
  bulbsRef.current = [];

  const addToRefs = (el: SVGCircleElement | null) => {
    if (el && !bulbsRef.current.includes(el)) {
      bulbsRef.current.push(el);
    }
  };

  useEffect(() => {
    if (prefersReduced || bulbsRef.current.length === 0) return;

    const ctx = gsap.context(() => {
      bulbsRef.current.forEach((bulb, index) => {
        // Individualized organic flicker and breathe animation
        gsap.to(bulb, {
          opacity: 'random(0.45, 1)',
          scale: 'random(0.92, 1.18)',
          duration: 'random(1.8, 3.4)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.15 + Math.random() * 0.5,
          transformOrigin: 'center center',
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReduced, bulbsCount]);

  // Generate SVG path for a natural drooping catenary curve
  // Creates drooping scalloped curves between anchors
  const scallops = 4;
  const width = 1000;
  const scallopWidth = width / scallops;
  const sag = 28;

  let pathD = `M 0 10`;
  for (let i = 0; i < scallops; i++) {
    const startX = i * scallopWidth;
    const endX = (i + 1) * scallopWidth;
    const controlX = startX + scallopWidth / 2;
    const controlY = 10 + sag;
    pathD += ` Q ${controlX} ${controlY} ${endX} 10`;
  }

  // Pre-calculate bulb coordinates along the scalloped curve
  const bulbs = Array.from({ length: bulbsCount }, (_, i) => {
    const t = (i + 0.5) / bulbsCount; // Normalized 0..1
    const currentScallop = Math.floor(t * scallops);
    const localT = (t * scallops) - currentScallop; // 0..1 inside the scallop
    const startX = currentScallop * scallopWidth;
    const endX = (currentScallop + 1) * scallopWidth;
    const controlX = startX + scallopWidth / 2;
    const controlY = 10 + sag;

    // Quadratic Bezier formula: B(t) = (1-t)^2 P0 + 2(1-t)t P1 + t^2 P2
    const bx =
      Math.pow(1 - localT, 2) * startX +
      2 * (1 - localT) * localT * controlX +
      Math.pow(localT, 2) * endX;
    const by =
      Math.pow(1 - localT, 2) * 10 +
      2 * (1 - localT) * localT * controlY +
      Math.pow(localT, 2) * 10;

    return { id: i, cx: bx, cy: by };
  });

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn('relative w-full overflow-visible pointer-events-none select-none', className)}
    >
      <svg
        viewBox={`0 0 ${width} 50`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="fairyGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Twisted Dark Wire */}
        <path
          d={pathD}
          stroke={wireColor}
          strokeWidth="1.8"
          strokeLinecap="round"
          className="opacity-80"
        />

        {/* Warm Golden Bulbs */}
        {bulbs.map((bulb) => (
          <g key={bulb.id}>
            {/* Tiny dark socket cap */}
            <rect
              x={bulb.cx - 1.5}
              y={bulb.cy - 3}
              width="3"
              height="3"
              fill="#23140E"
              rx="0.5"
            />
            {/* Glowing Golden Bulb */}
            <circle
              ref={addToRefs}
              cx={bulb.cx}
              cy={bulb.cy + 3}
              r="3.5"
              fill="#F4ECDA"
              stroke="#D9A760"
              strokeWidth="0.8"
              filter="url(#fairyGlow)"
              className={cn(
                'transition-opacity duration-300',
                glowIntensity === 'radiant' ? 'opacity-95' : 'opacity-85'
              )}
            />
            {/* Core filament pinpoint */}
            <circle
              cx={bulb.cx}
              cy={bulb.cy + 3}
              r="1.2"
              fill="#FFFFFF"
              className="opacity-90"
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

export default FairyLightGarland;
