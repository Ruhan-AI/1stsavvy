'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function HeroConstellationCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. Constellation Nodes (Connected Stars)
    const nodeCount = 55;
    const nodeGeometry = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeVelocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const i3 = i * 3;
      nodePositions[i3] = (Math.random() - 0.5) * 50;
      nodePositions[i3 + 1] = (Math.random() - 0.5) * 35;
      nodePositions[i3 + 2] = (Math.random() - 0.5) * 20;

      nodeVelocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.01,
      });
    }

    nodeGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(nodePositions, 3)
    );

    // Glowing Star Material
    const nodeMaterial = new THREE.PointsMaterial({
      color: 0x4fa3cd,
      size: 0.65,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const starPoints = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(starPoints);

    // 2. Gold Accent Stars
    const goldStarCount = 20;
    const goldPositions = new Float32Array(goldStarCount * 3);
    for (let i = 0; i < goldStarCount; i++) {
      const i3 = i * 3;
      goldPositions[i3] = (Math.random() - 0.5) * 45;
      goldPositions[i3 + 1] = (Math.random() - 0.5) * 30;
      goldPositions[i3 + 2] = (Math.random() - 0.5) * 15;
    }
    const goldGeometry = new THREE.BufferGeometry();
    goldGeometry.setAttribute('position', new THREE.BufferAttribute(goldPositions, 3));
    const goldMaterial = new THREE.PointsMaterial({
      color: 0xf59e0b,
      size: 1.1,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const goldStars = new THREE.Points(goldGeometry, goldMaterial);
    scene.add(goldStars);

    // 3. Dynamic Connecting Line Mesh
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x4fa3cd,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    });

    const maxConnections = (nodeCount * (nodeCount - 1)) / 2;
    const linePositions = new Float32Array(maxConnections * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = -((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse lerp
      targetX += (mouseX * 4 - targetX) * 0.03;
      targetY += (mouseY * 4 - targetY) * 0.03;

      camera.position.x = targetX;
      camera.position.y = targetY;
      camera.lookAt(0, 0, 0);

      // Rotate star clouds
      starPoints.rotation.y += 0.0006;
      goldStars.rotation.y += 0.0008;

      // Update node positions
      const positions = nodeGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < nodeCount; i++) {
        const i3 = i * 3;
        positions[i3] += nodeVelocities[i].x;
        positions[i3 + 1] += nodeVelocities[i].y;
        positions[i3 + 2] += nodeVelocities[i].z;

        // Boundary bounce
        if (positions[i3] < -25 || positions[i3] > 25) nodeVelocities[i].x *= -1;
        if (positions[i3 + 1] < -18 || positions[i3 + 1] > 18) nodeVelocities[i].y *= -1;
        if (positions[i3 + 2] < -12 || positions[i3 + 2] > 12) nodeVelocities[i].z *= -1;
      }
      nodeGeometry.attributes.position.needsUpdate = true;

      // Update connecting lines
      let vertexPos = 0;
      const connectDistance = 11;

      for (let i = 0; i < nodeCount; i++) {
        const i3 = i * 3;
        for (let j = i + 1; j < nodeCount; j++) {
          const j3 = j * 3;
          const dx = positions[i3] - positions[j3];
          const dy = positions[i3 + 1] - positions[j3 + 1];
          const dz = positions[i3 + 2] - positions[j3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < connectDistance) {
            linePositions[vertexPos++] = positions[i3];
            linePositions[vertexPos++] = positions[i3 + 1];
            linePositions[vertexPos++] = positions[i3 + 2];

            linePositions[vertexPos++] = positions[j3];
            linePositions[vertexPos++] = positions[j3 + 1];
            linePositions[vertexPos++] = positions[j3 + 2];
          }
        }
      }

      lineGeometry.setDrawRange(0, vertexPos / 3);
      lineGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-70 dark:opacity-90"
      aria-hidden="true"
    />
  );
}
