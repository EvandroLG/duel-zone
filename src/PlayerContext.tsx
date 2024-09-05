import { createContext, useContext, useState } from 'react';

type PlayerId = 0 | 1 | 2;

export type PlayerContextType = {
  playerId: PlayerId;
  setPlayerId: (playerId: PlayerId) => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function usePlayerContext() {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error('usePlayerContext must be used within a PlayerProvider');
  }

  return context;
}

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [playerId, setPlayerId] = useState<PlayerId>(0);

  return (
    <PlayerContext.Provider value={{ playerId, setPlayerId }}>
      {children}
    </PlayerContext.Provider>
  );
}
