import { useState, useEffect, useMemo } from 'react';
import GoldParticles from './GoldParticles';
import ScrollReveal from './ScrollReveal';
import FireworksCanvas from './FireworksCanvas';

export default function Hero({ isVisible }) {
  const [logoError, setLogoError] = useState(false);
  const [photoRevealed, setPhotoRevealed] = useState(false);
  const [celebrationMode, setCelebrationMode] = useState(false);

  // Trigger sequence AFTER invitation seal opens (isVisible becomes true)
  useEffect(() => {
    if (!isVisible) return;

    // Phase 1: Photo slides from above into static circle
    const slideTimer = setTimeout(() => {
      setPhotoRevealed(true);
    }, 300);

    // Phase 2: As soon as photo finishes fitting into circle (~1.35s), trigger celebration!
    const celebTimer = setTimeout(() => {
      setCelebrationMode(true);
    }, 1350);

    return () => {
      clearTimeout(slideTimer);
      clearTimeout(celebTimer);
    };
  }, [isVisible]);

  // Generate 42 red rose petals for celebration burst & shower
  const rosePetals = useMemo(() => {
    return Array.from({ length: 42 }, (_, i) => {
      const angle = (i / 42) * 360 + (Math.random() * 20 - 10);
      const rad = (angle * Math.PI) / 180;
      const burstDist = 120 + Math.random() * 220;
      const fallDist = 180 + Math.random() * 300;
      const petalHues = [350, 355, 0, 5, 340, 345];
      const hue = petalHues[i % petalHues.length];
      return {
        id: i,
        burstX: Math.cos(rad) * burstDist,
        burstY: Math.sin(rad) * burstDist,
        fallY: Math.sin(rad) * burstDist + fallDist,
        driftX: Math.cos(rad) * burstDist + (Math.random() * 70 - 35),
        rotation: Math.random() * 720 - 360,
        scale: 0.75 + Math.random() * 0.55,
        delay: Math.random() * 0.3,
        duration: 2.5 + Math.random() * 1.2,
        hue,
        lightness: 38 + Math.random() * 20,
        size: 14 + Math.random() * 16,
      };
    });
  }, []);

  return (
    <section id="home" className="hero">
      {/* Background */}
      <div className="hero-bg">
        <img src={`${import.meta.env.BASE_URL}palace.png`} alt="" aria-hidden="true" />
      </div>
      <div className="hero-overlay" />

      {/* Slow spinning mandala */}
      <img src={`${import.meta.env.BASE_URL}mandala.png`} alt="" className="hero-mandala" aria-hidden="true" />

      {/* Gold particles */}
      <GoldParticles />

      {/* Fire Crackers Celebration Canvas with Touch/Click Burst on Home Page */}
      {isVisible && <FireworksCanvas autoLaunch={celebrationMode} />}

      {/* Content */}
      <div className="hero-content">
        <ScrollReveal>
          <div className="hero-photo-wrapper">
            {/* Clean static circular photo frame — NO golden circular border */}
            <div className="hero-static-circle">
              {/* Inner sliding photo container - starts from above and fills down */}
              <div className={`hero-photo-slide ${photoRevealed ? 'fitted' : ''}`}>
                {logoError ? (
                  <span className="hero-logo-fallback">S & S</span>
                ) : (
                  <img
                    src={`${import.meta.env.BASE_URL}S&S.jpeg`}
                    alt="Shailesh & Shilpa"
                    className="hero-couple-img"
                    onError={() => setLogoError(true)}
                  />
                )}
              </div>
            </div>

            {/* Red Rose Petals Burst & Shower originating from circle */}
            {celebrationMode && (
              <div className="rose-petals-shower" aria-hidden="true">
                {rosePetals.map((p) => (
                  <div
                    key={p.id}
                    className="rose-petal-item"
                    style={{
                      '--bx': `${p.burstX}px`,
                      '--by': `${p.burstY}px`,
                      '--fx': `${p.driftX}px`,
                      '--fy': `${p.fallY}px`,
                      '--rot': `${p.rotation}deg`,
                      '--scale': p.scale,
                      '--delay': `${p.delay}s`,
                      '--dur': `${p.duration}s`,
                      '--hue': p.hue,
                      '--light': `${p.lightness}%`,
                      '--size': `${p.size}px`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <h1 className="hero-names">
            Shilpa
            <span className="hero-ampersand">&</span>
            Shailesh
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={2}>
          <p className="hero-dates">28 • 29 • 30 November 2026</p>
        </ScrollReveal>

        <ScrollReveal delay={3}>
          <p className="hero-tagline">
            A Three-Day Celebration of Love, Family & Forever
          </p>
        </ScrollReveal>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator">
        <span />
      </div>
    </section>
  );
}
