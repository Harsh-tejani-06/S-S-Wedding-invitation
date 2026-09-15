import { useState } from 'react';
import ScrollReveal from './ScrollReveal';

// Placeholder gallery items — replace src with actual photos
const GALLERY_ITEMS = [
  { id: 1, placeholder: true, label: 'Couple Photo' },
  { id: 2, placeholder: true, label: 'Together' },
  { id: 3, placeholder: true, label: 'Pre-Wedding' },
  { id: 4, placeholder: true, label: 'Family' },
  { id: 5, placeholder: true, label: 'Celebration' },
  { id: 6, placeholder: true, label: 'Memories' },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section id="gallery" className="section gallery-section">
      <div className="section-inner">
        <ScrollReveal>
          <div className="section-header">
            <h2 className="heading-section" style={{ color: 'var(--gold)' }}>
              Memories
            </h2>
            <div className="gold-divider gold-divider-wide" />
            <p className="heading-sub" style={{ color: 'var(--champagne)', opacity: 0.7 }}>
              A glimpse of us
            </p>
          </div>
        </ScrollReveal>

        <div className="gallery-grid">
          {GALLERY_ITEMS.map((item, i) => (
            <ScrollReveal key={item.id} delay={(i % 3) + 1}>
              {item.placeholder ? (
                <div className="gallery-placeholder">
                  {item.label}
                </div>
              ) : (
                <div
                  className="gallery-item"
                  onClick={() => setLightbox(item.src)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${item.label}`}
                  onKeyDown={(e) => e.key === 'Enter' && setLightbox(item.src)}
                >
                  <img src={item.src} alt={item.label} loading="lazy" />
                  <div className="gallery-item-overlay" />
                </div>
              )}
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="lightbox open"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-label="Photo lightbox"
        >
          <button
            className="lightbox-close"
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox"
          >
            ✕
          </button>
          <img src={lightbox} alt="Gallery photo" />
        </div>
      )}
    </section>
  );
}
