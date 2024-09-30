import { useEffect, useRef } from 'react';

import { Audio, AudioPropType, AudioType } from 'ts-audio';

type UseAudioOptions = AudioPropType & {
  overlap?: boolean;
};

function useAudio(options: UseAudioOptions) {
  const { overlap = false } = options;
  const audioRef = useRef<AudioType | null>(null);

  if (!overlap && audioRef.current === null) {
    audioRef.current = Audio(options);
  }

  useEffect(() => {
    if (!overlap) {
      audioRef.current?.stop();
      audioRef.current = Audio(options);
    }

    return () => {
      audioRef.current?.stop();
      audioRef.current = null;
    };
  }, [options, overlap]);

  const play = () => {
    if (overlap) {
      const audioInstance = Audio(options);
      audioInstance.play();

      audioInstance.on('end', () => {
        audioInstance.stop();
      });
    } else {
      if (audioRef.current) {
        audioRef.current.play();
      }
    }
  };

  const { state } = audioRef.current || {};

  return {
    play,
    state,
  };
}

export default useAudio;
