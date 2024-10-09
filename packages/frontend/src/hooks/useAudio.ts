import { useEffect, useRef } from 'react';

import { Audio, AudioPropType, AudioType } from 'ts-audio';

type UseAudioOptions = AudioPropType & {
  overlap?: boolean;
};

export type UseAudioReturnType = {
  play: () => void;
  stop: AudioType['stop'] | undefined;
  pause: AudioType['pause'] | undefined;
  state: AudioType['state'] | undefined;
};

function useAudio(options: UseAudioOptions): UseAudioReturnType {
  const { overlap = false } = options;
  const audioRef = useRef<AudioType | null>(null);

  if (!overlap && !audioRef.current) {
    audioRef.current = Audio(options);
  }

  useEffect(() => {
    if (!overlap && !audioRef.current) {
      console.log('useAudio - useEffect');
      audioRef.current = Audio(options);
    }

    return () => {
      audioRef.current?.stop();
      audioRef.current = null;
    };
  }, [overlap, options]);

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

  const { state, stop, pause } = audioRef.current || {};

  return {
    play,
    pause,
    stop,
    state,
  };
}

export default useAudio;
