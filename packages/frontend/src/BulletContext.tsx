import { createContext, useContext, useState } from 'react';
import { usePlayerContext } from './PlayerContext';

type Bullet = {
  id: number;
  top: number;
  left: number;
};

type BulletContextType = {
  bullets: Bullet[];
  shoot: (top: number, left: number) => void;
  updateBullets: () => void;
};

const BulletContext = createContext<BulletContextType | undefined>(undefined);

export function useBulletContext() {
  const context = useContext(BulletContext);

  if (!context) {
    throw new Error('useBulletContext must be used within a BulletProvider');
  }

  return context;
}

export function BulletProvider({ children }: { children: React.ReactNode }) {
  const { playerId } = usePlayerContext();
  const [bullets, setBullets] = useState<Bullet[]>([]);
  let bulletId = 0;

  const shoot = (top: number) => {
    const left = playerId === 1 ? 20 : window.innerWidth - 40;

    setBullets((prevBullets) => [
      ...prevBullets,
      { id: ++bulletId, top, left },
    ]);
  };

  const updateBullets = () => {
    setBullets((bullets) =>
      bullets.map((bullet) => {
        const left = playerId === 1 ? bullet.left + 10 : bullet.left - 10;
        return { ...bullet, left };
      })
    );
  };

  return (
    <BulletContext.Provider value={{ bullets, shoot, updateBullets }}>
      {children}
    </BulletContext.Provider>
  );
}
