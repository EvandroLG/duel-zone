import { useState, useEffect, useCallback } from 'react';

import backgroundSound from '../../assets/background.mp3';
import useAudio from '../../hooks/useAudio';

export function useBackgroundSound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const { play } = useAudio({
    file: backgroundSound,
    overlap: true,
    loop: true,
  });

  const handleBackgroundSound = useCallback(
    (e: KeyboardEvent) => {
      if (isPlaying) return;

      e.preventDefault();
      play();
      setIsPlaying(true);
    },
    [isPlaying, play]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleBackgroundSound);

    return () => {
      window.removeEventListener('keydown', handleBackgroundSound);
    };
  }, [handleBackgroundSound]);
}
