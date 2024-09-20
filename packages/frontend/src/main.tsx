import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';

import App from './components/App';
import { ErrorFallback } from './components/Fallback';

import { BulletProvider } from './contexts/BulletContext';
import { PlayerProvider } from './contexts/PlayerContext';
import { WebSocketProvider } from './contexts/WebSocketContext';

import { WEBSOCKET_URL } from './config';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <WebSocketProvider url={WEBSOCKET_URL}>
      <PlayerProvider>
        <BulletProvider>
          <App />
        </BulletProvider>
      </PlayerProvider>
    </WebSocketProvider>
  </ErrorBoundary>
);
