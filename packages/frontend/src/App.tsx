import { useEffect, useContext, useRef, useState, createContext } from 'react';

import LocalPlayer from './components/LocalPlayer';
import RemotePlayer from './components/RemotePlayer';

import {
  Bullet as BulletType,
  useBulletContext,
} from './contexts/BulletContext';
import { usePlayerContext } from './contexts/PlayerContext';

import './App.css';
import Bullet from './components/Bullet';

type AppDimensionsContextType = {
  width: number;
  height: number;
};

const AppDimensionsContext = createContext<AppDimensionsContextType>({
  width: 0,
  height: 0,
});

export function useAppDimensionsContext() {
  return useContext(AppDimensionsContext);
}

function hasCollision(bullets: BulletType[], playerBounds: DOMRect): boolean {
  for (const bullet of bullets) {
    if (
      !(bullet.top >= playerBounds.top && bullet.top <= playerBounds.bottom)
    ) {
      return false;
    }

    if (playerBounds.x > 0 && bullet.left >= playerBounds.x) {
      return true;
    }

    if (playerBounds.x === 0 && bullet.left <= playerBounds.x) {
      return true;
    }
  }

  return false;
}

const FRAME_DURATION = 1000 / 60;

function App() {
  const { playerId } = usePlayerContext();
  const { remoteBullets, localBullets, updateBullets } = useBulletContext();
  const appRef = useRef<HTMLDivElement | null>(null);
  const localPlayerRef = useRef<HTMLDivElement | null>(null);
  const remotePlayerRef = useRef<HTMLDivElement | null>(null);
  const [appDimensions, setAppDimensions] = useState({ width: 0, height: 0 });

  console.log('App render');

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
          console.log('Collision!');
        }
      }

      animationId = requestAnimationFrame(animation);
    }

    animationId = requestAnimationFrame(animation);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [localBullets, remotePlayerRef.current, updateBullets]);

  useEffect(() => {
    if (!appRef.current) {
      return;
    }

    const { width, height } = appRef.current.getBoundingClientRect();
    setAppDimensions({ width, height });
  }, [appRef.current]);

  if (playerId === null) {
    return null;
  }

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

export default App;
