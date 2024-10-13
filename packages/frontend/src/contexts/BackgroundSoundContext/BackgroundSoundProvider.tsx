import { createContext, useMemo } from 'react';

import backgroundSound from '@/assets/background.mp3';

import useAudio, { UseAudioReturnType } from '@/hooks/useAudio';

export const BackgroundSoundContext = createContext<UseAudioReturnType | null>(
  null
);

type BackgroundSoundProviderProps = {
  children: React.ReactNode;
};

export function BackgroundSoundProvider({
  children,
}: BackgroundSoundProviderProps) {
  const audioOptions = useMemo(
    () => ({
      file: backgroundSound,
      loop: true,
    }),
    []
  );

  const audio = useAudio(audioOptions);

  return (
    <BackgroundSoundContext.Provider value={audio}>
      {children}
    </BackgroundSoundContext.Provider>
  );
}
