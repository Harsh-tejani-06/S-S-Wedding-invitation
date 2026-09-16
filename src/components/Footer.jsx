import ScrollReveal from './ScrollReveal';

export default function Footer() {
  return (
    <footer className="footer" style={{ position: 'relative', paddingBottom: '2rem' }}>
      <ScrollReveal>
        <img
          src={`${import.meta.env.BASE_URL}logo.jpeg`}
          alt=""
          className="logo-divider logo-footer"
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


      <div style={{
        position: 'absolute',
        bottom: '15px',
        right: '25px',
        fontSize: '2rem',
        fontFamily: 'var(--font-heading)',
        color: 'white',
        letterSpacing: '0.05em',
        opacity: 1
      }}>
        Made by Harsh Tejani
      </div>
    </footer>
  );
}
