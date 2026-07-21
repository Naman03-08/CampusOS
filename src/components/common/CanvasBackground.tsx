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

    // Glowing Golden & Cream Particles
    const particleCount = 75;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 3.5 + 1.5,
      color: Math.random() > 0.4 ? 'rgba(217, 119, 6, ' : 'rgba(245, 158, 11, ',
      alpha: Math.random() * 0.55 + 0.25,
      speedX: (Math.random() - 0.5) * 0.6,
      speedY: (Math.random() - 0.5) * 0.6,
      pulse: Math.random() * Math.PI * 2,
    }));

    // Floating 3D Golden Light Spheres / Orbs
    const orbs = [
      { x: width * 0.2, y: height * 0.25, radius: 360, color: 'rgba(251, 191, 36, 0.28)', vx: 0.3, vy: 0.2, phase: 0 },
      { x: width * 0.82, y: height * 0.65, radius: 420, color: 'rgba(254, 215, 170, 0.40)', vx: -0.25, vy: -0.25, phase: 1.5 },
      { x: width * 0.48, y: height * 0.85, radius: 300, color: 'rgba(245, 158, 11, 0.22)', vx: 0.2, vy: -0.18, phase: 3.1 },
      { x: width * 0.15, y: height * 0.75, radius: 280, color: 'rgba(252, 211, 77, 0.25)', vx: -0.18, vy: 0.2, phase: 4.2 },
    ];

    // Rotating 3D Geometric Ring Nodes
    let time = 0;

    const render = () => {
      time += 0.015;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Base Golden Cream Soft Radial Gradient Atmosphere
      const baseGrad = ctx.createRadialGradient(
        width / 2 + (mouseX - width / 2) * 0.05,
        height / 2 + (mouseY - height / 2) * 0.05,
        100,
        width / 2,
        height / 2,
        Math.max(width, height)
      );
      baseGrad.addColorStop(0, '#FFFDF7');
      baseGrad.addColorStop(0.5, '#FAF6EE');
      baseGrad.addColorStop(1, '#F7F0E3');
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
        gradient.addColorStop(0.7, orb.color.replace(/[\d\.]+\)$/, '0.03)'));
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(parallaxX, parallaxY, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw 3D Rotating Golden Wireframe Rings in Background
      const cx = width * 0.75 + (mouseX - width / 2) * 0.03;
      const cy = height * 0.3 + (mouseY - height / 2) * 0.03;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(time * 0.2);

      // Ring 1
      ctx.beginPath();
      ctx.ellipse(0, 0, 180, 70, time * 0.3, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(217, 119, 6, 0.32)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Ring 2
      ctx.beginPath();
      ctx.ellipse(0, 0, 260, 100, -time * 0.25, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.28)';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Ring 3 (Inner dynamic node)
      ctx.beginPath();
      ctx.ellipse(0, 0, 110, 45, time * 0.5, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.restore();

      // Draw connecting constellation lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.beginPath();
            const alpha = 0.30 * (1 - dist / 140);
            ctx.strokeStyle = `rgba(217, 119, 6, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Render & move particles with pulse and mouse influence
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

        // Subtle glow halo on particles
        ctx.beginPath();
        ctx.fillStyle = `${p.color}0.08)`;
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
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

