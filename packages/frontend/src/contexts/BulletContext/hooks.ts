import { useContext } from 'react';

import { BulletContext } from '@/contexts/BulletContext/BulletContext';

export function useBulletContext() {
  const context = useContext(BulletContext);

  if (!context) {
    throw new Error('useBulletContext must be used within a BulletProvider');
  }

  return context;
}
