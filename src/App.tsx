import { useEffect } from 'react';
import { useBulletContext } from './BulletContext';
import Player from './components/Player';
import Bullet from './components/Bullet';
import './App.css';

function App() {
  const { bullets, updateBullets } = useBulletContext();

  useEffect(() => {
    let animationId: number;
    let last = 0;

    function animation(now: number) {
      if (now - last >= 500) {
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
