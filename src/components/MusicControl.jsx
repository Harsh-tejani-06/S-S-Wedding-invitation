import { useState, useRef, useEffect } from 'react';

export default function MusicControl({ visible, autoPlay }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  // Auto-play music when invitation is opened
  useEffect(() => {
    if (autoPlay && audioRef.current && !playing) {
      audioRef.current.play().then(() => {
        setPlaying(true);
      }).catch(() => {
        // Autoplay blocked by browser — that's okay
      });
    }
  }, [autoPlay]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {
        // Autoplay blocked — that's fine, user needs interaction
      });
    }
    setPlaying(!playing);
  };

  return (
    <>
      {/* Add your audio file: place an MP3 in /public/ and update the src */}
      <audio ref={audioRef} loop>
        <source src={`${import.meta.env.BASE_URL}wedding-music.mp3`} type="audio/mpeg" />
      </audio>

      <button
        className={`music-control ${visible ? 'visible' : ''}`}
        onClick={toggleMusic}
        aria-label={playing ? 'Pause music' : 'Play music'}
      >
        <div className={`music-bars ${playing ? 'playing' : ''}`}>
          <span className="music-bar" />
          <span className="music-bar" />
          <span className="music-bar" />
          <span className="music-bar" />
        </div>
        <span>{playing ? 'Music On' : 'Music'}</span>
      </button>
    </>
  );
}
