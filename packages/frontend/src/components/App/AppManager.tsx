import { useEffect, useState } from 'react';

import AppEngine from './AppEngine';

import { useWebSocketContext } from '../../contexts/WebSocketContext';
import { usePlayerContext } from '../../contexts/PlayerContext';

function AppManager() {
  const { lastMessage } = useWebSocketContext();
  const { playerId } = usePlayerContext();
  const [winner, setWinner] = useState<number | null>(null);

  console.log('AppManager render');

  useEffect(() => {
    if (lastMessage?.type === 'gameOver') {
      setWinner(lastMessage.data as number);
    }
  }, [lastMessage?.type]);

  if (!playerId) {
    return null;
  }

  if (winner === playerId) {
    return <div>You won!</div>;
  }

  if (winner !== null) {
    return <div>You lost!</div>;
  }

  return <AppEngine />;
}

export default AppManager;
