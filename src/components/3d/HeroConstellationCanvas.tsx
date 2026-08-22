'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { isWebGLAvailable } from '@/lib/webgl';

interface HeroConstellationCanvasProps {
  className?: string;
  theme?: 'blue' | 'emerald' | 'gold' | 'mixed';
}

export function HeroConstellationCanvas({ 
  className = '',
  theme = 'mixed'
}: HeroConstellationCanvasProps) {
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
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || 650;

      // Scene, Camera, Renderer
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        60,
        width / height,
        0.1,
        1000
      );
      camera.position.z = 32;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'default',
        failIfMajorPerformanceCaveat: false,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      container.appendChild(renderer.domElement);

      // 1. Constellation Nodes (Connected Stars)
      const nodeCount = 55;
      const nodeGeometry = new THREE.BufferGeometry();
      const nodePositions = new Float32Array(nodeCount * 3);
      const nodeColors = new Float32Array(nodeCount * 3);
      const nodeVelocities: { x: number; y: number; z: number }[] = [];

      const colorBlue = new THREE.Color(0x4fa3cd);
      const colorEmerald = new THREE.Color(0x10b981);
      const colorGold = new THREE.Color(0xf59e0b);

      for (let i = 0; i < nodeCount; i++) {
        const i3 = i * 3;
        nodePositions[i3] = (Math.random() - 0.5) * 55;
        nodePositions[i3 + 1] = (Math.random() - 0.5) * 38;
        nodePositions[i3 + 2] = (Math.random() - 0.5) * 25;

        // Theme colors
        let c = colorBlue;
        if (theme === 'mixed') {
          c = i % 3 === 0 ? colorGold : i % 3 === 1 ? colorBlue : colorEmerald;
        } else if (theme === 'emerald') {
          c = colorEmerald;
        } else if (theme === 'gold') {
          c = colorGold;
        }

        nodeColors[i3] = c.r;
        nodeColors[i3 + 1] = c.g;
        nodeColors[i3 + 2] = c.b;

        nodeVelocities.push({
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.01,
        });
      }

      nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
      nodeGeometry.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));

      const nodeMaterial = new THREE.PointsMaterial({
        size: 0.8,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
      });

      const starPoints = new THREE.Points(nodeGeometry, nodeMaterial);
      scene.add(starPoints);

      // 2. Dynamic Connection Lines
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x4fa3cd,
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending,
      });

      const maxConnections = 80;
      const linePositions = new Float32Array(maxConnections * 2 * 3);
      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

      const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(lineSegments);

      // 3. Central Glowing Geometric Star Orbit
      const starGeometry = new THREE.OctahedronGeometry(1.6, 0);
      const starMaterial = new THREE.MeshBasicMaterial({
        color: 0xf59e0b,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      });
      const starMesh = new THREE.Mesh(starGeometry, starMaterial);
      starMesh.position.set(-14, 6, 0);
      scene.add(starMesh);

      const ringGeometry = new THREE.TorusGeometry(3.2, 0.04, 16, 64);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x4fa3cd,
        transparent: true,
        opacity: 0.25,
      });
      const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
      ringMesh.position.copy(starMesh.position);
      ringMesh.rotation.x = Math.PI / 3;
      scene.add(ringMesh);

      // Mouse tracking
      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;

      const handleMouseMove = (e: MouseEvent) => {
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;
        mouseX = (e.clientX - windowHalfX) * 0.0008;
        mouseY = (e.clientY - windowHalfY) * 0.0008;
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });

      const handleResize = () => {
        if (!container || !renderer) return;
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || 650;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener('resize', handleResize);

      // Animation Loop
      let clock = new THREE.Clock();

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        scene.rotation.y = targetX * 1.5 + elapsedTime * 0.02;
        scene.rotation.x = targetY * 1.5;

        starMesh.rotation.x = elapsedTime * 0.4;
        starMesh.rotation.y = elapsedTime * 0.6;
        ringMesh.rotation.z = -elapsedTime * 0.2;

        // Move nodes
        const positions = nodeGeometry.attributes.position.array as Float32Array;
        for (let i = 0; i < nodeCount; i++) {
          const i3 = i * 3;
          positions[i3] += nodeVelocities[i].x;
          positions[i3 + 1] += nodeVelocities[i].y;
          positions[i3 + 2] += nodeVelocities[i].z;

          if (Math.abs(positions[i3]) > 28) nodeVelocities[i].x *= -1;
          if (Math.abs(positions[i3 + 1]) > 19) nodeVelocities[i].y *= -1;
          if (Math.abs(positions[i3 + 2]) > 13) nodeVelocities[i].z *= -1;
        }
        nodeGeometry.attributes.position.needsUpdate = true;

        // Connect nearby nodes with dynamic lines
        let lineIndex = 0;
        const linePos = lineGeometry.attributes.position.array as Float32Array;
        const maxDist = 9.5;

        for (let i = 0; i < nodeCount; i++) {
          for (let j = i + 1; j < nodeCount; j++) {
            if (lineIndex >= maxConnections) break;

            const i3 = i * 3;
            const j3 = j * 3;
            const dx = positions[i3] - positions[j3];
            const dy = positions[i3 + 1] - positions[j3 + 1];
            const dz = positions[i3 + 2] - positions[j3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < maxDist) {
              const lIdx = lineIndex * 6;
              linePos[lIdx] = positions[i3];
              linePos[lIdx + 1] = positions[i3 + 1];
              linePos[lIdx + 2] = positions[i3 + 2];
              linePos[lIdx + 3] = positions[j3];
              linePos[lIdx + 4] = positions[j3 + 1];
              linePos[lIdx + 5] = positions[j3 + 2];
              lineIndex++;
            }
          }
        }

        for (let k = lineIndex * 6; k < linePos.length; k++) {
          linePos[k] = 0;
        }
        lineGeometry.attributes.position.needsUpdate = true;

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
      console.warn('Hero constellation 3D canvas could not be initialized:', err);
      setWebglSupported(false);
    }
  }, [theme]);

  if (!webglSupported) {
    return (
      <div className={`absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden ${className}`}>
        <div className="absolute w-[600px] h-[600px] rounded-full bg-radial from-brand-sky/10 via-brand-amber/5 to-transparent blur-3xl" />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
}
