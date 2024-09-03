import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BulletProvider } from './BulletContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BulletProvider>
      <App />
    </BulletProvider>
  </StrictMode>
);
