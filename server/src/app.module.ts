import { Module } from '@nestjs/common';
import { AuthorizationModuleDev, AuthorizationModuleProd } from './authorization/AuthorizationModule';

@Module({
  imports: [
    AuthorizationModuleProd,
  ],
  controllers: [],
  providers: [],
})
export class AppModuleProd {}


@Module({
  imports: [
    AuthorizationModuleDev,
  ],
  controllers: [],
  providers: [],
})
export class AppModuleDev {}
