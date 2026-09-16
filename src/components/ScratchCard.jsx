import { useRef, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

/**
 * ScratchCard Component
 * - Reduced scratch radius (~26px) for authentic coin scratching
 * - Bursts into confetti and reveals countdown after exactly 3 scratches
 * - Supports both lift-and-scratch and continuous scrubbing gestures
 * - High-DPI crisp rendering on all screens
 */
export default function ScratchCard({ children }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isScratched, setIsScratched] = useState(false);
  const [isBursting, setIsBursting] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || isScratched) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let burstTriggered = false;
    let scratchCount = 0;
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let strokeDistance = 0;
    const STROKE_SEGMENT_THRESHOLD = 75; // ~75px of movement counts as a scratch stroke

    // Set up canvas with DPI scaling
    const setupCanvas = () => {
      if (!container || !canvas || isScratched) return;
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);

      if (w === 0 || h === 0) return;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.resetTransform();
      ctx.scale(dpr, dpr);

      drawGoldCover(w, h);
    };

    const drawGoldCover = (w, h) => {
      // Luxurious metallic gold gradient
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#B8860B');
      grad.addColorStop(0.2, '#E6CA65');
      grad.addColorStop(0.4, '#FCF5DC');
      grad.addColorStop(0.65, '#D4AF37');
      grad.addColorStop(0.85, '#AA7C11');
      grad.addColorStop(1, '#805A00');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Delicate inner decorative border
      ctx.strokeStyle = 'rgba(61, 15, 16, 0.35)';
      ctx.lineWidth = 2;
      ctx.strokeRect(8, 8, w - 16, h - 16);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = 1;
      ctx.strokeRect(12, 12, w - 24, h - 24);

      // Elegant Wedding Typography
      ctx.fillStyle = '#3D0F10';
      const fontSize = Math.max(16, Math.min(24, Math.round(w / 24)));
      ctx.font = `bold ${fontSize}px "Cinzel", "Playfair Display", Georgia, serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✨ Scratch to Reveal Countdown ✨', w / 2, h / 2 - 12);

      ctx.fillStyle = 'rgba(61, 15, 16, 0.8)';
      ctx.font = '500 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText('Scratch 3 times to unlock', w / 2, h / 2 + 18);
    };

    setupCanvas();
    window.addEventListener('resize', setupCanvas);

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const triggerBurst = () => {
      if (burstTriggered) return;
      burstTriggered = true;
      setIsBursting(true);

      // Grand Multi-Stage Confetti Burst
      // 1. Center explosion
      confetti({
        particleCount: 130,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#D4B96A', '#FF2A5F', '#FFFFFF'],
      });

      // 2. Left side burst
      setTimeout(() => {
        confetti({
          particleCount: 75,
          angle: 60,
          spread: 60,
          origin: { x: 0.1, y: 0.7 },
          colors: ['#FFD700', '#FF1744', '#FFE600', '#FFF'],
        });
      }, 140);

      // 3. Right side burst
      setTimeout(() => {
        confetti({
          particleCount: 75,
          angle: 120,
          spread: 60,
          origin: { x: 0.9, y: 0.7 },
          colors: ['#FFD700', '#FF1744', '#FFE600', '#FFF'],
        });
      }, 280);

      // Complete reveal after burst animation
      setTimeout(() => {
        setIsScratched(true);
      }, 450);
    };

    // Realistic coin scratch with reduced radius (radius: ~26px, diameter: ~52px)
    const scratchAt = (x, y) => {
      ctx.globalCompositeOperation = 'destination-out';

      // Dab circle at point
      ctx.beginPath();
      ctx.arc(x, y, 26, 0, Math.PI * 2);
      ctx.fill();

      // Connect line between movements for gapless smooth scratching
      if (lastX !== 0 || lastY !== 0) {
        ctx.lineWidth = 52;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();

        const dist = Math.hypot(x - lastX, y - lastY);
        strokeDistance += dist;

        // Continuous scrubbing counts as additional scratches every ~75px
        if (strokeDistance >= STROKE_SEGMENT_THRESHOLD) {
          scratchCount += 1;
          strokeDistance = 0;
          if (scratchCount >= 3) {
            triggerBurst();
          }
        }
      }

      lastX = x;
      lastY = y;
    };

    const handleDown = (e) => {
      if (burstTriggered) return;
      isDrawing = true;
      strokeDistance = 0;
      const pos = getPos(e);
      lastX = pos.x;
      lastY = pos.y;
      scratchAt(pos.x, pos.y);
    };

    const handleMove = (e) => {
      if (!isDrawing || burstTriggered) return;
      if (e.cancelable) e.preventDefault();
      const pos = getPos(e);
      scratchAt(pos.x, pos.y);
    };

    const handleUp = () => {
      if (isDrawing && !burstTriggered) {
        // If user made a scratch stroke before lifting
        if (strokeDistance > 15) {
          scratchCount += 1;
          strokeDistance = 0;
          if (scratchCount >= 3) {
            triggerBurst();
          }
        }
      }
      isDrawing = false;
      lastX = 0;
      lastY = 0;
    };

    // Event listeners
    canvas.addEventListener('mousedown', handleDown);
    canvas.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);

    canvas.addEventListener('touchstart', handleDown, { passive: true });
    canvas.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleUp);
    window.addEventListener('touchcancel', handleUp);

    return () => {
      window.removeEventListener('resize', setupCanvas);
      canvas.removeEventListener('mousedown', handleDown);
      canvas.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);

      canvas.removeEventListener('touchstart', handleDown);
      canvas.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
      window.removeEventListener('touchcancel', handleUp);
    };
  }, [isScratched]);

  return (
    <div
      ref={containerRef}
      className="scratch-card-wrapper"
      style={{
        position: 'relative',
        display: 'inline-block',
        width: '100%',
        maxWidth: '750px',
        margin: '0 auto',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      <div className={isScratched ? 'scratch-card-revealed' : ''}>
        {children}
      </div>

      {!isScratched && (
        <canvas
          ref={canvasRef}
          className={`scratch-card-canvas ${isBursting ? 'bursting' : ''}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            cursor: 'pointer',
            borderRadius: '12px',
            touchAction: 'none',
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
}
