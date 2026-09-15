import { STORY_CHAPTERS } from '../data/weddingData';
import ScrollReveal from './ScrollReveal';

export default function OurStory() {
  return (
    <section id="story" className="section section-ivory">
      <div className="section-inner">
        <ScrollReveal>
          <div className="section-header">
            <h2 className="heading-section">Our Story</h2>
            <div className="gold-divider" />
            <p className="heading-sub">A journey written in the stars</p>
          </div>
        </ScrollReveal>

        <div className="story-timeline">
          {STORY_CHAPTERS.map((chapter, i) => (
            <ScrollReveal key={i}>
              <div className="story-item">
                <div className="story-dot" />
                <div className="story-content">
                  <h3>{chapter.title}</h3>
                  <p>{chapter.text}</p>
                  {chapter.placeholder && (
                    <p style={{
                      marginTop: '0.8rem',
                      fontSize: '0.75rem',
                      color: 'var(--text-light)',
                      fontStyle: 'italic',
                      opacity: 0.5
                    }}>
                      ✎ Update with your story
                    </p>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
