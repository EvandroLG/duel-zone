import { useEffect, useState } from 'react';

import AppEngine from './AppEngine';
import { usePlayerContext } from '../../contexts/PlayerContext';
import { useWebSocketContext } from '../../contexts/WebSocketContext';

import './App.css';

function AppManager() {
  const { lastMessage } = useWebSocketContext();
  const { playerId } = usePlayerContext();
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

  if (winner === playerId) {
    return <div className="message">You won! :)</div>;
  }

  if (winner !== null) {
    return <div className="message">You lost! :(</div>;
  }

  return <AppEngine />;
}

export default AppManager;
