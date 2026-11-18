'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useReducedMotion } from '@/components/motion/reduced-motion';
import { cn } from '@/lib/utils';

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  onAnimationComplete?: () => void;
}

export const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 120,
  className = '',
  animateBy = 'words',
  direction = 'top',
  onAnimationComplete,
}) => {
  const prefersReduced = useReducedMotion();
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  if (prefersReduced) {
    return <span className={cn('inline-block', className)}>{text}</span>;
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay / 1000,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      filter: 'blur(10px)',
      opacity: 0,
      transform: direction === 'top' ? 'translate3d(0,-20px,0)' : 'translate3d(0,20px,0)',
    },
    visible: {
      filter: 'blur(0px)',
      opacity: 1,
      transform: 'translate3d(0,0,0)',
      transition: {
        duration: 0.55,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.span
      className={cn('inline-flex flex-wrap gap-x-[0.28em]', className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      onAnimationComplete={onAnimationComplete}
    >
      {elements.map((segment, index) => (
        <motion.span
          key={`${segment}-${index}`}
          variants={itemVariants}
          className="inline-block will-change-[transform,filter,opacity]"
        >
          {segment === ' ' ? '\u00A0' : segment}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default BlurText;
