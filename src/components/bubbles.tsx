"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Bubbles = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Bubbles
    const bubbles: THREE.Mesh[] = [];
    const bubbleMaterial = new THREE.MeshLambertMaterial({
      color: 0xFFDDEE,
      transparent: true,
      opacity: 0.6
    });

    const bubbleCount = 60;
    const spawnArea = new THREE.Vector3(15, 12, 8);

    for (let i = 0; i < bubbleCount; i++) {
      const radius = Math.random() * 0.4 + 0.1;
      const bubbleGeometry = new THREE.SphereGeometry(radius, 32, 32);
      const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial);

      bubble.position.x = (Math.random() - 0.5) * spawnArea.x;
      bubble.position.y = (Math.random() - 0.5) * spawnArea.y - (spawnArea.y / 2);
      bubble.position.z = (Math.random() - 0.5) * spawnArea.z;
      
      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.005,
        Math.random() * 0.02 + 0.01,
        0
      );
      Object.assign(bubble, { velocity });
      
      bubbles.push(bubble);
      scene.add(bubble);
    }
    
    // Stars
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 5000;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 100;
      positions[i3 + 1] = (Math.random() - 0.5) * 100;
      positions[i3 + 2] = (Math.random() - 0.5) * 100;
      
      colors[i3] = 1;
      colors[i3+1] = 1;
      colors[i3+2] = 1;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const starMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = Date.now() * 0.0005;

      bubbles.forEach(bubble => {
        const vel = (bubble as any).velocity as THREE.Vector3;
        bubble.position.y += vel.y;
        bubble.position.x += vel.x;

        // Reset bubble when it goes off screen
        if (bubble.position.y > spawnArea.y / 2 + 1) {
          bubble.position.y = -spawnArea.y / 2 - 1;
          bubble.position.x = (Math.random() - 0.5) * spawnArea.x;
        }
      });
      
      // Twinkle stars
      const colorAttribute = starGeometry.attributes.color as THREE.BufferAttribute;
      for (let i = 0; i < starCount; i++) {
        // Use a sine wave for smooth twinkling
        const intensity = (Math.sin(i * 1.7 + time * 3) + 1) / 2 * 0.7 + 0.3; // Varies from 0.3 to 1.0
        colorAttribute.setXYZ(i, intensity, intensity, intensity);
      }
      colorAttribute.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement.parentNode === currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      cancelAnimationFrame(animationFrameId);
      // Dispose of Three.js objects
      scene.traverse(object => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry.dispose();
          if(Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default Bubbles;
