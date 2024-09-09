import { useEffect, useRef, useState } from 'react';
import { useBulletContext } from '../BulletContext';
import './Player.css';
import { usePlayerContext } from '../PlayerContext';
import useWebSocket from '../useWebSocket';

function Player() {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [topPosition, setTopPosition] = useState(0);
  const { playerId, players } = usePlayerContext();
  const { shoot } = useBulletContext();
  const { sendMessage } = useWebSocket();

  useEffect(() => {
    console.log('Setting up Player component');

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();

        setTopPosition((topPosition) => {
          const newPosition = topPosition - 10;
          sendMessage({ type: 'move', data: newPosition });
          return newPosition;
        });
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();

        setTopPosition((topPosition) => {
          const newPosition = topPosition + 10;
          sendMessage({ type: 'move', data: newPosition });
          return newPosition;
        });
      } else if (e.key === ' ') {
        e.preventDefault();

        if (!elementRef.current) {
          shoot(0, 0);
          return;
        }

        const { top } = elementRef.current.getBoundingClientRect();

        shoot(top, 0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      console.log('Cleaning up Player component');
      window.removeEventListener('keydown', handleKeyDown);
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

export default Player;
