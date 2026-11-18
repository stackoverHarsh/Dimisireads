'use client';

import React, { useRef, useState } from 'react';
import { useReducedMotion } from '@/components/motion/reduced-motion';
import { cn } from '@/lib/utils';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string; // e.g. "rgba(217, 167, 96, 0.15)" or "rgba(215, 167, 177, 0.15)"
  className?: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  spotlightColor = 'rgba(217, 167, 96, 0.18)',
  className = '',
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const prefersReduced = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    if (!prefersReduced) setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative overflow-hidden rounded-xl border border-dusty-pink-300/30 bg-cream-50/80 p-6 backdrop-blur-sm transition-all duration-300 dark:border-candle-gold-500/20 dark:bg-espresso-900/90 shadow-sm hover:shadow-candle-glow',
        className
      )}
      {...props}
    >
      {/* Radial Spotlight Overlay */}
      {!prefersReduced && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            opacity,
            background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default SpotlightCard;
