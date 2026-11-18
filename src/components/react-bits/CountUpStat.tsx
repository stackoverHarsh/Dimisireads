'use client';

import React, { useEffect, useState } from 'react';
import { useReducedMotion } from '@/components/motion/reduced-motion';
import { cn } from '@/lib/utils';

interface CountUpStatProps {
  value: number;
  duration?: number; // in milliseconds
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  label?: string;
}

export const CountUpStat: React.FC<CountUpStatProps> = ({
  value,
  duration = 1600,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
  label,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setDisplayValue(value);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // EaseOutQuad formula for a natural smooth deceleration
      const easeOut = 1 - (1 - progress) * (1 - progress);
      const current = easeOut * value;

      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value, duration, prefersReduced]);

  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(displayValue);

  return (
    <div className="flex flex-col items-center justify-center">
      <span className={cn('font-serif font-bold text-3xl text-burgundy-900 dark:text-cream-100', className)}>
        {prefix}
        {formatted}
        {suffix}
      </span>
      {label && (
        <span className="mt-1 text-xs uppercase tracking-wider text-warm-oak-600 dark:text-dusty-pink-300 font-sans">
          {label}
        </span>
      )}
    </div>
  );
};

export default CountUpStat;
