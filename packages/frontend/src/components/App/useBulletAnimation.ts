import { MutableRefObject, useEffect, useRef } from 'react';

import { useWebSocket } from '@evandrolg/react-web-socket';

import { hasCollision } from '@/components/App/utils';
import { useBulletContext } from '@/contexts/BulletContext';
import { usePlayerContext } from '@/contexts/PlayerContext';

type AppDimensions = {
  width: number;
  height: number;
};

const FRAME_DURATION = 1000 / 60;

function useBulletAnimation(
  appDimensions: AppDimensions,
  remotePlayerRef: MutableRefObject<HTMLDivElement | null>
) {
  const { sendMessage } = useWebSocket();
  const { playerId } = usePlayerContext();
  const { localBullets, updateBullets } = useBulletContext();
  const localBulletsRef = useRef(localBullets);

  useEffect(() => {
    localBulletsRef.current = localBullets;
  }, [localBullets]);

  useEffect(() => {
    let animationId: number;
    let last = 0;

    function animation(now: number) {
      const delta = now - last;

      if (delta >= FRAME_DURATION) {
        last = now;
        const { width } = appDimensions;

        updateBullets(width);

        if (
          remotePlayerRef.current &&
          hasCollision(
            localBulletsRef.current,
            remotePlayerRef.current.getBoundingClientRect()
          )
        ) {
          sendMessage({ type: 'gameOver', data: playerId });
        }
      }

      animationId = requestAnimationFrame(animation);
    }

    animationId = requestAnimationFrame(animation);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [appDimensions, playerId, sendMessage, updateBullets, remotePlayerRef]);
}

export default useBulletAnimation;
