import { createRoot } from 'react-dom/client';
import { BulletProvider } from './BulletContext.tsx';
import { PlayerProvider } from './PlayerContext.tsx';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <>
    <PlayerProvider>
      <BulletProvider>
        <App />
      </BulletProvider>
    </PlayerProvider>
  </>
);
