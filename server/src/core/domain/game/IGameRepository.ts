import { Game, GameID } from './Game';

export abstract class IGameRepository {
  abstract add(game: Game): Promise<void>;

  abstract update(game: Game): Promise<void>;

  abstract getByID(gameID: GameID): Promise<Game | null>;
}
