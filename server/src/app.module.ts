import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AuthorizationModuleDev,
  AuthorizationModuleProd,
} from './authorization/AuthorizationModule';
import { CoreModuleDev, CoreModuleProd } from './core/CoreModule';
import { HttpErrorFilter } from './kernel/HttpErrorFilter';

// todo: add config file; add dns for mongo
@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://admin:admin@mongo?authSource=admin`),
    AuthorizationModuleProd,
    CoreModuleProd,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModuleProd {}

@Module({
  imports: [AuthorizationModuleDev, CoreModuleDev],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModuleDev {}
