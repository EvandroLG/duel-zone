interface Player {
  id: number;
  x: number;
  y: number;
}

interface Bullet {
  x: number;
  y: number;
}

class Game {
  public players: Map<number, Player> = new Map();
  public bullets: Map<number, Bullet[]> = new Map();
  private playerId = 0;

  addPlayer(): number {
    const id = this.playerId++;
    this.players.set(id, { id, x: 0, y: 0 });
    return id;
  }

  removePlayer(id: number): void {
    this.players.delete(id);
  }

  updatePlayer(id: number, y: number): void {
    const player = this.players.get(id);

    if (player) {
      player.y = y;
    }
  }

  updateBullets(playerId: number, bullets: Bullet[]): void {
    const player = this.players.get(playerId);

    if (!player) {
      return;
    }

    this.bullets.set(playerId, bullets);
  }

  getState(): Player[] {
    return Array.from(this.players.values());
  }

  getBullets(): Bullet[] {
    return Array.from(this.bullets.values()).flat();
  }
}

export const game = new Game();
