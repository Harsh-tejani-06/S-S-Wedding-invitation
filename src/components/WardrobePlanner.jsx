import ScrollReveal from './ScrollReveal';

const WARDROBE_DATA = [
  {
    event: '28 November',
    name: 'Carnival',
    icon: '🎪',
    desc: 'Dress code details will be available in the wardrobe planner.',
  },
  {
    event: '28 November',
    name: 'Sufi Night',
    icon: '🌙',
    desc: 'Dress code details will be available in the wardrobe planner.',
  },
  {
    event: '29 November',
    name: 'Madap Muhurat',
    icon: '🪔',
    desc: 'Dress code details will be available in the wardrobe planner.',
  },
  {
    event: '29 November',
    name: 'Cocktail Party',
    icon: '🥂',
    desc: 'Dress code details will be available in the wardrobe planner.',
  },
  {
    event: '30 November',
    name: 'The Wedding',
    icon: '💍',
    desc: 'Dress code details will be available in the wardrobe planner.',
  },
];

export default function WardrobePlanner() {
  return (
    <section id="wardrobe" className="section wardrobe-section">
      <div className="section-inner">
        <ScrollReveal>
          <div className="section-header">
            <h2 className="heading-section">The Wardrobe Planner</h2>
            <div className="gold-divider gold-divider-wide" />
            <p className="heading-sub">Dress for every celebration</p>
          </div>
        </ScrollReveal>

        <div className="wardrobe-grid">
          {WARDROBE_DATA.map((item, i) => (
            <ScrollReveal key={i} delay={(i % 3) + 1}>
              <div className="wardrobe-card">
                <span className="wardrobe-card-icon" aria-hidden="true">{item.icon}</span>
                <p className="wardrobe-card-event">{item.event}</p>
                <h4 className="wardrobe-card-name">{item.name}</h4>
                <p className="wardrobe-card-desc">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="wardrobe-actions">
            <a
              href="/wardrobe-planner.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              👁 View Wardrobe Planner
            </a>
            <a
              href="/wardrobe-planner.pdf"
              download="SS-Wardrobe-Planner.pdf"
              className="btn-outline"
            >
              ↓ Download Planner
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
