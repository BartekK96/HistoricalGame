import { Module } from "@nestjs/common";
import { ITimeService } from "../core/domain/ITimeService";
import { AccessKeyFactor } from "./domain/accessKey/AccessKeyFactory";
import { AccessKeyService } from "./domain/accessKey/AccessKeyService";
import { IAccessKeyRepository } from "./domain/accessKey/IAccessKeyRepository";
import { AdminGuard } from "./domain/guards/AdminGuard";
import { UserGuard } from "./domain/guards/UserGuard";
import { IUserRepository } from "./domain/user/IUserRepository";
import { UserFactory } from "./domain/user/UserFactory";
import { UserService } from "./domain/user/UserService";
import { UserController } from "./infrastructure/api/UserController";
import { AuthorizationClient } from "./infrastructure/AuthorizationClient";
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
    AdminGuard,
    AccessKeyService,
    AccessKeyFactor,
    {
      provide: ITimeService,
      useClass: TimeService,
    },
    AuthorizationClient,
  ],
  controllers: [
    UserController,
  ],
  exports: [
    UserGuard,
    AdminGuard,
    AccessKeyService,
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
    AdminGuard,
    AccessKeyService,
    AuthorizationClient,
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
    AdminGuard,
    AccessKeyService,
  ],
})
export class AuthorizationModuleDev { }
