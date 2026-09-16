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
          </div>
        </ScrollReveal>

        {/* ── Common Celebration Venue ── */}
        <ScrollReveal delay={2}>
          <div className="common-venue-section">
            <div className="gold-divider gold-divider-wide" style={{ margin: '0rem auto 2rem' }} />
            
            <div className="common-venue-card">
              <div className="common-venue-icon">📍</div>
              <h3 className="common-venue-title">Celebration Venue</h3>
              <p className="common-venue-subtitle">
                All ceremonies & celebrations will be held at one beautiful location
              </p>

              <div className="common-venue-map-wrapper">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.2!2d72.83!3d21.17!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDEwJzEyLjAiTiA3MsKwNDknNDguMCJF!5e0!3m2!1sen!2sin!4v1600000000000"
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Celebration Venue Location"
                />
              </div>

              <a
                href="https://maps.app.goo.gl/CXA1YReHEmTs69EA6"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold common-venue-btn"
              >
                🗺️ Get Directions
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
