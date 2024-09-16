import { useContext } from 'react';
import { PlayerContext } from './PlayerContext';

export function usePlayerContext() {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error('usePlayerContext must be used within a PlayerProvider');
  }

  return context;
}
