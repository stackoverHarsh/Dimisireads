'use client';

import React, { useRef, useState } from 'react';
import { motion, useSpring, HTMLMotionProps } from 'framer-motion';
import { useReducedMotion } from '@/components/motion/reduced-motion';
import { cn } from '@/lib/utils';

export interface MagneticButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  variant?: 'burgundy' | 'gold' | 'outline';
  strength?: number;
  className?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  variant = 'burgundy',
  strength = 0.28,
  className = '',
  onClick,
  ...props
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = useReducedMotion();

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReduced || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = (clientX - centerX) * strength;
    const distanceY = (clientY - centerY) * strength;

    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const variantStyles = {
    burgundy:
      'bg-burgundy-700 hover:bg-burgundy-800 text-cream-50 border border-burgundy-600 shadow-burgundy-glow',
    gold:
      'bg-candle-gold-500 hover:bg-candle-gold-600 text-espresso-950 border border-candle-gold-400 font-semibold shadow-candle-glow',
    outline:
      'bg-transparent hover:bg-burgundy-950/10 text-burgundy-800 dark:text-cream-100 border border-burgundy-700/40 dark:border-candle-gold-500/30',
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        x: prefersReduced ? 0 : x,
        y: prefersReduced ? 0 : y,
      }}
      className={cn(
        'relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-sans text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer active:scale-95 will-change-transform',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {/* Subtle sheen highlight on hover */}
      {isHovered && !prefersReduced && (
        <span className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-80 animate-shimmer" />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};

export default MagneticButton;
