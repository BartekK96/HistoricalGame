import { Game, GameID } from './Game';
import { GameName } from './GameName';

export abstract class IGameRepository {
  abstract add(game: Game): Promise<void>;

  abstract update(game: Game): Promise<void>;

  abstract getByID(gameID: GameID): Promise<Game | null>;

  abstract getNotStartedByName(gameName: GameName): Promise<Game | null>;
  
  abstract clear(): Promise<void>;
}
