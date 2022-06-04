import { Module } from "@nestjs/common";
import { AuthorizationModuleDev, AuthorizationModuleProd } from "../authorization/AuthorizationModule";
import { TimeService } from "../authorization/infrastructure/TimeService";
import { CardFactory } from "./domain/cards/CardFactory";
import { CardService } from "./domain/cards/CardService";
import { ICardRepository } from "./domain/cards/ICardRepository";
import { ITimeService } from "./domain/ITimeService";
import { CardController } from "./infrastructure/api/CardController";
import { InMemoryCardRepository } from "./infrastructure/repos/InMemoryCardRepository";

// todo: add only client for import instead of all module
// todo: do sth with time service
@Module({
    imports: [
        AuthorizationModuleProd,
    ],
    providers: [
        CardService,
        CardFactory,
        {
            provide: ICardRepository,
            useClass: InMemoryCardRepository,
        },
        {
            provide: ITimeService,
            useClass: TimeService,
        },
    ],
    controllers: [
        CardController,
    ],
    exports: [],
})
export class CoreModuleProd { }

@Module({
    imports: [
        AuthorizationModuleDev
    ],
    providers: [
        CardFactory,
        CardService,
        {
            provide: ICardRepository,
            useClass: InMemoryCardRepository,
        },
        {
            provide: ITimeService,
            useClass: TimeService,
        },
    ],
    controllers: [
        CardController,
    ],
    exports: [],
})
export class CoreModuleDev { }
