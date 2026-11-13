import React, { useEffect, useRef } from 'react';

interface FloatingParticlesProps {
  density?: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  pulseSpeed: number;
  pulsePhase: number;
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  density = 65,
  className = 'fixed inset-0 pointer-events-none z-0',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const palette = [
      'rgba(56, 189, 248,',   // Sky Azure
      'rgba(96, 165, 250,',   // Soft Royal Blue
      'rgba(212, 185, 150,',  // Champagne Beige
      'rgba(243, 237, 226,',  // Warm Pearl
    ];

    const resize = () => {
      const parent = canvas.parentElement;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      canvas.width = Math.max(1, width * dpr);
      canvas.height = Math.max(1, height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const particles: Particle[] = Array.from({ length: density }, () => ({
      x: Math.random() * (width || 1200),
      y: Math.random() * (height || 800),
      vx: (Math.random() - 0.5) * 0.65,
      vy: -(0.35 + Math.random() * 0.85), // clearly flying upward & drifting
      radius: 1.8 + Math.random() * 2.8,
      color: palette[Math.floor(Math.random() * palette.length)],
      alpha: 0.45 + Math.random() * 0.45,
      pulseSpeed: 0.015 + Math.random() * 0.025,
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    const renderFrame = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          p.pulsePhase += p.pulseSpeed;

          if (p.y < -12) {
            p.y = height + 12;
            p.x = Math.random() * width;
          }
          if (p.x < -12) p.x = width + 12;
          if (p.x > width + 12) p.x = -12;
        }

        const currentAlpha = Math.max(
          0.25,
          Math.min(0.95, p.alpha + Math.sin(p.pulsePhase) * 0.2)
        );

        // Soft outer luminous halo
        const glowRadius = p.radius * 3.6;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
        grad.addColorStop(0, `${p.color} ${currentAlpha})`);
        grad.addColorStop(0.45, `${p.color} ${currentAlpha * 0.35})`);
        grad.addColorStop(1, `${p.color} 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Crisp bright core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${Math.min(1, currentAlpha + 0.15)})`;
        ctx.fill();

        // Subtle connecting light lines between nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 13000) {
            const lineAlpha = (1 - distSq / 13000) * 0.16;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(147, 197, 253, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
    />
  );
};
