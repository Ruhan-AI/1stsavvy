'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { isWebGLAvailable, observeContainerSize, responsivePixelRatio } from '@/lib/webgl';

interface SecurityShieldCanvasProps {
  className?: string;
}

export function SecurityShieldCanvas({ className = '' }: SecurityShieldCanvasProps) {
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
      const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 12;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'default',
        failIfMajorPerformanceCaveat: false,
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(responsivePixelRatio(container.clientWidth));
      container.appendChild(renderer.domElement);

      // Outer Shield Ring
      const ringGeo = new THREE.TorusGeometry(3.5, 0.04, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x4fa3cd,
        transparent: true,
        opacity: 0.6,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      scene.add(ringMesh);

      // Inner Rotating Hex Ring
      const hexGeo = new THREE.RingGeometry(2.5, 2.6, 6);
      const hexMat = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide,
      });
      const hexMesh = new THREE.Mesh(hexGeo, hexMat);
      scene.add(hexMesh);

      // Central Shield Core (Octahedron)
      const coreGeo = new THREE.OctahedronGeometry(1.5, 1);
      const coreMat = new THREE.MeshBasicMaterial({
        color: 0x324154,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      scene.add(coreMesh);

      // Resize
      const handleResize = () => {
        if (!container || !renderer) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(responsivePixelRatio(container.clientWidth));
      };
      const stopResize = observeContainerSize(container, handleResize);

      // Animate
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        ringMesh.rotation.z += 0.005;
        ringMesh.rotation.x += 0.002;

        hexMesh.rotation.z -= 0.008;

        coreMesh.rotation.y += 0.006;
        coreMesh.rotation.x += 0.004;

        renderer?.render(scene, camera);
      };

      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        stopResize();
        if (renderer && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
          renderer.dispose();
          renderer.forceContextLoss();
        }
      };
    } catch (err) {
      console.warn('SecurityShieldCanvas WebGL init failed:', err);
      setWebglSupported(false);
    }
  }, []);

  if (!webglSupported) {
    return (
      <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
        <div className="w-48 h-48 rounded-full bg-radial from-emerald-500/10 via-brand-sky/5 to-transparent blur-xl" />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
}
