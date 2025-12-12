import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

const PARTICLE_COUNT = 70;
const MAX_DISTANCE = 150;
const PARTICLE_RADIUS = 1.4;
const PARTICLE_SPEED = 0.28;

type ParticleFieldProps = {
  className?: string;
};

export function ParticleField({ className = "" }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let animationFrame: number | null = null;
    let viewWidth = 0;
    let viewHeight = 0;
    let mouse: { x: number; y: number } | null = null;

    const createParticles = (width: number, height: number) => {
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * PARTICLE_SPEED,
        vy: (Math.random() - 0.5) * PARTICLE_SPEED,
      }));
    };

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const prevWidth = viewWidth || width;
      const prevHeight = viewHeight || height;

      viewWidth = width;
      viewHeight = height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (particlesRef.current.length === 0) {
        createParticles(width, height);
        return;
      }

      const scaleX = width / prevWidth;
      const scaleY = height / prevHeight;

      particlesRef.current.forEach((particle) => {
        particle.x *= scaleX;
        particle.y *= scaleY;
      });
    };

    resize();

    /* const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    }; */

    const handleMouseLeave = () => {
      mouse = null;
    };

    //window.addEventListener("mousemove", handleMouseMove);
    //window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, viewWidth, viewHeight);

      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > viewWidth) particle.vx *= -1;
        if (particle.y < 0 || particle.y > viewHeight) particle.vy *= -1;

        particle.x = Math.max(0, Math.min(viewWidth, particle.x));
        particle.y = Math.max(0, Math.min(viewHeight, particle.y));
      });

      particlesRef.current.forEach((particle, index) => {
        ctx.beginPath();
        ctx.fillStyle = "rgba(41, 150, 255, 0.55)";
        ctx.arc(particle.x, particle.y, PARTICLE_RADIUS, 0, Math.PI * 2);
        ctx.fill();

        for (let i = index + 1; i < particlesRef.current.length; i++) {
          const other = particlesRef.current[i];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.hypot(dx, dy);

          if (distance < MAX_DISTANCE) {
            const opacity = 1 - distance / MAX_DISTANCE;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(41, 150, 255, ${opacity * 0.32})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }

        if (mouse) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const distance = Math.hypot(dx, dy);

          if (distance < MAX_DISTANCE) {
            const opacity = 1 - distance / MAX_DISTANCE;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(41, 150, 255, ${opacity * 0.5})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();

            particle.vx += (dx / Math.max(distance, 1)) * 0.003;
            particle.vy += (dy / Math.max(distance, 1)) * 0.003;
          }
        }
      });

      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      //window.removeEventListener("mousemove", handleMouseMove);
      //window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full pointer-events-none ${className}`}
      aria-hidden
    />
  );
}
