import { useState } from 'react';
import GoldParticles from './GoldParticles';
import ScrollReveal from './ScrollReveal';

export default function Hero() {
  const [logoError, setLogoError] = useState(false);

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

      {/* Content */}
      <div className="hero-content">
        <ScrollReveal>
          <div className="hero-logo rotating bright">
            {logoError ? (
              <span className="hero-logo-fallback">S & S</span>
            ) : (
              <img
                src={`${import.meta.env.BASE_URL}S&S.jpeg`}
                alt="Shailesh & Shilpa monogram"
                onError={() => setLogoError(true)}
              />
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
