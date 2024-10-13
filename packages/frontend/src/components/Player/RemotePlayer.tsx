import { useState, useEffect, useMemo, forwardRef } from 'react';

import { usePlayerContext } from '@/contexts/PlayerContext';

import '@/components/Player/Player.css';

const RemotePlayer = forwardRef<HTMLDivElement>((_, ref) => {
  const [topPosition, setTopPosition] = useState(0);
  const { playerId, players } = usePlayerContext();

  const player = useMemo(() => {
    if (playerId === null) {
      return null;
    }

    return players.find((player) => player.id !== playerId);
  }, [players, playerId]);

  const style = useMemo(
    () =>
      player?.id === players[0]?.id
        ? { backgroundColor: 'green', left: 0 }
        : { backgroundColor: 'red', left: 1296 },
    [player, players]
  );

  useEffect(() => {
    console.log('Setting up RemotePlayer component');

    if (!player) {
      return;
    }

    setTopPosition(player.y);
  }, [player]);

  if (!player) {
    return null;
  }

  return (
    <div
      ref={ref}
      className="player"
      style={{ top: `${topPosition}px`, ...style }}
    />
  );
});

export default RemotePlayer;
