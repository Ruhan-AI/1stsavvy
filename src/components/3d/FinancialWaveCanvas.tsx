'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { isWebGLAvailable } from '@/lib/webgl';

interface FinancialWaveCanvasProps {
  className?: string;
}

export function FinancialWaveCanvas({ className = '' }: FinancialWaveCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    if (!isWebGLAvailable()) {
      setWebglSupported(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let animationFrameId: number;

    try {
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

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'default',
        failIfMajorPerformanceCaveat: false,
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      container.appendChild(renderer.domElement);

      // Create 3D Particle Grid Wave
      const cols = 40;
      const rows = 28;
      const count = cols * rows;
      const positions = new Float32Array(count * 3);
      const scales = new Float32Array(count);
      const colors = new Float32Array(count * 3);

      const color1 = new THREE.Color(0x4fa3cd); // Sky blue
      const color2 = new THREE.Color(0x10b981); // Emerald
      const color3 = new THREE.Color(0xf59e0b); // Amber gold

      let i = 0;
      let colIdx = 0;
      for (let ix = 0; ix < cols; ix++) {
        for (let iy = 0; iy < rows; iy++) {
          const x = (ix - cols / 2) * 0.75;
          const z = (iy - rows / 2) * 0.75;
          const y = 0;

          positions[i] = x;
          positions[i + 1] = y;
          positions[i + 2] = z;

          scales[colIdx] = 1;

          // Color gradient blending
          const ratio = ix / cols;
          const blended = ratio < 0.5
            ? color1.clone().lerp(color2, ratio * 2)
            : color2.clone().lerp(color3, (ratio - 0.5) * 2);

          colors[i] = blended.r;
          colors[i + 1] = blended.g;
          colors[i + 2] = blended.b;

          i += 3;
          colIdx++;
        }
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      // Particle Material
      const material = new THREE.PointsMaterial({
        size: 0.22,
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      // Mouse interaction
      let mouseX = 0;
      let targetMouseX = 0;
      const onMouseMove = (event: MouseEvent) => {
        targetMouseX = (event.clientX / window.innerWidth - 0.5) * 4;
      };
      window.addEventListener('mousemove', onMouseMove, { passive: true });

      // Resize listener
      const handleResize = () => {
        if (!container || !renderer) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener('resize', handleResize);

      // Animate Waves
      let countStep = 0;
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        countStep += 0.035;
        mouseX += (targetMouseX - mouseX) * 0.05;

        const pos = geometry.attributes.position.array as Float32Array;

        let index = 0;
        for (let ix = 0; ix < cols; ix++) {
          for (let iy = 0; iy < rows; iy++) {
            const yIndex = index * 3 + 1;

            // Harmonious Multi-frequency sine-wave
            pos[yIndex] =
              Math.sin((ix + countStep) * 0.3) * 0.8 +
              Math.sin((iy + countStep) * 0.4) * 0.6 +
              Math.sin((ix + iy + countStep) * 0.2) * 0.4;

            index++;
          }
        }

        geometry.attributes.position.needsUpdate = true;
        particles.rotation.y = mouseX * 0.1;
        particles.rotation.z = Math.sin(countStep * 0.2) * 0.03;

        renderer?.render(scene, camera);
      };

      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', handleResize);
        if (renderer && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
          renderer.dispose();
          renderer.forceContextLoss();
        }
      };
    } catch (err) {
      console.warn('FinancialWaveCanvas WebGL init failed:', err);
      setWebglSupported(false);
    }
  }, []);

  if (!webglSupported) {
    return (
      <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-radial from-emerald-500/5 via-brand-sky/5 to-transparent blur-2xl" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
}
