import { useState, useCallback } from 'react';
import { useScrollProgress } from './hooks/useWedding';
import LoadingScreen from './components/LoadingScreen';
import SealedInvitation from './components/SealedInvitation';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import OurStory from './components/OurStory';
import Celebrations from './components/Celebrations';
import WardrobePlanner from './components/WardrobePlanner';
import Gallery from './components/Gallery';
import FamilyBlessings from './components/FamilyBlessings';
import Venue from './components/Venue';
import MusicControl from './components/MusicControl';
import Footer from './components/Footer';

export default function App() {
  const [phase, setPhase] = useState('loading'); // loading → invitation → website
  const [autoPlayMusic, setAutoPlayMusic] = useState(false);
  const scrollProgress = useScrollProgress();

  const handleLoadingComplete = useCallback(() => {
    setPhase('invitation');
    document.body.classList.add('no-scroll');
  }, []);

  const handleInvitationOpen = useCallback(() => {
    setPhase('website');
    setAutoPlayMusic(true);
    document.body.classList.remove('no-scroll');
  }, []);

  const isWebsite = phase === 'website';

  return (
    <>
      {/* Loading Screen */}
      {phase === 'loading' && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}

      {/* Sealed Invitation */}
      {phase === 'invitation' && (
        <SealedInvitation onOpen={handleInvitationOpen} />
      )}

      {/* Scroll Progress Bar */}
      {isWebsite && (
        <div
          className="scroll-progress"
          style={{ width: `${scrollProgress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(scrollProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Page scroll progress"
        />
      )}

      {/* Navigation */}
      <Navigation visible={isWebsite} />

      {/* Music Control */}
      <MusicControl visible={isWebsite} autoPlay={autoPlayMusic} />

      {/* Main Content */}
      <main style={{ opacity: isWebsite ? 1 : 0, transition: 'opacity 0.8s ease' }}>
        <Hero />
        <Countdown />
        <OurStory />
        <Celebrations />
        <WardrobePlanner />
        <Gallery />
        <FamilyBlessings />
        <Venue />
        <Footer />
      </main>
    </>
  );
}
