import { Test, TestingModule } from '@nestjs/testing';
import { AppModuleDev, AppModuleProd } from '../src/app.module';
import { AccessKeyService } from '../src/authorization/domain/accessKey/AccessKeyService';
import { IAccessKeyRepository } from '../src/authorization/domain/accessKey/IAccessKeyRepository';
import { AdminGuard } from '../src/authorization/domain/guards/AdminGuard';
import { UserGuard } from '../src/authorization/domain/guards/UserGuard';
import { IUserRepository } from '../src/authorization/domain/user/IUserRepository';
import { UserService } from '../src/authorization/domain/user/UserService';
import { CardFactory } from '../src/core/domain/cards/CardFactory';
import { CardService } from '../src/core/domain/cards/CardService';
import { ICardRepository } from '../src/core/domain/cards/ICardRepository';
import { GameFactory } from '../src/core/domain/game/GameFactory';
import { GameService } from '../src/core/domain/game/GameService';
import { IGameRepository } from '../src/core/domain/game/IGameRepository';
import { ITimeService } from '../src/core/domain/ITimeService';

export interface ITestingContainer {
  userRepository: IUserRepository;
  accessKeyRepository: IAccessKeyRepository;
  userService: UserService;
  accessKeyService: AccessKeyService;
  userGuard: UserGuard;
  adminGuard: AdminGuard;
  timeService: ITimeService;
  gameService: GameService;
  gameRepository: IGameRepository;
  gameFactory: GameFactory;
  cardService: CardService;
  cardRepository: ICardRepository;
  cardFactory: CardFactory;
}

export class TesUtils {
  /**
   *
   * @deprecated
   */

  public static async createTestingContainer(): Promise<TestingModule> {
    if (process.env.NODE_ENV === 'testing') {
      return await Test.createTestingModule({
        imports: [AppModuleDev],
      }).compile();
    } else {
      return await Test.createTestingModule({
        imports: [AppModuleProd],
      }).compile();
    }
  }

  public static async createCustomContainer(): Promise<ITestingContainer> {
    let testingModule: TestingModule;

    if (process.env.NODE_ENV === 'testing') {
      testingModule = await Test.createTestingModule({
        imports: [AppModuleDev],
      }).compile();
    } else {
      testingModule = await Test.createTestingModule({
        imports: [AppModuleProd],
      }).compile();
    }

    return {
      accessKeyRepository: testingModule.get(IAccessKeyRepository),
      accessKeyService: testingModule.get(AccessKeyService),
      adminGuard: testingModule.get(AdminGuard),
      timeService: testingModule.get(ITimeService),
      userGuard: testingModule.get(UserGuard),
      userRepository: testingModule.get(IUserRepository),
      userService: testingModule.get(UserService),
      gameService: testingModule.get(GameService),
      gameRepository: testingModule.get(IGameRepository),
      gameFactory: testingModule.get(GameFactory),
      cardService: testingModule.get(CardService),
      cardRepository: testingModule.get(ICardRepository),
      cardFactory: testingModule.get(CardFactory),
    };
  }

  public static async createDummyCards(
    ctx: ITestingContainer,
    count: number,
  ): Promise<void> {
    for (let i = 0; i < count; i++) {
      const card = ctx.cardFactory.createCard(i, 'event', 'description');
      await ctx.cardRepository.add(card);
    }
  }
}
