import { Module } from "@nestjs/common";
import { ITimeService } from "../core/domain/ITimeService";
import { AccessKeyFactor } from "./domain/accessKey/AccessKeyFactory";
import { IAccessKeyRepository } from "./domain/accessKey/IAccessKeyRepository";
import { UserGuard } from "./domain/guards/UserGuard";
import { IUserRepository } from "./domain/user/IUserRepository";
import { UserFactory } from "./domain/user/UserFactory";
import { UserService } from "./domain/user/UserService";
import { UserController } from "./infrastructure/api/UserController";
import { InMemoryAccessKeyRepository } from "./infrastructure/repos/accessKey/InMemoryAccessKeyRepository";
import { InMemoryUserRepository } from "./infrastructure/repos/user/InMemoryUserRepository";
import { TimeService } from "./infrastructure/TimeService";

// todo: add case with export module - export only client instead of several  classes

@Module({
  imports: [],
  providers: [
    UserService,
    UserFactory,
    UserGuard,
    AccessKeyFactor,
    {
      provide: ITimeService,
      useClass: TimeService,
    },
  ],
  controllers: [
    UserController,
  ],
  exports: [
    UserGuard,
    {
      provide: IAccessKeyRepository,
      useClass: InMemoryAccessKeyRepository,
    },
  ],
})
export class AuthorizationModuleProd { }

@Module({
  imports: [],
  providers: [
    UserService,
    UserFactory,
    AccessKeyFactor,
    UserGuard,
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
  exports: [
    UserGuard,
    {
      provide: IAccessKeyRepository,
      useClass: InMemoryAccessKeyRepository,
    },
  ],
})
export class AuthorizationModuleDev { }
