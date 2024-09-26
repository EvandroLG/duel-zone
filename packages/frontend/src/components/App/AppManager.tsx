import { lazy, Suspense, useEffect, useState } from 'react';

import { useWebSocket } from '@evandrolg/react-web-socket';

import { usePlayerContext } from '../../contexts/PlayerContext';

import './App.css';

const AppEngine = lazy(() => import('./AppEngine'));

function AppManager() {
  const { lastMessage } = useWebSocket();
  const { playerId, players } = usePlayerContext();
  const [winner, setWinner] = useState<number | null>(null);
  const [isGameFull, setIsGameFull] = useState(false);

  console.log('AppManager render');

  useEffect(() => {
    if (lastMessage?.type === 'gameOver') {
      setWinner(lastMessage.data as number);
    }

    if (lastMessage?.type === 'gameFull') {
      setIsGameFull(true);
    } else {
      setIsGameFull(false);
    }
  }, [lastMessage?.type, lastMessage?.data]);

  if (isGameFull) {
    return <div className="message">Game is full. Try again later.</div>;
  }

  if (!playerId) {
    return null;
  }

  if (players.length < 2) {
    return <div className="message">Waiting for another player...</div>;
  }

  if (winner === playerId) {
    return <div className="message">You won! :)</div>;
  }

  if (winner !== null) {
    return <div className="message">You lost! :(</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppEngine />
    </Suspense>
  );
}

export default AppManager;
