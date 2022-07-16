import { Injectable } from '@nestjs/common';
import { AuthorizationClient } from '../../../authorization/infrastructure/AuthorizationClient';
import { ICardPlainObject } from '../cards/Card';
import { CardService } from '../cards/CardService';
import { Game, GameID } from './Game';
import { GameFactory } from './GameFactory';
import { GameName } from './GameName';
import { IGameRepository } from './IGameRepository';

@Injectable()
export class GameService {
  constructor(
    private gameFactory: GameFactory,
    private authorizationClient: AuthorizationClient,
    private gameRepository: IGameRepository,
    private cardService: CardService,
  ) {}

  public async createNewGame(token: string, name: GameName): Promise<void> {
    const userID = await this.authorizationClient.resolveUserIDByToken(token);
    const game = this.gameFactory.createGame(userID, name);
    await this.gameRepository.add(game);
  }

  public async joinGame(token: string, gameName: GameName): Promise<void> {
    const game = await this.getNotStartedGameByName(gameName);
    const userID = await this.authorizationClient.resolveUserIDByToken(token);
    game.addUser(userID);
    await this.gameRepository.update(game);
  }

  public async leaveGame(token: string, gameName: GameName): Promise<void> {
    const game = await this.getNotStartedGameByName(gameName);
    const userID = await this.authorizationClient.resolveUserIDByToken(token);
    game.removeUser(userID);
    await this.gameRepository.update(game);
  }

  public async placeCard(token: string, gameName: GameName): Promise<void> {
    const userID = await this.authorizationClient.resolveUserIDByToken(token);
    const game = await this.getGameByName(gameName);

  }

  // todo: only game owner should be able to start game
  public async startGame(gameName: GameName): Promise<void> {
    const game = await this.getNotStartedGameByName(gameName);

    const cardsInGame = game.startGame();
    const cards = await this.cardService.getCardsForGame(cardsInGame);
    game.assignCardsForPlayers(cards);

    await this.gameRepository.update(game);
  }

  private async getGameByName(gameName: GameName): Promise<Game> {
    const game = await this.gameRepository.getByName(gameName);
    if (!game) {
      throw new Error('Game with given name does not exists');
    }

    return game;
  }

  public async getNotStartedGameByName(name: GameName): Promise<Game> {
    const game = await this.gameRepository.getNotStartedByName(name);
    if (!game) {
      throw new Error('Game with given name does not exists');
    }

    return game;
  }

  private async getGameById(gameID: GameID): Promise<Game> {
    const game = await this.gameRepository.getByID(gameID);

    if (!game) {
      throw new Error('Game not found');
    }

    return game;
  }

  public async getCurrentGameStatus(
    token: string,
    gameName: GameName,
  ): Promise<{
    playerCards: ICardPlainObject[];
    cardsInGame: ICardPlainObject[];
    currentPlayer: string;
  }> {
    const user = await this.authorizationClient.resolveUserIDByToken(token);
    const game = await this.getNotStartedGameByName(gameName);
    return {
      cardsInGame: [],
      currentPlayer: game.getCurrentPlayer().toString(),
      playerCards: game.getPlayerCards(user).map(card => card.getPlainObject()),
    };
  }
}
