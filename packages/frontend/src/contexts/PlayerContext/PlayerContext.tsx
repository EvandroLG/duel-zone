import { createContext, useEffect, useState } from 'react';
import { useWebSocket } from '@evandrolg/react-web-socket';

type Players = Array<{ id: number; x: number; y: number }>;

type PlayerContextType = {
  playerId: null | number;
  players: Players;
};

export const PlayerContext = createContext<PlayerContextType | undefined>(
  undefined
);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [playerId, setPlayerId] = useState<number | null>(null);
  const [players, setPlayers] = useState<Players>([]);
  const { lastMessage } = useWebSocket();

  useEffect(() => {
    console.log('lastMessage', lastMessage);

    if (lastMessage?.type === 'playerId') {
      setPlayerId(lastMessage.data as number);
    }

    if (lastMessage?.type === 'playersUpdate') {
      console.log('Setting players:', lastMessage.data);
      setPlayers(lastMessage.data as Players);
    }
  }, [lastMessage]);

  return (
    <PlayerContext.Provider value={{ playerId, players }}>
      {children}
    </PlayerContext.Provider>
  );
}
