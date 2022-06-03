import { Module } from "@nestjs/common";
import { ITimeService } from "../core/domain/ITimeService";
import { UserFactory } from "./domain/user/UserFactory";
import { UserService } from "./domain/user/UserService";
import { TimeService } from "./infrastructure/TimeService";

@Module({
    imports: [],
    providers: [
      UserService,
      UserFactory,
      {
        provide: ITimeService,
        useClass: TimeService,
      },
    ],
    controllers: [],
    exports: [],
  })
  export class AuthorizationModuleProd {}

@Module({
    imports: [],
    providers: [
      UserService,
      UserFactory,
      {
        provide: ITimeService,
        useClass: TimeService,
      },
    ],
    controllers: [],
    exports: [],
  })
  export class AuthorizationModuleDev {}
  