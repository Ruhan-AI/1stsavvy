'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { isWebGLAvailable } from '@/lib/webgl';

interface FamilyStarFlowCanvasProps {
  className?: string;
}

export function FamilyStarFlowCanvas({ className = '' }: FamilyStarFlowCanvasProps) {
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
      // Scene
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        60,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0, 15);

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'default',
        failIfMajorPerformanceCaveat: false,
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      container.appendChild(renderer.domElement);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0xf59e0b, 3, 50);
      pointLight.position.set(5, 5, 10);
      scene.add(pointLight);

      const skyLight = new THREE.PointLight(0x4fa3cd, 2, 40);
      skyLight.position.set(-5, -5, 8);
      scene.add(skyLight);

      // Group for objects
      const group = new THREE.Group();
      scene.add(group);

      // Create 3D Gold Coin/Star Objects
      const starGeom = new THREE.OctahedronGeometry(0.35, 0);
      const starMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        metalness: 0.8,
        roughness: 0.4,
        transparent: true,
        opacity: 0.3,
        emissive: 0xd97706,
        emissiveIntensity: 0.2,
      });

      const count = 18;
      const stars: {
        mesh: THREE.Mesh;
        speed: number;
        radius: number;
        angle: number;
        yBase: number;
        rotSpeed: number;
      }[] = [];

      for (let i = 0; i < count; i++) {
        const mesh = new THREE.Mesh(starGeom, starMat);
        const radius = 3 + Math.random() * 6;
        const angle = (i / count) * Math.PI * 2 + Math.random();
        const yBase = (Math.random() - 0.5) * 6;

        mesh.position.set(
          Math.cos(angle) * radius,
          yBase,
          Math.sin(angle) * (radius * 0.5)
        );

        const s = 0.5 + Math.random() * 0.8;
        mesh.scale.set(s, s, s);

        group.add(mesh);
        stars.push({
          mesh,
          speed: 0.15 + Math.random() * 0.25,
          radius,
          angle,
          yBase,
          rotSpeed: (Math.random() - 0.5) * 2,
        });
      }

      // Sparkles / Dust particles
      const dustGeom = new THREE.BufferGeometry();
      const dustCount = 80;
      const dustPos = new Float32Array(dustCount * 3);

      for (let i = 0; i < dustCount * 3; i += 3) {
        dustPos[i] = (Math.random() - 0.5) * 20;
        dustPos[i + 1] = (Math.random() - 0.5) * 12;
        dustPos[i + 2] = (Math.random() - 0.5) * 10;
      }

      dustGeom.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));

      const dustMat = new THREE.PointsMaterial({
        color: 0x4fa3cd,
        size: 0.18,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      });

      const dust = new THREE.Points(dustGeom, dustMat);
      scene.add(dust);

      // Mouse parallax
      let mouseX = 0;
      let mouseY = 0;
      const handleMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });

      // Resize
      const handleResize = () => {
        if (!container || !renderer) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };

      window.addEventListener('resize', handleResize);

      // Animate
      let clock = new THREE.Clock();
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const delta = clock.getDelta();
        const time = clock.getElapsedTime();

        // Rotate and float stars along harmonic curves
        stars.forEach((s, idx) => {
          s.angle += s.speed * delta;
          s.mesh.position.x = Math.cos(s.angle) * s.radius;
          s.mesh.position.z = Math.sin(s.angle) * (s.radius * 0.6);
          s.mesh.position.y = s.yBase + Math.sin(time * 1.5 + idx) * 0.4;

          s.mesh.rotation.x += s.rotSpeed * delta;
          s.mesh.rotation.y += s.rotSpeed * delta;
        });

        // Slow dust rotation
        dust.rotation.y = time * 0.03;

        // Group gentle tilt
        group.rotation.x = mouseY * 0.1;
        group.rotation.y = time * 0.05 + mouseX * 0.1;

        renderer?.render(scene, camera);
      };

      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        if (renderer && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
          renderer.dispose();
          renderer.forceContextLoss();
        }
      };
    } catch (err) {
      console.warn('FamilyStarFlowCanvas WebGL init failed:', err);
      setWebglSupported(false);
    }
  }, []);

  if (!webglSupported) {
    return (
      <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-radial from-amber-400/5 via-brand-sky/5 to-transparent blur-2xl" />
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
