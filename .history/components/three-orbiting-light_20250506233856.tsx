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
  const animationFrameIdRef = useRef<number | null>(null);
  // Keep refs for Three.js objects to manage their lifecycle
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);
  const geometryRef = useRef<THREE.TubeGeometry | null>(null);
  const clockRef = useRef(new THREE.Clock());

  useEffect(() => {
    const cleanupThreeResources = () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }

      if (rendererRef.current) {
        if (rendererRef.current.domElement.parentNode) {
          rendererRef.current.domElement.parentNode.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current.dispose();
        rendererRef.current = null;
      }

      if (meshRef.current) {
        // Geometry, material, texture are disposed separately if they are in refs
        meshRef.current = null; 
      }
      if (geometryRef.current) {
        geometryRef.current.dispose();
        geometryRef.current = null;
      }
      if (materialRef.current) {
        materialRef.current.dispose();
        materialRef.current = null;
      }
      if (textureRef.current) {
        textureRef.current.dispose();
        textureRef.current = null;
      }
      if (sceneRef.current) {
        // Scene doesn't have a dispose method, children are disposed above
        sceneRef.current = null;
      }
      if (cameraRef.current) {
        // Camera doesn't have a dispose method
        cameraRef.current = null;
      }
    };

    cleanupThreeResources(); // Clean up before any new setup

    const currentMount = mountRef.current;
    if (!currentMount || width === 0 || height === 0) {
      return; // Exit if no mount point or invalid dimensions
    }

    // Setup new Three.js instance
    try {
      sceneRef.current = new THREE.Scene();
      cameraRef.current = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 1000);
      cameraRef.current.position.z = 10;

      rendererRef.current = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      rendererRef.current.setSize(width, height);
      rendererRef.current.setPixelRatio(window.devicePixelRatio); // For sharper rendering
      currentMount.appendChild(rendererRef.current.domElement);

      const w = width;
      const h = height;
      const thickness = 4;
      const segmentLength = 50;
      const glowColor = new THREE.Color(color);
      const cornerRadius = 10;

      const rectShape = new THREE.Shape();
      rectShape.moveTo(-w / 2 + cornerRadius, -h / 2);
      rectShape.lineTo(w / 2 - cornerRadius, -h / 2);
      rectShape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + cornerRadius);
      rectShape.lineTo(w / 2, h / 2 - cornerRadius);
      rectShape.quadraticCurveTo(w / 2, h / 2, w / 2 - cornerRadius, h / 2);
      rectShape.lineTo(-w / 2 + cornerRadius, h / 2);
      rectShape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - cornerRadius);
      rectShape.lineTo(-w / 2, -h / 2 + cornerRadius);
      rectShape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + cornerRadius, -h / 2);
      
      const points = rectShape.getPoints(100);
      const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(p.x, p.y, 0)), true);
      geometryRef.current = new THREE.TubeGeometry(curve, 128, thickness / 2, 8, false);

      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 1;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, `rgba(${glowColor.r * 255}, ${glowColor.g * 255}, ${glowColor.b * 255}, 0)`);
        gradient.addColorStop(0.4, `rgba(${glowColor.r * 255}, ${glowColor.g * 255}, ${glowColor.b * 255}, 1)`);
        gradient.addColorStop(0.6, `rgba(${glowColor.r * 255}, ${glowColor.g * 255}, ${glowColor.b * 255}, 1)`);
        gradient.addColorStop(1, `rgba(${glowColor.r * 255}, ${glowColor.g * 255}, ${glowColor.b * 255}, 0)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      textureRef.current = new THREE.CanvasTexture(canvas);
      textureRef.current.wrapS = THREE.RepeatWrapping;
      textureRef.current.repeat.x = Math.max(1, curve.getLength() / segmentLength); // Ensure repeat.x is at least 1

      materialRef.current = new THREE.MeshBasicMaterial({
        map: textureRef.current,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      });

      meshRef.current = new THREE.Mesh(geometryRef.current, materialRef.current);
      sceneRef.current.add(meshRef.current);
      
      clockRef.current.stop();
      clockRef.current.start();

      const animate = () => {
        animationFrameIdRef.current = requestAnimationFrame(animate);
        const elapsedTime = clockRef.current.getElapsedTime();
        if (textureRef.current) {
          textureRef.current.offset.x = -(elapsedTime * 0.2) % 1;
        }
        if (rendererRef.current && sceneRef.current && cameraRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
      };
      animate();
    } catch (error) {
      console.error("Error setting up Three.js:", error);
      cleanupThreeResources(); // Attempt to clean up if setup fails
    }

    return cleanupThreeResources; // Cleanup on unmount or when dependencies change
  }, [width, height, color]);

  return <div ref={mountRef} style={{ width, height, position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 0 }} />;
};

export default ThreeOrbitingLight;
