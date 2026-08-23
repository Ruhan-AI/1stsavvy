'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { isWebGLAvailable, responsivePixelRatio } from '@/lib/webgl';

interface WealthGlobeCanvasProps {
  size?: number;
}

export function WealthGlobeCanvas({ size = 320 }: WealthGlobeCanvasProps) {
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
      // Scene, Camera, Renderer
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.z = 8;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'default',
        failIfMajorPerformanceCaveat: false,
      });
      renderer.setSize(size, size);
      renderer.setPixelRatio(responsivePixelRatio(size));
      container.appendChild(renderer.domElement);

      // 1. Central Wireframe Icosahedron (Wealth Core)
      const coreGeo = new THREE.IcosahedronGeometry(2, 2);
      const coreMat = new THREE.MeshBasicMaterial({
        color: 0x4fa3cd,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      scene.add(coreMesh);

      // 2. Inner Glowing Core
      const innerGeo = new THREE.SphereGeometry(1.2, 16, 16);
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0x2b3a4e,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      });
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      scene.add(innerMesh);

      // 3. Orbital Golden Rings (Investments & Legacy)
      const ring1Geo = new THREE.TorusGeometry(3.1, 0.03, 16, 100);
      const ring1Mat = new THREE.MeshBasicMaterial({
        color: 0xf59e0b,
        transparent: true,
        opacity: 0.75,
      });
      const ring1Mesh = new THREE.Mesh(ring1Geo, ring1Mat);
      ring1Mesh.rotation.x = Math.PI / 3;
      scene.add(ring1Mesh);

      const ring2Geo = new THREE.TorusGeometry(2.8, 0.02, 16, 100);
      const ring2Mat = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.65,
      });
      const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
      ring2Mesh.rotation.y = Math.PI / 4;
      scene.add(ring2Mesh);

      // 4. Floating Satellites (Assets)
      const satCount = 12;
      const satGroup = new THREE.Group();
      scene.add(satGroup);

      const satGeo = new THREE.OctahedronGeometry(0.12, 0);
      const satMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.8,
      });

      for (let i = 0; i < satCount; i++) {
        const sat = new THREE.Mesh(satGeo, satMat);
        const theta = (i / satCount) * Math.PI * 2;
        const rad = 2.6;
        sat.position.set(Math.cos(theta) * rad, (Math.random() - 0.5) * 1.5, Math.sin(theta) * rad);
        satGroup.add(sat);
      }

      // Animation Loop
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        coreMesh.rotation.y += 0.005;
        coreMesh.rotation.x += 0.002;

        innerMesh.rotation.y -= 0.008;

        ring1Mesh.rotation.z += 0.007;
        ring2Mesh.rotation.x += 0.009;

        satGroup.rotation.y += 0.01;

        renderer?.render(scene, camera);
      };

      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        if (renderer && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
          renderer.dispose();
          renderer.forceContextLoss();
        }
      };
    } catch (err) {
      console.warn('WealthGlobeCanvas WebGL init failed:', err);
      setWebglSupported(false);
    }
  }, [size]);

  if (!webglSupported) {
    return (
      <div
        className="relative flex items-center justify-center pointer-events-none rounded-full overflow-hidden bg-radial from-brand-sky/10 via-amber-400/5 to-transparent"
        style={{ width: size, height: size }}
      >
        <div className="w-32 h-32 rounded-full border border-brand-sky/30 animate-spin-slow" />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="relative flex items-center justify-center pointer-events-none"
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
}
