import { Injectable } from '@nestjs/common';
import { AuthorizationClient } from '../../../authorization/infrastructure/AuthorizationClient';
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

  public async joinGame(token: string, gameID: string): Promise<void> {}
}
