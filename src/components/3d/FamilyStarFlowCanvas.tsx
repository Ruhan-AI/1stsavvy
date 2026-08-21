'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface FamilyStarFlowCanvasProps {
  className?: string;
}

export function FamilyStarFlowCanvas({ className = '' }: FamilyStarFlowCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
    const starGeom = new THREE.OctahedronGeometry(0.5, 0);
    const starMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0xd97706,
      emissiveIntensity: 0.3,
    });

    const coinGeom = new THREE.CylinderGeometry(0.4, 0.4, 0.1, 16);
    const coinMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.7,
      roughness: 0.3,
      emissive: 0x0284c7,
      emissiveIntensity: 0.2,
    });

    const objects: {
      mesh: THREE.Mesh;
      rotSpeedX: number;
      rotSpeedY: number;
      orbitSpeed: number;
      radius: number;
      angle: number;
      baseY: number;
    }[] = [];

    const numItems = 28;
    for (let i = 0; i < numItems; i++) {
      const isStar = i % 2 === 0;
      const mesh = new THREE.Mesh(isStar ? starGeom : coinGeom, isStar ? starMat : coinMat);

      const radius = 3.5 + Math.random() * 6;
      const angle = (i / numItems) * Math.PI * 2 + Math.random();
      const baseY = (Math.random() - 0.5) * 8;

      mesh.position.set(
        Math.cos(angle) * radius,
        baseY,
        Math.sin(angle) * (radius * 0.6)
      );

      const scale = 0.5 + Math.random() * 0.7;
      mesh.scale.set(scale, scale, scale);

      group.add(mesh);

      objects.push({
        mesh,
        rotSpeedX: (Math.random() - 0.5) * 0.04,
        rotSpeedY: (Math.random() - 0.5) * 0.04,
        orbitSpeed: 0.003 + Math.random() * 0.005,
        radius,
        angle,
        baseY,
      });
    }

    // Sparkle Particle Field
    const sparkleCount = 120;
    const sparklePositions = new Float32Array(sparkleCount * 3);
    const sparkleColors = new Float32Array(sparkleCount * 3);

    const cStar = new THREE.Color(0xfcd34d);
    const cSky = new THREE.Color(0x7dd3fc);

    for (let i = 0; i < sparkleCount; i++) {
      sparklePositions[i * 3] = (Math.random() - 0.5) * 25;
      sparklePositions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      sparklePositions[i * 3 + 2] = (Math.random() - 0.5) * 15;

      const c = Math.random() > 0.5 ? cStar : cSky;
      sparkleColors[i * 3] = c.r;
      sparkleColors[i * 3 + 1] = c.g;
      sparkleColors[i * 3 + 2] = c.b;
    }

    const sparkleGeom = new THREE.BufferGeometry();
    sparkleGeom.setAttribute('position', new THREE.BufferAttribute(sparklePositions, 3));
    sparkleGeom.setAttribute('color', new THREE.BufferAttribute(sparkleColors, 3));

    const sparkleMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const sparkles = new THREE.Points(sparkleGeom, sparkleMat);
    scene.add(sparkles);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetMouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Render loop
    let animationFrameId: number;
    let clock = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      clock += 0.015;

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      group.rotation.y = clock * 0.15 + mouseX * 0.5;
      group.rotation.x = mouseY * 0.3;

      objects.forEach((obj) => {
        obj.mesh.rotation.x += obj.rotSpeedX;
        obj.mesh.rotation.y += obj.rotSpeedY;
        obj.angle += obj.orbitSpeed;

        obj.mesh.position.y = obj.baseY + Math.sin(clock * 2 + obj.radius) * 0.4;
      });

      sparkles.rotation.y = clock * 0.04;
      sparkles.rotation.x = clock * 0.02;

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
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      starGeom.dispose();
      coinGeom.dispose();
      starMat.dispose();
      coinMat.dispose();
      sparkleGeom.dispose();
      sparkleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[320px] pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
