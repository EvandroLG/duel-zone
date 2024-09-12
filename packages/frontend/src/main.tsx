import { createRoot } from 'react-dom/client';
import { BulletProvider } from './BulletContext.tsx';
import { PlayerProvider } from './PlayerContext.tsx';
import { WebSocketProvider } from './WebSocketContext.tsx';
import App from './App.tsx';
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
