import { useState, useMemo } from 'react';

export default function SealedInvitation({ onOpen }) {
  const [sealBreaking, setSealBreaking] = useState(false);
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    // Phase 1: Break the seal
    setSealBreaking(true);

    // Phase 2: After seal breaks, open the card
    setTimeout(() => {
      setOpening(true);
    }, 900);

    // Phase 3: Transition to main website
    setTimeout(() => onOpen(), 1800);
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

        {/* Seal with breaking animation */}
        <div className={`invitation-seal ${sealBreaking ? 'breaking' : ''}`}>
          {/* Glow burst behind seal */}
          <div className="seal-glow-burst" />
          {/* Left half of seal */}
          <div className="seal-half seal-half-left">
            <img src={`${import.meta.env.BASE_URL}seal.png`} alt="" />
          </div>
          {/* Right half of seal */}
          <div className="seal-half seal-half-right">
            <img src={`${import.meta.env.BASE_URL}seal.png`} alt="" />
          </div>
          {/* Full seal (visible before break) */}
          <img
            className="seal-full"
            src={`${import.meta.env.BASE_URL}seal.png`}
            alt="S & S Wedding Seal"
          />
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
          disabled={sealBreaking}
          aria-label="Open the wedding invitation"
        >
          Open Invitation
        </button>


      </div>
    </div>
  );
}
