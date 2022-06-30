import { UserID } from '../../../authorization/domain/user/User';
import { DateValue } from '../../../kernel/DateValue';
import { ClassConstructor } from '../../../kernel/decorators/Immutable';
import { Entity } from '../../../kernel/Entity';
import { Identifier } from '../../../kernel/Identifier';
import { Writable } from '../../../kernel/interfaces/Writable';
import { Card } from '../cards/Card';
import { CardsPerPlayer } from './CardsPerPlayer';
import { GameName } from './GameName';
import { GameState } from './GameState';

interface IBaseHandler {
  addUser(userID: UserID): void;
  removeUser(userID: UserID): void;
  startGame(): number;
  assignCardsForPlayers(cards: Card[]): void;
  getPlayerCards(player: UserID): Card[];
  getCurrentPlayer(): UserID;
  finishGame(): void;
  chooseNumberOfCardsPerPlayer(cardsPerPlayer: number): void;
}

class BaseHandler implements IBaseHandler {
  constructor(protected game: Writable<Game>) {}

  public removeUser(userID: UserID): void {
    throw new Error('Method not implemented.');
  }

  public startGame(): number {
    throw new Error('Method not implemented.');
  }

  public addUser(userID: UserID): void {
    throw new Error('Can not run method in given game state');
  }

  public finishGame(): void {
    throw new Error('Can not run method in given game state');
  }

  public chooseNumberOfCardsPerPlayer(cardsPerPlayer: number): void {
    throw new Error('Can not run method in given game state');
  }

  public assignCardsForPlayers(cards: Card[]): void {
    throw new Error('Can not run method in given game state');
  }

  public getPlayerCards(player: UserID): Card[] {
    throw new Error('Can not run method in given game state');
  }

  public getCurrentPlayer(): UserID {
    throw new Error('Can not run method in given game state');
  }
}

class InitializedHandler extends BaseHandler {
  public addUser(userID: UserID): void {
    // todo: customize it in future
    if (this.game.participants.length < 4) {
      this.game.participants.push(userID);
    }
  }
  public removeUser(userID: UserID): void {
    this.game.participants.filter(user => !user.equals(userID));
  }

  public startGame(): number {
    this.game.state = GameState.STARTING;
    return this.game.getCountOfCardsInGame();
  }

  public chooseNumberOfCardsPerPlayer(cardsPerPlayer: number): void {
    this.game.cardsPerPlayer = new CardsPerPlayer(cardsPerPlayer);
  }
}

class StartingHandler extends BaseHandler {
  public assignCardsForPlayers(cards: Card[]): void {
    if (this.game.getCountOfCardsInGame() !== cards.length) {
      throw new Error('Incorect number of cards during card assigment');
    }

    this.game.participants.map(participant => {
      this.assignCardsForPlayer(
        participant,
        cards.slice(0, this.game.cardsPerPlayer.valueOf()),
      );
    });

    this.game.state = GameState.STARTED;
  }

  private assignCardsForPlayer(userID: UserID, cards: Card[]): void {
    this.game.usersCards.push({
      cards,
      userID,
    });
  }
}

class StartedHandler extends BaseHandler {
  public getPlayerCards(player: UserID): Card[] {
    const playerCards = this.game.usersCards.find(set => {
      return set.userID.equals(player);
    });

    if (!playerCards) {
      throw new Error('Player has not assignment any cards in this game');
    }

    return playerCards.cards;
  }

  public getCurrentPlayer(): UserID {
    return this.game.currentPlayer;
  }
}
class FinishedHandler extends BaseHandler {}
class CancelHandler extends BaseHandler {}

export class GameID extends Identifier {}

export interface IUserCards {
  userID: UserID;
  cards: Card[];
}

export class Game extends Entity implements IBaseHandler {
  constructor(
    public readonly id: GameID,
    public readonly owner: UserID,
    public readonly currentPlayer: UserID,
    public readonly name: GameName,
    public readonly state: GameState,
    public readonly participants: UserID[],
    public readonly usersCards: IUserCards[],
    public readonly cardsPerPlayer: CardsPerPlayer,
    public readonly startedAt: DateValue,
    public readonly finishedAt: DateValue,
  ) {
    super();
  }

  public getCountOfCardsInGame(): number {
    return this.cardsPerPlayer.valueOf() * this.participants.length;
  }

  public isAlreadyFinished(): boolean {
    return this.finishedAt.hasAlreadyPassed();
  }

  private getActualHandler(): IBaseHandler {
    const stateHandlerConstructorMap: Map<
      GameState,
      ClassConstructor<BaseHandler>
    > = new Map([
      [GameState.INITIALIZED, InitializedHandler],
      [GameState.STARTING, StartingHandler],
      [GameState.STARTED, StartedHandler],
      [GameState.CANCELED, CancelHandler],
      [GameState.FINISHED, FinishedHandler],
    ]);

    const Constructor = stateHandlerConstructorMap.get(this.state);

    if (!Constructor) {
      throw new Error('Given state does not have handler');
    }

    return new Constructor(this);
  }

  public getPlayerCards(player: UserID): Card[] {
    return this.getActualHandler().getPlayerCards(player);
  }
  public getCurrentPlayer(): UserID {
    return this.getActualHandler().getCurrentPlayer();
  }

  public addUser(userID: UserID): void {
    this.getActualHandler().addUser(userID);
  }

  public removeUser(userID: UserID): void {
    this.getActualHandler().removeUser(userID);
  }

  public startGame(): number {
    return this.getActualHandler().startGame();
  }

  public assignCardsForPlayers(cards: Card[]): void {
    this.getActualHandler().assignCardsForPlayers(cards);
  }

  public finishGame(): void {
    throw new Error('Method not implemented.');
  }

  public chooseNumberOfCardsPerPlayer(cardsPerPlayer: number): void {
    this.getActualHandler().chooseNumberOfCardsPerPlayer(cardsPerPlayer);
  }

  public getPlainObject(): {
    id: string;
    owner: string;
    currentPlayer: string;
    name: string;
    state: string;
    participants: string[];
    usersCards: {
      userID: string;
      cards: string[];
    }[];
    cardsPerPlayer: number;
    startedAt: string | null;
    finishedAt: string | null;
  } {
    return {
      cardsPerPlayer: this.cardsPerPlayer.valueOf(),
      currentPlayer: this.currentPlayer.toString(),
      finishedAt: this.finishedAt.toISOStringOrNull(),
      id: this.id.toString(),
      name: this.name.toString(),
      owner: this.owner.toString(),
      participants: this.participants.map(p => p.toString()),
      startedAt: this.startedAt.toISOStringOrNull(),
      state: this.state.toString(),
      usersCards: this.usersCards.map(u => {
        return {
          cards: u.cards.map(c => c.toString()),
          userID: u.userID.toString(),
        };
      }),
    };
  }
}
