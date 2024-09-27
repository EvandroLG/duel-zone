import { useEffect } from 'react';

import { BULLET_INITIAL_LEFT_POSITIONS } from './constants';
import shootSound from '../../assets/shoot.wav';
import useAudio from '../../hooks/useAudio';
import './Bullet.css';

type BulletProps = {
  top: number;
  left: number;
};

function Bullet({ top, left }: BulletProps) {
  const { play: audioPlay } = useAudio({ file: shootSound });

  useEffect(() => {
    if (BULLET_INITIAL_LEFT_POSITIONS.includes(left)) {
      audioPlay();
    }
  }, [left, audioPlay]);

  return <div className="bullet" style={{ position: 'absolute', top, left }} />;
}

export default Bullet;
