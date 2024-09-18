import { lazy, Suspense, useEffect, useState } from 'react';

import { usePlayerContext } from '../../contexts/PlayerContext';
import { useWebSocketContext } from '../../contexts/WebSocketContext';

import './App.css';

const AppEngine = lazy(() => import('./AppEngine'));

function AppManager() {
  const { lastMessage } = useWebSocketContext();
  const { playerId, players } = usePlayerContext();
  const [winner, setWinner] = useState<number | null>(null);

  console.log('AppManager render');

  useEffect(() => {
    if (lastMessage?.type === 'gameOver') {
      setWinner(lastMessage.data as number);
    }
  }, [lastMessage?.type, lastMessage?.data]);

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
