import { createContext, useContext, useEffect, useState } from 'react';
import useWebSocket from './useWebSocket';

type Players = Array<{ id: number; x: number; y: number }>;

type PlayerContextType = {
  playerId: null | number;
  players: Players;
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
  const [playerId, setPlayerId] = useState<number | null>(null);
  const [players, setPlayers] = useState<Players>([]);
  const { lastMessage } = useWebSocket();

  useEffect(() => {
    console.log('lastMessage', lastMessage);

    if (lastMessage?.type === 'playerId') {
      setPlayerId(lastMessage.data as number);
      return;
    }

    if (lastMessage?.type === 'playersUpdate') {
      console.log('Setting players:', lastMessage.data);
      setPlayers(lastMessage.data as Players);
      return;
    }
  }, [lastMessage]);

  return (
    <PlayerContext.Provider value={{ playerId, players }}>
      {children}
    </PlayerContext.Provider>
  );
}
