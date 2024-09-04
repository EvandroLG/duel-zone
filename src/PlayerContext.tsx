import { createContext, useContext, useState } from 'react';

export type PlayerContextType = {
  playerId: number;
  setPlayerId: (playerId: 0 | 1 | 2) => void;
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
  const [playerId, setPlayerId] = useState(1);

  return (
    <PlayerContext.Provider value={{ playerId, setPlayerId }}>
      {children}
    </PlayerContext.Provider>
  );
}
