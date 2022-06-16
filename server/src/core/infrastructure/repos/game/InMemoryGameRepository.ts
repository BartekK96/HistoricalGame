import { Injectable } from '@nestjs/common';
import { Game, GameID } from '../../../domain/game/Game';
import { IGameRepository } from '../../../domain/game/IGameRepository';

@Injectable()
export class InMemoryGameRepository implements IGameRepository {
  private db = new Set<Game>();

  public async add(game: Game): Promise<void> {
    this.db.add(game);
  }
  public async update(newGame: Game): Promise<void> {
    for (let game of Array.from(this.db)) {
      if (game.id.equals(newGame.id)) {
        this.db.delete(game);
        this.db.add(newGame);
        break;
      }
    }

    throw new Error('Game not found');
  }
  public async getByID(gameID: GameID): Promise<Game | null> {
    for (let game of Array.from(this.db)) {
      if (game.id.equals(gameID)) {
        return game;
      }
    }
    throw new Error('Game not found');
  }
}
