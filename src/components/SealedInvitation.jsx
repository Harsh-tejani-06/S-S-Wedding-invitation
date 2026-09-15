import { useState, useEffect, useMemo } from 'react';

export default function SealedInvitation({ onOpen }) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    setOpening(true);
    setTimeout(() => onOpen(), 1000);
  };

  // Generate floating petals
  const petals = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${6 + Math.random() * 8}s`,
      animationDelay: `${Math.random() * 5}s`,
      size: `${8 + Math.random() * 10}px`,
    }));
  }, []);

  return (
    <div className={`invitation-screen ${opening ? 'hidden' : ''}`}>
      {/* Background mandala pattern */}
      <div className="invitation-bg-pattern" />

      {/* Floating petals */}
      <div className="invitation-particles">
        {petals.map((p) => (
          <div
            key={p.id}
            className="petal"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDuration: p.animationDuration,
              animationDelay: p.animationDelay,
            }}
          />
        ))}
      </div>

      {/* Invitation Card */}
      <div className={`invitation-card ${opening ? 'opening' : ''}`}>
        {/* Decorative top ornament — using CSS gold divider */}
        <div style={{ marginBottom: '1.5rem' }}>
          <img src={`${import.meta.env.BASE_URL}divider.png`} alt="" className="section-divider" style={{ opacity: 0.4, width: '120px' }} />
        </div>

        {/* Seal */}
        <div className="invitation-seal">
          <img src={`${import.meta.env.BASE_URL}seal.png`} alt="S & S Wedding Seal" />
        </div>

        {/* Names */}
        <h1 className="invitation-names">
          Shilpa
          <span className="invitation-ampersand">&</span>
          Shailesh
        </h1>

        <div className="gold-divider" style={{ margin: '1rem auto' }} />

        {/* Text */}
        <p className="invitation-tagline">Together with their families</p>
        <p className="invitation-subtitle">Invite you to celebrate their wedding</p>

        {/* CTA */}
        <button
          className="invitation-cta"
          onClick={handleOpen}
          aria-label="Open the wedding invitation"
        >
          Open Invitation
        </button>

        {/* Bottom ornament */}
        <div style={{ marginTop: '1.5rem' }}>
          <img src={`${import.meta.env.BASE_URL}divider.png`} alt="" className="section-divider" style={{ opacity: 0.4, width: '120px', transform: 'rotate(180deg)' }} />
        </div>
      </div>
    </div>
  );
}
