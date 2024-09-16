import { forwardRef, useEffect, useMemo, useState } from 'react';

import { useAppDimensionsContext } from '../App';

import { useBulletContext } from '../../contexts/BulletContext';
import { usePlayerContext } from '../../contexts/PlayerContext';
import { useWebSocketContext } from '../../contexts/WebSocketContext';

import './Player.css';

const LocalPlayer = forwardRef<HTMLDivElement>((_, ref) => {
  const [topPosition, setTopPosition] = useState(0);
  const { playerId, players } = usePlayerContext();
  const { shoot } = useBulletContext();
  const { sendMessage } = useWebSocketContext();
  const { height: appHeight, width: appWidth } = useAppDimensionsContext();

  const style = useMemo(
    () =>
      players[0]?.id === playerId
        ? { backgroundColor: 'green', left: 0 }
        : { backgroundColor: 'red', left: 1296 },
    [players, playerId]
  );

  useEffect(() => {
    console.log('Setting up LocalPlayer component');

    const elementRef = ref as React.MutableRefObject<HTMLDivElement>;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();

        setTopPosition((topPosition) => {
          const newPosition = topPosition - 10;

          if (newPosition < 0) {
            sendMessage({ type: 'move', data: 0 });
            return 0;
          }

          sendMessage({ type: 'move', data: newPosition });
          return newPosition;
        });
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();

        console.log('height', appHeight);

        setTopPosition((topPosition) => {
          const newPosition = topPosition + 10;
          const { height } = elementRef.current!.getBoundingClientRect();

          if (newPosition > appHeight - height) {
            sendMessage({ type: 'move', data: appHeight - height });
            return appHeight - height;
          }

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

        shoot(top, appWidth);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      console.log('Cleaning up LocalPlayer component');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [appHeight, ref]);

  return (
    <div
      ref={ref}
      className="player"
      style={{ top: `${topPosition}px`, ...style }}
    />
  );
});

export default LocalPlayer;
