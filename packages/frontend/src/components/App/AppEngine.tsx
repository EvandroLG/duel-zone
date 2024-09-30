import { useEffect, useRef, useState } from 'react';

import { LocalPlayer, RemotePlayer } from '../Player';
import { AppDimensionsContext } from './AppDimensionsContext';
import './App.css';
import { useBulletContext } from '../../contexts/BulletContext';
import Bullet from '../Bullet';
import useBulletAnimation from './useBulletAnimation';

function AppEngine() {
  //useBackgroundSound();
  const { remoteBullets, localBullets } = useBulletContext();
  const [appDimensions, setAppDimensions] = useState({ width: 0, height: 0 });
  const appRef = useRef<HTMLDivElement | null>(null);
  const localPlayerRef = useRef<HTMLDivElement | null>(null);
  const remotePlayerRef = useRef<HTMLDivElement | null>(null);
  useBulletAnimation(appDimensions, remotePlayerRef);

  console.log('AppEngine render');

  useEffect(() => {
    if (!appRef.current) {
      return;
    }

    const { width, height } = appRef.current.getBoundingClientRect();

    if (width === appDimensions.width && height === appDimensions.height) {
      return;
    }

    setAppDimensions({ width, height });
  }, [appDimensions.width, appDimensions.height]);

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
