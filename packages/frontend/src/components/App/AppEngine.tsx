import { useEffect, useRef, useState } from 'react';

import { useWebSocket } from '@evandrolg/react-web-socket';

import { hasCollision } from './utils';
import { useBulletContext } from '../../contexts/BulletContext';
import { usePlayerContext } from '../../contexts/PlayerContext';
import Bullet from '../Bullet';
import { LocalPlayer, RemotePlayer } from '../Player';
import { AppDimensionsContext } from './AppDimensionsContext';
import { useBackgroundSound } from './useBackgroundSound';

import './App.css';

const FRAME_DURATION = 1000 / 60;

function AppEngine() {
  useBackgroundSound();
  const { sendMessage } = useWebSocket();
  const { playerId } = usePlayerContext();
  const { remoteBullets, localBullets, updateBullets } = useBulletContext();
  const [appDimensions, setAppDimensions] = useState({ width: 0, height: 0 });
  const appRef = useRef<HTMLDivElement | null>(null);
  const localPlayerRef = useRef<HTMLDivElement | null>(null);
  const remotePlayerRef = useRef<HTMLDivElement | null>(null);

  console.log('AppEngine render');

  useEffect(() => {
    let animationId: number;
    let last = 0;

    function animation(now: number) {
      if (localBullets.length === 0) {
        return;
      }

      const delta = now - last;

      if (delta >= FRAME_DURATION) {
        last = now;
        const { width } = appDimensions;

        updateBullets(width);

        if (
          hasCollision(
            localBullets,
            remotePlayerRef.current!.getBoundingClientRect()
          )
        ) {
          sendMessage({ type: 'gameOver', data: playerId });
        }
      }

      animationId = requestAnimationFrame(animation);
    }

    animationId = requestAnimationFrame(animation);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [localBullets, appDimensions, playerId, sendMessage, updateBullets]);

  useEffect(() => {
    if (!appRef.current) {
      return;
    }

    const { width, height } = appRef.current.getBoundingClientRect();
    setAppDimensions({ width, height });
  }, []);

  return (
    <AppDimensionsContext.Provider value={appDimensions}>
      <div ref={appRef} className="app">
        <LocalPlayer ref={localPlayerRef} />
        <RemotePlayer ref={remotePlayerRef} />

        {localBullets.map(({ id, top, left }) => (
          <Bullet key={id} top={top} left={left} />
        ))}

        {remoteBullets.map(({ id, top, left }) => (
          <Bullet key={id} top={top} left={left} />
        ))}
      </div>
    </AppDimensionsContext.Provider>
  );
}

export default AppEngine;
