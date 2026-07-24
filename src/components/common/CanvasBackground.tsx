import React, { useEffect, useRef } from 'react';

interface Point3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  color: string;
}

interface WireframeMesh {
  nodes: { x: number; y: number; z: number }[];
  edges: [number, number][];
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  rotSpeedX: number;
  rotSpeedY: number;
  rotSpeedZ: number;
  color: string;
}

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

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - width / 2) * 0.12;
      targetMouseY = (e.clientY - height / 2) * 0.12;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

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

    // 1. Particle Constellation Network (130 nodes forming full-screen triangular web evenly across screen)
    const particleCount = 130;
    const particles: Point3D[] = Array.from({ length: particleCount }, () => ({
      x: (Math.random() - 0.5) * width * 1.8,
      y: (Math.random() - 0.5) * height * 1.8,
      z: Math.random() * 800 - 400,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      vz: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.35 
        ? 'rgba(147, 51, 234, 0.85)'   // Purple node dot
        : Math.random() > 0.5 
          ? 'rgba(217, 119, 6, 0.85)'  // Amber node dot
          : 'rgba(168, 85, 247, 0.85)', // Light violet node dot
    }));

    // 2. Geometry Generators matching exact shapes in screenshot

    // A) Nested 3D Cube (Hypercube/Tesseract look like in left of screenshot)
    const createNestedCube = (outerSize: number, innerScale: number = 0.5) => {
      const h1 = outerSize / 2;
      const h2 = h1 * innerScale;

      const nodes = [
        // Outer Cube (0..7)
        { x: -h1, y: -h1, z: -h1 }, { x: h1, y: -h1, z: -h1 },
        { x: h1, y: h1, z: -h1 }, { x: -h1, y: h1, z: -h1 },
        { x: -h1, y: -h1, z: h1 }, { x: h1, y: -h1, z: h1 },
        { x: h1, y: h1, z: h1 }, { x: -h1, y: h1, z: h1 },
        // Inner Cube (8..15)
        { x: -h2, y: -h2, z: -h2 }, { x: h2, y: -h2, z: -h2 },
        { x: h2, y: h2, z: -h2 }, { x: -h2, y: h2, z: -h2 },
        { x: -h2, y: -h2, z: h2 }, { x: h2, y: -h2, z: h2 },
        { x: h2, y: h2, z: h2 }, { x: -h2, y: h2, z: h2 },
      ];

      const edges: [number, number][] = [
        // Outer edges
        [0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7],
        // Inner edges
        [8, 9], [9, 10], [10, 11], [11, 8], [12, 13], [13, 14], [14, 15], [15, 12], [8, 12], [9, 13], [10, 14], [11, 15],
        // Connecting diagonal struts between outer and inner
        [0, 8], [1, 9], [2, 10], [3, 11], [4, 12], [5, 13], [6, 14], [7, 15]
      ];

      return { nodes, edges };
    };

    // B) Geodesic Faceted Sphere (matching right side of screenshot)
    const createGeodesicSphere = (radius: number) => {
      const nodes: { x: number; y: number; z: number }[] = [];
      const edges: [number, number][] = [];

      const t = (1.0 + Math.sqrt(5.0)) / 2.0;
      const scale = radius / Math.sqrt(1 + t * t);
      const r1 = scale;
      const r2 = t * scale;

      const baseNodes = [
        { x: -r1, y: r2, z: 0 }, { x: r1, y: r2, z: 0 }, { x: -r1, y: -r2, z: 0 }, { x: r1, y: -r2, z: 0 },
        { x: 0, y: -r1, z: r2 }, { x: 0, y: r1, z: r2 }, { x: 0, y: -r1, z: -r2 }, { x: 0, y: r1, z: -r2 },
        { x: r2, y: 0, z: -r1 }, { x: r2, y: 0, z: r1 }, { x: -r2, y: 0, z: -r1 }, { x: -r2, y: 0, z: r1 }
      ];

      nodes.push(...baseNodes);

      const baseEdges: [number, number][] = [
        [0, 11], [0, 5], [0, 1], [0, 7], [0, 10],
        [1, 5], [1, 9], [1, 8], [1, 7],
        [2, 11], [2, 10], [2, 6], [2, 4], [2, 3],
        [3, 9], [3, 4], [3, 6], [3, 8],
        [4, 11], [4, 5], [4, 9],
        [5, 11], [5, 9],
        [6, 10], [6, 7], [6, 8],
        [7, 10], [7, 8],
        [8, 9],
        [10, 11]
      ];

      edges.push(...baseEdges);

      return { nodes, edges };
    };

    // C) Standard Cube
    const createCube = (size: number) => {
      const h = size / 2;
      const nodes = [
        { x: -h, y: -h, z: -h }, { x: h, y: -h, z: -h }, { x: h, y: h, z: -h }, { x: -h, y: h, z: -h },
        { x: -h, y: -h, z: h }, { x: h, y: -h, z: h }, { x: h, y: h, z: h }, { x: -h, y: h, z: h },
      ];
      const edges: [number, number][] = [
        [0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]
      ];
      return { nodes, edges };
    };

    // D) Hexagonal Prism
    const createHexagonalPrism = (radius: number, height: number) => {
      const nodes: { x: number; y: number; z: number }[] = [];
      const edges: [number, number][] = [];
      const h2 = height / 2;

      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        nodes.push({ x: radius * Math.cos(angle), y: -h2, z: radius * Math.sin(angle) });
      }
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        nodes.push({ x: radius * Math.cos(angle), y: h2, z: radius * Math.sin(angle) });
      }

      for (let i = 0; i < 6; i++) {
        const next = (i + 1) % 6;
        edges.push([i, next]);
        edges.push([i + 6, next + 6]);
        edges.push([i, i + 6]);
      }
      return { nodes, edges };
    };

    // E) Hexagonal Bipyramid
    const createHexagonalBipyramid = (radius: number, height: number) => {
      const nodes: { x: number; y: number; z: number }[] = [];
      const edges: [number, number][] = [];

      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        nodes.push({ x: radius * Math.cos(angle), y: 0, z: radius * Math.sin(angle) });
      }
      nodes.push({ x: 0, y: -height, z: 0 });
      nodes.push({ x: 0, y: height, z: 0 });

      for (let i = 0; i < 6; i++) {
        const next = (i + 1) % 6;
        edges.push([i, next]);
        edges.push([6, i]);
        edges.push([7, i]);
      }
      return { nodes, edges };
    };

    // F) Octahedron
    const createOctahedron = (size: number) => {
      const h = size;
      const nodes = [
        { x: 0, y: -h, z: 0 }, { x: h, y: 0, z: 0 }, { x: 0, y: 0, z: h },
        { x: -h, y: 0, z: 0 }, { x: 0, y: 0, z: -h }, { x: 0, y: h, z: 0 }
      ];
      const edges: [number, number][] = [
        [0, 1], [0, 2], [0, 3], [0, 4], [5, 1], [5, 2], [5, 3], [5, 4],
        [1, 2], [2, 3], [3, 4], [4, 1]
      ];
      return { nodes, edges };
    };

    // Instantiate geometries
    const nestedCubeGeom = createNestedCube(200, 0.55);
    const sphereGeom = createGeodesicSphere(160);
    const cubeGeom = createCube(130);
    const hexPrismGeom = createHexagonalPrism(70, 110);
    const hexBipyramidGeom = createHexagonalBipyramid(80, 100);
    const octaGeom = createOctahedron(95);

    // Array of moving 3D polyhedra shapes distributed evenly across the entire screen
    const wireframeMeshes: WireframeMesh[] = [
      // 1. Top Left - Nested Tesseract Cube
      {
        ...nestedCubeGeom,
        x: -width * 0.35, y: -height * 0.3, z: 90,
        vx: 0.08, vy: 0.05, vz: -0.03,
        rotX: 0.35, rotY: 0.55, rotZ: 0.1,
        rotSpeedX: 0.003, rotSpeedY: 0.004, rotSpeedZ: 0.002,
        color: 'rgba(139, 92, 246, 0.45)', // Purple wireframe
      },
      // 2. Top Right - Geodesic Sphere
      {
        ...sphereGeom,
        x: width * 0.35, y: -height * 0.28, z: 70,
        vx: -0.07, vy: 0.04, vz: 0.03,
        rotX: 0.2, rotY: 0.6, rotZ: 0.3,
        rotSpeedX: 0.002, rotSpeedY: 0.005, rotSpeedZ: -0.003,
        color: 'rgba(147, 51, 234, 0.42)', // Purple wireframe
      },
      // 3. Center Left - Hexagonal Bipyramid
      {
        ...hexBipyramidGeom,
        x: -width * 0.3, y: height * 0.08, z: 110,
        vx: 0.06, vy: -0.05, vz: -0.02,
        rotX: 0.5, rotY: 0.2, rotZ: 0.4,
        rotSpeedX: 0.004, rotSpeedY: 0.003, rotSpeedZ: 0.002,
        color: 'rgba(217, 119, 6, 0.45)', // Amber/Gold wireframe
      },
      // 4. Center Right - 3D Cube
      {
        ...cubeGeom,
        x: width * 0.3, y: height * 0.05, z: 85,
        vx: -0.05, vy: -0.06, vz: 0.04,
        rotX: 0.4, rotY: 0.4, rotZ: 0.2,
        rotSpeedX: 0.003, rotSpeedY: 0.004, rotSpeedZ: -0.002,
        color: 'rgba(124, 58, 237, 0.45)', // Violet wireframe
      },
      // 5. Bottom Left - Octahedron
      {
        ...octaGeom,
        x: -width * 0.33, y: height * 0.35, z: 95,
        vx: 0.05, vy: -0.04, vz: 0.02,
        rotX: 0.3, rotY: 0.7, rotZ: 0.1,
        rotSpeedX: 0.002, rotSpeedY: 0.003, rotSpeedZ: 0.004,
        color: 'rgba(147, 51, 234, 0.42)', // Purple wireframe
      },
      // 6. Bottom Right - Hexagonal Prism
      {
        ...hexPrismGeom,
        x: width * 0.33, y: height * 0.34, z: 100,
        vx: -0.06, vy: 0.05, vz: -0.03,
        rotX: 0.6, rotY: 0.3, rotZ: 0.5,
        rotSpeedX: 0.003, rotSpeedY: 0.002, rotSpeedZ: 0.003,
        color: 'rgba(217, 119, 6, 0.42)', // Amber/Gold wireframe
      }
    ];

    const FOV = 480;
    let lastTime = performance.now();

    const render = (now: number) => {
      const delta = now - lastTime;
      if (delta < 16) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      lastTime = now;

      // Smooth mouse parallax damping
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2 + mouseX;
      const centerY = height / 2 + mouseY;

      // --- 3D WIREFRAME POLYHEDRA RENDERING ---
      wireframeMeshes.forEach((mesh) => {
        // Continuous rotation & translation drifting
        mesh.rotX += mesh.rotSpeedX;
        mesh.rotY += mesh.rotSpeedY;
        mesh.rotZ += mesh.rotSpeedZ;

        mesh.x += mesh.vx;
        mesh.y += mesh.vy;
        mesh.z += mesh.vz;

        // Viewport wrapping
        const wrapX = width * 0.52;
        const wrapY = height * 0.52;
        if (mesh.x < -wrapX) mesh.x = wrapX;
        if (mesh.x > wrapX) mesh.x = -wrapX;
        if (mesh.y < -wrapY) mesh.y = wrapY;
        if (mesh.y > wrapY) mesh.y = -wrapY;
        if (mesh.z < -250) mesh.z = 250;
        if (mesh.z > 250) mesh.z = -250;

        const cosX = Math.cos(mesh.rotX);
        const sinX = Math.sin(mesh.rotX);
        const cosY = Math.cos(mesh.rotY);
        const sinY = Math.sin(mesh.rotY);
        const cosZ = Math.cos(mesh.rotZ);
        const sinZ = Math.sin(mesh.rotZ);

        // Project 3D nodes to 2D
        const projected = mesh.nodes.map((node) => {
          let x0 = node.x * cosZ - node.y * sinZ;
          let y0 = node.x * sinZ + node.y * cosZ;
          let z0 = node.z;

          let x1 = x0 * cosY - z0 * sinY;
          let z1 = x0 * sinY + z0 * cosY;

          let y1 = y0 * cosX - z1 * sinX;
          let z2 = y0 * sinX + z1 * cosX;

          const worldX = x1 + mesh.x;
          const worldY = y1 + mesh.y;
          const worldZ = z2 + mesh.z + 420;

          const scale = FOV / (FOV + worldZ);
          return {
            x: centerX + worldX * scale,
            y: centerY + worldY * scale,
            scale,
            z: worldZ
          };
        });

        // Draw wireframe edges
        ctx.save();
        ctx.strokeStyle = mesh.color;
        ctx.lineWidth = 1.3;

        mesh.edges.forEach(([i, j]) => {
          const p1 = projected[i];
          const p2 = projected[j];
          if (!p1 || !p2) return;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        });

        // Draw glowing vertex dots at each node
        projected.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.2 * p.scale, 0, Math.PI * 2);
          ctx.fillStyle = mesh.color;
          ctx.fill();
        });

        ctx.restore();
      });

      // --- CONSTELLATION NETWORK (NODES & TRIANGULAR LINKS) ---
      const projectedParticles = particles.map((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        if (p.x < -width * 0.8) p.x = width * 0.8;
        if (p.x > width * 0.8) p.x = -width * 0.8;
        if (p.y < -height * 0.8) p.y = height * 0.8;
        if (p.y > height * 0.8) p.y = -height * 0.8;
        if (p.z < -300) p.z = 450;
        if (p.z > 450) p.z = -300;

        const worldZ = p.z + 420;
        const scale = FOV / (FOV + worldZ);

        return {
          projX: centerX + p.x * scale,
          projY: centerY + p.y * scale,
          scale,
          radius: p.radius * scale,
          color: p.color,
        };
      });

      // Draw constellation links
      for (let i = 0; i < projectedParticles.length; i++) {
        for (let j = i + 1; j < projectedParticles.length; j++) {
          const p1 = projectedParticles[i];
          const p2 = projectedParticles[j];
          const dx = p1.projX - p2.projX;
          const dy = p1.projY - p2.projY;
          const distSq = dx * dx + dy * dy;

          if (distSq < 14000) {
            const alpha = (1 - distSq / 14000) * 0.28;
            ctx.strokeStyle = `rgba(147, 51, 234, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.projX, p1.projY);
            ctx.lineTo(p2.projX, p2.projY);
            ctx.stroke();
          }
        }
      }

      // Draw particle glowing node dots
      projectedParticles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.projX, p.projY, Math.max(0.8, p.radius * 1.2), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-br from-[#faf7fd] via-[#f7f2fb] via-[#fffbf3] to-[#f4effa]">
      {/* Soft Ambient Wallpaper Light Glow Orbs (Light Purple + Golden/Amber + White) */}
      <div 
        className="absolute -top-32 -left-32 w-[42rem] h-[42rem] rounded-full bg-purple-300/35 blur-[120px] animate-pulse"
        style={{ animationDuration: '7s' }}
      />
      <div 
        className="absolute -top-32 -right-32 w-[42rem] h-[42rem] rounded-full bg-indigo-200/40 blur-[120px] animate-pulse"
        style={{ animationDuration: '8s' }}
      />
      <div 
        className="absolute top-1/3 -right-32 w-[44rem] h-[44rem] rounded-full bg-amber-200/45 blur-[130px] animate-pulse"
        style={{ animationDuration: '9s' }}
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[48rem] h-[48rem] rounded-full bg-violet-200/25 blur-[140px] animate-pulse"
        style={{ animationDuration: '10s' }}
      />
      <div 
        className="absolute -bottom-32 left-10 w-[42rem] h-[42rem] rounded-full bg-fuchsia-200/40 blur-[120px] animate-pulse"
        style={{ animationDuration: '11s' }}
      />
      <div 
        className="absolute -bottom-32 right-10 w-[42rem] h-[42rem] rounded-full bg-amber-300/30 blur-[120px] animate-pulse"
        style={{ animationDuration: '8.5s' }}
      />

      {/* Subtle Dot Matrix Wallpaper Accent */}
      <div 
        className="absolute inset-0 opacity-[0.14] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(147, 51, 234, 0.25) 1.2px, transparent 1.2px)',
          backgroundSize: '30px 30px'
        }}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
};
