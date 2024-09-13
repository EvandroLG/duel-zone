import { createRoot } from 'react-dom/client';

import App from './App.tsx';

import { BulletProvider } from './contexts/BulletContext.tsx';
import { PlayerProvider } from './contexts/PlayerContext.tsx';
import { WebSocketProvider } from './contexts/WebSocketContext.tsx';

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
