import { useEffect } from 'react';

import backgroundSound from '../../assets/background.mp3';
import useAudio from '../../hooks/useAudio';

export function useBackgroundSound() {
  const { play, state } = useAudio({ file: backgroundSound, loop: true });

  useEffect(() => {
    function handleBackgroundSound(e: KeyboardEvent) {
      e.preventDefault();

      if (state === 'running') {
        return;
      }

      play();
    }

    window.addEventListener('keydown', handleBackgroundSound);

    return () => {
      window.removeEventListener('keydown', handleBackgroundSound);
    };
  }, [play, state]);
}
