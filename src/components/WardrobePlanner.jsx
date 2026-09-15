import ScrollReveal from './ScrollReveal';

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

        <ScrollReveal>
          <div className="wardrobe-actions">
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
