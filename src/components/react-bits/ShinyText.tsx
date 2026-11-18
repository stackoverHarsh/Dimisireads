'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/components/motion/reduced-motion';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 4,
  className = '',
}) => {
  const prefersReduced = useReducedMotion();

  const animationDuration = `${speed}s`;

  return (
    <span
      className={cn(
        'relative inline-block bg-clip-text text-transparent transition-all',
        disabled || prefersReduced
          ? 'text-candle-gold-500'
          : 'bg-gradient-to-r from-candle-gold-600 via-candle-gold-300 to-dusty-pink-300 bg-[length:200%_auto] animate-shimmer',
        className
      )}
      style={{
        animationDuration: disabled || prefersReduced ? undefined : animationDuration,
      }}
    >
      {text}
    </span>
  );
};

export default ShinyText;
