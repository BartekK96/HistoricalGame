import { Injectable } from '@nestjs/common';
import { AuthorizationClient } from '../../../authorization/infrastructure/AuthorizationClient';
import { Game, GameID } from './Game';
import { GameFactory } from './GameFactory';
import { IGameRepository } from './IGameRepository';

@Injectable()
export class GameService {
  constructor(
    private gameFactory: GameFactory,
    // todo: create microservice and export only guards and authClient
    private authorizationClient: AuthorizationClient,
    private gameRepository: IGameRepository,
  ) {}

  public async createNewGame(token: string, name: string): Promise<void> {
    const userID = await this.authorizationClient.resolveUserIDByToken(token);
    const game = this.gameFactory.createGame(userID, name);
    await this.gameRepository.add(game);
  }

  public async joinGame(token: string, gameID: string): Promise<void> {
    const game = await this.getGameById(new GameID(gameID));
    const userID = await this.authorizationClient.resolveUserIDByToken(token);
    game.addUser(userID);
    await this.gameRepository.update(game);
  }

  public async leaveGame(token: string, gameID: string): Promise<void> {
    const game = await this.getGameById(new GameID(gameID));
    const userID = await this.authorizationClient.resolveUserIDByToken(token);
    game.removeUser(userID);
    await this.gameRepository.update(game);
  }

  public async startGame(token: string, gameID: string): Promise<void> {
    const game = await this.getGameById(new GameID(gameID));
    game.startGame();

    // add algotihm for weighted radnom
    game.chooseCards()

    await this.gameRepository.update(game);
  }


  private async getGameById(gameID: GameID): Promise<Game> {
    const game = await this.gameRepository.getByID(gameID);

    if (!game) {
      throw new Error('Game not found');
    }

    return game;
  }
}
