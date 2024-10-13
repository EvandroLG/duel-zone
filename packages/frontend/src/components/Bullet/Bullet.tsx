import { memo, useEffect } from 'react';

import shootSound from '@/assets/shoot.mp3';

import { BULLET_INITIAL_LEFT_POSITIONS } from '@/components/Bullet/constants';
import useAudio from '@/hooks/useAudio';
import '@/components/Bullet/Bullet.css';

type BulletProps = {
  top: number;
  left: number;
};

function Bullet({ top, left }: BulletProps) {
  const { play: audioPlay } = useAudio({
    file: shootSound,
    preload: true,
    overlap: true,
  });

  useEffect(() => {
    if (BULLET_INITIAL_LEFT_POSITIONS.includes(left)) {
      audioPlay();
    }
  }, [left, audioPlay]);

  return <div className="bullet" style={{ position: 'absolute', top, left }} />;
}

export default memo(Bullet);
