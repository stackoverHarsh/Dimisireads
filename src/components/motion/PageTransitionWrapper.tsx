'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/components/motion/reduced-motion';
import { cn } from '@/lib/utils';

interface PageTransitionWrapperProps {
  children: React.ReactNode;
  className?: string;
  keyValue?: string;
}

export const PageTransitionWrapper: React.FC<PageTransitionWrapperProps> = ({
  children,
  className = '',
  keyValue,
}) => {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={cn('w-full min-h-screen', className)}>{children}</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={keyValue}
        initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={cn('w-full min-h-screen', className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransitionWrapper;
