import ScrollReveal from './ScrollReveal';

export default function FamilyBlessings() {
  return (
    <section id="family" className="section family-section">
      <div className="section-inner">
        <ScrollReveal>
          <div className="section-header">
            <h2 className="heading-section">
              With the Blessings of Our Families
            </h2>
            <div className="gold-divider gold-divider-wide" />
          </div>
        </ScrollReveal>

        <div className="family-grid">
          <ScrollReveal delay={1}>
            <div className="family-card">
              <span className="family-icon" aria-hidden="true">🪷</span>
              <h3>Bride's Family</h3>
              <div className="gold-divider" style={{ margin: '1rem auto' }} />
              <p>Family names to be added</p>
              <p style={{
                marginTop: '0.5rem',
                fontSize: '0.75rem',
                color: 'var(--text-light)',
                opacity: 0.5,
                fontStyle: 'normal'
              }}>
                ✎ Update with family details
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <div className="family-card">
              <span className="family-icon" aria-hidden="true">🔱</span>
              <h3>Groom's Family</h3>
              <div className="gold-divider" style={{ margin: '1rem auto' }} />
              <p>Family names to be added</p>
              <p style={{
                marginTop: '0.5rem',
                fontSize: '0.75rem',
                color: 'var(--text-light)',
                opacity: 0.5,
                fontStyle: 'normal'
              }}>
                ✎ Update with family details
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
