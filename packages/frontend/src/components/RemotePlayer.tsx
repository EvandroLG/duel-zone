import { useState, useRef, useEffect } from 'react';
import { usePlayerContext } from '../PlayerContext';

function RemotePlayer() {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [topPosition, setTopPosition] = useState(0);
  const { playerId, players } = usePlayerContext();

  useEffect(() => {
    console.log('Setting up RemotePlayer component');

    if (playerId === null) {
      return;
    }

    const player = players.find((player) => player.id !== playerId);

    if (!player) {
      return;
    }

    setTopPosition(player.y);

    return () => {
      console.log('Cleaning up RemotePlayer component');
    };
  }, []);

  const style =
    players[0]?.id === playerId
      ? { backgroundColor: 'green', left: 0 }
      : { backgroundColor: 'red', right: 0 };

  return (
    <div
      ref={elementRef}
      className="player"
      style={{ top: `${topPosition}px`, ...style }}
    />
  );
}

export default RemotePlayer;
