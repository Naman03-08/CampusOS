import React, { useEffect, useRef } from 'react';

export const CanvasBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Glowing Particles (Golden + Soft Violet/Purplish)
    const particleCount = 75;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 3.5 + 1.5,
      color: Math.random() > 0.5 
        ? 'rgba(124, 58, 237, ' // Soft Purplish Violet
        : Math.random() > 0.5 
          ? 'rgba(217, 119, 6, ' 
          : 'rgba(99, 102, 241, ',
      alpha: Math.random() * 0.45 + 0.2,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      pulse: Math.random() * Math.PI * 2,
    }));

    // Floating Light Orbs (Added subtle lavender/purplish soft glows)
    const orbs = [
      { x: width * 0.2, y: height * 0.25, radius: 380, color: 'rgba(139, 92, 246, 0.12)', vx: 0.25, vy: 0.18, phase: 0 }, // Soft Purplish
      { x: width * 0.82, y: height * 0.65, radius: 420, color: 'rgba(99, 102, 241, 0.10)', vx: -0.2, vy: -0.22, phase: 1.5 }, // Indigo/Purple
      { x: width * 0.48, y: height * 0.85, radius: 320, color: 'rgba(251, 191, 36, 0.15)', vx: 0.18, vy: -0.15, phase: 3.1 }, // Soft Golden
      { x: width * 0.15, y: height * 0.75, radius: 300, color: 'rgba(168, 85, 247, 0.10)', vx: -0.15, vy: 0.18, phase: 4.2 }, // Subtle Lavender
    ];

    let time = 0;

    const render = () => {
      time += 0.015;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Base Soft Cream Gradient with subtle Purplish Lavender Hue
      const baseGrad = ctx.createRadialGradient(
        width / 2 + (mouseX - width / 2) * 0.05,
        height / 2 + (mouseY - height / 2) * 0.05,
        100,
        width / 2,
        height / 2,
        Math.max(width, height)
      );
      baseGrad.addColorStop(0, '#FAF7FF');   // Ultra-light lavender cream
      baseGrad.addColorStop(0.5, '#F7F2FD'); // Light purplish tint
      baseGrad.addColorStop(1, '#F3ECFB');   // Soft purple-tinted canvas
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw floating light orbs with subtle parallax shift
      orbs.forEach((orb, idx) => {
        orb.x += orb.vx + Math.sin(time + orb.phase) * 0.3;
        orb.y += orb.vy + Math.cos(time + orb.phase) * 0.3;

        if (orb.x - orb.radius < -100 || orb.x + orb.radius > width + 100) orb.vx *= -1;
        if (orb.y - orb.radius < -100 || orb.y + orb.radius > height + 100) orb.vy *= -1;

        const parallaxX = orb.x + (mouseX - width / 2) * (0.02 + idx * 0.01);
        const parallaxY = orb.y + (mouseY - height / 2) * (0.02 + idx * 0.01);

        const gradient = ctx.createRadialGradient(
          parallaxX, parallaxY, 0,
          parallaxX, parallaxY, orb.radius
        );
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(0.7, orb.color.replace(/[\d\.]+\)$/, '0.02)'));
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(parallaxX, parallaxY, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw 3D Rotating Purplish & Golden Wireframe Rings in Background
      const cx = width * 0.75 + (mouseX - width / 2) * 0.03;
      const cy = height * 0.3 + (mouseY - height / 2) * 0.03;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(time * 0.2);

      // Ring 1
      ctx.beginPath();
      ctx.ellipse(0, 0, 180, 70, time * 0.3, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.22)';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Ring 2
      ctx.beginPath();
      ctx.ellipse(0, 0, 260, 100, -time * 0.25, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.18)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Ring 3
      ctx.beginPath();
      ctx.ellipse(0, 0, 110, 45, time * 0.5, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(217, 119, 6, 0.25)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.restore();

      // Draw connecting constellation lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            const alpha = 0.22 * (1 - dist / 130);
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Render & move particles
      particles.forEach((p) => {
        p.pulse += 0.03;
        const currentAlpha = p.alpha + Math.sin(p.pulse) * 0.1;

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        ctx.beginPath();
        ctx.fillStyle = `${p.color}${Math.max(0.05, currentAlpha)})`;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
};
