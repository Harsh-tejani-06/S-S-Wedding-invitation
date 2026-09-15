import { useState } from 'react';
import ScrollReveal from './ScrollReveal';

const EVENT_OPTIONS = [
  'Carnival',
  'Sufi Night',
  'Madap Muhurat',
  'Cocktail Party',
  'Wedding',
];

export default function RSVP() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    guests: '1',
    events: [],
    dietary: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEventToggle = (event) => {
    setFormData((prev) => ({
      ...prev,
      events: prev.events.includes(event)
        ? prev.events.filter((e) => e !== event)
        : [...prev.events, event],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Frontend-only: log data, ready for backend integration
    console.log('RSVP Submitted:', formData);
    setSubmitted(true);
  };

  return (
    <section id="rsvp" className="section rsvp-section">
      <div className="section-inner">
        <ScrollReveal>
          <div className="section-header">
            <h2 className="heading-section" style={{ color: 'var(--gold)' }}>
              RSVP
            </h2>
            <div className="gold-divider gold-divider-wide" />
            <p className="heading-sub" style={{ color: 'var(--champagne)', opacity: 0.7 }}>
              We would be delighted to celebrate these moments with you
            </p>
          </div>
        </ScrollReveal>

        {submitted ? (
          <div className="rsvp-success">
            <span className="rsvp-success-icon">🎉</span>
            <h3>Thank You!</h3>
            <p>We can't wait to celebrate with you.</p>
            <div className="gold-divider" style={{ marginTop: '1.5rem' }} />
          </div>
        ) : (
          <ScrollReveal>
            <form className="rsvp-form" onSubmit={handleSubmit}>
              <div className="rsvp-field">
                <label htmlFor="rsvp-name">Your Name</label>
                <input
                  id="rsvp-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="rsvp-field">
                <label htmlFor="rsvp-guests">Number of Guests</label>
                <select
                  id="rsvp-guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="rsvp-field">
                <label>Which Events Will You Attend?</label>
                <div className="rsvp-checkboxes">
                  {EVENT_OPTIONS.map((event) => (
                    <label key={event} className="rsvp-checkbox">
                      <input
                        type="checkbox"
                        checked={formData.events.includes(event)}
                        onChange={() => handleEventToggle(event)}
                      />
                      {event}
                    </label>
                  ))}
                </div>
              </div>

              <div className="rsvp-field">
                <label htmlFor="rsvp-dietary">Dietary Preferences</label>
                <input
                  id="rsvp-dietary"
                  type="text"
                  name="dietary"
                  value={formData.dietary}
                  onChange={handleChange}
                  placeholder="Any dietary requirements?"
                />
              </div>

              <div className="rsvp-field">
                <label htmlFor="rsvp-message">Your Message</label>
                <textarea
                  id="rsvp-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share your wishes for the couple..."
                  rows={4}
                />
              </div>

              <button type="submit" className="btn-gold rsvp-submit">
                Send RSVP
              </button>
            </form>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
