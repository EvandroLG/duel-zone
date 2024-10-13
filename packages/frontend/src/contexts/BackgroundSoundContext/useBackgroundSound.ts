import { useCallback, useContext, useEffect, useState } from 'react';

import { BackgroundSoundContext } from '@/contexts/BackgroundSoundContext/BackgroundSoundProvider';

export function useBackgroundSound() {
  const audio = useContext(BackgroundSoundContext);

  if (!audio) {
    throw new Error(
      'useBackgroundSound must be used within a BackgroundSoundProvider'
    );
  }

  const [isPlaying, setIsPlaying] = useState(false);
  const { play } = audio;

  const handleBackgroundSound = useCallback(
    (e: KeyboardEvent) => {
      if (isPlaying) return;

      e.preventDefault();
      play();
      setIsPlaying(true);
    },
    [isPlaying, play]
  );

  const stop = useCallback(() => {
    if (!isPlaying) return;
    console.log('useBackgroundSound - stop');
    audio.stop?.();
    setIsPlaying(false);
  }, [audio, isPlaying]);

  useEffect(() => {
    console.log('useBackgroundSound effect');
    window.addEventListener('keydown', handleBackgroundSound);

    return () => {
      window.removeEventListener('keydown', handleBackgroundSound);
    };
  }, [handleBackgroundSound]);

  return { stop };
}
