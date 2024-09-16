import { createRoot } from 'react-dom/client';

import App from './components/App';
import { BulletProvider } from './contexts/BulletContext';
import { PlayerProvider } from './contexts/PlayerContext';
import { WebSocketProvider } from './contexts/WebSocketContext';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <>
    <WebSocketProvider>
      <PlayerProvider>
        <BulletProvider>
          <App />
        </BulletProvider>
      </PlayerProvider>
    </WebSocketProvider>
  </>
);
