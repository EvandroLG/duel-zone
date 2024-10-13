import { Bullet } from '@/contexts/BulletContext';

export function hasCollision(
  bullets: Bullet[],
  playerBounds: DOMRect
): boolean {
  for (const bullet of bullets) {
    if (bullet.top >= playerBounds.top && bullet.top <= playerBounds.bottom) {
      if (playerBounds.x > 0 && bullet.left >= playerBounds.x) {
        return true;
      }

      if (playerBounds.x === 0 && bullet.left <= playerBounds.x) {
        return true;
      }
    }
  }

  return false;
}
