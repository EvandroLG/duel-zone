import { createContext, useState, useRef, useEffect } from 'react';
import { useWebSocket } from '@evandrolg/react-web-socket';

import { usePlayerContext } from '../PlayerContext';

export type Bullet = {
  id: number;
  top: number;
  left: number;
};

type BulletContextType = {
  remoteBullets: Bullet[];
  localBullets: Bullet[];
  shoot: (top: number, appWidth: number) => void;
  updateBullets: (appWidth: number) => void;
};

export const BulletContext = createContext<BulletContextType | undefined>(
  undefined
);

export function BulletProvider({ children }: { children: React.ReactNode }) {
  const { playerId, players } = usePlayerContext();
  const [localBullets, setLocalBullets] = useState<Bullet[]>([]);
  const [remoteBullets, setRemoteBullets] = useState<Bullet[]>([]);
  const { lastMessage, sendMessage } = useWebSocket();
  const playersRef = useRef(players);
  const playerIdRef = useRef(playerId);
  const bulletIdRef = useRef(0);

  useEffect(() => {
    playersRef.current = players;
    playerIdRef.current = playerId;
  }, [players, playerId]);

  useEffect(() => {
    if (lastMessage?.type === 'bulletsUpdate') {
      const entries = Object.entries(
        lastMessage.data as Record<string, Bullet[]>
      );

      const remoteBullets = entries
        .filter(([key]) => key !== playerIdRef.current?.toString())
        .flatMap(([, bullets]) => bullets);

      setRemoteBullets(remoteBullets);
    }
  }, [lastMessage]);

  const shoot = (top: number, appWidth: number) => {
    const left =
      playersRef.current[0]?.id === playerIdRef.current ? 20 : appWidth - 20;

    setLocalBullets((prevBullets) => {
      const newBullets = [
        ...prevBullets,
        { id: ++bulletIdRef.current, top, left },
      ];

      sendMessage({ type: 'shoot', data: newBullets });

      return newBullets;
    });
  };

  const updateBullets = (appWidth: number) => {
    setLocalBullets((prevBullets) => {
      const newBullets = prevBullets
        .map((bullet) => {
          const left =
            playersRef.current[0]?.id === playerIdRef.current
              ? bullet.left + 10
              : bullet.left - 10;

          return { ...bullet, left };
        })
        .filter(({ left }) => left >= 0 && left <= appWidth);

      sendMessage({ type: 'shoot', data: newBullets });

      return newBullets;
    });
  };

  return (
    <BulletContext.Provider
      value={{ remoteBullets, localBullets, shoot, updateBullets }}
    >
      {children}
    </BulletContext.Provider>
  );
}
