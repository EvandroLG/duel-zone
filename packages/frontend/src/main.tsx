import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BulletProvider } from './BulletContext.tsx';
import { PlayerProvider } from './PlayerContext.tsx';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PlayerProvider>
      <BulletProvider>
        <App />
      </BulletProvider>
    </PlayerProvider>
  </StrictMode>
);
