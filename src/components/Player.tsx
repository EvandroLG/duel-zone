import { useEffect, useState } from 'react';
import './Player.css';
import { useBulletContext } from '../BulletContext';

function Player() {
  const [position, setPosition] = useState(0);
  const { shoot } = useBulletContext();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();

      if (e.key === 'ArrowUp') {
        setPosition((position) => position - 10);
      } else if (e.key === 'ArrowDown') {
        setPosition((position) => position + 10);
      } else if (e.key === ' ') {
        // TODO: implement logic to get the top position
        shoot(0, 0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <div className="player" style={{ top: `${position}px` }} />;
}

export default Player;
