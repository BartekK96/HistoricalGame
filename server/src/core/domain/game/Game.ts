import { UserID } from '../../../authorization/domain/user/User';
import { DateValue } from '../../../kernel/DateValue';
import { ClassConstructor } from '../../../kernel/decorators/Immutable';
import { Entity } from '../../../kernel/Entity';
import { Identifier } from '../../../kernel/Identifier';
import { Writable } from '../../../kernel/interfaces/Writable';
import { CardID } from '../cards/Card';
import { GameName } from './GameName';
import { GameState } from './GameState';

interface IBaseHandler {
  addUser(userID: UserID): void;
  removeUser(userID: UserID): void;
  startGame(): void;
  chooseCards(): void;
  finishGame(): void;
}

class BaseHandler implements IBaseHandler {
  constructor(protected game: Writable<Game>) {}

  public removeUser(userID: UserID): void {
    throw new Error('Method not implemented.');
  }

  public startGame(): void {
    throw new Error('Method not implemented.');
  }

  public chooseCards(): void {
    throw new Error('Method not implemented.');
  }

  public addUser(userID: UserID): void {
    throw new Error('Can not run method in given game state');
  }

  public finishGame(): void {
    throw new Error('Can not run method in given game state');
  }
}

class InitializedHandler extends BaseHandler {
  public addUser(userID: UserID): void {
    // todo: customize it in future
    if (this.game.participants.length === 4)
      this.game.participants.push(userID);
  }
  public removeUser(userID: UserID): void {
    this.game.participants.filter(user => !user.equals(userID));
  }

  public startGame(): void {
    this.game.state = GameState.STARTING;
  }
}

export class GameID extends Identifier {}

export interface IUserCards {
  userID: UserID;
  cards: CardID[];
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
    public readonly cardsPerPlayer: number,
    public readonly startedAt: DateValue,
    public readonly finishedAt: DateValue,
  ) {
    super();
  }

  public isAlreadyFinished(): boolean {
    return this.finishedAt.hasAlreadyPassed();
  }

  private getActualHandler(): IBaseHandler {
    const stateHandlerConstructorMap: Map<
      GameState,
      ClassConstructor<BaseHandler>
    > = new Map([[GameState.INITIALIZED, InitializedHandler]]);

    const Constructor = stateHandlerConstructorMap.get(this.state);

    if (!Constructor) {
      throw new Error('Given state does not have handler');
    }

    return new Constructor(this);
  }

  public addUser(userID: UserID): void {
    this.getActualHandler().addUser(userID);
  }

  public removeUser(userID: UserID): void {
    this.getActualHandler().removeUser(userID);
  }

  public startGame(): void {
    this.getActualHandler().startGame();
  }

  public chooseCards(): void {
    throw new Error('Method not implemented.');
  }

  public finishGame(): void {
    throw new Error('Method not implemented.');
  }
}
