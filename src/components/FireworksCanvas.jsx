import { useEffect, useRef } from 'react';

/**
 * High-performance realistic fireworks celebration engine
 * - Automatic grand celebration fireworks show
 * - Interactive Touch / Click: touching anywhere on the home section bursts firecrackers
 * - Realistic physics: ascending rockets, trails, flashes, gravity, drag, and sparkling particles
 */
export default function FireworksCanvas({ autoLaunch = false }) {
  const canvasRef = useRef(null);
  const triggerCelebrationRef = useRef(null);
  const spawnBurstRef = useRef(null);

  // Palettes for Indian wedding celebration
  const PALETTES = [
    ['#FFD700', '#FFA500', '#FFE600', '#FFF8DC', '#FFFFFF'], // Royal Gold
    ['#FF1744', '#FF5252', '#FF4081', '#F50057', '#FF80AB'], // Crimson Velvet
    ['#00E5FF', '#1DE9B6', '#00B0FF', '#76FF03', '#E0F7FA'], // Emerald & Cyan
    ['#FF6D00', '#FF9100', '#FFAB40', '#FFD180', '#FFF3E0'], // Fiery Amber
    ['#D500F9', '#E040FB', '#EA80FC', '#FF4081', '#FFFFFF'], // Royal Violet
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const rockets = [];
    const particles = [];
    const flashes = [];

    class Rocket {
      constructor(startX, startY, targetX, targetY, palette) {
        this.x = startX;
        this.y = startY;
        this.targetX = targetX;
        this.targetY = targetY;
        this.palette = palette;
        this.color = palette[0];
        this.speed = 15 + Math.random() * 4;
        const angle = Math.atan2(targetY - startY, targetX - startX);
        this.vx = Math.cos(angle) * this.speed;
        this.vy = Math.sin(angle) * this.speed;
        this.trail = [];
        this.maxTrail = 8;
        this.exploded = false;
      }

      update() {
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > this.maxTrail) this.trail.shift();

        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.05; // gravity decel

        // Apex or reached target
        if (this.vy >= -1.5 || this.y <= this.targetY) {
          this.exploded = true;
          this.explode();
        }
      }

      draw() {
        ctx.save();
        ctx.beginPath();
        for (let i = 0; i < this.trail.length; i++) {
          const pt = this.trail[i];
          const progress = i / this.trail.length;
          ctx.strokeStyle = i === this.trail.length - 1 ? '#FFFFFF' : this.color;
          ctx.lineWidth = 1 + progress * 2.5;
          ctx.globalAlpha = progress * 0.85;
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();

        // Rocket head spark
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      }

      explode() {
        // Flash at burst point
        flashes.push({
          x: this.x,
          y: this.y,
          radius: 70,
          color: this.color,
          alpha: 1,
        });

        // Spawn sparks
        const count = 70 + Math.floor(Math.random() * 25);
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 7 + 1.5;
          const color = this.palette[Math.floor(Math.random() * this.palette.length)];
          particles.push(new Particle(this.x, this.y, angle, speed, color));
        }
      }
    }

    class Particle {
      constructor(x, y, angle, speed, color) {
        this.x = x;
        this.y = y;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.color = color;
        this.alpha = 1;
        this.decay = 0.012 + Math.random() * 0.014;
        this.gravity = 0.09;
        this.drag = 0.965;
        this.size = 2 + Math.random() * 2.5;
        this.trail = [];
        this.maxTrail = 4;
        this.flicker = Math.random() > 0.4;
      }

      update() {
        this.trail.push({ x: this.x, y: this.y, alpha: this.alpha });
        if (this.trail.length > this.maxTrail) this.trail.shift();

        this.vx *= this.drag;
        this.vy *= this.drag;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
      }

      draw() {
        if (this.alpha <= 0) return;
        ctx.save();

        // Shimmering tail
        for (let i = 0; i < this.trail.length; i++) {
          const pt = this.trail[i];
          const tAlpha = (i / this.trail.length) * this.alpha * 0.6;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, this.size * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.globalAlpha = tAlpha;
          ctx.fill();
        }

        // Particle core
        const displayAlpha = this.flicker && Math.random() > 0.3 ? this.alpha * 0.6 : this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = displayAlpha;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      }
    }

    // Function to trigger burst at specific point (for touch/click)
    const triggerTouchBurst = (x, y) => {
      const palette = PALETTES[Math.floor(Math.random() * PALETTES.length)];

      // 1. Instant bright flash at touch point
      flashes.push({
        x,
        y,
        radius: 80,
        color: palette[0],
        alpha: 1,
      });

      // 2. Instant radial spark shower under finger
      const count = 60 + Math.floor(Math.random() * 30);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6.5 + 2;
        const color = palette[Math.floor(Math.random() * palette.length)];
        particles.push(new Particle(x, y, angle, speed, color));
      }

      // 3. Launch ascending rocket from bottom towards the touch point
      const startX = x + (Math.random() * 60 - 30);
      rockets.push(new Rocket(startX, height + 10, x, y, palette));
    };

    spawnBurstRef.current = triggerTouchBurst;

    // Automatic Grand Celebration Show
    let activeTimeouts = [];
    const triggerCelebration = () => {
      const launchSchedule = [
        { delay: 100, xPct: 0.22, targetYPct: 0.28, pal: 0 },
        { delay: 400, xPct: 0.78, targetYPct: 0.22, pal: 1 },
        { delay: 750, xPct: 0.38, targetYPct: 0.35, pal: 3 },
        { delay: 1100, xPct: 0.82, targetYPct: 0.30, pal: 2 },
        { delay: 1500, xPct: 0.50, targetYPct: 0.18, pal: 0 }, // High center
        { delay: 1900, xPct: 0.28, targetYPct: 0.25, pal: 4 }, // Royal violet
        { delay: 2350, xPct: 0.44, targetYPct: 0.20, pal: 0 }, // Grand finale left
        { delay: 2400, xPct: 0.56, targetYPct: 0.22, pal: 1 }, // Grand finale right
      ];

      activeTimeouts = launchSchedule.map((item) => {
        return setTimeout(() => {
          const startX = item.xPct * width + (Math.random() * 40 - 20);
          const targetX = item.xPct * width + (Math.random() * 60 - 30);
          const targetY = item.targetYPct * height;
          const palette = PALETTES[item.pal % PALETTES.length];
          rockets.push(new Rocket(startX, height + 10, targetX, targetY, palette));
        }, item.delay);
      });
    };

    triggerCelebrationRef.current = triggerCelebration;

    // ─── Touch / Click event on Home Page ───
    const handlePointerDown = (e) => {
      const heroEl = document.getElementById('home');
      if (!heroEl) return;
      const rect = heroEl.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;
      if (clientX === undefined || clientY === undefined) return;

      // Only trigger if touch/click is within the home section viewport
      if (clientY < rect.top || clientY > rect.bottom) return;

      // Do not intercept interactive buttons, links, or navigation
      if (
        e.target &&
        (e.target.closest('button') ||
          e.target.closest('a') ||
          e.target.closest('nav') ||
          e.target.closest('.navigation'))
      ) {
        return;
      }

      triggerTouchBurst(clientX, clientY);
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    // Animation Loop
    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Flashes
      for (let i = flashes.length - 1; i >= 0; i--) {
        const f = flashes[i];
        f.alpha -= 0.08;
        if (f.alpha <= 0) {
          flashes.splice(i, 1);
          continue;
        }
        ctx.save();
        const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius);
        grad.addColorStop(0, '#FFFFFF');
        grad.addColorStop(0.4, f.color);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.globalAlpha = f.alpha * 0.7;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 2. Rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.update();
        r.draw();
        if (r.exploded) {
          rockets.splice(i, 1);
        }
      }

      // 3. Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();
        if (p.alpha <= 0) {
          particles.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointerdown', handlePointerDown);
      cancelAnimationFrame(animId);
      activeTimeouts.forEach((t) => clearTimeout(t));
    };
  }, []);

  // Trigger celebration when autoLaunch prop becomes true
  const hasLaunchedRef = useRef(false);
  useEffect(() => {
    if (autoLaunch && !hasLaunchedRef.current) {
      hasLaunchedRef.current = true;
      if (triggerCelebrationRef.current) {
        triggerCelebrationRef.current();
      }
    }
  }, [autoLaunch]);

  return (
    <canvas
      ref={canvasRef}
      className="fireworks-celebration-canvas"
      aria-hidden="true"
    />
  );
}
