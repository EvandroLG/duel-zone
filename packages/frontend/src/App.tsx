import { useEffect, useContext, useRef, useState, createContext } from 'react';

import LocalPlayer from './components/LocalPlayer';
import RemotePlayer from './components/RemotePlayer';
import Bullet from './components/Bullet';

import { useBulletContext } from './contexts/BulletContext';
import { usePlayerContext } from './contexts/PlayerContext';

import './App.css';

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

const FRAME_DURATION = 1000 / 60;

function App() {
  const { playerId } = usePlayerContext();
  const { remoteBullets, localBullets, updateBullets } = useBulletContext();
  const appRef = useRef<HTMLDivElement | null>(null);
  const [appDimensions, setAppDimensions] = useState({ width: 0, height: 0 });

  console.log('App render');
  console.log('appDimensions', appDimensions);

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
        updateBullets();
      }

      animationId = requestAnimationFrame(animation);
    }

    animationId = requestAnimationFrame(animation);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [localBullets, updateBullets]);

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
        <LocalPlayer />
        <RemotePlayer />

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
