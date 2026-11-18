'use client';

import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/components/motion/reduced-motion';

interface Particle {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  targetAlpha: number;
  vx: number;
  vy: number;
  pulseSpeed: number;
}

interface AmbientDustMotesProps {
  particleCount?: number;
  className?: string;
  glowColor?: string; // e.g. "217, 167, 96"
}

export const AmbientDustMotes: React.FC<AmbientDustMotesProps> = ({
  particleCount = 45,
  className = '',
  glowColor = '217, 167, 96', // Candlelight Gold
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initialize particles
    const effectiveCount = prefersReduced ? 12 : particleCount;
    const particles: Particle[] = Array.from({ length: effectiveCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.6,
      alpha: Math.random() * 0.4 + 0.1,
      targetAlpha: Math.random() * 0.5 + 0.2,
      vx: prefersReduced ? 0 : (Math.random() - 0.5) * 0.35,
      vy: prefersReduced ? 0 : -Math.random() * 0.45 - 0.1, // Drifts gently upwards
      pulseSpeed: Math.random() * 0.015 + 0.005,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        if (!prefersReduced) {
          p.x += p.vx;
          p.y += p.vy;

          // Wrap edges
          if (p.y < -10) p.y = height + 10;
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;

          // Soft breathing opacity
          p.alpha += (p.targetAlpha - p.alpha) * p.pulseSpeed;
          if (Math.abs(p.targetAlpha - p.alpha) < 0.03) {
            p.targetAlpha = Math.random() * 0.55 + 0.15;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${glowColor}, ${p.alpha})`;
        ctx.shadowColor = `rgba(${glowColor}, 0.8)`;
        ctx.shadowBlur = 6;
        ctx.fill();
      });

      if (!prefersReduced) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount, glowColor, prefersReduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
    />
  );
};

export default AmbientDustMotes;
