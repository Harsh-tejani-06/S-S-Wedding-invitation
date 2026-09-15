import { WEDDING_DAYS } from '../data/weddingData';
import ScrollReveal from './ScrollReveal';

export default function Venue() {
  const allEvents = WEDDING_DAYS.flatMap((day) =>
    day.events.map((event) => ({
      ...event,
      dayDate: day.date,
    }))
  );

  return (
    <section id="venue" className="section venue-section">
      <div className="section-inner">
        <ScrollReveal>
          <div className="section-header">
            <h2 className="heading-section">Where We Celebrate</h2>
            <div className="gold-divider gold-divider-wide" />
            <p className="heading-sub">Venue details coming soon</p>
          </div>
        </ScrollReveal>

        <div className="venue-grid">
          {allEvents.map((event, i) => (
            <ScrollReveal key={event.id} delay={(i % 3) + 1}>
              <div className="venue-card">
                <span className="event-card-icon" aria-hidden="true" style={{ fontSize: '1.5rem' }}>
                  {event.icon}
                </span>
                <p className="venue-card-event">{event.dayDate}</p>
                <h4 className="venue-card-name">{event.name}</h4>
                <p className="venue-card-address">
                  {event.venue || 'Venue to be announced'}
                </p>
                {event.venueAddress && (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venueAddress)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                    style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}
                  >
                    📍 View on Map
                  </a>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
