import { useState, useCallback } from 'react';
import { useScrollProgress } from './hooks/useWedding';
import LoadingScreen from './components/LoadingScreen';
import SealedInvitation from './components/SealedInvitation';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import Celebrations from './components/Celebrations';
import WardrobePlanner from './components/WardrobePlanner';
import Venue from './components/Venue';
import Footer from './components/Footer';
import { useRef } from 'react';

export default function App() {
  const [phase, setPhase] = useState('loading'); // loading → invitation → website
  const scrollProgress = useScrollProgress();
  const audioRef = useRef(null);

  const handleLoadingComplete = useCallback(() => {
    setPhase('invitation');
    document.body.classList.add('no-scroll');
  }, []);

  const handleInvitationOpen = useCallback(() => {
    setPhase('website');
    document.body.classList.remove('no-scroll');
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio autoplay prevented', e));
    }
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

      {/* Main Content */}
      <main style={{ opacity: isWebsite ? 1 : 0, transition: 'opacity 0.8s ease' }}>
        <Hero />
        <Countdown />
        <Celebrations />
        <WardrobePlanner />
        <Venue />
        <Footer />
      </main>

      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}Background-Music.mp3`} loop preload="auto" />
    </>
  );
}
