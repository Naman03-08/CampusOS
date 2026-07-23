import React, { useEffect, useRef } from 'react';

export const CanvasBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let resizeTimeout: any;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!canvas) return;
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Lightweight Particles (20 particles max)
    const particleCount = 20;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.5 + 1,
      color: Math.random() > 0.5 ? 'rgba(139, 92, 246, 0.25)' : 'rgba(217, 119, 6, 0.25)',
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
    }));

    let lastTime = performance.now();

    const render = (now: number) => {
      const delta = now - lastTime;
      if (delta < 20) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        ctx.moveTo(p.x + p.radius, p.y);
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      }
      ctx.fillStyle = 'rgba(139, 92, 246, 0.25)';
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-br from-[#FAF7FF] via-[#F7F2FD] to-[#F3ECFB]">
      {/* GPU Accelerated Ambient Light Orbs */}
      <div 
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-400/15 blur-3xl animate-pulse"
        style={{ animationDuration: '8s' }}
      />
      <div 
        className="absolute top-1/3 -right-32 w-[28rem] h-[28rem] rounded-full bg-indigo-400/15 blur-3xl animate-pulse"
        style={{ animationDuration: '10s' }}
      />
      <div 
        className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-amber-400/15 blur-3xl animate-pulse"
        style={{ animationDuration: '12s' }}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
};

