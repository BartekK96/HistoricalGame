import { Injectable } from '@nestjs/common';
import { TestOnly } from '../../../../kernel/decorators/TestOnly';
import { Game, GameID } from '../../../domain/game/Game';
import { GameName } from '../../../domain/game/GameName';
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
    return null
  }

  public async getNotStartedByName(gameName: GameName): Promise<Game | null> {
    for (let game of Array.from(this.db)) {
      if (game.name.equals(gameName) && game.startedAt) {
        return game;
      }
    }
    return null
  }

  @TestOnly()
  public async clear(): Promise<void> {
    this.db = new Set<Game>();
  }
}
