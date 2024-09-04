import { useEffect } from 'react';
import { useBulletContext } from './BulletContext';
import Player from './components/Player';
import Bullet from './components/Bullet';
import './App.css';
import { usePlayerContext } from './PlayerContext';

function App() {
  const { playerId, setPlayerId } = usePlayerContext();
  const { bullets, updateBullets } = useBulletContext();

  useEffect(() => {
    setPlayerId(2);
  }, []);

  useEffect(() => {
    let animationId: number;
    let last = 0;

    function animation(now: number) {
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
  }, []);

  if (playerId === 0) {
    return null;
  }

  return (
    <>
      <Player />
      {bullets.map(({ id, top, left }) => (
        <Bullet key={id} top={top} left={left} />
      ))}
    </>
  );
}

export default App;
