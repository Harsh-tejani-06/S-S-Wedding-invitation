import { WEDDING_DAYS } from '../data/weddingData';
import ScrollReveal from './ScrollReveal';

export default function Celebrations() {
  return (
    <section id="celebrations" className="section celebrations-section">
      <div className="section-inner">
        <ScrollReveal>
          <div className="section-header">
            <h2 className="heading-section">The Wedding Celebrations</h2>
            <div className="gold-divider gold-divider-wide" />
            <p className="heading-sub">Three Days • One Beautiful Journey</p>
          </div>
        </ScrollReveal>

        {WEDDING_DAYS.map((day, di) => (
          <div key={di} className="day-block">
            <ScrollReveal>
              <div className="day-header">
                <p className="day-label">{day.day}</p>
                <h3 className="day-date">{day.date}</h3>
                <div className="gold-divider" style={{ marginTop: '1rem' }} />
              </div>
            </ScrollReveal>

            <div className="events-grid">
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
  return (
    <div className={`event-card ${event.featured ? 'featured' : ''}`}>
      <span className="event-card-icon" aria-hidden="true">
        {event.icon}
      </span>
      <p className="event-card-date">{dayDate}</p>
      <h4 className="event-card-name">{event.name}</h4>
      <p className="event-card-time">{event.time}</p>
      <p className="event-card-desc">{event.description}</p>
      {event.venue && (
        <p className="event-card-venue">📍 {event.venue}</p>
      )}
    </div>
  );
}
