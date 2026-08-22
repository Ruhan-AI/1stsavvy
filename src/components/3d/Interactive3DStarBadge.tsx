'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { isWebGLAvailable } from '@/lib/webgl';

interface Interactive3DStarBadgeProps {
  stars?: number;
  size?: number;
  interactive?: boolean;
}

export function Interactive3DStarBadge({
  stars = 24,
  size = 180,
  interactive = true,
}: Interactive3DStarBadgeProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    if (!isWebGLAvailable()) {
      setWebglSupported(false);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let animationFrameId: number;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.z = 6;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'default',
        failIfMajorPerformanceCaveat: false,
      });
      renderer.setSize(size, size);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      container.appendChild(renderer.domElement);

      // Star Shape
      const starGeo = new THREE.OctahedronGeometry(1.4, 0);
      const starMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        metalness: 0.85,
        roughness: 0.25,
        emissive: 0xd97706,
        emissiveIntensity: 0.35,
      });
      const starMesh = new THREE.Mesh(starGeo, starMat);
      scene.add(starMesh);

      // Halo Ring
      const haloGeo = new THREE.TorusGeometry(2.0, 0.03, 16, 64);
      const haloMat = new THREE.MeshBasicMaterial({
        color: 0x4fa3cd,
        transparent: true,
        opacity: 0.6,
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.rotation.x = Math.PI / 3;
      scene.add(haloMesh);

      // Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0xffedd5, 2.5, 20);
      pointLight.position.set(3, 4, 5);
      scene.add(pointLight);

      // Interaction
      let isDragging = false;
      let prevMouseX = 0;
      let prevMouseY = 0;
      let targetRotX = 0;
      let targetRotY = 0;

      const onMouseDown = (e: MouseEvent) => {
        if (!interactive) return;
        isDragging = true;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      };

      const onMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        targetRotY += deltaX * 0.01;
        targetRotX += deltaY * 0.01;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      };

      const onMouseUp = () => {
        isDragging = false;
      };

      if (interactive) {
        container.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('mouseup', onMouseUp);
      }

      // Animate
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        if (!isDragging) {
          targetRotY += 0.01;
        }

        starMesh.rotation.y += (targetRotY - starMesh.rotation.y) * 0.1;
        starMesh.rotation.x += (targetRotX - starMesh.rotation.x) * 0.1;

        haloMesh.rotation.z += 0.008;

        renderer?.render(scene, camera);
      };

      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        if (interactive) {
          container.removeEventListener('mousedown', onMouseDown);
          window.removeEventListener('mousemove', onMouseMove);
          window.removeEventListener('mouseup', onMouseUp);
        }
        if (renderer && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
          renderer.dispose();
          renderer.forceContextLoss();
        }
      };
    } catch (err) {
      console.warn('Interactive3DStarBadge WebGL init failed:', err);
      setWebglSupported(false);
    }
  }, [size, interactive]);

  if (!webglSupported) {
    return (
      <div
        className="relative flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400/20 via-brand-sky/10 to-brand-navy/10 border border-amber-400/30 p-4 shadow-lg"
        style={{ width: size, height: size }}
      >
        <span className="text-3xl">⭐</span>
        <span className="font-bold text-amber-500 mt-1">{stars} Stars</span>
      </div>
    );
  }

  return (
    <div className="relative inline-flex items-center justify-center">
      <div
        ref={mountRef}
        className={`relative ${interactive ? 'cursor-grab active:cursor-grabbing' : ''}`}
        style={{ width: size, height: size }}
      />
      <div className="absolute -bottom-2 px-3 py-1 bg-brand-navy/80 dark:bg-brand-navyDark/90 backdrop-blur-md rounded-full border border-amber-400/40 text-amber-400 font-bold text-xs shadow-md">
        ★ {stars} Stars
      </div>
    </div>
  );
}
