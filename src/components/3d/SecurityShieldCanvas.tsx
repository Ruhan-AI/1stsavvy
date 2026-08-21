'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface SecurityShieldCanvasProps {
  className?: string;
}

export function SecurityShieldCanvas({ className = '' }: SecurityShieldCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Inner Icosahedron
    const coreGeom = new THREE.IcosahedronGeometry(1.8, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x4FA3CD,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    group.add(coreMesh);

    // Outer Torus Ring 1
    const ring1Geom = new THREE.TorusGeometry(2.8, 0.04, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x10B981,
      transparent: true,
      opacity: 0.8,
    });
    const ring1 = new THREE.Mesh(ring1Geom, ring1Mat);
    group.add(ring1);

    // Outer Torus Ring 2
    const ring2Geom = new THREE.TorusGeometry(3.3, 0.03, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xF59E0B,
      transparent: true,
      opacity: 0.7,
    });
    const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
    ring2.rotation.x = Math.PI / 3;
    group.add(ring2);

    // Node particles around rings
    const nodeCount = 40;
    const nodePositions = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 2.8;
      nodePositions[i * 3] = Math.cos(angle) * radius;
      nodePositions[i * 3 + 1] = Math.sin(angle) * radius;
      nodePositions[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
    }
    const nodeGeom = new THREE.BufferGeometry();
    nodeGeom.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    const nodeMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.15,
      transparent: true,
      opacity: 0.9,
    });
    const nodes = new THREE.Points(nodeGeom, nodeMat);
    ring1.add(nodes);

    let animationFrameId: number;
    let clock = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      clock += 0.015;

      coreMesh.rotation.y = clock * 0.4;
      coreMesh.rotation.x = clock * 0.2;

      ring1.rotation.z = clock * 0.5;
      ring1.rotation.y = Math.sin(clock * 0.5) * 0.3;

      ring2.rotation.z = -clock * 0.4;
      ring2.rotation.x = Math.cos(clock * 0.5) * 0.4;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      coreGeom.dispose();
      coreMat.dispose();
      ring1Geom.dispose();
      ring1Mat.dispose();
      ring2Geom.dispose();
      ring2Mat.dispose();
      nodeGeom.dispose();
      nodeMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[260px] pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
