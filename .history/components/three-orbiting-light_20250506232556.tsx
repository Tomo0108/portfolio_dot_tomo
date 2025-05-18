"use client";

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ThreeOrbitingLightProps {
  width: number;
  height: number;
  color?: number;
}

const ThreeOrbitingLight: React.FC<ThreeOrbitingLightProps> = ({ width, height, color = 0x007bff /* Blue */ }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    if (!mountRef.current || width === 0 || height === 0) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    mountRef.current.innerHTML = ''; // Clear previous renderer
    mountRef.current.appendChild(renderer.domElement);

    camera.position.z = 10;

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
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.x = curve.getLength() / segmentLength; // Adjust repeat based on segment length

    const tubeMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });

    const glowingBorder = new THREE.Mesh(tubeGeometry, tubeMaterial);
    scene.add(glowingBorder);
    
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      texture.offset.x = -(elapsedTime * 0.2) % 1; // Animate texture offset for moving glow
      renderer.render(scene, camera);
    };

    animate();
    
    const currentMount = mountRef.current;
    return () => {
      if (currentMount && renderer.domElement.parentNode === currentMount) {
         currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      tubeGeometry.dispose();
      tubeMaterial.dispose();
      texture.dispose();
    };
  }, [width, height, color]);

  return <div ref={mountRef} style={{ width, height, position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 0 }} />;
};

export default ThreeOrbitingLight;
