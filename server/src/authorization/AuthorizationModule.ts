import { Module } from "@nestjs/common";
import { ITimeService } from "../core/domain/ITimeService";
import { AccessKeyFactor } from "./domain/accessKey/AccessKeyFactory";
import { IAccessKeyRepository } from "./domain/accessKey/IAccessKeyRepository";
import { IUserRepository } from "./domain/user/IUserRepository";
import { UserFactory } from "./domain/user/UserFactory";
import { UserService } from "./domain/user/UserService";
import { UserController } from "./infrastructure/api/UserController";
import { InMemoryAccessKeyRepository } from "./infrastructure/repos/accessKey/InMemoryAccessKeyRepository";
import { InMemoryUserRepository } from "./infrastructure/repos/user/InMemoryUserRepository";
import { TimeService } from "./infrastructure/TimeService";

@Module({
  imports: [],
  providers: [
    UserService,
    UserFactory,
    AccessKeyFactor,
    {
      provide: ITimeService,
      useClass: TimeService,
    },
  ],
  controllers: [
    UserController,
  ],
  exports: [],
})
export class AuthorizationModuleProd { }

@Module({
  imports: [],
  providers: [
    UserService,
    UserFactory,
    AccessKeyFactor,
    {
      provide: ITimeService,
      useClass: TimeService,
    },
    {
      provide: IUserRepository,
      useClass: InMemoryUserRepository,
    },
    {
      provide: IAccessKeyRepository,
      useClass: InMemoryAccessKeyRepository,
    },
  ],
  controllers: [
    UserController,
  ],
  exports: [],
})
export class AuthorizationModuleDev { }
