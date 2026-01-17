'use client';

import React, { useEffect, useRef } from 'react';

const Confetti = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.parentElement?.offsetWidth || window.innerWidth;
    let height = canvas.parentElement?.offsetHeight || window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: any[] = [];
    const particleCount = 200;
    const colors = [
        '#AEE2FF', '#E5F5FF', '#D0BFFF', // Theme colors
        '#FFD700', '#FF69B4', '#32CD32', '#FFA500' // Gold, Pink, Green, Orange
    ];

    class Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      weight: number;
      directionX: number;
      opacity: number;
      rotation: number;
      rotationSpeed: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = height;
        this.size = Math.random() * 12 + 5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.weight = Math.random() * -15 - 5; // Negative for upward movement
        this.directionX = Math.random() * 4 - 2;
        this.opacity = 1;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 4 - 2;
      }

      update() {
        this.y += this.weight;
        this.weight += 0.3; // Gravity
        this.x += this.directionX;
        this.rotation += this.rotationSpeed;
        if (this.y > height + 20) {
            this.x = Math.random() * width;
            this.y = height;
            this.weight = Math.random() * -15 - 5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x + this.size / 2, this.y + this.size / 2);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
      }
    }

    const initParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
        width = canvas.parentElement?.offsetWidth || window.innerWidth;
        height = canvas.parentElement?.offsetHeight || window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    };

    initParticles();
    animate();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

export default Confetti;
