import { useScrollReveal } from '../hooks/useWedding';

export default function ScrollReveal({ children, className = '', delay = 0 }) {
  const [ref, isRevealed] = useScrollReveal(0.15);

  return (
    <div
      ref={ref}
      className={`reveal ${isRevealed ? 'revealed' : ''} ${delay ? `reveal-delay-${delay}` : ''} ${className}`}
    >
      {children}
    </div>
  );
}
