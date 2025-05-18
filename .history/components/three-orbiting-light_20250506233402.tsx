"use client";

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ThreeOrbitingLightProps {
  width: number;
  height: number;
  color?: number;
}

const ThreeOrbitingLight: React.FC<ThreeOrbitingLightProps> = ({ width, height, color = 0x4299E1 /* Tailwind Blue-500ish */ }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const clockRef = useRef(new THREE.Clock());

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount || width === 0 || height === 0) {
      // Clean up existing Three.js resources if the component is unmounted or size is zero
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (rendererRef.current.domElement.parentNode) {
          rendererRef.current.domElement.parentNode.removeChild(rendererRef.current.domElement);
        }
      }
      if (meshRef.current) {
        if (meshRef.current.geometry) meshRef.current.geometry.dispose();
        // Material and texture are disposed via their refs
      }
      if (materialRef.current) materialRef.current.dispose();
      if (textureRef.current) textureRef.current.dispose();
      sceneRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
      meshRef.current = null;
      materialRef.current = null;
      textureRef.current = null;
      return;
    }

    // Initialize Scene, Camera, Renderer if they don't exist
    if (!sceneRef.current) sceneRef.current = new THREE.Scene();
    if (!cameraRef.current) {
      cameraRef.current = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 1000);
      cameraRef.current.position.z = 10;
    } else {
      // Update camera properties if width/height changed
      cameraRef.current.left = width / -2;
      cameraRef.current.right = width / 2;
      cameraRef.current.top = height / 2;
      cameraRef.current.bottom = height / -2;
      cameraRef.current.updateProjectionMatrix();
    }

    if (!rendererRef.current) {
      rendererRef.current = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      rendererRef.current.setSize(width, height);
      currentMount.innerHTML = ''; // Clear previous renderer
      currentMount.appendChild(rendererRef.current.domElement);
    } else {
      rendererRef.current.setSize(width, height);
    }
    
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const renderer = rendererRef.current;

    // Dispose previous mesh, material, texture if they exist
    if (meshRef.current) {
      scene.remove(meshRef.current);
      if (meshRef.current.geometry) meshRef.current.geometry.dispose();
      meshRef.current = null;
    }
    if (materialRef.current) {
      materialRef.current.dispose();
      materialRef.current = null;
    }
    if (textureRef.current) {
      textureRef.current.dispose();
      textureRef.current = null;
    }

    
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      if (texture) { // Ensure texture exists before accessing offset
        texture.offset.x = -(elapsedTime * 0.2) % 1; // Animate texture offset for moving glow
      }
      renderer.render(scene, camera);
    };

    animate();
    
    const currentMount = mountRef.current;
    return () => {
      cancelAnimationFrame(animationFrameId); // Cancel the animation frame
      if (currentMount && renderer.domElement.parentNode === currentMount) {
         currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      tubeGeometry.dispose();
      tubeMaterial.dispose();
      if (texture) { // Ensure texture exists before disposing
        texture.dispose();
      }
    };
  }, [width, height, color]);

  return <div ref={mountRef} style={{ width, height, position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 0 }} />;
};

export default ThreeOrbitingLight;
