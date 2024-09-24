import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { WebSocketProvider } from '@evandrolg/react-web-socket';

import App from './components/App';
import { ErrorFallback } from './components/Fallback';

import { BulletProvider } from './contexts/BulletContext';
import { PlayerProvider } from './contexts/PlayerContext';

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
