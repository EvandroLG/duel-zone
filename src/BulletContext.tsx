import { createContext, useContext, useState } from 'react';

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
  const [bullets, setBullets] = useState<Bullet[]>([]);
  let bulletId = 0;

  const shoot = (top: number) => {
    setBullets((prevBullets) => [
      ...prevBullets,
      { id: ++bulletId, top, left: 20 },
    ]);
  };

  const updateBullets = () => {
    setBullets((bullets) =>
      bullets.map((bullet) => ({ ...bullet, left: bullet.left + 10 }))
    );
  };

  return (
    <BulletContext.Provider value={{ bullets, shoot, updateBullets }}>
      {children}
    </BulletContext.Provider>
  );
}
