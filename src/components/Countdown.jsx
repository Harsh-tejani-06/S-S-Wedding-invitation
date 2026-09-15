import { useCountdown } from '../hooks/useWedding';
import ScrollReveal from './ScrollReveal';
import ScratchCard from './ScratchCard';

export default function Countdown() {
  const { days, hours, minutes, seconds, complete } = useCountdown();

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <section className="countdown-section">
      <div className="section-inner">
        <ScrollReveal>
          <p className="countdown-label">The Big Day</p>
          <h2 className="countdown-date">30 November 2026</h2>
        </ScrollReveal>

        <ScrollReveal delay={1}>
          {complete ? (
            <p className="countdown-complete">
              "Today, two hearts become one."
            </p>
          ) : (
            <ScratchCard>
              <div className="countdown-grid" style={{ padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                <CountdownUnit value={days} label="Days" />
                <span className="countdown-separator">:</span>
                <CountdownUnit value={hours} label="Hours" />
                <span className="countdown-separator">:</span>
                <CountdownUnit value={minutes} label="Minutes" />
                <span className="countdown-separator">:</span>
                <CountdownUnit value={seconds} label="Seconds" />
              </div>
            </ScratchCard>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}

function CountdownUnit({ value, label }) {
  return (
    <div className="countdown-unit">
      <span className="countdown-number">{String(value).padStart(2, '0')}</span>
      <span className="countdown-text">{label}</span>
    </div>
  );
}
