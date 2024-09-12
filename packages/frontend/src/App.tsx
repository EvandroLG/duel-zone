import { useEffect } from 'react';
import { useBulletContext } from './BulletContext';
import LocalPlayer from './components/LocalPlayer';
import RemotePlayer from './components/RemotePlayer';
import Bullet from './components/Bullet';
import { usePlayerContext } from './PlayerContext';

import './App.css';

function App() {
  const { playerId } = usePlayerContext();
  const { bullets, updateBullets } = useBulletContext();

  console.log('App render');

  useEffect(() => {
    let animationId: number;
    let last = 0;

    function animation(now: number) {
      if (bullets.length === 0) {
        return;
      }

      const delta = now - last;

      if (delta >= 1000 / 60) {
        last = now;
        updateBullets();
      }

      animationId = requestAnimationFrame(animation);
    }

    animationId = requestAnimationFrame(animation);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [bullets, updateBullets]);

  if (playerId === null) {
    return null;
  }

  return (
    <>
      <LocalPlayer />
      <RemotePlayer />
      {bullets.map(({ id, top, left }) => (
        <Bullet key={id} top={top} left={left} />
      ))}
    </>
  );
}

export default App;
