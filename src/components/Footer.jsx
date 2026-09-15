import ScrollReveal from './ScrollReveal';

export default function Footer() {
  return (
    <footer className="footer">
      <ScrollReveal>
        <img
          src={`${import.meta.env.BASE_URL}divider.png`}
          alt=""
          className="section-divider"
          style={{ opacity: 0.2, width: '120px' }}
        />
      </ScrollReveal>

      <ScrollReveal delay={1}>
        <h2 className="footer-names">
          Shilpa & Shailesh
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={2}>
        <p className="footer-dates">28 • 29 • 30 November 2026</p>
      </ScrollReveal>

      <ScrollReveal delay={3}>
        <p className="footer-quote">
          "With love, laughter and a lifetime ahead."
        </p>
      </ScrollReveal>

      <div className="gold-divider" style={{ margin: '2rem auto' }} />

      <p className="footer-credit">
        Made with love for our wedding celebration
      </p>
    </footer>
  );
}
