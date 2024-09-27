import { useEffect, useRef } from 'react';

import { Audio, AudioPropType, AudioType } from 'ts-audio';

function useAudio(options: AudioPropType) {
  const audioRef = useRef<AudioType | null>(null);

  useEffect(() => {
    audioRef.current = Audio(options);

    return () => {
      audioRef.current?.stop();
      audioRef.current = null;
    };
  }, [options]);

  if (!audioRef.current) {
    return {
      play: () => {},
      pause: () => {},
      stop: () => {},
      toggle: () => {},
      on: () => {},
      volume: 1,
      loop: false,
      state: 'state',
      audioCtx: undefined,
    };
  }

  return audioRef.current;
}

export default useAudio;
