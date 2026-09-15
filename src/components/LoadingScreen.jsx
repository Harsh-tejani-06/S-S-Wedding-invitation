import { useState, useEffect } from 'react';

export default function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState('monogram'); // monogram → names → fade
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('names'), 1200);
    const timer2 = setTimeout(() => setPhase('fade'), 2200);
    const timer3 = setTimeout(() => {
      setHidden(true);
      onComplete();
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className={`loading-screen ${hidden ? 'hidden' : ''}`}>
      <div className="loading-monogram">S & S</div>
      {(phase === 'names' || phase === 'fade') && (
        <div className="loading-names">Shailesh & Shilpa</div>
      )}
    </div>
  );
}
