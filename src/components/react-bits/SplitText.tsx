'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useReducedMotion } from '@/components/motion/reduced-motion';
import { cn } from '@/lib/utils';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 35,
  duration = 0.5,
}) => {
  const prefersReduced = useReducedMotion();
  const words = text.split(' ');

  if (prefersReduced) {
    return <span className={cn('inline-block', className)}>{text}</span>;
  }

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { staggerChildren: delay / 1000, delayChildren: 0.04 * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 14,
        stiffness: 120,
        duration,
      },
    },
    hidden: {
      opacity: 0,
      y: 25,
      rotateX: -45,
    },
  };

  return (
    <motion.span
      className={cn('inline-flex flex-wrap gap-x-2 overflow-hidden', className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} className="inline-flex overflow-hidden">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={`${char}-${charIndex}`}
              variants={child}
              className="inline-block will-change-transform origin-bottom"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
};

export default SplitText;
