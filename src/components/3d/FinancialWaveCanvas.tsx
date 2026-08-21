'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface FinancialWaveCanvasProps {
  className?: string;
}

export function FinancialWaveCanvas({ className = '' }: FinancialWaveCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 8, 16);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create 3D Particle Grid Wave
    const cols = 50;
    const rows = 35;
    const count = cols * rows;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const color1 = new THREE.Color(0x4FA3CD); // Sky blue
    const color2 = new THREE.Color(0x10B981); // Emerald
    const color3 = new THREE.Color(0xF59E0B); // Amber gold

    let i = 0;
    let colIdx = 0;
    for (let ix = 0; ix < cols; ix++) {
      for (let iy = 0; iy < rows; iy++) {
        const x = (ix - cols / 2) * 0.7;
        const z = (iy - rows / 2) * 0.7;
        const y = 0;

        positions[i] = x;
        positions[i + 1] = y;
        positions[i + 2] = z;

        scales[i / 3] = 1;

        // Gradient color along X and Z
        const t = (ix / cols + iy / rows) * 0.5;
        const c = t < 0.5 ? color1.clone().lerp(color2, t * 2) : color2.clone().lerp(color3, (t - 0.5) * 2);
        colors[colIdx] = c.r;
        colors[colIdx + 1] = c.g;
        colors[colIdx + 2] = c.b;

        i += 3;
        colIdx += 3;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom shader material for soft rounded glowing dots
    const material = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 3;
      targetY = y * 2;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Animation Loop
    let animationFrameId: number;
    let step = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      step += 0.025;

      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      camera.position.x = mouseX * 2;
      camera.position.y = 8 + mouseY;
      camera.lookAt(0, 0, 0);

      const pos = particles.geometry.attributes.position.array as Float32Array;

      let idx = 0;
      for (let ix = 0; ix < cols; ix++) {
        for (let iy = 0; iy < rows; iy++) {
          const u = ix * 0.2 + step;
          const v = iy * 0.2 + step * 0.8;
          // Sine + Cosine flowing wave
          pos[idx + 1] = Math.sin(u) * 0.8 + Math.cos(v) * 0.6;
          idx += 3;
        }
      }

      particles.geometry.attributes.position.needsUpdate = true;
      particles.rotation.y = step * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[300px] pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
