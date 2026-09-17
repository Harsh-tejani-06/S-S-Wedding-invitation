import { useState } from 'react';
import { WEDDING_DAYS } from '../data/weddingData';
import ScrollReveal from './ScrollReveal';

const getEventIcon = (id) => {
  switch (id) {
    case 'carnival':
      return (
        <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="8"></circle>
          <path d="M12 12v10"></path>
          <path d="M12 12l5 8"></path>
          <path d="M12 12l-5 8"></path>
          <path d="M12 4v2"></path>
          <path d="M17.6 6.4l-1.4 1.4"></path>
          <path d="M20 12h-2"></path>
          <path d="M17.6 17.6l-1.4-1.4"></path>
          <path d="M6.4 17.6l1.4-1.4"></path>
          <path d="M4 12h2"></path>
          <path d="M6.4 6.4l1.4 1.4"></path>
        </svg>
      );
    case 'sufi-night':
      return (
        <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18V5l12-2v13"></path>
          <circle cx="6" cy="18" r="3"></circle>
          <circle cx="18" cy="16" r="3"></circle>
        </svg>
      );
    case 'madap-muhurat':
      return (
        <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2c-3.3 0-6 2.7-6 6 0 1.9 1.1 3.5 2.6 4.6l.4 6.4h6l.4-6.4c1.5-1.1 2.6-2.7 2.6-4.6 0-3.3-2.7-6-6-6z"></path>
          <path d="M12 2s-1 3-1 4c0 1 1 2 1 2s1-1 1-2c0-1-1-4-1-4z"></path>
          <path d="M7 19h10v3H7z"></path>
        </svg>
      );
    case 'cocktail-party':
      return (
        <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 22h8"></path>
          <path d="M12 11v11"></path>
          <path d="M3 3l18 0l-9 8z"></path>
        </svg>
      );
    case 'wedding':
      return (
        <svg viewBox="0 0 24 24" width="32" height="500" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="12" r="5"></circle>
          <circle cx="15" cy="12" r="5"></circle>
          <path d="M10.5 7.5l-1-2h3l-1 2"></path>
        </svg>
      );
    default:
      return null;
  }
};

const getEventImage = (id) => {
  switch (id) {
    case 'carnival': return './Haldi.jpeg';
    case 'sufi-night': return './Sufi.jpg';
    case 'madap-muhurat': return './Mandap.jpg';
    case 'cocktail-party': return './cocktail.jpg';
    case 'wedding': return './Merrige.png';
    default: return null;
  }
};

const getOutfitImage = (id) => {
  switch (id) {
    case 'carnival': return './Outfit-carnival.png';
    case 'sufi-night': return './outfit-sufinight.png';
    case 'madap-muhurat': return './outfit-mandap.png';
    case 'cocktail-party': return './outfit-cocktail.png';
    case 'wedding': return './outfit-merrige.png';
    default: return null;
  }
};

export default function Celebrations() {
  return (
    <section id="celebrations" className="section celebrations-section">
      {/* Background elements */}
      <div className="celebrations-bg-texture" />
      <div className="celebrations-bg-particles" />

      <div className="section-inner celebrations-inner">
        <ScrollReveal>
          <div className="celebrations-header">
            <h2 className="heading-section">The Wedding Celebrations</h2>
            <div className="title-divider">──────── ✦ ────────</div>
            <p className="heading-sub">Three Days • One Beautiful Journey</p>
          </div>
        </ScrollReveal>

        {WEDDING_DAYS.map((day, di) => (
          <div key={di} className="day-block">
            {di > 0 && (
              <ScrollReveal>
                <div className="day-transition">
                  <div className="day-transition-line" />
                  <span className="day-transition-ornament">✦</span>
                  <div className="day-transition-line" />
                </div>
              </ScrollReveal>
            )}

            <ScrollReveal>
              <div className="day-header">
                <p className="day-label">{day.day}</p>
                <h3 className="day-date">{day.date}</h3>
                <div className="day-divider"></div>
              </div>
            </ScrollReveal>

            <div className={`events-grid ${day.events.length === 1 ? 'single-event' : ''}`}>
              {day.events.map((event, ei) => (
                <ScrollReveal key={event.id} delay={ei + 1}>
                  <EventCard event={event} dayDate={day.dateShort} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function EventCard({ event, dayDate }) {
  const [showOutfit, setShowOutfit] = useState(false);
  const bgImage = getEventImage(event.id);
  const outfitImage = getOutfitImage(event.id);
  
  let bgPos = 'center';
  if (event.id === 'cocktail-party') bgPos = 'center 25%';
  if (event.id === 'wedding') bgPos = 'center 25%';

  const cardStyle = bgImage ? {
    backgroundImage: `linear-gradient(to bottom, rgba(20, 15, 10, 0.25), rgba(20, 15, 10, 0.65)), url('${bgImage}')`,
    backgroundSize: 'cover',
    backgroundPosition: bgPos
  } : {};

  return (
    <div className={`event-card event-card-${event.id} ${event.featured ? 'featured' : ''}`} style={cardStyle}>
      <div className="event-card-particles" />
      <div className="event-card-glow" />

      <div className="event-card-content">
        {showOutfit ? (
          <div className="outfit-view" style={{ textAlign: 'center', animation: 'fadeIn 0.5s ease forwards' }}>
            <img 
              src={outfitImage} 
              alt={`${event.name} outfit`} 
              style={{ 
                width: '100%', 
                maxHeight: '50vh',
                objectFit: 'contain',
                borderRadius: '8px', 
                marginBottom: '1rem', 
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)' 
              }} 
            />
            <button onClick={() => setShowOutfit(false)} style={{ 
              fontSize: '0.9rem', 
              padding: '0.6rem 1.2rem',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              color: '#3D0F10',
              border: 'none',
              borderRadius: '25px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
            }}>
              Close Outfit Plan
            </button>
          </div>
        ) : (
          <>
            <span className="event-card-icon" aria-hidden="true">
              {getEventIcon(event.id)}
            </span>
            <p className="event-card-date">{dayDate}</p>
            <h4 className="event-card-name">{event.name}</h4>
            <p className="event-card-time">{event.time}</p>

            <div className="event-card-divider" />

            <p className="event-card-desc">{event.description}</p>
            {event.venue && (
              <p className="event-card-venue">📍 {event.venue}</p>
            )}
            
            {outfitImage && (
              <button 
                onClick={() => setShowOutfit(true)}
                style={{ 
                  marginTop: '1.5rem', 
                  fontSize: '0.95rem', 
                  padding: '0.6rem 1.2rem',
                  backgroundColor: '#C9A84C',
                  color: '#2A2420',
                  border: 'none',
                  borderRadius: '25px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                }}
              >
                👗 Show outfit plan
              </button>
            )}
          </>
        )}
      </div>
      {/* Decorative corners */}
      <span className="corner top-left"></span>
      <span className="corner top-right"></span>
      <span className="corner bottom-left"></span>
      <span className="corner bottom-right"></span>
    </div>
  );
}
