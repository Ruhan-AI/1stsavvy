'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { isWebGLAvailable } from '@/lib/webgl';

export function HeroConstellationCanvas() {
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
      const camera = new THREE.PerspectiveCamera(
        60,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 30;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'default',
        failIfMajorPerformanceCaveat: false,
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      container.appendChild(renderer.domElement);

      // 1. Constellation Nodes (Connected Stars)
      const nodeCount = 45;
      const nodeGeometry = new THREE.BufferGeometry();
      const nodePositions = new Float32Array(nodeCount * 3);
      const nodeVelocities: { x: number; y: number; z: number }[] = [];

      for (let i = 0; i < nodeCount; i++) {
        const i3 = i * 3;
        nodePositions[i3] = (Math.random() - 0.5) * 50;
        nodePositions[i3 + 1] = (Math.random() - 0.5) * 35;
        nodePositions[i3 + 2] = (Math.random() - 0.5) * 20;

        nodeVelocities.push({
          x: (Math.random() - 0.5) * 0.015,
          y: (Math.random() - 0.5) * 0.015,
          z: (Math.random() - 0.5) * 0.008,
        });
      }

      nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));

      const nodeMaterial = new THREE.PointsMaterial({
        color: 0x4fa3cd,
        size: 0.65,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      });

      const starPoints = new THREE.Points(nodeGeometry, nodeMaterial);
      scene.add(starPoints);

      // 2. Dynamic Connection Lines
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x4fa3cd,
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending,
      });

      const maxConnections = 60;
      const linePositions = new Float32Array(maxConnections * 2 * 3);
      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

      const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(lineSegments);

      // 3. Central Golden Star Orbit
      const starGeometry = new THREE.OctahedronGeometry(1.2, 0);
      const starMaterial = new THREE.MeshBasicMaterial({
        color: 0xf59e0b,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      });
      const starMesh = new THREE.Mesh(starGeometry, starMaterial);
      starMesh.position.set(12, 4, -5);
      scene.add(starMesh);

      // Interaction
      let mouseX = 0;
      let mouseY = 0;
      const handleMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 4;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 4;
      };

      const handleResize = () => {
        if (!container || !renderer) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('resize', handleResize);

      // Animation Loop
      let clock = new THREE.Clock();
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const delta = clock.getDelta();

        // Rotate star
        starMesh.rotation.x += delta * 0.4;
        starMesh.rotation.y += delta * 0.6;

        // Subtle camera tracking
        camera.position.x += (mouseX - camera.position.x) * 0.03;
        camera.position.y += (-mouseY - camera.position.y) * 0.03;
        camera.lookAt(0, 0, 0);

        // Update nodes
        const pos = nodeGeometry.attributes.position.array as Float32Array;
        for (let i = 0; i < nodeCount; i++) {
          const i3 = i * 3;
          pos[i3] += nodeVelocities[i].x;
          pos[i3 + 1] += nodeVelocities[i].y;
          pos[i3 + 2] += nodeVelocities[i].z;

          if (pos[i3] < -25 || pos[i3] > 25) nodeVelocities[i].x *= -1;
          if (pos[i3 + 1] < -18 || pos[i3 + 1] > 18) nodeVelocities[i].y *= -1;
          if (pos[i3 + 2] < -10 || pos[i3 + 2] > 10) nodeVelocities[i].z *= -1;
        }
        nodeGeometry.attributes.position.needsUpdate = true;

        // Update lines between close stars
        let lineIdx = 0;
        const linePos = lineGeometry.attributes.position.array as Float32Array;
        const maxDist = 9.5;

        for (let i = 0; i < nodeCount && lineIdx < maxConnections; i++) {
          const i3 = i * 3;
          for (let j = i + 1; j < nodeCount && lineIdx < maxConnections; j++) {
            const j3 = j * 3;
            const dx = pos[i3] - pos[j3];
            const dy = pos[i3 + 1] - pos[j3 + 1];
            const dz = pos[i3 + 2] - pos[j3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < maxDist) {
              const l6 = lineIdx * 6;
              linePos[l6] = pos[i3];
              linePos[l6 + 1] = pos[i3 + 1];
              linePos[l6 + 2] = pos[i3 + 2];
              linePos[l6 + 3] = pos[j3];
              linePos[l6 + 4] = pos[j3 + 1];
              linePos[l6 + 5] = pos[j3 + 2];
              lineIdx++;
            }
          }
        }

        for (let k = lineIdx * 6; k < maxConnections * 6; k++) {
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
  }, []);

  if (!webglSupported) {
    return (
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        {/* Sleek static fallback glow & ambient constellation dots */}
        <div className="absolute w-[600px] h-[600px] rounded-full bg-radial from-brand-sky/10 via-brand-amber/5 to-transparent blur-3xl" />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
