import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';
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
  const { playerId, players } = usePlayerContext();
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const playersRef = useRef(players);
  const playerIdRef = useRef(playerId);
  let bulletId = 0;

  useEffect(() => {
    playersRef.current = players;
    playerIdRef.current = playerId;
  }, [players, playerId]);

  const shoot = (top: number) => {
    const left =
      playersRef.current[0]?.id === playerIdRef.current
        ? 20
        : window.innerWidth - 40;

    setBullets((prevBullets) => [
      ...prevBullets,
      { id: ++bulletId, top, left },
    ]);
  };

  const updateBullets = () => {
    setBullets((bullets) =>
      bullets.map((bullet) => {
        const left =
          playersRef.current[0]?.id === playerIdRef.current
            ? bullet.left + 10
            : bullet.left - 10;

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
