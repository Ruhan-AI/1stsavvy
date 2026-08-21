'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface WealthGlobeCanvasProps {
  size?: number;
}

export function WealthGlobeCanvas({ size = 320 }: WealthGlobeCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
      color: 0x0f766e,
      transparent: true,
      opacity: 0.65,
    });
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Mesh.rotation.y = Math.PI / 4;
    ring2Mesh.rotation.x = -Math.PI / 6;
    scene.add(ring2Mesh);

    // 4. Floating Satellites (Assets)
    const satGeo = new THREE.SphereGeometry(0.12, 12, 12);
    const satMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const satMesh = new THREE.Mesh(satGeo, satMat);
    scene.add(satMesh);

    // Animation Loop
    let animId: number;
    let angle = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      angle += 0.015;

      coreMesh.rotation.y += 0.005;
      coreMesh.rotation.x += 0.002;

      innerMesh.rotation.y -= 0.007;

      ring1Mesh.rotation.z += 0.008;
      ring2Mesh.rotation.z -= 0.006;

      // Orbit satellite along ring1
      satMesh.position.x = Math.cos(angle) * 3.1;
      satMesh.position.y = Math.sin(angle) * 3.1 * Math.cos(Math.PI / 3);
      satMesh.position.z = Math.sin(angle) * 3.1 * Math.sin(Math.PI / 3);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      coreGeo.dispose();
      coreMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      satGeo.dispose();
      satMat.dispose();
      renderer.dispose();
    };
  }, [size]);

  return (
    <div
      ref={mountRef}
      className="relative inline-flex items-center justify-center select-none pointer-events-none"
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
}
