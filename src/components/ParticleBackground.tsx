import React, { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  density?: 'high' | 'medium' | 'low';
  fadeDirection?: 'none' | 'down';
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ 
  density = 'medium',
  fadeDirection = 'none'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current = { 
        x: e.clientX, 
        y: e.clientY 
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Determine particle count based on density
    const getParticleCount = () => {
      const baseCount = Math.min(125, Math.floor((canvas.width * canvas.height) / 12000));
      
      switch(density) {
        case 'high': return baseCount * 1.5;
        case 'low': return baseCount * 0.6;
        default: return baseCount;
      }
    };

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      baseSize: number;
      speedX: number;
      speedY: number;
      color: string;
      initialY: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.initialY = this.y; // Store initial Y position for fade effect
        
        // Larger particles, especially at the top
        const positionFactor = fadeDirection === 'down' 
          ? Math.max(0.5, 1 - (this.y / canvas.height)) 
          : 1;
          
        this.baseSize = (Math.random() * 4 + 1) * positionFactor;
        this.size = this.baseSize;
        
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        
        // Brighter, more visible colors
        const alpha = (Math.random() * 0.5 + 0.2) * positionFactor;
        this.color = `rgba(${140 + Math.floor(Math.random() * 115)}, ${70 + Math.floor(Math.random() * 100)}, ${220 + Math.floor(Math.random() * 35)}, ${alpha})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
        
        // Interact with cursor
        const dx = this.x - cursorRef.current.x;
        const dy = this.y - cursorRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          // Particle grows when near cursor
          this.size = this.baseSize * (1 + (100 - distance) / 100);
        } else {
          this.size = this.baseSize;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles
    const particleArray: Particle[] = [];
    const particleCount = getParticleCount();
    
    for (let i = 0; i < particleCount; i++) {
      particleArray.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw cursor light effect (beneath particles)
      if (cursorRef.current.x && cursorRef.current.y) {
        const gradient = ctx.createRadialGradient(
          cursorRef.current.x, cursorRef.current.y, 10,
          cursorRef.current.x, cursorRef.current.y, 200
        );
        gradient.addColorStop(0, 'rgba(149, 76, 233, 0.25)');
        gradient.addColorStop(0.5, 'rgba(149, 76, 233, 0.08)');
        gradient.addColorStop(1, 'rgba(149, 76, 233, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cursorRef.current.x, cursorRef.current.y, 200, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Draw and update particles
      for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw(ctx);
      }
      
      // Draw connections
      connectParticles(ctx, particleArray);
      
      requestAnimationFrame(animate);
    };

    // Draw connections between particles
    const connectParticles = (ctx: CanvasRenderingContext2D, particles: Particle[]) => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            // Enhanced connection opacity
            const opacity = 0.15 - distance/1500;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(149, 76, 233, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [density, fadeDirection]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
};

export default ParticleBackground;