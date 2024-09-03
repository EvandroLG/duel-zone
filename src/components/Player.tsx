import { useEffect, useRef, useState } from 'react';
import { useBulletContext } from '../BulletContext';
import './Player.css';

function Player() {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState(0);
  const { shoot } = useBulletContext();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setPosition((position) => position - 10);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setPosition((position) => position + 10);
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

  return (
    <div ref={elementRef} className="player" style={{ top: `${position}px` }} />
  );
}

export default Player;
