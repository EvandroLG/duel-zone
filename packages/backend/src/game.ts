interface Player {
  id: number;
  x: number;
  y: number;
}

class Game {
  public players: Map<number, Player> = new Map();
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

  getState(): Player[] {
    return Array.from(this.players.values());
  }
}

export const game = new Game();
