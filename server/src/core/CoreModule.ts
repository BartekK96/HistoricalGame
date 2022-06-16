import { Module } from '@nestjs/common';
import {
  AuthorizationModuleDev,
  AuthorizationModuleProd,
} from '../authorization/AuthorizationModule';
import { TimeService } from '../authorization/infrastructure/TimeService';
import { CardFactory } from './domain/cards/CardFactory';
import { CardService } from './domain/cards/CardService';
import { ICardRepository } from './domain/cards/ICardRepository';
import { GameFactory } from './domain/game/GameFactory';
import { GameServer } from './domain/game/GameServer';
import { GameService } from './domain/game/GameService';
import { IGameRepository } from './domain/game/IGameRepository';
import { ITimeService } from './domain/ITimeService';
import { CardController } from './infrastructure/api/CardController';
import { InMemoryCardRepository } from './infrastructure/repos/card/InMemoryCardRepository';
import { InMemoryGameRepository } from './infrastructure/repos/game/InMemoryGameRepository';

// todo : add only client for import instead of all module
// todo: do sth with time service
@Module({
  imports: [AuthorizationModuleProd],
  providers: [
    CardService,
    CardFactory,
    GameService,
    GameFactory,
    GameServer,
    {
      provide: ICardRepository,
      useClass: InMemoryCardRepository,
    },
    {
      provide: ITimeService,
      useClass: TimeService,
    },
    {
      provide: IGameRepository,
      useClass: InMemoryGameRepository,
    },
  ],
  controllers: [CardController],
  exports: [],
})
export class CoreModuleProd {}

@Module({
  imports: [AuthorizationModuleDev],
  providers: [
    CardFactory,
    CardService,
    GameServer,
    GameFactory,
    GameService,
    {
      provide: ICardRepository,
      useClass: InMemoryCardRepository,
    },
    {
      provide: IGameRepository,
      useClass: InMemoryGameRepository,
    },
    {
      provide: ITimeService,
      useClass: TimeService,
    },
  ],
  controllers: [CardController],
  exports: [],
})
export class CoreModuleDev {}
