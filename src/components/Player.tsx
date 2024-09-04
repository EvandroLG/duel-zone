import { useEffect, useRef, useState } from 'react';
import { useBulletContext } from '../BulletContext';
import './Player.css';
import { usePlayerContext } from '../PlayerContext';

function Player() {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [topPosition, setTopPosition] = useState(0);
  const { playerId } = usePlayerContext();
  const { shoot } = useBulletContext();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setTopPosition((topPosition) => topPosition - 10);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setTopPosition((topPosition) => topPosition + 10);
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
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const style =
    playerId === 1
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
