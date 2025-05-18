"use client";

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ThreeOrbitingLightProps {
  width: number;
  height: number;
  color?: number;
}

const ThreeOrbitingLight: React.FC<ThreeOrbitingLightProps> = ({ width, height, color = 0xffa500 }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(width / 100, height / 100, 0.1); // Adjust size as needed
    const material = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0 }); // Invisible box
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    
    camera.position.z = Math.max(width, height) / 100 * 1.2; // Adjust camera distance based on size

    // Create the light source
    const light = new THREE.PointLight(color, 2, 50); // color, intensity, distance
    light.position.set(0, 0, 0.5); // Position the light slightly in front
    scene.add(light);

    // Create a small sphere to represent the light's path (optional, for visualization)
    const lightPathGeometry = new THREE.SphereGeometry(0.05, 16, 16); // Small sphere
    const lightPathMaterial = new THREE.MeshBasicMaterial({ color: color });
    const lightVisualizer = new THREE.Mesh(lightPathGeometry, lightPathMaterial);
    scene.add(lightVisualizer);
    
    let angle = 0;
    const radiusX = width / 100 / 2 * 1.1; // Elliptical path slightly larger than the box
    const radiusY = height / 100 / 2 * 1.1;

    const animate = () => {
      requestAnimationFrame(animate);

      angle += 0.02; // Speed of the light

      // Calculate light position on the border
      const x = radiusX * Math.cos(angle);
      const y = radiusY * Math.sin(angle);
      
      light.position.set(x, y, 0.2);
      lightVisualizer.position.set(x, y, 0.2); // Match visualizer position

      renderer.render(scene, camera);
    };

    animate();

    const currentMount = mountRef.current;
    return () => {
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      lightPathGeometry.dispose();
      lightPathMaterial.dispose();
    };
  }, [width, height, color]);

  return <div ref={mountRef} style={{ width, height, position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} />;
};

export default ThreeOrbitingLight;
