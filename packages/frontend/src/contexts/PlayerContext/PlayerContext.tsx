import { createContext, useEffect, useMemo, useState } from 'react';

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
      const updatedPlayers = lastMessage.data as Players;

      const shouldUpdate = updatedPlayers.some((updatedPlayer) => {
        const existingPlayer = players.find((p) => p.id === updatedPlayer.id);

        return (
          updatedPlayer.id !== playerId &&
          (!existingPlayer ||
            existingPlayer.x !== updatedPlayer.x ||
            existingPlayer.y !== updatedPlayer.y)
        );
      });

      if (shouldUpdate) {
        setPlayers(lastMessage.data as Players);
      }
    }
  }, [lastMessage, playerId, players]);

  const contextValue = useMemo(
    () => ({ playerId, players }),
    [playerId, players]
  );

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
}
