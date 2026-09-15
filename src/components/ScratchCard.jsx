import { useRef, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

export default function ScratchCard({ children }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isScratched, setIsScratched] = useState(false);
  const isDrawing = useRef(false);
  const scratchCount = useRef(0);
  const hasMoved = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    // Set up canvas size
    const resizeCanvas = () => {
      const parent = containerRef.current;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;

      // Fill canvas with gold color
      ctx.fillStyle = '#C9A84C';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw text
      ctx.fillStyle = '#3D0F10';
      ctx.font = 'bold 32px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Scratch to Reveal', canvas.width / 2, canvas.height / 2);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Scratching logic
    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = (e.touches && e.touches.length > 0) ? e.touches[0].clientX : e.clientX;
      const clientY = (e.touches && e.touches.length > 0) ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const scratch = (e) => {
      if (!isDrawing.current) return;
      e.preventDefault();

      hasMoved.current = true;

      const { x, y } = getPos(e);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 300, 0, Math.PI * 20000);
      
      ctx.fill();
    };

    const down = (e) => { 
      isDrawing.current = true; 
      hasMoved.current = false;
      scratch(e); 
    };

    const up = () => { 
      if (isDrawing.current && hasMoved.current) {
        scratchCount.current += 1;
        if (scratchCount.current >= 3 && !isScratched) {
          setIsScratched(true);
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#C9A84C', '#D4B96A', '#E8D48B']
          });
        }
      }
      isDrawing.current = false; 
    };

    canvas.addEventListener('mousedown', down);
    canvas.addEventListener('mousemove', scratch);
    window.addEventListener('mouseup', up);

    canvas.addEventListener('touchstart', down, { passive: false });
    canvas.addEventListener('touchmove', scratch, { passive: false });
    window.addEventListener('touchend', up);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousedown', down);
      canvas.removeEventListener('mousemove', scratch);
      window.removeEventListener('mouseup', up);

      canvas.removeEventListener('touchstart', down);
      canvas.removeEventListener('touchmove', scratch);
      window.removeEventListener('touchend', up);
    };
  }, [isScratched]);

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
      {children}
      {!isScratched && (
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            cursor: 'pointer',
            borderRadius: '8px',
            touchAction: 'none',
            zIndex: 10
          }}
        />
      )}
    </div>
  );
}
