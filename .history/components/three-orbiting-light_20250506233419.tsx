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

    const w = width;
    const h = height;
    const thickness = 4; // Thickness of the glowing border
    const segmentLength = 50; // Length of the glowing segment
    const glowColor = new THREE.Color(color);

    // Create a rounded rectangle path
    const path = new THREE.ShapePath();
    const rectShape = new THREE.Shape();
    const cornerRadius = 10; // Adjust for desired roundness

    rectShape.moveTo(-w / 2 + cornerRadius, -h / 2);
    rectShape.lineTo(w / 2 - cornerRadius, -h / 2);
    rectShape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + cornerRadius);
    rectShape.lineTo(w / 2, h / 2 - cornerRadius);
    rectShape.quadraticCurveTo(w / 2, h / 2, w / 2 - cornerRadius, h / 2);
    rectShape.lineTo(-w / 2 + cornerRadius, h / 2);
    rectShape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - cornerRadius);
    rectShape.lineTo(-w / 2, -h / 2 + cornerRadius);
    rectShape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + cornerRadius, -h / 2);
    
    const points = rectShape.getPoints(100); // Get enough points for a smooth curve
    const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(p.x, p.y, 0)), true);


    const tubeGeometry = new THREE.TubeGeometry(curve, 128, thickness / 2, 8, false);

    // Create a gradient texture for the glow
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
    textureRef.current.repeat.x = curve.getLength() / segmentLength; // Adjust repeat based on segment length

    materialRef.current = new THREE.MeshBasicMaterial({
      map: textureRef.current,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });

    meshRef.current = new THREE.Mesh(tubeGeometry, materialRef.current);
    scene.add(meshRef.current);
    
    clockRef.current.stop(); // Reset clock if it was running
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

    // Cancel previous animation frame if any
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
    }
    animate();
    
    // Cleanup function
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
      // Scene objects are cleaned up at the beginning of useEffect or if width/height is 0
      // Renderer DOM element is removed if width/height is 0 or on unmount
      if (rendererRef.current && rendererRef.current.domElement.parentNode === currentMount) {
        // currentMount.removeChild(rendererRef.current.domElement); // This might be too aggressive if component re-renders often
      }
    };
  }, [width, height, color]); // Rerun effect if width, height, or color changes

  // Final cleanup on unmount
  useEffect(() => {
    const currentRenderer = rendererRef.current;
    const currentMount = mountRef.current;
    return () => {
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
      if (currentRenderer) {
        currentRenderer.dispose();
        if (currentRenderer.domElement.parentNode) {
          currentRenderer.domElement.parentNode.removeChild(currentRenderer.domElement);
        }
      }
      if (meshRef.current) {
        if (meshRef.current.geometry) meshRef.current.geometry.dispose();
      }
      if (materialRef.current) materialRef.current.dispose();
      if (textureRef.current) textureRef.current.dispose();
      sceneRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
      meshRef.current = null;
      materialRef.current = null;
      textureRef.current = null;
    }
  }, []);


  return <div ref={mountRef} style={{ width, height, position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 0 }} />;
};

export default ThreeOrbitingLight;
