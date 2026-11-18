'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/components/motion/reduced-motion';
import { cn } from '@/lib/utils';
import { BookOpen, Sparkles } from 'lucide-react';

interface TiltedBookCardProps {
  title: string;
  author: string;
  coverImageUrl?: string;
  category?: string;
  vibe?: string;
  isAvailable?: boolean;
  className?: string;
  onClick?: () => void;
}

export const TiltedBookCard: React.FC<TiltedBookCardProps> = ({
  title,
  author,
  coverImageUrl,
  category = 'Classics',
  vibe = 'Rainy Day in Oxford',
  isAvailable = true,
  className = '',
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = useReducedMotion();

  // Mouse tilt motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics
  const springConfig = { damping: 20, stiffness: 180, mass: 0.6 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['14deg', '-14deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-14deg', '14deg']);

  // Dynamic glare coordinates
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        perspective: 1000,
        rotateX: prefersReduced ? 0 : rotateX,
        rotateY: prefersReduced ? 0 : rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={cn(
        'group relative w-60 h-88 cursor-pointer select-none rounded-r-lg transition-shadow duration-300 will-change-transform',
        isHovered ? 'shadow-candle-glow-lg' : 'shadow-book-cover',
        className
      )}
    >
      {/* 3D Realistic Spine (Left Edge) */}
      <div
        style={{ transform: 'translateZ(12px)' }}
        className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-warm-oak-950 via-warm-oak-900 to-warm-oak-800 rounded-l-sm shadow-book-spine z-20 flex items-center justify-center border-r border-candle-gold-500/30"
      >
        <div className="w-[1px] h-[90%] bg-candle-gold-400/20" />
      </div>

      {/* Book Cover Face */}
      <div
        style={{ transform: 'translateZ(8px)' }}
        className="relative ml-3 w-[calc(100%-12px)] h-full overflow-hidden rounded-r-md bg-gradient-to-br from-burgundy-900 via-burgundy-950 to-espresso-950 p-5 flex flex-col justify-between border-y border-r border-candle-gold-500/25"
      >
        {/* Cover Image Background (if provided) */}
        {coverImageUrl && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity group-hover:opacity-50 transition-opacity duration-500"
            style={{ backgroundImage: `url(${coverImageUrl})` }}
          />
        )}

        {/* Vintage Embossed Border Filigree */}
        <div className="pointer-events-none absolute inset-2.5 rounded border border-candle-gold-400/20 group-hover:border-candle-gold-400/40 transition-colors" />

        {/* Top Header & Vibe Badge */}
        <div className="relative z-10 flex items-start justify-between">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wide uppercase bg-espresso-900/80 text-candle-gold-400 border border-candle-gold-500/30 backdrop-blur-sm">
            <Sparkles className="w-2.5 h-2.5 text-candle-gold-400" />
            {vibe}
          </span>

          <span
            className={cn(
              'px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase',
              isAvailable
                ? 'bg-candle-gold-500/15 text-candle-gold-300 border border-candle-gold-500/40'
                : 'bg-espresso-800 text-cream-400 border border-espresso-700'
            )}
          >
            {isAvailable ? 'Licensed' : 'Catalog'}
          </span>
        </div>

        {/* Center Title & Author */}
        <div className="relative z-10 my-auto text-center px-1">
          <p className="text-[11px] uppercase tracking-widest text-dusty-pink-300 font-sans mb-1.5 opacity-90">
            {category}
          </p>
          <h3 className="font-serif text-lg font-bold text-cream-100 group-hover:text-candle-gold-200 transition-colors line-clamp-2 leading-snug drop-shadow-sm">
            {title}
          </h3>
          <div className="w-8 h-[1px] bg-candle-gold-400/40 mx-auto my-2" />
          <p className="font-serif italic text-xs text-dusty-pink-200 line-clamp-1">
            {author}
          </p>
        </div>

        {/* Bottom CTA / Action */}
        <div className="relative z-10 flex items-center justify-between pt-2 border-t border-candle-gold-500/20 text-cream-200">
          <span className="flex items-center gap-1.5 text-[11px] font-sans text-candle-gold-400 group-hover:text-candle-gold-200 transition-colors">
            <BookOpen className="w-3.5 h-3.5" />
            {isAvailable ? 'Open Tome' : 'Inspect'}
          </span>
          <span className="text-[10px] text-dusty-pink-300/80 uppercase tracking-wider font-mono">
            DIMISI
          </span>
        </div>

        {/* Dynamic Candlelight Glare / Sheen Overlay */}
        {!prefersReduced && isHovered && (
          <motion.div
            style={{
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(217, 167, 96, 0.25) 0%, rgba(215, 167, 177, 0.08) 40%, transparent 80%)`,
            }}
            className="pointer-events-none absolute inset-0 z-30 opacity-100 transition-opacity duration-200"
          />
        )}
      </div>

      {/* Gilded Page Edges (Right Edge) */}
      <div
        style={{ transform: 'translateZ(4px)' }}
        className="absolute right-0 top-1 bottom-1 w-2 bg-gradient-to-r from-cream-300 to-cream-100 deckle-edge rounded-r-xs opacity-90"
      />
    </motion.div>
  );
};

export default TiltedBookCard;
